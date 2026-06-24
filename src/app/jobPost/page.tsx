'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Card, Form, Input, Button, Select, Typography, Divider, message, 
  InputNumber
} from 'antd';
import { 
  ArrowLeftOutlined, 
} from '@ant-design/icons';
import styles from '@/assets/css/JobPost.module.css';
import { postJob, JobFormValues } from '@/service/JobsPost.service';

const { Title, Text } = Typography;
const { TextArea } = Input;

export default function PostJobPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm<JobFormValues>();

  const handlePost = async (values: JobFormValues) => {
    setLoading(true);
    try {
      await postJob(values);
      message.success('Vaga publicada com sucesso!');
      router.push('/');
    } catch (error) {
      message.error('Erro ao publicar a vaga. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        
        {/* Botão de voltar */}
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
            <Title level={3} style={{ margin: 0 }}>Publicar Nova Vaga</Title>
            <Text type="secondary">Preencha os dados abaixo para anunciar uma oportunidade.</Text>
          </div>

          <Divider />

          <Form
            form={form}
            layout="vertical"
            onFinish={handlePost}
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

            {/* Para futura implementação */}
            {/* <Row gutter={24}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="company"
                  label={<Text strong>Nome da Empresa</Text>}
                  rules={[{ required: true, message: 'A empresa é obrigatória!' }]}
                >
                  <Input prefix={<BankOutlined className={styles.iconMuted} />} placeholder="Ex: TechCorp Solutions" />
                </Form.Item>
              </Col>
              
              <Col xs={24} md={12}>
                <Form.Item
                  name="location"
                  label={<Text strong>Localização</Text>}
                  rules={[{ required: true, message: 'A localização é obrigatória!' }]}
                >
                  <Input prefix={<EnvironmentOutlined className={styles.iconMuted} />} placeholder="Ex: São Paulo, SP ou 100% Remoto" />
                </Form.Item>
              </Col>
            </Row> */}

            {/* <Row gutter={24}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="modality"
                  label={<Text strong>Modalidade</Text>}
                  rules={[{ required: true, message: 'Selecione a modalidade!' }]}
                >
                  <Select placeholder="Selecione o tipo">
                    <Select.Option value="remoto">Remoto</Select.Option>
                    <Select.Option value="hibrido">Híbrido</Select.Option>
                    <Select.Option value="presencial">Presencial</Select.Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  name="salaryRange"
                  label={<Text strong>Faixa Salarial</Text>}
                >
                  <Input prefix={<DollarOutlined className={styles.iconMuted} />} placeholder="Ex: R$ 12.000 - R$ 16.000" />
                </Form.Item>
              </Col>
            </Row> */}

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
                Publicar Vaga
              </Button>
            </div>
          </Form>

        </Card>
      </div>
    </div>
  );
}