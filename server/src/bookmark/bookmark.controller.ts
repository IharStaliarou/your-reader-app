import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { JwtAuthGuard } from '@auth/guards/jwt.auth.guard';
import { CurrentUser } from 'src/decorators/current-user.decorator';

@Controller('bookmarks')
@UseGuards(JwtAuthGuard)
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @CurrentUser('id') userId: string,
    @Body() createBookmarkDto: CreateBookmarkDto,
  ) {
    return this.bookmarkService.create(userId, createBookmarkDto);
  }

  @Get('file/:fileId')
  findAllByFile(
    @CurrentUser('id') userId: string,
    @Param('fileId') fileId: string,
  ) {
    return this.bookmarkService.findAllByFile(userId, fileId);
  }

  @Delete(':bookmarkId')
  remove(
    @CurrentUser('id') userId: string,
    @Param('bookmarkId') bookmarkId: string,
  ) {
    return this.bookmarkService.remove(userId, bookmarkId);
  }
}
