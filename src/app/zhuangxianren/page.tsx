import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getZhuangxianrenHome } from '@/lib/content';
import {
  Sparkles,
  ArrowLeft,
  Disc,
  Volume2,
  BookOpen,
  ChevronRight,
  Radio,
  Calendar,
  Lock,
  Compass,
  Layers,
  Cpu,
  User,
} from 'lucide-react';

export const metadata: Metadata = {
  title: '《装仙人》独立先锋文化子刊 - 仙都传媒',
  description:
    '仙都传媒旗下独立子品牌《装仙人》（ZHUANG XIAN REN）。专注于城市声音采样、夜行探索、先锋艺术与人物心理张力。',
};

export default async function ZhuangxianrenPage() {
  const {
    coverArticle,
    issueArticles,
    featuredArticles,
    exclusiveArticles,
    peopleArticles,
    cityLifeArticles,
    techArtArticles,
    latestArticles,
    allZxrArticles,
    issues,
  } = getZhuangxianrenHome();

  return (
    <div className="w-full bg-zinc-950 text-zinc-100 min-h-screen pb-20">
      {/* 1. Sub-brand Top Bar */}
      <div className="border-b border-zinc-800 bg-black/60 px-4 py-2.5 sticky top-0 z-30 backdrop-blur-md">
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
          <div className="flex items-center gap-3 text-zinc-400 font-mono text-[11px]">
            <span className="text-rose-400 hidden sm:inline">● AUTUMN EDITORIAL STREAM</span>
            <span>ISSN: ZXR-47-AUTUMN · ISSUE #09</span>
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

      {/* 3. Cover Feature Story (First visual anchor - specified/first article) */}
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
                  <span className="text-white font-medium">
                    特约主笔: {coverArticle.authors?.[0]?.name || '苏晚'}
                  </span>
                  <span>·</span>
                  <span>{coverArticle.publishedAt}</span>
                </div>

                <Link
                  href={`/zhuangxianren/article/${coverArticle.slug}`}
                  className="px-5 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-lg transition-colors flex items-center gap-1.5 text-xs shadow-md cursor-pointer"
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

      {/* 4. Issue & Volume Navigation (Pre-reserved structure for current issue & archives) */}
      <section className="max-w-7xl mx-auto px-4 py-4">
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-rose-950/60 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-2">
                <span>期刊卷期导航</span>
                <span className="text-[10px] bg-rose-900/60 text-rose-300 px-1.5 py-0.2 rounded font-mono">
                  VOLUME & ISSUES
                </span>
              </div>
              <div className="text-[11px] text-zinc-400">
                本期已收录 {issueArticles.length} 篇原创特稿 · 往期卷宗按季度归档
              </div>
            </div>
          </div>

          {/* Issue Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {issues.map((iss) => (
              <span
                key={iss.id}
                className={`px-3 py-1 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors ${
                  iss.active
                    ? 'bg-rose-600 text-white font-bold shadow-xs'
                    : 'bg-zinc-800 text-zinc-400 border border-zinc-700/60 hover:text-white'
                }`}
              >
                <span>{iss.name}</span>
                {iss.active ? (
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                ) : (
                  <span className="text-[10px] text-zinc-500">(往期备索)</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 5. 本期目录 / 本期精选 (Table of Contents & Highlights) */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-6">
          <h3 className="text-xl font-bold font-serif text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-rose-500" />
            <span>本期目录 / 精选特辑</span>
          </h3>
          <span className="text-xs font-mono text-zinc-500">AUTUMN ISSUE #09 TOC</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredArticles.map((art) => (
            <article
              key={art.id}
              className="bg-zinc-900/70 border border-zinc-800 rounded-xl overflow-hidden flex flex-col justify-between hover:border-rose-500/50 transition-all group"
            >
              <div>
                {art.cover && (
                  <div className="aspect-16/10 bg-black overflow-hidden relative">
                    <img
                      src={art.cover}
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute top-2 left-2">
                      <span className="bg-black/75 backdrop-blur-xs text-[10px] font-mono px-2 py-0.5 rounded text-rose-300 border border-rose-500/30">
                        {art.column === 'soundscape'
                          ? '声学档案'
                          : art.column === 'citylife'
                          ? '城市生活'
                          : art.column === 'tech-art'
                          ? '科技消费'
                          : '编辑精选'}
                      </span>
                    </div>
                  </div>
                )}

                <div className="p-5 space-y-2.5">
                  <div className="flex items-center justify-between text-[11px] text-zinc-400 font-mono">
                    <span>{art.publishedAt}</span>
                    {art.access !== 'public' && (
                      <span className="text-amber-400 flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        <span>特刊会员</span>
                      </span>
                    )}
                  </div>

                  <h4 className="text-base font-bold text-white font-serif leading-snug group-hover:text-rose-300 transition-colors">
                    <Link href={`/zhuangxianren/article/${art.slug}`}>
                      {art.title}
                    </Link>
                  </h4>

                  <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                    {art.deck || art.summary}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2 border-t border-zinc-800/60 flex items-center justify-between text-xs">
                <span className="text-zinc-500 text-[11px]">主笔: {art.authors?.[0]?.name || '苏晚'}</span>
                <Link
                  href={`/zhuangxianren/article/${art.slug}`}
                  className="text-rose-400 hover:text-rose-300 font-medium flex items-center gap-1 text-[11px]"
                >
                  <span>阅读特稿</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 6. 独立专栏分类内容流：独家、人物、城市生活、科技消费 */}
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-12">
        {/* Row A: 独家特刊 & 人物专栏 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* 独家专栏 (Exclusive) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
              <h4 className="text-lg font-bold font-serif text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-rose-500" />
                <span>独家 / 卷首与深度献词</span>
              </h4>
              <span className="text-xs font-mono text-zinc-500">EXCLUSIVE & MANIFESTO</span>
            </div>

            <div className="space-y-4">
              {exclusiveArticles.map((art) => (
                <div
                  key={art.id}
                  className="bg-zinc-900 border border-zinc-800 hover:border-rose-500/40 rounded-xl p-5 transition-all group"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-500/30 text-[10px] font-mono">
                      秋季号卷首
                    </span>
                    {art.access !== 'public' && (
                      <span className="px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-500/30 text-[10px] font-mono flex items-center gap-1">
                        <Lock className="w-2.5 h-2.5" />
                        <span>观察员专享</span>
                      </span>
                    )}
                  </div>
                  <h5 className="text-base font-bold text-white group-hover:text-rose-300 transition-colors">
                    <Link href={`/zhuangxianren/article/${art.slug}`}>{art.title}</Link>
                  </h5>
                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed line-clamp-2">
                    {art.deck || art.summary}
                  </p>
                  <div className="mt-3 pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-500">
                    <span>{art.publishedAt}</span>
                    <Link
                      href={`/zhuangxianren/article/${art.slug}`}
                      className="text-rose-400 hover:text-rose-300 font-medium"
                    >
                      阅读卷首 →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 人物专栏 (People) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
              <h4 className="text-lg font-bold font-serif text-white flex items-center gap-2">
                <User className="w-4 h-4 text-rose-500" />
                <span>人物 / 城市造梦者与造物家</span>
              </h4>
              <span className="text-xs font-mono text-zinc-500">PROFILES & INTERVIEWS</span>
            </div>

            <div className="space-y-4">
              {/* If peopleArticles list, show; otherwise display cover feature or linked interview */}
              {(peopleArticles.length > 0 ? peopleArticles : [coverArticle]).filter(Boolean).map((art) => (
                <div
                  key={art!.id}
                  className="bg-zinc-900 border border-zinc-800 hover:border-rose-500/40 rounded-xl p-5 transition-all group"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700 text-[10px] font-mono">
                      人物专访
                    </span>
                    <span className="text-zinc-500 text-[10px] font-mono">
                      被访者: 林若希 / 声音设计师
                    </span>
                  </div>
                  <h5 className="text-base font-bold text-white group-hover:text-rose-300 transition-colors">
                    <Link href={`/zhuangxianren/article/${art!.slug}`}>{art!.title}</Link>
                  </h5>
                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed line-clamp-2">
                    {art!.deck || art!.summary}
                  </p>
                  <div className="mt-3 pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-500">
                    <span>特约主笔: {art!.authors?.[0]?.name || '苏晚'}</span>
                    <Link
                      href={`/zhuangxianren/article/${art!.slug}`}
                      className="text-rose-400 hover:text-rose-300 font-medium"
                    >
                      访谈全本 →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row B: 城市生活 & 科技消费/文化艺术 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* 城市生活 / 夜行漫游 (City Life) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
              <h4 className="text-lg font-bold font-serif text-white flex items-center gap-2">
                <Compass className="w-4 h-4 text-rose-500" />
                <span>城市生活 / 午夜两点半漫游</span>
              </h4>
              <span className="text-xs font-mono text-zinc-500">URBAN NIGHT & STREETS</span>
            </div>

            <div className="space-y-4">
              {cityLifeArticles.map((art) => (
                <div
                  key={art.id}
                  className="bg-zinc-900/90 border border-zinc-800 hover:border-rose-500/40 rounded-xl p-5 transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-zinc-500 font-mono mb-2">
                      <span className="text-rose-400">#城市折叠空间</span>
                      <span>{art.publishedAt}</span>
                    </div>
                    <h5 className="text-base font-bold text-white group-hover:text-rose-300 transition-colors">
                      <Link href={`/zhuangxianren/article/${art.slug}`}>{art.title}</Link>
                    </h5>
                    <p className="text-xs text-zinc-400 mt-2 leading-relaxed line-clamp-2">
                      {art.deck || art.summary}
                    </p>
                  </div>
                  <div className="mt-4 pt-2 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                    <span className="text-zinc-500 text-[11px]">地标: 长垣市中心地下通道</span>
                    <Link
                      href={`/zhuangxianren/article/${art.slug}`}
                      className="text-rose-400 hover:text-rose-300 font-medium flex items-center gap-1"
                    >
                      <span>阅读记录</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 科技消费 / 文化艺术 (Tech Art & Aesthetics) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
              <h4 className="text-lg font-bold font-serif text-white flex items-center gap-2">
                <Cpu className="w-4 h-4 text-rose-500" />
                <span>科技消费 / 工业废料与先锋造物</span>
              </h4>
              <span className="text-xs font-mono text-zinc-500">TECH AESTHETICS & HACKERS</span>
            </div>

            <div className="space-y-4">
              {techArtArticles.map((art) => (
                <div
                  key={art.id}
                  className="bg-zinc-900/90 border border-zinc-800 hover:border-rose-500/40 rounded-xl p-5 transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-zinc-500 font-mono mb-2">
                      <span className="text-rose-400">#工业传感器与合成器</span>
                      <span>{art.publishedAt}</span>
                    </div>
                    <h5 className="text-base font-bold text-white group-hover:text-rose-300 transition-colors">
                      <Link href={`/zhuangxianren/article/${art.slug}`}>{art.title}</Link>
                    </h5>
                    <p className="text-xs text-zinc-400 mt-2 leading-relaxed line-clamp-2">
                      {art.deck || art.summary}
                    </p>
                  </div>
                  <div className="mt-4 pt-2 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                    <span className="text-zinc-500 text-[11px]">工作台: 凤栖原机电创客车间</span>
                    <Link
                      href={`/zhuangxianren/article/${art.slug}`}
                      className="text-rose-400 hover:text-rose-300 font-medium flex items-center gap-1"
                    >
                      <span>探秘车间</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 7. 最新文章汇总流 (Latest Articles Stream) */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-6">
          <h3 className="text-xl font-bold font-serif text-white flex items-center gap-2">
            <Radio className="w-5 h-5 text-rose-500" />
            <span>最新文章流 / ALL ZHUANGXIANREN DISPATCHES</span>
          </h3>
          <span className="text-xs font-mono text-zinc-500">动态更新中 ({allZxrArticles.length} 篇)</span>
        </div>

        <div className="divide-y divide-zinc-800/80 bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden">
          {latestArticles.map((art) => (
            <div
              key={art.id}
              className="p-5 hover:bg-zinc-900 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 max-w-3xl">
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-rose-400 font-semibold">
                    {art.column === 'soundscape'
                      ? '声音采样'
                      : art.column === 'citylife'
                      ? '城市生活'
                      : art.column === 'tech-art'
                      ? '科技消费'
                      : '独家特稿'}
                  </span>
                  <span className="text-zinc-600">·</span>
                  <span className="text-zinc-500">{art.publishedAt}</span>
                  {art.access !== 'public' && (
                    <span className="text-amber-400 text-[10px] px-1.5 py-0.2 rounded bg-amber-950/60 border border-amber-500/30">
                      会员专享
                    </span>
                  )}
                </div>
                <h4 className="text-base font-bold text-white hover:text-rose-300 transition-colors">
                  <Link href={`/zhuangxianren/article/${art.slug}`}>{art.title}</Link>
                </h4>
                <p className="text-xs text-zinc-400 line-clamp-1">{art.deck || art.summary}</p>
              </div>

              <div className="shrink-0 flex items-center gap-4 text-xs">
                <span className="text-zinc-500 hidden sm:inline">{art.authors?.[0]?.name || '苏晚'}</span>
                <Link
                  href={`/zhuangxianren/article/${art.slug}`}
                  className="px-3 py-1.5 bg-zinc-800 hover:bg-rose-600 hover:text-white text-zinc-300 rounded text-xs transition-colors flex items-center gap-1"
                >
                  <span>阅读文章</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Sub-brand Footer Note */}
      <section className="max-w-7xl mx-auto px-4 pt-12 text-center text-xs text-zinc-500 border-t border-zinc-900 mt-12">
        <p className="font-serif">
          《装仙人》由仙都传媒集团文化特刊委员会出品 · 独立内容与先锋视觉架构保护 · 智元47年
        </p>
      </section>
    </div>
  );
}
