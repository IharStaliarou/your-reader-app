import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { PrismaModule } from '@prisma/prisma.module';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { UPLOAD_DESTINATION } from 'src/constants/file.constants';
import { getFileNameGenerator } from '@utils/file.util';

@Module({
  imports: [
    PrismaModule,
    MulterModule.register({
      storage: diskStorage({
        destination: UPLOAD_DESTINATION,
        filename: getFileNameGenerator,
      }),
    }),
  ],
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
