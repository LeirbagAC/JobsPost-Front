import api from "./api";
import { JobPost } from "@/types";

export const search = async(query: string): Promise<JobPost[]> => {
    try {
        const response = await api.get(`/JobPost/search?keyword=${query}`);
        return response.data;
    } catch (err) {
        console.error('Erro ao buscar vagas: ', err);
        throw err;
    }
};