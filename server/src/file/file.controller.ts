import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Req,
  BadRequestException,
  UnauthorizedException,
  Get,
  NotFoundException,
  Param,
  Res,
  Delete,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { type Request, type Response } from 'express';
import fs from 'fs';

import { User } from '@prisma/client';
import { type IUploadedFile } from './dto/upload-file.dto';
import { FileService } from './file.service';
import { JwtAuthGuard } from '@auth/guards/jwt.auth.guard';
import {
  ALLOWED_MIME_TYPES,
  ALLOWED_MIME_TYPES_MSG,
  MAX_FILE_SIZE_BYTES,
  MULTER_FIELD_NAME,
} from 'src/constants/file.constants';
import { CurrentUser } from '@decorators/current-user.decorator';

interface AuthenticatedRequest extends Request {
  user: User;
}

@Controller('files')
@UseGuards(JwtAuthGuard) // TODO: optionally ?!
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  // @UseGuards(JwtAuthGuard) // TODO: this or global
  @UseInterceptors(
    FileInterceptor(MULTER_FIELD_NAME, {
      limits: {
        fileSize: MAX_FILE_SIZE_BYTES,
      },
      fileFilter: (req, file, cb) => {
        if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new Error(ALLOWED_MIME_TYPES_MSG), false);
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

  @Get('all')
  async findAll(@Req() req: AuthenticatedRequest) {
    const userId = req.user.id;

    if (!userId) {
      throw new UnauthorizedException('User ID not found.');
    }

    const files = await this.fileService.getAllByUserId(userId);

    return {
      count: files.length,
      files: files,
    };
  }

  @Get(':fileId/content')
  async getFileContent(
    @Param('fileId') fileId: string,
    @Req() req: AuthenticatedRequest,
    @Res() res: Response,
  ) {
    const userId = req.user.id;

    const fileMetadata = await this.fileService.getFileById(fileId, userId);

    if (!fileMetadata) {
      throw new NotFoundException(
        `File with ID ${fileId} not found or access denied.`,
      );
    }

    res.setHeader('Content-Type', fileMetadata.mimeType);
    res.setHeader(
      'Content-Disposition',
      `inline; filename="${fileMetadata.originalName}"`,
    );

    try {
      const fileStream = fs.createReadStream(fileMetadata.filePath);
      fileStream.pipe(res);
    } catch (error) {
      throw new NotFoundException(
        `Physical file not found at path: ${fileMetadata.filePath}`,
      );
    }
  }

  @Delete(':fileId')
  async deleteFile(
    @Param('fileId') fileId: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.fileService.removeFile(fileId, userId);
  }
}
