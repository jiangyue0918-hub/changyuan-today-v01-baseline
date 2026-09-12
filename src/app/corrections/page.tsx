import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getAllArticles } from '@/lib/content';
import { ShieldCheck, History, AlertCircle, CheckCircle2, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: '公开更正与版本修订记录 - 今日长垣',
  description: '今日长垣编委会公开勘误日志与事实性修改回溯。',
};

export default function CorrectionsPage() {
  const articles = getAllArticles();

  // Collect all updates from all articles
  const allUpdates: Array<{
    articleId: string;
    articleTitle: string;
    articleSlug: string;
    publishedAt: string;
    at: string;
    type: string;
    summary: string;
    reason: string;
  }> = [];

  for (const art of articles) {
    if (art.updates && art.updates.length > 0) {
      for (const u of art.updates) {
        allUpdates.push({
          articleId: art.id,
          articleTitle: art.title,
          articleSlug: art.slug,
          publishedAt: art.publishedAt,
          at: u.at,
          type: u.type,
          summary: u.summary,
          reason: u.reason,
        });
      }
    }
  }

  // Sort descending by update timestamp
  allUpdates.sort((a, b) => b.at.localeCompare(a.at));

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6 mb-8">
        <div className="flex items-center space-x-2 text-xs text-slate-500 mb-2">
          <Link href="/" className="hover:text-blue-700">
            首页
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-medium">采编透明度</span>
        </div>

        <div className="flex items-baseline space-x-3">
          <h1 className="text-3xl font-black text-slate-950 font-serif">
            公开更正与版本修订记录
          </h1>
          <span className="text-sm font-bold text-slate-500 uppercase tracking-widest font-mono">
            CORRECTIONS LOG
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
          《今日长垣采编准则》承诺：对任何涉及人名、职务、技术指标、数据统计与事实认定的修改，绝不实施静默更动。所有修正均在此公开存档并保留比对记录。
        </p>
      </div>

      {/* Corrections List */}
      <div className="space-y-6">
        {allUpdates.map((u, idx) => (
          <div
            key={idx}
            className="bg-white border border-slate-200 rounded-lg p-5 shadow-2xs space-y-3"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100 text-xs">
              <span className="font-semibold px-2 py-0.5 rounded text-[11px] bg-orange-100 text-orange-800">
                {u.type === 'correction'
                  ? '事实更正 (CORRECTION)'
                  : u.type === 'clarification'
                  ? '澄清说明 (CLARIFICATION)'
                  : '现场动态补充 (UPDATE)'}
              </span>
              <span className="text-slate-400 font-mono">更正生效时间：{u.at}</span>
            </div>

            <div>
              <span className="text-xs text-slate-400 block mb-1">更正关联报道：</span>
              <h3 className="text-base font-bold text-slate-900 hover:text-blue-700 transition-colors">
                <Link href={`/article/${u.articleSlug}`}>{u.articleTitle}</Link>
              </h3>
            </div>

            <div className="bg-slate-50 p-3 rounded border border-slate-200/80 space-y-1.5 text-xs text-slate-700">
              <div>
                <strong className="text-slate-900">更正内容：</strong>
                <span>{u.summary}</span>
              </div>
              <div>
                <strong className="text-slate-900">更正缘由：</strong>
                <span className="text-slate-600">{u.reason}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
              <span>初次签发：{u.publishedAt}</span>
              <Link
                href={`/article/${u.articleSlug}`}
                className="text-blue-700 font-semibold hover:underline inline-flex items-center gap-1"
              >
                <span>阅读当前修订版全文</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
