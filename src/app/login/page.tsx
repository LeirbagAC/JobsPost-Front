'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Tabs, Form, Typography, message } from 'antd';
import { 
  AppstoreFilled 
} from '@ant-design/icons';
import styles from '@/assets/css/auth.module.css';
import api from '@/service/api';

import { getAuthTabItems } from './authTabs';

import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';

const { Title, Text } = Typography;

export default function AuthPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [activeTab, setActiveTab] = useState('login');

  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();

  // Serve para impedir que o usuário logado acesse a página de login ou registro novamente, redirecionando-o para a página inicial.
  const { data: userData } = useQuery({
    queryKey: ['user'],
    queryFn: () => {
      const raw = localStorage.getItem('@jobpost:user');
      if (raw) {
        const user = JSON.parse(raw);
        router.push('/'); 
        return user;
      }
      return null; 
    },
    staleTime: Infinity, 
  });

  const loginMutation  = useMutation({
    mutationFn: async (values:any) => {
      const credentials = `${values.username}:${values.password}`;
      const base64Token = btoa(credentials);

      await api.get('/login', {
        headers: {
          authorization: `Basic ${base64Token}`
        }
      });

      return { token: base64Token, username: values.username };
    },
    onSuccess: (data) => {
      localStorage.setItem('@jobpost:user', JSON.stringify(data));
      queryClient.setQueryData(['user'], data);

      message.success('Login realizado com sucesso!');
      router.push('/'); 
    },
    onError: (error) => {
      console.error(error);
      message.error('Falha na autenticação. Verifique se o nome de usuário e senha estão corretos.');
    }
  });

  const registerMutation = useMutation({
    mutationFn: async (values: any) => {
        const response = await api.post('/register', {
        username: values.username,
        password: values.password
      });
      return response.data;
    },
    onSuccess: () => {
      message.success('Conta criada com sucesso! Agora você pode fazer login.');
      registerForm.resetFields();
      setActiveTab('login');
    }
  });

  const isGlobalLoadind = loginMutation.isPending || registerMutation.isPending;

  const tabItems = getAuthTabItems({
    loginForm,
    registerForm,
    onFinishLogin: loginMutation.mutate,
    onFinishRegister: registerMutation.mutate,
    loading: isGlobalLoadind,
    styles,
  });

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