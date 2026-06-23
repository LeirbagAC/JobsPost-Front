import { AntdRegistry } from '@ant-design/nextjs-registry';
import AntdProvider from '@/providers/antd'; 
import '@/assets/css/globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <AntdRegistry>
          <AntdProvider>
            {children}
          </AntdProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}