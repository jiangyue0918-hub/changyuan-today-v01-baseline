'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Article } from '@/types/content';
import VerificationBadge from '@/components/article/VerificationBadge';
import CorrectionsDrawer from '@/components/article/CorrectionsDrawer';
import { Share2, Bookmark, Printer, ShieldAlert, Compass, User, Building, MapPin } from 'lucide-react';

interface Props {
  article: Article;
}

export default function ArticleClient({ article }: Props) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const hasUpdates = Boolean(article.updates && article.updates.length > 0);

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      {/* 1. Breadcrumbs */}
      <nav className="text-xs text-slate-500 mb-6 flex items-center space-x-2">
        <Link href="/" className="hover:text-blue-700">
          今日长垣首页
        </Link>
        <span>/</span>
        <Link href={`/section/${article.section}`} className="hover:text-blue-700 font-medium capitalize">
          {article.section === 'changyuan'
            ? '长垣要闻'
            : article.section === 'finance'
            ? '财经智产'
            : article.section === 'society'
            ? '社会民生'
            : article.section === 'depth'
            ? '深度调查'
            : article.section === 'culture'
            ? '科技文化'
            : article.section === 'sports'
            ? '体育健康'
            : article.section === 'lifestyle'
            ? '市井生活'
            : '融媒专栏'}
        </Link>
        <span>/</span>
        <span className="text-slate-400 truncate max-w-xs">{article.title}</span>
      </nav>

      {/* 2. Verification & History Row */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <VerificationBadge
          status={article.status}
          hasUpdates={hasUpdates}
          onOpenHistory={() => setIsDrawerOpen(true)}
        />

        <div className="flex items-center space-x-2 text-slate-500 text-xs">
          <button
            onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(window.location.href);
                alert('报道链接已复制到剪贴板');
              }
            }}
            className="p-1.5 hover:bg-slate-200 rounded flex items-center gap-1"
            title="分享报道"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">分享</span>
          </button>
          <button
            onClick={() => window.print()}
            className="p-1.5 hover:bg-slate-200 rounded flex items-center gap-1"
            title="打印或导出"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">打印</span>
          </button>
        </div>
      </div>

      {/* 3. Title & Deck */}
      <header className="space-y-3 mb-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-950 font-serif tracking-tight leading-tight">
          {article.title}
        </h1>

        {article.deck && (
          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
            {article.deck}
          </p>
        )}

        {/* Byline and Timestamp */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 border-t border-slate-100">
          <div className="flex items-center space-x-3">
            {article.authors?.map((author) => (
              <Link
                key={author.id}
                href={`/authors/${author.slug}`}
                className="flex items-center space-x-1.5 group"
              >
                {author.avatar && (
                  <img
                    src={author.avatar}
                    alt={author.name}
                    className="w-6 h-6 rounded-full border border-slate-300"
                  />
                )}
                <span className="font-bold text-slate-900 group-hover:text-blue-700">
                  {author.name}
                </span>
                <span className="text-slate-400">({author.title})</span>
              </Link>
            ))}
          </div>

          <div className="space-x-3">
            <span>签发时间：{article.publishedAt}</span>
            {article.updatedAt !== article.publishedAt && (
              <span className="text-blue-600 font-medium">
                更新于：{article.updatedAt}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* 4. Cover image with journalistic attribution */}
      {article.cover && (
        <figure className="mb-8 rounded overflow-hidden bg-slate-900 border border-slate-200">
          <img
            src={article.cover}
            alt={article.title}
            className="w-full h-auto object-cover max-h-[500px]"
          />
          {article.coverCaption && (
            <figcaption className="p-2.5 bg-slate-100 text-xs text-slate-600 border-t border-slate-200 leading-normal">
              {article.coverCaption}
            </figcaption>
          )}
        </figure>
      )}

      {/* 5. Article Prose Body */}
      <div
        className="article-prose text-slate-800 leading-relaxed border-b border-slate-200 pb-10"
        dangerouslySetInnerHTML={{ __html: article.contentHtml }}
      />

      {/* 6. Entity & Topic Context Bar */}
      <footer className="mt-8 space-y-6">
        {/* Associated Topics */}
        {article.topics && article.topics.length > 0 && (
          <div className="bg-blue-50/50 border border-blue-100 rounded p-4">
            <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-blue-600" />
              <span>关联持续专题</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {article.topics.map((t) => (
                <Link
                  key={t.id}
                  href={`/topic/${t.slug}`}
                  className="px-3 py-1.5 bg-white border border-blue-200 hover:border-blue-400 rounded text-xs text-blue-800 font-medium shadow-2xs transition-colors"
                >
                  {t.title} →
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Associated People, Orgs, Locations */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {article.people && article.people.length > 0 && (
            <div className="bg-white border border-slate-200 rounded p-3 text-xs">
              <span className="font-bold text-slate-700 flex items-center gap-1 mb-2">
                <User className="w-3.5 h-3.5 text-slate-500" />
                <span>提及人物</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {article.people.map((p) => (
                  <Link
                    key={p.id}
                    href={`/people/${p.slug}`}
                    className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded"
                  >
                    {p.displayName}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {article.organizations && article.organizations.length > 0 && (
            <div className="bg-white border border-slate-200 rounded p-3 text-xs">
              <span className="font-bold text-slate-700 flex items-center gap-1 mb-2">
                <Building className="w-3.5 h-3.5 text-slate-500" />
                <span>提及机构</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {article.organizations.map((o) => (
                  <Link
                    key={o.id}
                    href={`/organizations/${o.slug}`}
                    className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded"
                  >
                    {o.displayName}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {article.locations && article.locations.length > 0 && (
            <div className="bg-white border border-slate-200 rounded p-3 text-xs">
              <span className="font-bold text-slate-700 flex items-center gap-1 mb-2">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>事发地标</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {article.locations.map((l) => (
                  <Link
                    key={l.id}
                    href={`/locations/${l.slug}`}
                    className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded"
                  >
                    {l.displayName}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Source References & Ethics */}
        <div className="p-4 bg-slate-100 rounded text-xs text-slate-500 space-y-2 border border-slate-200">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-700">仙都传媒 · 今日长垣 采编透明公约</span>
            <Link href="/corrections" className="text-blue-600 hover:underline">
              勘误与申诉通道 →
            </Link>
          </div>
          <p className="text-[11px] leading-relaxed">
            如发现本报道有任何事实、人名、职务或数据错误，欢迎读者向采编委员会提交线索。我们将依据《今日长垣采编准则》在核验后进行公开修正并在历史版本日志中载明。
          </p>
        </div>
      </footer>

      {/* Version History Drawer */}
      <CorrectionsDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        articleTitle={article.title}
        publishedAt={article.publishedAt}
        updatedAt={article.updatedAt}
        updates={article.updates}
      />
    </article>
  );
}
