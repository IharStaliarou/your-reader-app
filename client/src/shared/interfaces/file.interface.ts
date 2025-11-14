export interface IFile {
  id: string;
  title: string;
  originalName: string;
  mimeType: string;
  fileSize: number;
  filePath: string;
  contentLength: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface IFilesResponse {
  count: number;
  files: IFile[];
}

export interface IFileUploadResponse {
  fileId: string;
  fileName: string;
  path: string;
  message: string;
}

export interface IUploadedFileData {
  file: File;
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

export type ScrollToCharFnType = (startChar: number) => void;
