import api from "./api";
import { JobPost } from "@/types";

export const deleteJob = async(jobId: number): Promise<JobPost> => {
    try {
        const response = await api.delete(`/JobPost/${jobId}`);
        return response.data;
    } catch(err) {
        console.error('Erro ao deletar vaga: ', err);
        throw err;
    }
};