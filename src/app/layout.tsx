import { AntdRegistry } from '@ant-design/nextjs-registry';
import AppProviders from '@/providers/AppProviders';
import '@/assets/css/globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <AntdRegistry>
          <AppProviders>
            {children}
          </AppProviders>
        </AntdRegistry>
      </body>
    </html>
  );
}