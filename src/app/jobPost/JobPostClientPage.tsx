'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Card, Form, Input, Button, Select, Typography, Divider, message,
  InputNumber
} from 'antd';
import {
  ArrowLeftOutlined,
} from '@ant-design/icons';
import styles from '@/assets/css/JobPost.module.css';

import { JobPost } from '@/types';

import { postJob, JobFormValues } from '@/service/JobsPost.service';
import { editJob } from '@/service/editJob.service';
import { getJobById } from '@/service/getJobById.service';

import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';

const { Title, Text } = Typography;
const { TextArea } = Input;

function JobPostClientPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const [form] = Form.useForm<JobFormValues>();

  const postIdParam = searchParams.get('postId');
  const postId = postIdParam ? Number(postIdParam): null;
  const isEditing = !!postId && !Number.isNaN(postId); //!!postId = Esse valor existe ou tem valor sigficativo ?

  const { data: jobData, isLoading: isLoadingJob } = useQuery({
    queryKey: ['job', postId],
    queryFn: () => getJobById(postId as number),
    enabled: isEditing,

    //Refatoração para usar os dados em cache para torna a busca de dados no edit mais rápida, antes dava para notar um pequeno delay agora parece automático 
    initialData: () => { 
      if(!postId) return undefined;

      const jobCache = queryClient.getQueriesData<JobPost[]>({
        queryKey: ['jobs']
      });

      for (const [jobKey, jobsFound] of jobCache) {
        if (jobsFound) {
          const jobFound = jobsFound.find(job => job.postId === postId);
          if (jobFound) {
            return jobFound; 
          }
        }
      }

      return undefined;
    },
  });

  useEffect(() => {
    if (jobData) {
      form.setFieldsValue({
        title: jobData.postProfile,
        postTechStack: jobData.postTechStack,
        reqExperience: jobData.reqExperience,
        description: jobData.postDesc,
      });
    } else if (!isEditing) {
      form.resetFields();
    }
  }, [jobData, isEditing, form]);

  const createMutation = useMutation({
    mutationFn: postJob,
    onSuccess: () => {
      message.success("Vaga criada com sucesso.");
      queryClient.invalidateQueries({ queryKey:['jobs'] });
      router.push('/');
    },
    onError: () => message.error("Erro ao criar vaga.")
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: JobPost }) => editJob(id, payload),
    onSuccess: () => {
      message.success('Vaga atualizada com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['jobs'] }); 
      queryClient.invalidateQueries({ queryKey: ['job', postId] }); 
      router.push('/');
    },
    onError: () => message.error('Erro ao atualizar.'),
  });

  const handleSubmit = (values: JobFormValues) => {
    if (isEditing && postId !== null) {
      const payload: JobPost = {
        postId: postId,
        postProfile: values.title,
        postTechStack: values.postTechStack,
        reqExperience: values.reqExperience,
        postDesc: values.description,
      };
      updateMutation.mutate({ id: postId, payload });
    } else {
      createMutation.mutate(values);
    }
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={() => router.back()}
          className={styles.backButton}
        >
          Voltar para o Mural
        </Button>

        <Card
          className={styles.formCard}
          variant="borderless"
          styles={{ body: { padding: '40px' } }}
        >
          <div className={styles.header}>
            <Title level={3} style={{ margin: 0 }}>
              {isEditing ? 'Editar Vaga' : 'Publicar Nova Vaga'}
            </Title>
            <Text type="secondary">
              {isEditing ? 'Atualize os dados abaixo para salvar as alterações.' : 'Preencha os dados abaixo para anunciar uma oportunidade.'}
            </Text>
          </div>

          <Divider />

          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            requiredMark={false}
            size="large"
          >
            <Form.Item
              name="title"
              label={<Text strong>Título da Vaga</Text>}
              rules={[{ required: true, message: 'O título da vaga é obrigatório!' }]}
            >
              <Input placeholder="Ex: Desenvolvedor Front-end Sênior (React)" />
            </Form.Item>

            <Form.Item
              name="postTechStack"
              label={<Text strong>Tecnologias</Text>}
            >
              <Select
                mode="tags"
                placeholder="Digite a tecnologia e pressione Enter"
              />
            </Form.Item>

            <Form.Item
              label={<Text strong>Experiência (anos)</Text>}
              name="reqExperience"
            >
              <InputNumber placeholder="Digite a experiência necessária" min={0} max={60} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              name="description"
              label={<Text strong>Descrição da Vaga</Text>}
              rules={[{ required: true, message: 'A descrição é obrigatória!' }]}
            >
              <TextArea
                rows={6}
                placeholder="Descreva as responsabilidades, requisitos e diferenciais da vaga..."
              />
            </Form.Item>

            <Divider />

            <div className={styles.formActions}>
              <Button size="large" onClick={() => form.resetFields()}>
                Limpar Campos
              </Button>
              <Button type="primary" size="large" htmlType="submit" loading={isSubmitting}>
                {isEditing ? 'Salvar Alterações' : 'Publicar Vaga'}
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
}

export default function JobPostClientPage() {
  return (
    <Suspense fallback={<div className={styles.pageWrapper}>Carregando...</div>}>
      <JobPostClientPageContent />
    </Suspense>
  );
}
