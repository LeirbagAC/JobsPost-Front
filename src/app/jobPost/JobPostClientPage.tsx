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
import { postJob, JobFormValues } from '@/service/JobsPost.service';
import { editJob } from '@/service/editJob.service';
import { JobPost } from '@/types';
import { getJobById } from '@/service/getJobById.service';

const { Title, Text } = Typography;
const { TextArea } = Input;

function JobPostClientPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [form] = Form.useForm<JobFormValues>();

  useEffect(() => {
    const postIdParam = searchParams.get('postId');

    if (!postIdParam) {
      setIsEditing(false);
      setEditingPostId(null);
      form.resetFields();
      return;
    }

    const postId = Number(postIdParam);

    if (Number.isNaN(postId)) {
      message.error('ID da vaga inválido.');
      return;
    }

    const loadJobForEdit = async () => {
      setLoading(true);
      try {
        const job = await getJobById(postId);
        setEditingPostId(postId);
        setIsEditing(true);
        form.setFieldsValue({
          title: job.postProfile,
          postTechStack: job.postTechStack,
          reqExperience: job.reqExperience,
          description: job.postDesc,
        });
      } catch {
        message.error('Erro ao carregar a vaga para edição.');
      } finally {
        setLoading(false);
      }
    };

    void loadJobForEdit();
  }, [form, searchParams]);

  const handleSubmit = async (values: JobFormValues) => {
    setLoading(true);
    try {
      if (isEditing && editingPostId !== null) {
        const payload: JobPost = {
          postId: editingPostId,
          postProfile: values.title,
          postTechStack: values.postTechStack,
          reqExperience: values.reqExperience,
          postDesc: values.description,
        };

        await editJob(editingPostId, payload);
        message.success('Vaga atualizada com sucesso!');
      } else {
        await postJob(values);
        message.success('Vaga publicada com sucesso!');
      }

      router.push('/');
    } catch {
      message.error(isEditing ? 'Erro ao atualizar a vaga. Tente novamente.' : 'Erro ao publicar a vaga. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

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
              <Button type="primary" size="large" htmlType="submit" loading={loading}>
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
