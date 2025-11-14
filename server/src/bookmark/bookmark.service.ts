import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';

import { PrismaService } from '@prisma/prisma.service';
import { Bookmark } from '@prisma/client';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';

@Injectable()
export class BookmarkService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateBookmarkDto): Promise<Bookmark> {
    const file = await this.prisma.file.findUnique({
      where: { id: dto.fileId, userId },
    });

    if (!file) {
      throw new NotFoundException(
        `File with ID ${dto.fileId} not found or access denied.`,
      );
    }

    return this.prisma.bookmark.create({
      data: {
        userId: userId,
        fileId: dto.fileId,
        title: dto.title,
        textFragment: dto.textFragment,
        startChar: dto.startChar,
        endChar: dto.endChar,
        color: dto.color,
      },
    });
  }

  async findAllByFile(userId: string, fileId: string): Promise<Bookmark[]> {
    return this.prisma.bookmark.findMany({
      where: {
        userId,
        fileId,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async remove(
    userId: string,
    bookmarkId: string,
  ): Promise<{ message: string }> {
    const bookmark = await this.prisma.bookmark.findUnique({
      where: { id: bookmarkId },
    });

    if (!bookmark) {
      throw new NotFoundException(`Bookmark with ID ${bookmarkId} not found.`);
    }

    if (bookmark.userId !== userId) {
      throw new ForbiddenException(
        'You do not have permission to delete this bookmark.',
      );
    }

    await this.prisma.bookmark.delete({
      where: { id: bookmarkId },
    });

    return { message: `Bookmark ${bookmarkId} successfully deleted.` };
  }
}
