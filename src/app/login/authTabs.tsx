import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import type { TabsProps, FormInstance } from 'antd';

interface AuthTabsProps {
  loginForm: FormInstance;
  registerForm: FormInstance;
  onFinishLogin: (values: any) => Promise<void>;
  onFinishRegister: (values: any) => Promise<void>;
  loading: boolean;
  styles: any; 
}

export const getAuthTabItems = ({
  loginForm,
  registerForm,
  onFinishLogin,
  onFinishRegister,
  loading,
  styles,
}: AuthTabsProps): TabsProps['items'] => [
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