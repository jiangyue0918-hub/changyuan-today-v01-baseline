import React from 'react';
import { Metadata } from 'next';
import { getAllArticles } from '@/lib/content';
import PremiumClient from './PremiumClient';

export const metadata: Metadata = {
  title: '资深观察员专属深度空间 - 今日长垣',
  description: '仙都传媒深度调查部特供内参、智库研报与《装仙人》无损原声母带。',
};

export default function PremiumPage() {
  const allArticles = getAllArticles();

  // 严格以 access === 'member' 或 access === 'premium' 为依据
  // 公开 access === 'public' 的普通文章不能因为栏目身份自动成为会员专属内容
  const exclusiveArticles = allArticles.filter(
    (a) => a.access === 'member' || a.access === 'premium'
  );

  // 可以有少量公开内容作为预览/引流，但必须明确标记“公开预览”，不能混成会员权益
  const publicPreviews = allArticles
    .filter((a) => a.access === 'public' && (a.section === 'depth' || a.section === 'finance'))
    .slice(0, 2);

  return (
    <PremiumClient
      exclusiveArticles={exclusiveArticles}
      publicPreviews={publicPreviews}
    />
  );
}
