import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { getAllAuthors, getAuthorBySlug } from '@/lib/content';
import { ShieldCheck, FileText, ChevronRight, Mail } from 'lucide-react';
import VerificationBadge from '@/components/article/VerificationBadge';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const authors = getAllAuthors();
  return authors.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);
  if (!author) return { title: '采编作者未找到 - 今日长垣' };

  return {
    title: `${author.name} (${author.title}) - 采编团队 - 今日长垣`,
    description: author.bio,
  };
}

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);

  if (!author) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* 1. Breadcrumbs */}
      <nav className="text-xs text-slate-500 mb-6 flex items-center space-x-2">
        <Link href="/" className="hover:text-blue-700">
          首页
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-medium">仙都传媒采编团队</span>
        <span>/</span>
        <span className="text-slate-400">{author.name}</span>
      </nav>

      {/* 2. Author Bio Card */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 md:p-8 mb-8 shadow-xs">
        <div className="flex flex-col md:flex-row items-start gap-6">
          {author.avatar && (
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-slate-900 border-2 border-blue-600 shrink-0">
              <img
                src={author.avatar}
                alt={author.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="flex-1 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-950 font-serif">
                {author.name}
              </h1>

              {author.verified && (
                <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>仙都传媒实名认证采编</span>
                </span>
              )}

              <span className="text-xs text-slate-500 font-mono">
                编号：{author.id}
              </span>
            </div>

            <p className="text-sm font-semibold text-blue-800">
              {author.title} · 主理栏目: {author.section || '全线报道'}
            </p>

            <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
              {author.bio}
            </p>

            {author.emailPlaceholder && (
              <div className="pt-2 flex items-center gap-2 text-xs text-slate-500">
                <Mail className="w-4 h-4 text-slate-400" />
                <span>受保护采编信箱：{author.emailPlaceholder}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Published Articles Stream */}
      <div>
        <h2 className="text-xl font-black text-slate-950 font-serif mb-6 flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          <span>发表报道列表 ({author.articles?.length || 0})</span>
        </h2>

        {author.articles && author.articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {author.articles.map((art) => (
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
            暂无已签发报道
          </div>
        )}
      </div>
    </div>
  );
}
