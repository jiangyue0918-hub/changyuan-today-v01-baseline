import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { getArticlesBySection } from '@/lib/content';
import VerificationBadge from '@/components/article/VerificationBadge';
import { Clock, ShieldCheck, ChevronRight } from 'lucide-react';

const SECTION_CONFIG: Record<
  string,
  { name: string; enName: string; desc: string }
> = {
  changyuan: {
    name: '长垣要闻',
    enName: 'CHANGYUAN NEWS',
    desc: '全市政治、重大市政决策、重点工程推进与城市综合治理权威动态。',
  },
  finance: {
    name: '财经智产',
    enName: 'FINANCE & INDUSTRY',
    desc: '智算中心、智能制造、现代物流与实体经济转型最新调查与深度洞察。',
  },
  society: {
    name: '社会民生',
    enName: 'SOCIETY & CIVIC LIFE',
    desc: '城市供暖、交通路网、医疗卫生、社区便民与市民关切真实记录。',
  },
  depth: {
    name: '深度调查',
    enName: 'INVESTIGATIVE & DEPTH',
    desc: '一线走访、详实数据支撑的长篇调查报道，挖掘城市深层逻辑。',
  },
  culture: {
    name: '科技文化',
    enName: 'TECH & CULTURE',
    desc: '前沿蜂窝材料、数字创客生态、历史风貌保护与城市公共文化。',
  },
  sports: {
    name: '体育健康',
    enName: 'SPORTS & WELLNESS',
    desc: '滨河骑行绿道、全民赛事、群众健身设施与健康城市生活方式。',
  },
  lifestyle: {
    name: '市井生活',
    enName: 'URBAN LIFE & PEOPLE',
    desc: '街角食堂、老厂记忆、人间烟火气与普通长垣人的真实日常。',
  },
  audio: {
    name: '音频专栏',
    enName: 'AUDIO & BROADCAST',
    desc: '仙都传媒播音组录制，《今日长垣·晨读》与现场声音融媒。',
  },
};

interface Props {
  params: Promise<{ section: string }>;
}

export async function generateStaticParams() {
  return Object.keys(SECTION_CONFIG).map((section) => ({ section }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section } = await params;
  const config = SECTION_CONFIG[section];
  if (!config) return { title: '频道未找到 - 今日长垣' };

  return {
    title: `${config.name} (${config.enName}) - 今日长垣`,
    description: config.desc,
  };
}

export default async function SectionPage({ params }: Props) {
  const { section } = await params;
  const config = SECTION_CONFIG[section];

  if (!config) {
    notFound();
  }

  const articles = getArticlesBySection(section);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Channel Header Banner */}
      <div className="border-b-2 border-slate-900 pb-5 mb-8">
        <div className="flex items-center space-x-2 text-xs text-slate-500 mb-2">
          <Link href="/" className="hover:text-blue-700">
            首页
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">频道分类</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2">
          <div className="flex items-baseline space-x-3">
            <h1 className="text-3xl font-black text-slate-950 font-serif tracking-tight">
              {config.name}
            </h1>
            <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">
              {config.enName}
            </span>
          </div>
          <span className="text-xs text-slate-500">
            共收录报道 {articles.length} 篇 · 持续更新
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
          {config.desc}
        </p>
      </div>

      {/* Article Grid */}
      {articles.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-slate-200 rounded-lg text-slate-500">
          该频道本月暂无新稿，请浏览其他栏目或返回首页。
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((art) => (
            <article
              key={art.id}
              className="bg-white border border-slate-200 rounded-lg overflow-hidden flex flex-col justify-between hover:border-blue-400 hover:shadow-sm transition-all group"
            >
              <div>
                {art.cover && (
                  <Link href={`/article/${art.slug}`} className="block relative aspect-16/10 bg-slate-900 overflow-hidden">
                    <img
                      src={art.cover}
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2">
                      <span className="bg-slate-900/80 text-white text-[10px] px-2 py-0.5 rounded font-mono">
                        {art.status === 'verified' ? '已核实' : art.status}
                      </span>
                    </div>
                  </Link>
                )}

                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-semibold text-blue-700">
                      {art.authors?.[0]?.name || '采编组'}
                    </span>
                    <span>{art.publishedAt}</span>
                  </div>

                  <h2 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-snug">
                    <Link href={`/article/${art.slug}`}>{art.title}</Link>
                  </h2>

                  {art.deck && (
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {art.deck}
                    </p>
                  )}
                </div>
              </div>

              <div className="p-4 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between text-xs">
                <VerificationBadge status={art.status} />
                <Link
                  href={`/article/${art.slug}`}
                  className="text-blue-700 font-semibold hover:underline inline-flex items-center gap-0.5"
                >
                  <span>阅读</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
