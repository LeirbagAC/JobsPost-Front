"use client";

import { ReactNode, useState } from 'react';
import { ConfigProvider } from 'antd';
import locale from 'antd/locale/en_US'; 
import { COLOR_PRIMARY } from '@/constants/colors.constants';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function AppProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, 
        refetchOnWindowFocus: false, 
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        locale={locale}
        theme={{
          components: {
            Button: {
              borderRadius: 8,
              colorBgBase: COLOR_PRIMARY
            }
          },
          token: {
            colorPrimary: COLOR_PRIMARY,
            fontFamily: `'Sora', 'Poppins', 'Roboto Condensed', 'Segoe UI', 'Open Sans',
                'Helvetica Neue', 'PingFang SC', 'Songti SC', 'Heiti SC', 'Noto Sans CJK SC',
                'Source Han Sans SC', 'Microsoft YaHei', sans-serif`
          }
        }}
      >
        {children}
      </ConfigProvider>
    </QueryClientProvider>
  );
}