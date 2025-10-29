import { BadRequestException, Injectable } from '@nestjs/common';

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
}
