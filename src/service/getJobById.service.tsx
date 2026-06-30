import api from './api';
import { JobPost } from '@/types';

export const getJobById = async (postId: number): Promise<JobPost> => {
  try {
    const response = await api.get<JobPost>(`/JobPost/${postId}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar vaga por ID:', error);
    throw error;
  }
};
