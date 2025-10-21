// TODO: remove test file
import { useQuery } from '@tanstack/react-query';

import { $api } from './auth.api';

const fetchUserProfile = async () => {
  const response = await $api.get('/user/find-by-username/Ihar1');
  return response.data;
};
export const useUserProfileQuery = () => {
  return useQuery({
    queryKey: ['userProfile'],
    queryFn: fetchUserProfile,
    onError: (error: any) => {
      console.error('Protected Route Test Failed:', error);

      if (
        error.response?.status === 401 &&
        !localStorage.getItem('accessToken')
      ) {
        alert('Session expired. Please log in again.');
        window.location.href = '/';
      }
    },
  });
};
