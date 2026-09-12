import React from 'react';
import { Metadata } from 'next';
import { getSearchIndex } from '@/lib/content';
import SearchClient from './SearchClient';

export const metadata: Metadata = {
  title: '全站检索与卷宗查询 - 今日长垣',
  description: '检索今日长垣全部已核验报道、持续专题、核心人物、机构及地理地标卷宗。',
};

export default function SearchPage() {
  const searchIndex = getSearchIndex();

  return <SearchClient initialIndex={searchIndex} />;
}
