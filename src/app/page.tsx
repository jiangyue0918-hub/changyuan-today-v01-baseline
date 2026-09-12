import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getEditorialHome } from '@/lib/content';
import { Clock, ShieldCheck, ChevronRight, Sparkles, Flame, Headphones, ArrowUpRight, Compass } from 'lucide-react';
import VerificationBadge from '@/components/article/VerificationBadge';

export default async function HomePage() {
  const {
    instantAttentionArticles,
    heroArticle,
    liveTopics,
    editorPicksArticles,
    zhuangxianrenFeature,
    latestArticles,
    mostReadArticles,
  } = getEditorialHome();

  return (
    <div className="w-full pb-16">
      {/* =========================================================================
          B. 即时关注 / NOW: 导航下方一排 4 条短新闻卡，用于快速入口，不做跑马灯
          ========================================================================= */}
      <section className="bg-slate-100 border-b border-slate-200 py-3">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-xs tracking-wider uppercase">
              即时关注 / NOW
            </span>
            <span className="text-[11px] text-slate-500">今日长垣实时编辑流 · 快速速览</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {instantAttentionArticles.map((art) => (
              <Link
                key={art.id}
                href={`/article/${art.slug}`}
                className="group bg-white p-2.5 rounded border border-slate-200/80 hover:border-blue-400 hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                    <span className="font-semibold text-blue-700">
                      {art.section === 'changyuan'
                        ? '长垣要闻'
                        : art.section === 'finance'
                        ? '财经智产'
                        : art.section === 'society'
                        ? '社会民生'
                        : art.section === 'depth'
                        ? '深度调查'
                        : art.section === 'culture'
                        ? '科技文化'
                        : art.section === 'sports'
                        ? '体育健康'
                        : art.section === 'lifestyle'
                        ? '市井生活'
                        : '融媒专栏'}
                    </span>
                    <span className="text-[10px] text-slate-400">{art.publishedAt.slice(-5)}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-700 line-clamp-2 leading-snug">
                    {art.title}
                  </h4>
                </div>
                <div className="mt-2 text-[10px] text-slate-500 flex items-center justify-between">
                  <span>{art.authors?.[0]?.name || '采编组'}</span>
                  <span className="group-hover:translate-x-0.5 transition-transform text-slate-400">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          C. 首屏: 
             左侧约 70%：大型主头条新闻摄影 Hero
             右侧约 30%：“正在发生 / LIVE” 持续专题与核验状态
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 pt-6 md:pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 pb-8 border-b border-slate-200">
          {/* 左侧 70%：主头条 Hero (8 columns on lg) */}
          <div className="lg:col-span-8 flex flex-col">
            {heroArticle && (
              <div className="group flex flex-col h-full">
                <Link href={`/article/${heroArticle.slug}`} className="block relative overflow-hidden rounded bg-slate-900 aspect-16/9 mb-4">
                  {heroArticle.cover && (
                    <img
                      src={heroArticle.cover}
                      alt={heroArticle.title}
                      className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="bg-blue-700 text-white text-xs font-bold px-2 py-0.5 rounded shadow-sm">
                      今日主头条
                    </span>
                    <span className="bg-slate-900/80 backdrop-blur-xs text-slate-200 text-xs px-2 py-0.5 rounded border border-slate-700">
                      智元47年
                    </span>
                  </div>
                </Link>

                <div className="space-y-2.5">
                  <div className="flex items-center gap-3">
                    <VerificationBadge status={heroArticle.status} />
                    <span className="text-xs text-slate-500">{heroArticle.publishedAt}</span>
                  </div>

                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight font-serif hover:text-blue-700 transition-colors leading-tight">
                    <Link href={`/article/${heroArticle.slug}`}>
                      {heroArticle.title}
                    </Link>
                  </h2>

                  {heroArticle.deck && (
                    <p className="text-sm md:text-base text-slate-600 font-medium leading-relaxed">
                      {heroArticle.deck}
                    </p>
                  )}

                  <p className="text-xs md:text-sm text-slate-500 line-clamp-2 leading-relaxed">
                    {heroArticle.summary}
                  </p>

                  <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-slate-800">
                        {heroArticle.authors?.[0]?.name}
                      </span>
                      <span>·</span>
                      <span>{heroArticle.authors?.[0]?.title}</span>
                    </div>
                    <Link
                      href={`/article/${heroArticle.slug}`}
                      className="text-blue-700 font-semibold hover:underline inline-flex items-center gap-1"
                    >
                      <span>阅读完整报道</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 右侧 30%：“正在发生 / LIVE” (4 columns on lg) */}
          <div className="lg:col-span-4 bg-slate-50 border border-slate-200 rounded p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
                  </span>
                  <h3 className="font-black text-sm text-slate-900 tracking-wide uppercase">
                    正在发生 / LIVE 专题
                  </h3>
                </div>
                <span className="text-[11px] text-slate-500">智元47年实时跟进</span>
              </div>

              <div className="space-y-4">
                {liveTopics.map((top) => (
                  <div
                    key={top.id}
                    className="p-3 bg-white rounded border border-slate-200 hover:border-blue-400 transition-colors"
                  >
                    <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1.5">
                      <span className="px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded font-semibold text-[10px]">
                        持续跟进中
                      </span>
                      <span>最后更新：{top.updatedAt.slice(-5)}</span>
                    </div>
                    <h4 className="font-bold text-sm text-slate-900 hover:text-blue-700 transition-colors leading-snug">
                      <Link href={`/topic/${top.slug}`}>{top.title}</Link>
                    </h4>
                    <p className="text-xs text-slate-600 line-clamp-2 mt-1.5 leading-relaxed">
                      {top.summary}
                    </p>

                    {/* Confirmed items count */}
                    {top.confirmed && (
                      <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                        <span className="text-emerald-700 font-medium">
                          ✓ 已确认要点 {top.confirmed.length} 项
                        </span>
                        <Link
                          href={`/topic/${top.slug}`}
                          className="text-blue-600 hover:underline font-semibold"
                        >
                          追踪脉络 →
                        </Link>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Worldview Verification Note */}
            <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-500 flex items-start gap-1.5">
              <ShieldCheck className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <p>
                今日长垣核验承诺：持续专题所有时间线与确认项均经多路信源核实，非永久正史定案。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          D. 中段新闻区:
             - “编辑精选”作为重点策展区
             - “正在热议 / MOST READ”作为右侧排行
             - “最新报道”继续向下形成高密度新闻阅读流
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* 左边 8 列：编辑精选 + 最新报道流 */}
          <div className="lg:col-span-8 space-y-8">
            {/* 1. 编辑精选 (Editor's Picks) */}
            <div>
              <div className="flex items-center justify-between pb-3 border-b-2 border-blue-700 mb-5">
                <h3 className="text-lg font-black text-slate-950 font-serif tracking-tight">
                  编辑精选 / EDITOR’S PICKS
                </h3>
                <span className="text-xs text-slate-500">今日长垣编委会推荐</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {editorPicksArticles.map((art) => (
                  <article key={art.id} className="group flex flex-col justify-between">
                    <div>
                      <Link href={`/article/${art.slug}`} className="block relative overflow-hidden rounded bg-slate-900 aspect-16/10 mb-2.5">
                        {art.cover && (
                          <img
                            src={art.cover}
                            alt={art.title}
                            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                          />
                        )}
                        <span className="absolute bottom-2 left-2 bg-slate-900/80 text-white text-[10px] px-1.5 py-0.5 rounded">
                          {art.section}
                        </span>
                      </Link>
                      <h4 className="font-bold text-sm text-slate-900 group-hover:text-blue-700 transition-colors leading-snug">
                        <Link href={`/article/${art.slug}`}>{art.title}</Link>
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">
                        {art.summary}
                      </p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                      <span>{art.authors?.[0]?.name}</span>
                      <span>{art.publishedAt.slice(0, 11)}</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* 2. 最新报道流 (Latest News Stream) */}
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-300 mb-4">
                <h3 className="text-base font-black text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-blue-700" />
                  <span>最新报道 / LATEST STORIES</span>
                </h3>
                <span className="text-xs text-slate-500">按发布时间持续滚动</span>
              </div>

              <div className="divide-y divide-slate-200">
                {latestArticles.map((art) => (
                  <article key={art.id} className="py-4 group flex flex-col sm:flex-row gap-4 items-start justify-between">
                    <div className="flex-1 space-y-1.5">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span className="font-semibold text-blue-700">{art.section}</span>
                        <span>·</span>
                        <span>{art.publishedAt}</span>
                        <span>·</span>
                        <span className="text-slate-600">{art.authors?.[0]?.name}</span>
                      </div>
                      <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-snug">
                        <Link href={`/article/${art.slug}`}>{art.title}</Link>
                      </h4>
                      <p className="text-xs md:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                        {art.summary}
                      </p>
                    </div>
                    {art.cover && (
                      <Link href={`/article/${art.slug}`} className="w-full sm:w-36 h-24 shrink-0 rounded overflow-hidden bg-slate-900">
                        <img
                          src={art.cover}
                          alt={art.title}
                          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                        />
                      </Link>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </div>

          {/* 右边 4 列：热议排行 (Most Read) + 专栏视听 */}
          <div className="lg:col-span-4 space-y-6">
            {/* 正在热议排行 */}
            <div className="bg-white border border-slate-200 rounded p-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
                <h3 className="font-black text-sm text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-orange-600" />
                  <span>正在热议 / MOST READ</span>
                </h3>
                <span className="text-[11px] text-slate-400">今日读者关注</span>
              </div>

              <div className="space-y-3.5">
                {mostReadArticles.map((art, idx) => (
                  <div key={art.id} className="flex items-start gap-3 group">
                    <span className="font-serif text-2xl font-black text-slate-300 group-hover:text-blue-600 transition-colors w-6 shrink-0 text-center">
                      0{idx + 1}
                    </span>
                    <div className="flex-1">
                      <h4 className="text-xs md:text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-snug">
                        <Link href={`/article/${art.slug}`}>{art.title}</Link>
                      </h4>
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
                        <span>{art.section}</span>
                        <span>·</span>
                        <span>{art.publishedAt.slice(-5)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 音频与数字晨读入口 */}
            <div className="bg-blue-50/60 border border-blue-200 rounded p-4">
              <div className="flex items-center gap-2 text-blue-900 font-bold text-xs uppercase mb-2">
                <Headphones className="w-4 h-4 text-blue-600" />
                <span>音频专栏 · 今日长垣晨读</span>
              </div>
              <p className="text-xs text-slate-700 font-medium">
                每日清晨十分钟，深度掌握城市脉动与热点追踪。由仙都传媒播音组录制。
              </p>
              <Link
                href="/section/audio"
                className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-blue-700 hover:underline"
              >
                <span>收听最新一期晨读录音</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          E. 频道入口:
             第一版 8 个左右频道入口，桌面端以清晰入口形成换气区，它不承担大量文章
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 pt-10">
        <div className="bg-slate-100 rounded border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              频道分类索引 / CHANNELS
            </h3>
            <span className="text-[11px] text-slate-500">点击进入专属频道页</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
            {[
              { name: '长垣要闻', slug: 'changyuan', desc: '全城市政大事' },
              { name: '财经智产', slug: 'finance', desc: '工业与算力制造' },
              { name: '社会民生', slug: 'society', desc: '交通保供与社区' },
              { name: '深度调查', slug: 'depth', desc: '长篇调查报道' },
              { name: '科技文化', slug: 'culture', desc: '创新与城市记忆' },
              { name: '体育健康', slug: 'sports', desc: '赛事与全民运动' },
              { name: '市井生活', slug: 'lifestyle', desc: '人间烟火与街巷' },
              { name: '音频专栏', slug: 'audio', desc: '声音融媒播客' },
            ].map((ch) => (
              <Link
                key={ch.slug}
                href={`/section/${ch.slug}`}
                className="bg-white p-3 rounded border border-slate-200 hover:border-blue-500 hover:shadow-xs transition-all text-center group"
              >
                <span className="block font-bold text-xs text-slate-900 group-hover:text-blue-700">
                  {ch.name}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">{ch.desc}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          F. 《装仙人》大型跨品牌模块:
             位于首页下段，明显区别普通新闻卡，表现刊物封面/本期内容/独立品牌入口
             点击后进入《装仙人》独立子站
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 pt-12">
        <div className="bg-zinc-950 text-zinc-100 rounded-xl p-6 md:p-8 border border-zinc-800 shadow-xl relative overflow-hidden">
          {/* Subtle rose ambient glow */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="lg:max-w-xl space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 text-xs font-bold tracking-wider uppercase">
                  仙都传媒旗下独立子品牌
                </span>
                <span className="text-zinc-500 text-xs">智元47年秋季号</span>
              </div>

              <div className="flex items-baseline space-x-3">
                <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white font-serif">
                  装仙人
                </h2>
                <span className="text-xs md:text-sm font-mono tracking-widest text-zinc-400">
                  ZHUANG XIAN REN · ISSUE #09
                </span>
              </div>

              <p className="text-sm text-zinc-400 leading-relaxed">
                长垣首家以声音、城市夜行、新风尚与人物张力为核心的先锋数字期刊。不受传统新闻束缚，更深一层剖析工业巨厦与个人心象。
              </p>

              {zhuangxianrenFeature && (
                <div className="pt-2">
                  <span className="text-xs text-rose-400 font-semibold block mb-1">
                    本期重磅封面人物专访：
                  </span>
                  <Link
                    href={`/article/${zhuangxianrenFeature.slug}`}
                    className="text-base font-bold text-white hover:text-rose-400 transition-colors"
                  >
                    {zhuangxianrenFeature.title}
                  </Link>
                </div>
              )}

              <div className="pt-3">
                <Link
                  href="/zhuangxianren"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded font-bold text-xs tracking-wide transition-all shadow-md"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>访问《装仙人》独立品牌子站</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

            {/* Right side magazine visual mock */}
            {zhuangxianrenFeature && (
              <div className="w-full lg:w-96 shrink-0 bg-zinc-900 border border-zinc-700/80 rounded-lg p-3 group">
                <div className="aspect-3/4 rounded overflow-hidden relative bg-black">
                  {zhuangxianrenFeature.cover && (
                    <img
                      src={zhuangxianrenFeature.cover}
                      alt={zhuangxianrenFeature.title}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
                    <span className="text-rose-400 text-[10px] font-bold tracking-widest uppercase">
                      COVER STORY
                    </span>
                    <h3 className="text-white text-sm font-bold mt-1 line-clamp-2">
                      {zhuangxianrenFeature.title}
                    </h3>
                  </div>
                </div>
                <div className="mt-2 text-center text-zinc-400 text-[11px]">
                  特约主笔 苏晚 / 摄影组 独家采写
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================================
          G. 连接今日长垣 / 会员转化与 Footer 承接:
             放置在页面下段，不打断中段高密度新闻阅读
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 pt-12">
        <div className="bg-slate-900 text-slate-100 rounded-lg p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl font-bold text-white">
              连接您的长垣智能终端与数字档案
            </h3>
            <p className="text-xs text-slate-400 max-w-xl">
              绑定后可开启个性化阅读偏好、重要专题动态追踪推送、收藏夹多端同步及历史更正透明回溯服务。
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/me"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-semibold transition-colors"
            >
              连接我的今日长垣
            </Link>
            <Link
              href="/membership"
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/30 rounded text-xs font-semibold transition-colors"
            >
              查看会员权益
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
