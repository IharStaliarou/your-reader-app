/**
 * Check file type allowed for upload
 * @param file Object File for check
 * @returns true, if file type allowed.
 */
export const isAllowedFileType = (file: File): boolean => {
  const allowedTypes = ['application/pdf', 'text/plain'];
  return allowedTypes.includes(file.type);
};
