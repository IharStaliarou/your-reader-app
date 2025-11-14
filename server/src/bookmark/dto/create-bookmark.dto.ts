import {
  IsNotEmpty,
  IsString,
  IsNumber,
  Min,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateBookmarkDto {
  @IsUUID('4', { message: 'File ID must be a valid UUID' })
  @IsNotEmpty()
  fileId: string;

  @IsNotEmpty({ message: 'Title cannot be empty' })
  @IsString({ message: 'Title must be a string' })
  @MaxLength(100, { message: 'Title must not exceed 100 characters' })
  title: string;

  @IsNotEmpty({ message: 'Text fragment cannot be empty' })
  @IsString({ message: 'Text fragment must be a string' })
  @MaxLength(1000, { message: 'Text fragment must not exceed 1000 characters' })
  textFragment: string;

  @IsNumber({}, { message: 'Start character index must be a number' })
  @Min(0, { message: 'Start index cannot be negative' })
  startChar: number;

  @IsNumber({}, { message: 'End character index must be a number' })
  @Min(0, { message: 'End index cannot be negative' })
  endChar: number;

  @IsString({ message: 'Color must be a string' })
  color: string;
}
