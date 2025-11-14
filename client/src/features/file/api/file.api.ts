import { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import {
  API_UPLOAD_FILE_URL,
  API_GET_FILES_URL,
  MULTER_FIELD_NAME,
  API_GET_FILE_CONTENT_URL,
  API_DELETE_FILE_URL,
} from '@/shared/constants/api.constants';
import { $api } from '@/shared/api/instance.api';
import { FIVE_MINUTES_MS } from '@/shared/constants/time.constants';
import type {
  IUploadedFileData,
  IFileUploadResponse,
  IFilesResponse,
  IFilePageContent,
} from '@/shared/interfaces/file.interface';
import { extractErrorMessage } from '@/shared/utils/error.utils';
import { useFileStore } from '../store/file.store';
import { FILE_QUERY_KEYS } from '@/shared/constants/queryKeys.constants';
import { DEFAULT_PAGE_SIZE } from '@/shared/constants/file.constants';

const uploadFile = async ({
  file,
}: IUploadedFileData): Promise<IFileUploadResponse> => {
  const formData = new FormData();
  formData.append(MULTER_FIELD_NAME, file);

  const response = await $api.post<IFileUploadResponse>(
    API_UPLOAD_FILE_URL,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return response.data;
};

const deleteFile = async (fileId: string): Promise<{ message: string }> => {
  const response = await $api.delete<{ message: string }>(
    API_DELETE_FILE_URL(fileId)
  );
  return response.data;
};

const fetchUserFiles = async (): Promise<IFilesResponse> => {
  const response = await $api.get(`${API_GET_FILES_URL}`);
  return response.data;
};

interface IFileContentPageParams {
  fileId: string;
  page: number;
  pageSize: number;
}

const fetchFileContent = async ({
  fileId,
  page,
  pageSize,
}: IFileContentPageParams): Promise<IFilePageContent> => {
  const response = await $api.get<IFilePageContent>(
    `${API_GET_FILE_CONTENT_URL(fileId)}?page=${page}&pageSize=${pageSize}`
  );
  return response.data;
};

export const useUploadFileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadFile,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: FILE_QUERY_KEYS.files });
      toast.success(`File "${data.fileName}" uploaded successfully!`);
    },
    onError: (error: AxiosError<any>) => {
      const message = extractErrorMessage(error, 'Error uploading file');
      const displayMessage =
        error.response?.status === 400
          ? `Client Error (400): ${message}`
          : `Upload Error: ${message}`;
      toast.error(displayMessage);
      return Promise.reject(error);
    },
  });
};

export const useGetUserFilesQuery = () => {
  return useQuery<IFilesResponse, AxiosError>({
    queryKey: FILE_QUERY_KEYS.files,
    queryFn: fetchUserFiles,
    staleTime: FIVE_MINUTES_MS,
    refetchOnWindowFocus: true,
    retry: 1,
  });
};

export const useGetFileContentQuery = (
  params: IFileContentPageParams | null
) => {
  const enabled = !!params;
  const { fileId, page, pageSize } = params || {
    fileId: '',
    page: 1,
    pageSize: DEFAULT_PAGE_SIZE,
  };

  return useQuery<IFilePageContent, AxiosError>({
    queryKey: FILE_QUERY_KEYS.fileContent(fileId, page, pageSize),
    queryFn: () => fetchFileContent({ fileId, page, pageSize }),
    enabled: enabled,
    staleTime: Infinity,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};

export const useDeleteFileMutation = () => {
  const queryClient = useQueryClient();
  const activeFileId = useFileStore((state) => state.activeFileId);
  const clearActiveFileId = useFileStore((state) => state.clearActiveFileId);

  return useMutation({
    mutationFn: deleteFile,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: FILE_QUERY_KEYS.files });
      toast.success(data.message || `File successfully deleted!`);
      if (variables === activeFileId) {
        clearActiveFileId();
      }
    },
    onError: (error: AxiosError<any>) => {
      const message = extractErrorMessage(error, 'Error deleting file');
      toast.error(`Deletion Error: ${message}`);
      return Promise.reject(error);
    },
  });
};
