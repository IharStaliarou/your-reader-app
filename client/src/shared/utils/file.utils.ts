import type { IFile, IFilesResponse } from '../interfaces/file.interface';

/**
 * Check file type allowed for upload
 * @param file Object File for check
 * @returns true, if file type allowed.
 */
export const isAllowedFileType = (file: File): boolean => {
  const allowedTypes = ['application/pdf', 'text/plain'];
  return allowedTypes.includes(file.type);
};

/**
 * Get array of uploaded files
 * @param filesData response from server
 * @returns Array of files
 */
export const getUploadedFilesArray = (
  filesData: IFilesResponse | undefined
): IFile[] => {
  return filesData?.files || [];
};

/**
 * Get current file by id
 * @param filesData Array of files
 * @param fileId File id to find
 * @returns File object
 */
export const getCurrentFile = (
  filesData: IFilesResponse | undefined,
  fileId: string | undefined
) => {
  if (!filesData) return null;
  return getUploadedFilesArray(filesData).find((f) => f.id === fileId);
};

/**
 * Get file name without extension
 * @param file Object File for check
 * @returns file name without extension
 */
export const getFileTitle = (file: IFile | undefined | null): string => {
  if (!file) return '';
  return file.originalName.split('.')[0];
};
