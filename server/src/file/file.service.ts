import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as fs from 'fs';

import { PrismaService } from '@prisma/prisma.service';
import { File } from '@prisma/client';
import { IUploadedFile } from './dto/upload-file.dto';

@Injectable()
export class FileService {
  constructor(private readonly prisma: PrismaService) {}

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

    console.log(`[Prisma] File metadata saved for ID: ${newFile.id}`);

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

  async removeFile(fileId: string, userId: string) {
    const file = await this.getFileById(fileId, userId);

    if (!file) {
      throw new NotFoundException(
        `File with ID ${fileId} not found or access denied.`,
      );
    }

    try {
      fs.unlink(file.filePath, (error) => {
        if (error) {
          console.error(
            `[Filesystem] Error deleting file ${file.filePath}: ${error.message}`,
          );
        } else {
          console.log(
            `[Filesystem] Successfully deleted file: ${file.filePath}`,
          );
        }
      });
      console.log(`[Filesystem] Successfully deleted file: ${file.filePath}`);
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.warn(
          `[Filesystem] Physical file not found at ${file.filePath}. Deleting metadata only.`,
        );
      } else {
        console.error(
          `[Filesystem] Error deleting file ${file.filePath}: ${error.message}`,
        );
      }
    }

    await this.prisma.file.delete({
      where: { id: fileId },
    });

    return { message: `File ${file.originalName} successfully deleted.` };
  }
}
