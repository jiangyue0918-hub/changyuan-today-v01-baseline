import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getAllArticles } from '@/lib/content';
import { Archive, Calendar, ChevronRight, FileText } from 'lucide-react';
import VerificationBadge from '@/components/article/VerificationBadge';

export const metadata: Metadata = {
  title: '智元历史新闻卷宗库 - 今日长垣',
  description: '智元47年长垣历史出版文献与每日公开报道编目汇总。',
};

export default function ArchivePage() {
  const articles = getAllArticles();

  // Group by publication date (YYYY/MM)
  const grouped: Record<string, typeof articles> = {};
  for (const art of articles) {
    const monthKey = art.publishedAt.slice(0, 8); // e.g. "智元47年09月"
    if (!grouped[monthKey]) {
      grouped[monthKey] = [];
    }
    grouped[monthKey].push(art);
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6 mb-8">
        <div className="flex items-center space-x-2 text-xs text-slate-500 mb-2">
          <Link href="/" className="hover:text-blue-700">
            首页
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-medium">文献中心</span>
        </div>

        <div className="flex items-baseline space-x-3">
          <h1 className="text-3xl font-black text-slate-950 font-serif">
            历史新闻卷宗库
          </h1>
          <span className="text-sm font-bold text-slate-500 uppercase tracking-widest font-mono">
            ARCHIVE REGISTRY
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 mt-2">
          仙都传媒历史卷宗永久数字化索引。按智元纪年倒序归档，支持追溯、查验与引用核对。
        </p>
      </div>

      {/* Monthly Groups */}
      <div className="space-y-10">
        {Object.entries(grouped).map(([month, items]) => (
          <div key={month} className="bg-white border border-slate-200 rounded-lg p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span>{month} 归档卷宗</span>
              </h2>
              <span className="text-xs text-slate-500 font-mono">
                收录 {items.length} 篇报道
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {items.map((art) => (
                <div key={art.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="text-blue-700 font-medium">{art.section}</span>
                      <span>·</span>
                      <span>{art.publishedAt}</span>
                      <span>·</span>
                      <span>{art.authors?.[0]?.name}</span>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                      <Link href={`/article/${art.slug}`}>{art.title}</Link>
                    </h3>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <VerificationBadge status={art.status} />
                    <Link
                      href={`/article/${art.slug}`}
                      className="text-xs text-slate-400 group-hover:text-blue-600 flex items-center gap-1 font-medium"
                    >
                      <span>调阅</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
