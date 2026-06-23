import api from "./api";
import { JobPost } from "@/types";

export const getJobs = async (): Promise<JobPost[]> => {
  try {
    const response = await api.get<JobPost[]>('/JobPosts');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar vagas:', error);
    throw error;
  }
};
