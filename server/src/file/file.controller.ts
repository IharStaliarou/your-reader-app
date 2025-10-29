import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Req,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';

import { User } from '@prisma/client';
import { type IUploadedFile } from './dto/upload-file.dto';
import { FileService } from './file.service';
import { JwtAuthGuard } from '@auth/guards/jwt.auth.guard';

interface AuthenticatedRequest extends Request {
  user: User;
}

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 5 * 1024 * 1024, // TODO: remove magic number
      },
      fileFilter: (req, file, cb) => {
        if (
          file.mimetype === 'application/pdf' ||
          file.mimetype === 'text/plain'
        ) {
          cb(null, true);
        } else {
          cb(
            new Error('Invalid file type. Only PDF and TXT are allowed.'),
            false,
          );
        }
      },
    }),
  )
  async uploadFile(
    @UploadedFile() file: IUploadedFile,
    @Req() req: AuthenticatedRequest,
  ) {
    if (!file) {
      throw new BadRequestException('No file selected or invalid file type.');
    }

    if (!req.user || !req.user.id) {
      throw new UnauthorizedException(
        'User ID not found in request after authentication.',
      );
    }

    const userId = req.user.id;

    const savedFile = await this.fileService.saveFileMetadata(file, userId);

    return {
      fileId: savedFile.id,
      fileName: savedFile.originalName,
      path: savedFile.filePath,
      message: 'File uploaded and metadata saved successfully!',
    };
  }
}
