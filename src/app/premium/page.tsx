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
  // Filter articles suitable for premium exploration
  const premiumArticles = allArticles.filter(
    (a) => a.access === 'member' || a.access === 'premium' || a.section === 'depth' || a.section === 'finance' || a.brand === 'zhuangxianren'
  );

  return <PremiumClient premiumArticles={premiumArticles} />;
}
