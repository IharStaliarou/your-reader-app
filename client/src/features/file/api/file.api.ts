import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

// TODO: rebase to shared api
import { API_FILE_UPLOAD_URL } from '@constants/url.constants';
import { $api } from '@/shared/api/instance.api';

interface IFileUploadData {
  file: File;
}

interface IFileUploadResponse {
  fileId: string;
  fileName: string;
  message: string;
}

const uploadFile = async ({
  file,
}: IFileUploadData): Promise<IFileUploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await $api.post(`${API_FILE_UPLOAD_URL}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const useUploadFileMutation = () => {
  return useMutation({
    mutationFn: uploadFile,
    onSuccess: (data) => {
      toast.success(`File "${data.fileName}" uploaded successfully!`);
    },
    onError: (error: AxiosError<any>) => {
      const message = error.response?.data?.message || 'Failed to upload file.';
      toast.error(`Upload Error: ${message}`);
    },
  });
};
