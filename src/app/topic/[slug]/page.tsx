import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { getAllTopics, getTopicBySlug } from '@/lib/content';
import { Compass, CheckCircle2, HelpCircle, Clock, Calendar, ChevronRight, User, Building, MapPin, ShieldCheck } from 'lucide-react';
import VerificationBadge from '@/components/article/VerificationBadge';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const topics = getAllTopics();
  return topics.map((top) => ({ slug: top.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);

  if (!topic) return { title: '专题未找到 - 今日长垣' };

  return {
    title: `【持续专题】${topic.title} - 今日长垣`,
    description: topic.summary,
    openGraph: {
      title: topic.title,
      description: topic.summary,
      type: 'website',
    },
  };
}

export default async function TopicPage({ params }: Props) {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);

  if (!topic) {
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
        <span className="text-slate-900 font-medium">持续跟进专题</span>
        <span>/</span>
        <span className="text-slate-400 truncate max-w-xs">{topic.title}</span>
      </nav>

      {/* 2. Topic Header Card */}
      <div className="bg-white border-2 border-slate-900 rounded-lg p-6 md:p-8 mb-8 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="bg-blue-700 text-white text-xs font-bold px-2.5 py-1 rounded flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              <span>今日长垣 · 持续跟进专题</span>
            </span>
            <span className="bg-slate-100 border border-slate-300 text-slate-700 text-xs px-2 py-1 rounded font-mono">
              状态：{topic.status === 'active' ? '进行中 (ACTIVE)' : '已结项归档'}
            </span>
          </div>

          <div className="text-xs text-slate-500 flex items-center gap-4">
            <span>立项追踪：{topic.startedAt}</span>
            <span>最后更新：{topic.updatedAt}</span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-950 font-serif tracking-tight leading-tight mb-3">
          {topic.title}
        </h1>

        <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-4xl">
          {topic.summary}
        </p>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>档案标号：{topic.id}</span>
          <span className="font-mono text-[11px] text-slate-400">
            分类界定：{topic.classification || 'WEB_DERIVED'} (非正史定案)
          </span>
        </div>
      </div>

      {/* 3. Main Topic Grid: 事实核验清单 + 动态发展时间线 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
        {/* Left 5 cols: 事实核验清单 (已确认 vs 存疑/待核实) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-slate-200 rounded-lg p-5">
            <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wide flex items-center gap-1.5 pb-3 border-b border-slate-200 mb-4">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>已多方交叉核实要点 ({topic.confirmed?.length || 0})</span>
            </h3>

            {topic.confirmed && topic.confirmed.length > 0 ? (
              <ul className="space-y-3 text-xs">
                {topic.confirmed.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-700">
                    <span className="text-emerald-600 font-bold shrink-0 mt-0.5">✓</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-400">暂无确认要点</p>
            )}
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-5">
            <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wide flex items-center gap-1.5 pb-3 border-b border-slate-200 mb-4">
              <HelpCircle className="w-4 h-4 text-amber-600" />
              <span>待验证 / 现场争议线索 ({topic.unconfirmed?.length || 0})</span>
            </h3>

            {topic.unconfirmed && topic.unconfirmed.length > 0 ? (
              <ul className="space-y-3 text-xs">
                {topic.unconfirmed.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-700">
                    <span className="text-amber-500 font-bold shrink-0 mt-0.5">?</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-400">目前暂无公开存疑点</p>
            )}
          </div>

          {/* Ethics and reporting note */}
          <div className="p-4 bg-slate-100 rounded text-xs text-slate-500 border border-slate-200 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <p>
              持续专题由仙都传媒采编中心专门工作组跟进维护，当现场出现最新技术遥测或官方勘测通告时，清单将实时推演并载入版本日志。
            </p>
          </div>
        </div>

        {/* Right 7 cols: 专题动态时间线 */}
        <div className="lg:col-span-7">
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wide flex items-center gap-1.5 pb-3 border-b border-slate-200 mb-6">
              <Clock className="w-4 h-4 text-blue-700" />
              <span>事件推演与报道时间线 (CHRONOLOGY)</span>
            </h3>

            {topic.timeline && topic.timeline.length > 0 ? (
              <div className="relative pl-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 space-y-6">
                {topic.timeline.map((item, idx) => (
                  <div key={idx} className="relative group">
                    {/* Dot */}
                    <span className="absolute -left-6 top-1.5 w-3 h-3 rounded-full border-2 border-white bg-blue-600 group-hover:scale-125 transition-transform" />

                    <div className="text-xs">
                      <span className="font-mono text-slate-400 font-semibold block mb-1">
                        {item.date}
                      </span>
                      <h4 className="font-bold text-sm text-slate-900 leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-slate-600 mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400">暂无时间线记录</p>
            )}
          </div>
        </div>
      </div>

      {/* 4. 关联新闻卷宗 (Articles in this Topic) */}
      <div className="border-t border-slate-200 pt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black text-slate-950 font-serif">
            专题收录报道卷宗 ({topic.articles?.length || 0})
          </h2>
          <span className="text-xs text-slate-500">仙都传媒已签发报道</span>
        </div>

        {topic.articles && topic.articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topic.articles.map((art) => (
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
                    <span>详情</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 border border-dashed border-slate-200 rounded text-slate-400 text-xs">
            该专题暂无收录文章
          </div>
        )}
      </div>
    </div>
  );
}
