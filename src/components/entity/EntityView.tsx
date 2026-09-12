import React from 'react';
import Link from 'next/link';
import { Entity } from '@/types/content';
import { User, Building, MapPin, Compass, ChevronRight, ShieldCheck, FileText } from 'lucide-react';
import VerificationBadge from '@/components/article/VerificationBadge';

interface Props {
  entity: Entity;
}

export default function EntityView({ entity }: Props) {
  const typeIcon =
    entity.type === 'person' ? (
      <User className="w-4 h-4" />
    ) : entity.type === 'organization' ? (
      <Building className="w-4 h-4" />
    ) : (
      <MapPin className="w-4 h-4" />
    );

  const typeLabel =
    entity.type === 'person'
      ? '人物档案'
      : entity.type === 'organization'
      ? '机构组织'
      : '地理地标';

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* 1. Breadcrumbs */}
      <nav className="text-xs text-slate-500 mb-6 flex items-center space-x-2">
        <Link href="/" className="hover:text-blue-700">
          首页
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-medium">长垣实体卷宗</span>
        <span>/</span>
        <span className="text-slate-400">{entity.displayName}</span>
      </nav>

      {/* 2. Entity Hero Card */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 md:p-8 mb-8 shadow-xs">
        <div className="flex flex-col md:flex-row items-start gap-6">
          {/* Avatar or Cover */}
          {(entity.avatar || entity.cover) && (
            <div className="w-24 h-24 sm:w-32 sm:h-32 shrink-0 rounded-lg overflow-hidden bg-slate-900 border border-slate-200">
              <img
                src={entity.avatar || entity.cover}
                alt={entity.displayName}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="flex-1 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-800">
                {typeIcon}
                <span>{typeLabel}</span>
              </span>

              <span className="text-xs text-slate-500 font-mono">
                编号：{entity.id}
              </span>

              <span className="text-[11px] px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-mono">
                {entity.classification || 'WEB_DERIVED'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-950 font-serif tracking-tight">
              {entity.displayName}
            </h1>

            <p className="text-sm text-slate-700 leading-relaxed max-w-3xl">
              {entity.brief}
            </p>

            {/* Quick Facts Table */}
            {entity.facts && entity.facts.length > 0 && (
              <div className="pt-3 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                {entity.facts.map((fact, idx) => (
                  <div key={idx} className="bg-slate-50 p-2 rounded border border-slate-100">
                    <span className="text-slate-400 block text-[11px] mb-0.5">
                      {fact.label}
                    </span>
                    <span className="font-semibold text-slate-800">
                      {fact.value}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Aggregated Topics */}
      {entity.topics && entity.topics.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Compass className="w-5 h-5 text-blue-600" />
            <span>涉及持续专题 ({entity.topics.length})</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {entity.topics.map((top) => (
              <Link
                key={top.id}
                href={`/topic/${top.slug}`}
                className="bg-white border border-slate-200 p-4 rounded-lg hover:border-blue-400 transition-colors block group"
              >
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span>持续追踪</span>
                  <span>{top.updatedAt}</span>
                </div>
                <h3 className="font-bold text-sm text-slate-900 group-hover:text-blue-700">
                  {top.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2 mt-1">
                  {top.summary}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 4. Aggregated Articles (Mentions in news) */}
      <div className="border-t border-slate-200 pt-8">
        <h2 className="text-xl font-black text-slate-950 font-serif mb-6 flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          <span>关联新闻报道 ({entity.articles?.length || 0})</span>
        </h2>

        {entity.articles && entity.articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {entity.articles.map((art) => (
              <article
                key={art.id}
                className="bg-white border border-slate-200 rounded-lg p-4 flex flex-col justify-between hover:border-blue-400 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="font-semibold text-blue-700">{art.section}</span>
                    <span>{art.publishedAt}</span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 hover:text-blue-700 leading-snug">
                    <Link href={`/article/${art.slug}`}>{art.title}</Link>
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 mt-2">
                    {art.summary}
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <VerificationBadge status={art.status} />
                  <Link
                    href={`/article/${art.slug}`}
                    className="text-blue-700 font-semibold hover:underline inline-flex items-center gap-1"
                  >
                    <span>阅读全文</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 border border-dashed border-slate-200 rounded text-slate-400 text-xs">
            暂无关联公开报道
          </div>
        )}
      </div>
    </div>
  );
}
