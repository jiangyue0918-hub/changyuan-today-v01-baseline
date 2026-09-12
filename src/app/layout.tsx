import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: {
    template: '%s | 今日长垣 - 仙都传媒',
    default: '今日长垣 / TODAY CHANGYUAN - 仙都传媒旗下主综合新闻门户',
  },
  description:
    '仙都传媒旗下主综合新闻门户，以及《装仙人》独立子品牌数字内容平台。记录智元47年长垣的城市、财经、民生、深度调查与时代脉搏。',
  openGraph: {
    title: '今日长垣 / TODAY CHANGYUAN - 仙都传媒',
    description: '仙都传媒旗下主综合新闻门户，承担完整原文、城市新闻、深度调查与公共档案服务。',
    type: 'website',
    locale: 'zh_CN',
    siteName: '今日长垣',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white">
        <Header />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
