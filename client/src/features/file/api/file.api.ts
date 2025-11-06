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
} from '@/shared/interfaces/file.interface';
import { extractErrorMessage } from '@/shared/utils/error.utils';

export const fileQueryKeys = {
  files: ['files'] as const,
  fileContent: (fileId: string) => ['fileContent', fileId] as const,
};

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

const fetchFileContent = async (fileId: string): Promise<string> => {
  const response = await $api.get(`${API_GET_FILE_CONTENT_URL(fileId)}`, {
    responseType: 'text',
  });
  return response.data;
};

export const useUploadFileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadFile,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: fileQueryKeys.files });

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
    queryKey: fileQueryKeys.files,
    queryFn: fetchUserFiles,
    staleTime: FIVE_MINUTES_MS,
    refetchOnWindowFocus: false,
  });
};

export const useGetFileContentQuery = (fileId: string | null) => {
  const enabled = !!fileId;

  return useQuery({
    queryKey: fileQueryKeys.fileContent(fileId!),
    queryFn: () => fetchFileContent(fileId!),
    enabled: enabled,
    staleTime: Infinity,
    retry: 1,
  });
};

export const useDeleteFileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFile,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: fileQueryKeys.files });

      toast.success(data.message || `File successfully deleted!`);

      // TODO: add work with store for correct file deletion in real time and use activeFileId in future
    },
    onError: (error: AxiosError<any>) => {
      const message = extractErrorMessage(error, 'Error deleting file');
      toast.error(`Deletion Error: ${message}`);
      return Promise.reject(error);
    },
  });
};
