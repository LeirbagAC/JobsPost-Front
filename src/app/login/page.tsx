'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Tabs, Form, Input, Button, Typography, message } from 'antd';
import { 
  UserOutlined, 
  LockOutlined,  
  AppstoreFilled 
} from '@ant-design/icons';
import styles from '@/assets/css/auth.module.css';
import api from '@/service/api';

const { Title, Text } = Typography;

export default function AuthPage() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('login');

  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();

  const router = useRouter();

const onFinishLogin = async (values: any) => {
  setLoading(true);
  try {
    const credentials = `${values.username}:${values.password}`;
    
    const base64Token = btoa(credentials);

    const response = await api.get('/login', {
      headers: {
        Authorization: `Basic ${base64Token}`
      }
    });

    localStorage.setItem('@jobpost:user', JSON.stringify({ 
      token: base64Token, 
      username: values.username 
    }));

    message.success('Login realizado com sucesso!');
    router.push('/'); 
    
  } catch (error) {
    console.error(error);
    message.error('Falha na autenticação. Verifique se o nome de usuário e senha estão corretos.');
  } finally {
    setLoading(false);
  }
};

  const onFinishRegister = async (values: any) => {
    setLoading(true);
    try {
      await api.post('/register', {
        username: values.username,
        password: values.password
      });

      message.success('Conta criada com sucesso! Agora você pode fazer login.');
      registerForm.resetFields();
    } catch (error: any) {
      const erro = error.response?.data?.message || 'Erro ao criar conta. Tente novamente.';
      message.error(erro);
    } finally {
      setLoading(false);
    }
  };

  // Itens das Abas (Tabs) do Ant Design
  const tabItems = [
    {
      key: 'login',
      label: 'Entrar',
      children: (
        <Form
          form={loginForm}
          layout="vertical"
          onFinish={onFinishLogin}
          requiredMark={false}
          size="large"
        >
          <Form.Item
            name="username"
            label="Nome de Usuário"
            rules={[{ required: true, message: 'Por favor, insira seu nome de usuário!' }]}
          >
            <Input prefix={<UserOutlined className={styles.inputIcon} />} placeholder="Seu nome de usuário" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Senha"
            rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
          >
            <Input.Password prefix={<LockOutlined className={styles.inputIcon} />} placeholder="Sua senha" />
          </Form.Item>

          <div className={styles.forgotPassword}>
            <a href="#">Esqueceu a senha?</a>
          </div>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Entrar na conta
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      key: 'register',
      label: 'Cadastrar',
      children: (
        <Form
          form={registerForm}
          layout="vertical"
          onFinish={onFinishRegister}
          requiredMark={false}
          size="large"
        >

          <Form.Item
            name="username"
            label="Nome de Usuário"
            rules={[{ required: true, message: 'Por favor, insira seu nome de usuário!' }]}
          >
            <Input prefix={<UserOutlined className={styles.inputIcon} />} placeholder="Seu nome de usuário" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Senha"
            rules={[
              { required: true, message: 'Por favor, crie uma senha!' },
              { min: 3, message: 'A senha deve ter no mínimo 3 caracteres!' }
            ]}
          >
            <Input.Password prefix={<LockOutlined className={styles.inputIcon} />} placeholder="Crie uma senha forte" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirmar Senha"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Por favor, confirme sua senha!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('As senhas não coincidem!'));
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined className={styles.inputIcon} />} placeholder="Repita sua senha" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Criar conta
            </Button>
          </Form.Item>
        </Form>
      ),
    },
  ];

  return (
    <div className={styles.authWrapper}>
      <div className={styles.brandHeader}>
        <AppstoreFilled style={{ fontSize: '32px', color: '#1677ff' }} />
        <Title level={3} style={{ margin: 0, fontWeight: 800 }}>HireStream</Title>
      </div>

      <Card 
        className={styles.authCard} 
        variant="borderless"
        styles={{ body: { padding: '32px 40px' } }}
      >
        <div className={styles.welcomeText}>
          <Title level={4} style={{ marginBottom: 4 }}>Bem-vindo de volta!</Title>
          <Text type="secondary">Acesse sua conta ou cadastre-se para encontrar vagas.</Text>
        </div>

        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab} 
          items={tabItems} 
          centered 
          size="large"
          className={styles.authTabs}
        />

      </Card>
    </div>
  );
}