import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as fs from 'fs/promises';
import * as fsn from 'fs';
import { PrismaService } from '@prisma/prisma.service';
import { File } from '@prisma/client';
import { IUploadedFile } from './dto/upload-file.dto';
import { IFilePageContent } from './interfaces/file.interface';

@Injectable()
export class FileService {
  constructor(private readonly prisma: PrismaService) {}

  private async adjustByteRangeForUtf8(
    filePath: string,
    startByte: number,
    maxBytesToRead: number = 4,
  ): Promise<number> {
    if (startByte === 0) {
      return 0;
    }

    try {
      const buffer = Buffer.alloc(maxBytesToRead);
      const fd = await fs.open(filePath, 'r');

      const { bytesRead } = await fd.read(
        buffer,
        0,
        maxBytesToRead,
        startByte - maxBytesToRead,
      );

      await fd.close();

      if (bytesRead === 0) {
        return startByte;
      }

      const bufferStartOffset = startByte - bytesRead;
      let checkOffset = 0;

      while (checkOffset < bytesRead) {
        const byte = buffer[checkOffset];

        if ((byte & 0x80) === 0x00) {
          checkOffset++;
          continue;
        }

        if ((byte & 0xc0) === 0xc0) {
          try {
            const decoded = buffer.toString('utf8', checkOffset, bytesRead);
            if (decoded.length > 0) {
              const firstChar = decoded.charAt(0);
              const byteLengthOfFirstChar = Buffer.from(
                firstChar,
                'utf8',
              ).length;

              if (
                bufferStartOffset + checkOffset < startByte &&
                bufferStartOffset + checkOffset + byteLengthOfFirstChar >
                  startByte
              ) {
                return bufferStartOffset + checkOffset;
              }
              checkOffset += byteLengthOfFirstChar;
            } else {
              checkOffset++;
            }
          } catch (e) {
            checkOffset++;
          }
        } else {
          checkOffset++;
        }
      }
      return startByte;
    } catch (error) {
      console.error('UTF-8 adjustment error:', error);
      return startByte;
    }
  }

  async saveFileMetadata(file: IUploadedFile, userId: string): Promise<File> {
    if (!file.path || !userId) {
      throw new Error('Missing file path or user ID during database save.');
    }

    const existingFile = await this.prisma.file.findFirst({
      where: {
        userId: userId,
        originalName: file.originalname,
      },
    });

    if (existingFile) {
      throw new BadRequestException(
        `File with name "${file.originalname}" already exists for this user.`,
      );
    }

    const newFile = await this.prisma.file.create({
      data: {
        userId: userId,
        title: file.originalname,
        originalName: file.originalname,
        mimeType: file.mimetype,
        fileSize: file.size,
        filePath: file.path,
        contentLength: file.size,
      },
    });
    return newFile;
  }

  async getFileById(fileId: string, userId: string): Promise<File | null> {
    return this.prisma.file.findUnique({
      where: {
        id: fileId,
        userId: userId,
      },
    });
  }

  async getAllByUserId(userId: string): Promise<File[]> {
    return this.prisma.file.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getFileContentPage(
    fileMetadata: File,
    page: number,
    pageSize: number,
  ): Promise<IFilePageContent> {
    const totalLengthBytes = fileMetadata.fileSize;

    if (totalLengthBytes === 0) {
      return {
        content: '',
        startCharIndex: 0,
        endCharIndex: 0,
        currentPage: 1,
        totalPages: 1,
        totalLength: 0,
        fileId: fileMetadata.id,
      };
    }

    const totalPages = Math.ceil(totalLengthBytes / pageSize);
    const safePage = Math.min(Math.max(1, page), totalPages);

    let startByteIndex = (safePage - 1) * pageSize;
    let endByteIndex =
      Math.min(startByteIndex + pageSize, totalLengthBytes) - 1;

    if (fileMetadata.mimeType === 'text/plain') {
      startByteIndex = await this.adjustByteRangeForUtf8(
        fileMetadata.filePath,
        startByteIndex,
      );
      endByteIndex = Math.min(startByteIndex + pageSize, totalLengthBytes) - 1;
    }

    if (startByteIndex >= totalLengthBytes) {
      throw new BadRequestException(`Page ${page} is out of bounds.`);
    }

    let content = '';

    try {
      const readStream = fsn.createReadStream(fileMetadata.filePath, {
        encoding: 'utf8',
        start: startByteIndex,
        end: endByteIndex,
      });

      content = await new Promise<string>((resolve, reject) => {
        let chunkContent = '';
        readStream.on('data', (chunk) => {
          chunkContent += chunk;
        });
        readStream.on('error', (error) => {
          readStream.close();
          reject(error);
        });
        readStream.on('end', () => {
          resolve(chunkContent);
        });
      });
    } catch (error) {
      console.error(`File read error: ${error}`);
      throw new NotFoundException(
        `Physical file not found or read error for file: ${fileMetadata.filePath}`,
      );
    }
    const actualBytesRead = Buffer.from(content, 'utf8').length;
    const actualEndByteIndex = startByteIndex + actualBytesRead;

    return {
      content: content,
      startCharIndex: startByteIndex,
      endCharIndex: actualEndByteIndex,
      currentPage: safePage,
      totalPages: totalPages,
      totalLength: totalLengthBytes,
      fileId: fileMetadata.id,
    };
  }

  async removeFile(fileId: string, userId: string) {
    const file = await this.getFileById(fileId, userId);

    if (!file) {
      throw new NotFoundException(
        `File with ID ${fileId} not found or access denied.`,
      );
    }

    await this.prisma.bookmark.deleteMany({
      where: { fileId: file.id },
    });

    try {
      await fs.unlink(file.filePath);
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw error;
      }
    }

    await this.prisma.file.delete({
      where: { id: fileId },
    });

    return { message: `File ${file.originalName} successfully deleted.` };
  }
}
