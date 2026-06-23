"use client"; 

import { ReactNode } from 'react';
import { ConfigProvider } from 'antd';
import locale from 'antd/locale/en_US'; 
import { COLOR_PRIMARY } from '@/constants/colors.constants';

export default function AntdProvider({ children }: { children: ReactNode }) {
  return (
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
  );
}