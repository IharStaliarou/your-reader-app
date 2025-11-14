export const FILE_QUERY_KEYS = {
  files: ['files'] as const,
  fileContent: (fileId: string, page: number, pageSize: number) =>
    ['fileContent', fileId, page, pageSize] as const,
};

export const BOOKMARK_QUERY_KEYS = {
  fileBookmarks: (fileId: string) => ['fileBookmarks', fileId] as const,
};
