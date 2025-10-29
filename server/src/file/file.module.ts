import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';

import { PrismaModule } from '@prisma/prisma.module';
import { FileController } from './file.controller';
import { FileService } from './file.service';

// TODO: create utils
const fileStorage = diskStorage({
  destination: './uploads',
  filename: (req, file, callback) => {
    const userId = req.user.id || 'unknown';
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);

    const newFileName = `${name}_${userId}_${Date.now()}${ext}`;

    callback(null, newFileName);
  },
});

@Module({
  imports: [
    PrismaModule,
    MulterModule.register({
      storage: fileStorage,
    }),
  ],
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
