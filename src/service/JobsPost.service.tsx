import api from "./api";
import { JobPost } from "@/types";

export interface JobFormValues {
    title: string;
    postTechStack: string[];
    reqExperience: number;
    description: string;
}

export interface CreateJobPostPayload {
    postProfile: string;
    postTechStack: string[];
    reqExperience: number;
    postDesc: string;
}

//Poderia ter deixado os nomes iguais, mas preferi deixar diferente para não confundir com o tipo JobPost que é retornado da API,
//também para deixar claro que é o payload que vai ser enviado para a API, e não o objeto que vai ser retornado
//e treinar o mapeamento de um para outro caso seja necessário no futuro, já que nessa api não tem dto
const toCreateJobPostPayload = (jobData: JobFormValues): CreateJobPostPayload => ({
    postProfile: jobData.title,
    postTechStack: jobData.postTechStack,
    reqExperience: jobData.reqExperience,
    postDesc: jobData.description,
});

export const postJob = async (jobData: JobFormValues): Promise<JobPost> => {
    try {
        const payload = toCreateJobPostPayload(jobData);
        const response = await api.post<JobPost>('/JobPost', payload);

        return response.data;
    } catch (err) {
        console.error('Erro ao postar vaga: ', err);
        throw err;
    }
};