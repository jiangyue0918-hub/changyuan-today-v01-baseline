import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { getArticleBySlug, getArticlesByBrand } from '@/lib/content';
import {
  ArrowLeft,
  Disc,
  Clock,
  Sparkles,
  Share2,
  Bookmark,
  ChevronRight,
} from 'lucide-react';
import ZhuangxianrenAudioPlayer from '@/components/zhuangxianren/ZhuangxianrenAudioPlayer';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const zxrArticles = getArticlesByBrand('zhuangxianren');
  return zxrArticles.map((art) => ({ slug: art.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: '文章未找到 - 《装仙人》' };

  return {
    title: `${article.title} - 《装仙人》独立特刊`,
    description: article.deck || article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      siteName: '装仙人 ZHUANG XIAN REN',
    },
  };
}

export default async function ZhuangxianrenArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="w-full bg-zinc-950 text-zinc-100 min-h-screen pb-24">
      {/* 1. Sub-brand Top Bar */}
      <div className="border-b border-zinc-800 bg-black/70 px-4 py-3 sticky top-0 z-30 backdrop-blur-md">
        <div className="max-w-4xl mx-auto flex items-center justify-between text-xs">
          <div className="flex items-center space-x-3">
            <Link
              href="/zhuangxianren"
              className="text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>返回《装仙人》特刊目录</span>
            </Link>
            <span className="text-zinc-700">|</span>
            <span className="text-rose-400 font-mono text-[11px]">ISSUE #09 · 智元47年秋</span>
          </div>

          <div className="flex items-center space-x-3 text-zinc-400">
            <Link href="/" className="hover:text-zinc-200 transition-colors">
              今日长垣主站
            </Link>
          </div>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-4 pt-10">
        {/* 2. Article Header */}
        <header className="space-y-4 pb-8 border-b border-zinc-800">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-rose-950/60 border border-rose-500/30 text-rose-300 text-xs font-mono">
            <Disc className="w-3.5 h-3.5 text-rose-400 animate-spin-slow" />
            <span>《装仙人》秋季号 深度封面特稿</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-serif leading-tight">
            {article.title}
          </h1>

          {article.deck && (
            <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed font-serif italic text-zinc-200">
              “{article.deck}”
            </p>
          )}

          <div className="pt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-400 border-t border-zinc-900">
            <div className="flex items-center space-x-3">
              <span className="text-white font-medium">特约采编: {article.authors?.[0]?.name}</span>
              <span>·</span>
              <span>发布于: {article.publishedAt}</span>
              <span>·</span>
              <span className="text-rose-400 font-mono">核验状态: 双源交叉核验已归档</span>
            </div>
          </div>
        </header>

        {/* 3. Audio Player Integration (Sound Map Experiment) */}
        <ZhuangxianrenAudioPlayer
          title="西区老厂房驻极体声音采样切片"
          duration="08:24"
        />

        {/* 4. Article Hero Cover Image */}
        {article.cover && (
          <div className="my-8 rounded-xl overflow-hidden border border-zinc-800 shadow-2xl">
            <img
              src={article.cover}
              alt={article.title}
              className="w-full h-auto object-cover max-h-[500px]"
            />
            <div className="bg-zinc-900/90 p-3 text-xs text-zinc-400 flex items-center justify-between">
              <span>图说：林若希在西区工业热网低频管道节点布设声音传感器</span>
              <span className="font-mono text-zinc-500 text-[11px]">摄 / 仙都传媒视觉实验组</span>
            </div>
          </div>
        )}

        {/* 5. Article HTML Body */}
        <div
          className="prose prose-invert prose-zinc max-w-none text-zinc-300 leading-relaxed text-base space-y-5"
          dangerouslySetInnerHTML={{ __html: article.contentHtml || '' }}
        />

        {/* 6. Sub-brand Footer Note */}
        <footer className="mt-16 pt-8 border-t border-zinc-800 space-y-6">
          <div className="p-6 bg-zinc-900/60 rounded-xl border border-zinc-800 space-y-3">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm font-serif">
              <Sparkles className="w-4 h-4" />
              <span>《装仙人》编辑部手记</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              声音不是装饰，而是城市运行的最深层生理脉搏。当机器运转时，人类在其中所保留的感知与疑问，正是《装仙人》长期记录的全部意义。
            </p>
          </div>

          <div className="flex items-center justify-between text-xs text-zinc-500">
            <Link
              href="/zhuangxianren"
              className="text-rose-400 hover:underline flex items-center gap-1 font-bold"
            >
              <span>← 返回《装仙人》期刊首页</span>
            </Link>
            <span>仙都传媒版权所有 · 智元47年</span>
          </div>
        </footer>
      </article>
    </div>
  );
}
