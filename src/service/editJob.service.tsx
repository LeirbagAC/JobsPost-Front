import api from "./api";
import { JobPost } from "@/types";

export const editJob = async(postId: number, updatedJob: JobPost): Promise<JobPost> => {
    try {
        const payload = {
            ...updatedJob,
            postId,
        };

        const response = await api.put<JobPost>(`/JobPost`, payload);
        return response.data;

    } catch (err) {
        console.error("Erro ao editar vaga:", err);
        throw err;
    }
};