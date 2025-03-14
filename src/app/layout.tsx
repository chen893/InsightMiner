'use client';
import { Inter } from 'next/font/google';
import './globals.css';
import { Layout } from '@/components/layout/Layout';
import { trpc } from '@/utils/trpc';

const inter = Inter({ subsets: ['latin'] });
export const metadata = {
  title: 'InsightMiner - AI驱动的需求挖掘工具',
  description: '通过人工智能技术，从文本中智能提炼市场机遇与产品需求洞察',
};

const RootLayout = trpc.withTRPC(function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        {/* 注意：自定义字体应该在_document.js中加载或使用next/font */}
      </head>
      <body className={inter.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
});

export default RootLayout;
