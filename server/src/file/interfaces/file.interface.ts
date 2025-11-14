import { IFile } from '@nestjs/common/pipes/file/interfaces';

export interface IUploadedFile extends Express.Multer.File {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
  buffer: Buffer;
}

export interface IFilePageContent {
  content: string;
  startCharIndex: number;
  endCharIndex: number;
  currentPage: number;
  totalPages: number;
  totalLength: number;
  fileId: string;
}

export interface IFileUploadResponse {
  fileId: string;
  fileName: string;
  path: string;
  message: string;
}

export interface IFilesResponse {
  count: number;
  files: IFile[];
}
