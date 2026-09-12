import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getArticlesByBrand } from '@/lib/content';
import { Sparkles, ArrowLeft, Disc, Compass, Volume2, BookOpen, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: '《装仙人》独立先锋文化子刊 - 仙都传媒',
  description:
    '仙都传媒旗下独立子品牌《装仙人》（ZHUANG XIAN REN）。专注于城市声音采样、夜行探索、先锋艺术与人物心理张力。',
};

export default async function ZhuangxianrenPage() {
  const zxrArticles = getArticlesByBrand('zhuangxianren');
  const coverArticle = zxrArticles[0];

  return (
    <div className="w-full bg-zinc-950 text-zinc-100 min-h-screen pb-20">
      {/* 1. Sub-brand Top Bar */}
      <div className="border-b border-zinc-800 bg-black/60 px-4 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <Link
              href="/"
              className="text-zinc-400 hover:text-white flex items-center gap-1 font-medium transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>返回《今日长垣》主门户</span>
            </Link>
            <span className="text-zinc-700">|</span>
            <span className="text-zinc-500">仙都传媒集团 独立子刊</span>
          </div>
          <div className="text-zinc-400 font-mono text-[11px]">
            ISSN: ZXR-47-AUTUMN · ISSUE #09
          </div>
        </div>
      </div>

      {/* 2. Sub-brand Masthead */}
      <header className="max-w-7xl mx-auto px-4 py-12 md:py-16 border-b border-zinc-800/80">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rose-500/30 bg-rose-950/40 text-rose-300 text-xs font-mono tracking-wider uppercase">
            <Sparkles className="w-3 h-3 text-rose-400" />
            <span>仙都传媒先锋数字期刊 · 智元47年秋季号</span>
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter text-white font-serif">
            装仙人
          </h1>

          <p className="text-xs sm:text-sm font-mono tracking-widest text-zinc-400 uppercase">
            ZHUANG XIAN REN · RADICAL URBAN CULTURE & SOUND ARCHIVE
          </p>

          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-zinc-400 leading-relaxed pt-2">
            “当所有人都在计算流水线的产值与机房的吞吐量时，装仙人负责记录深夜两点钢架管道里的微弱回声。”
          </p>
        </div>
      </header>

      {/* 3. Cover Feature Story */}
      {coverArticle && (
        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 md:p-10 relative overflow-hidden">
            <div className="absolute -left-16 -top-16 w-64 h-64 bg-rose-600/15 rounded-full blur-3xl pointer-events-none" />

            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-rose-400 text-xs font-mono font-bold tracking-wider">
                <Disc className="w-4 h-4 animate-spin-slow" />
                <span>本期秋季号 封面特稿 / COVER INTERVIEW</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white font-serif leading-tight">
                <Link
                  href={`/zhuangxianren/article/${coverArticle.slug}`}
                  className="hover:text-rose-400 transition-colors"
                >
                  {coverArticle.title}
                </Link>
              </h2>

              {coverArticle.deck && (
                <p className="text-base text-zinc-300 leading-relaxed font-medium">
                  {coverArticle.deck}
                </p>
              )}

              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed line-clamp-3">
                {coverArticle.summary}
              </p>

              <div className="pt-4 flex flex-wrap items-center justify-between gap-4 text-xs border-t border-zinc-800">
                <div className="flex items-center space-x-2 text-zinc-400">
                  <span className="text-white font-medium">特约主笔: {coverArticle.authors?.[0]?.name}</span>
                  <span>·</span>
                  <span>{coverArticle.publishedAt}</span>
                </div>

                <Link
                  href={`/zhuangxianren/article/${coverArticle.slug}`}
                  className="px-5 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-lg transition-colors flex items-center gap-1.5 text-xs shadow-md"
                >
                  <span>阅读本期封面全篇</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Cover Visual */}
            <div className="lg:col-span-5">
              <div className="aspect-3/4 rounded-xl overflow-hidden bg-black border border-zinc-700/80 shadow-2xl relative group">
                {coverArticle.cover && (
                  <img
                    src={coverArticle.cover}
                    alt={coverArticle.title}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                  />
                )}
                <div className="absolute top-4 left-4">
                  <span className="bg-black/70 backdrop-blur-xs text-rose-300 text-[10px] font-mono px-2 py-0.5 rounded border border-rose-500/30">
                    装仙人 第09期 特刊
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. Zhuangxianren Columns Grid */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-8">
          <h3 className="text-xl font-bold font-serif text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-rose-500" />
            <span>《装仙人》专栏归档</span>
          </h3>
          <span className="text-xs font-mono text-zinc-500">仙都传媒独立知识版权</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-rose-950/60 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <Volume2 className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">长垣声音地图采样</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              汇集智元47年长垣老工业区、快速路枢纽、滨河湿地与高楼风道的高精度驻极体声音采集母带。
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-rose-950/60 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <Compass className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">午夜两点城市漫游</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              跟随青年学者与艺术家的脚步，在白昼的规整秩序之外，探索长垣不为人知的隐秘街角。
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-rose-950/60 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">青年创客新审美</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              从防寒蜂窝材料到赛博朋克戏台，记录这代年轻人如何用科技材料重构传统的审美意趣。
            </p>
          </div>
        </div>
      </section>

      {/* 5. Sub-brand Footer Note */}
      <section className="max-w-7xl mx-auto px-4 pt-12 text-center text-xs text-zinc-500">
        <p>
          《装仙人》由仙都传媒集团文化特刊委员会出品 · 独立内容与视觉架构保护 · 智元47年
        </p>
      </section>
    </div>
  );
}
