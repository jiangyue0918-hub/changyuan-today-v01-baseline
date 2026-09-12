import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  getArticlesBySection,
  getAllTopics,
  getAllEntities,
  getAllAuthors,
} from '@/lib/content';
import VerificationBadge from '@/components/article/VerificationBadge';
import {
  Clock,
  ShieldCheck,
  ChevronRight,
  Filter,
  Compass,
  Building,
  User,
  MapPin,
  Flame,
  FileText,
} from 'lucide-react';

const SECTION_CONFIG: Record<
  string,
  { name: string; enName: string; desc: string; focusTopicId?: string }
> = {
  changyuan: {
    name: '长垣要闻',
    enName: 'CHANGYUAN NEWS',
    desc: '全市政治、重大市政决策、重点工程推进与城市综合治理权威动态。双源核验采签保障。',
    focusTopicId: 'topic-winter-energy-2047',
  },
  finance: {
    name: '财经智产',
    enName: 'FINANCE & INDUSTRY',
    desc: '智算中心、智能制造、现代物流与实体经济转型最新调查与深度洞察。脱水数据呈现。',
    focusTopicId: 'topic-ai-industry-pulse',
  },
  society: {
    name: '社会民生',
    enName: 'SOCIETY & CIVIC LIFE',
    desc: '城市供暖、交通路网、医疗卫生、社区便民与市民关切真实记录。24小时线索跟进。',
    focusTopicId: 'topic-winter-energy-2047',
  },
  depth: {
    name: '深度调查',
    enName: 'INVESTIGATIVE & DEPTH',
    desc: '一线走访、详实数据支撑的长篇调查报道，挖掘城市深层运行逻辑。拒绝走马观花。',
    focusTopicId: 'topic-ai-industry-pulse',
  },
  culture: {
    name: '科技文化',
    enName: 'TECH & CULTURE',
    desc: '前沿蜂窝材料、数字创客生态、历史风貌保护与城市公共文化。先锋思维交汇。',
    focusTopicId: 'topic-heritage-revival',
  },
  sports: {
    name: '体育健康',
    enName: 'SPORTS & WELLNESS',
    desc: '滨河骑行绿道、全民赛事、群众健身设施与健康城市生活方式。活力与体魄。',
  },
  lifestyle: {
    name: '市井生活',
    enName: 'URBAN LIFE & PEOPLE',
    desc: '街角食堂、老厂记忆、人间烟火气与普通长垣人的真实日常。记录时代温度。',
  },
  audio: {
    name: '音频专栏',
    enName: 'AUDIO & BROADCAST',
    desc: '仙都传媒播音组录制，《今日长垣·晨读》与现场声音融媒。边听边阅。',
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
    title: `${config.name} (${config.enName}) - 频道聚合 - 今日长垣`,
    description: config.desc,
  };
}

export default async function SectionPage({ params }: Props) {
  const { section } = await params;
  const config = SECTION_CONFIG[section];

  if (!config) {
    notFound();
  }

  const allArticles = getArticlesBySection(section);
  const heroArticle = allArticles[0];
  const secondaryArticles = allArticles.slice(1, 4);
  const streamArticles = allArticles.slice(4);

  // Related topics & entities
  const allTopics = getAllTopics();
  const relatedTopics = config.focusTopicId
    ? allTopics.filter((t) => t.id === config.focusTopicId)
    : allTopics.slice(0, 2);

  const people = getAllEntities('person').slice(0, 2);
  const orgs = getAllEntities('organization').slice(0, 2);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      {/* 1. Channel Header Masthead */}
      <header className="border-b-2 border-slate-900 pb-6">
        <div className="flex items-center space-x-2 text-xs text-slate-500 mb-2">
          <Link href="/" className="hover:text-blue-700">
            今日长垣
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">综合频道归档</span>
          <span>/</span>
          <span className="text-blue-700 font-semibold">{config.name}</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-baseline space-x-3">
              <h1 className="text-3xl sm:text-4xl font-black text-slate-950 font-serif tracking-tight">
                {config.name}
              </h1>
              <span className="text-sm font-bold text-slate-400 uppercase tracking-widest font-mono">
                {config.enName}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
              {config.desc}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-end">
            <span className="text-xs text-slate-500 font-mono bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              已聚合出版文献：{allArticles.length} 篇
            </span>
          </div>
        </div>

        {/* Channel Filter Strip */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 flex items-center gap-1 mr-1">
            <Filter className="w-3 h-3" />
            <span>报道类型：</span>
          </span>
          <span className="px-2.5 py-0.5 rounded bg-blue-700 text-white font-medium">
            全部采编
          </span>
          <span className="px-2.5 py-0.5 rounded bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer">
            双源核验重点
          </span>
          <span className="px-2.5 py-0.5 rounded bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer">
            持续追踪专稿
          </span>
        </div>
      </header>

      {/* 2. Main Content Grid: Left 8 cols, Right 4 cols */}
      {allArticles.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-slate-200 rounded-lg text-slate-500 text-sm">
          本频道暂无新签发报道。请浏览其他频道或查阅全站历史新闻卷宗库。
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Column (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Section Hero */}
            {heroArticle && (
              <section className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-blue-400 transition-all group">
                {heroArticle.cover && (
                  <Link href={`/article/${heroArticle.slug}`} className="block aspect-16/9 bg-slate-900 overflow-hidden relative">
                    <img
                      src={heroArticle.cover}
                      alt={heroArticle.title}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="bg-blue-700 text-white text-[11px] font-bold px-2 py-0.5 rounded font-mono shadow-sm">
                        频道头条 / SECTION HERO
                      </span>
                    </div>
                  </Link>
                )}

                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-semibold text-blue-700">
                      主笔: {heroArticle.authors?.[0]?.name || '仙都采编中心'}
                    </span>
                    <span>{heroArticle.publishedAt}</span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-black text-slate-950 font-serif group-hover:text-blue-700 transition-colors leading-snug">
                    <Link href={`/article/${heroArticle.slug}`}>{heroArticle.title}</Link>
                  </h2>

                  {heroArticle.deck && (
                    <p className="text-sm text-slate-700 leading-relaxed font-medium">
                      {heroArticle.deck}
                    </p>
                  )}

                  <p className="text-xs sm:text-sm text-slate-500 line-clamp-2 leading-relaxed">
                    {heroArticle.summary}
                  </p>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <VerificationBadge status={heroArticle.status} />
                    <Link
                      href={`/article/${heroArticle.slug}`}
                      className="text-blue-700 font-bold hover:underline inline-flex items-center gap-1"
                    >
                      <span>阅读详细报道</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </section>
            )}

            {/* Sub-features Grid */}
            {secondaryArticles.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900 border-l-3 border-blue-700 pl-2">
                  本频道重点聚焦
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {secondaryArticles.map((art) => (
                    <article
                      key={art.id}
                      className="bg-white border border-slate-200 rounded-lg p-4 flex flex-col justify-between hover:border-blue-400 transition-colors group"
                    >
                      <div>
                        {art.cover && (
                          <Link href={`/article/${art.slug}`} className="block aspect-16/10 rounded overflow-hidden mb-3 bg-slate-900">
                            <img
                              src={art.cover}
                              alt={art.title}
                              className="w-full h-full object-cover group-hover:scale-103 transition-transform"
                            />
                          </Link>
                        )}
                        <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                          <span>{art.publishedAt}</span>
                          <VerificationBadge status={art.status} />
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 leading-snug">
                          <Link href={`/article/${art.slug}`}>{art.title}</Link>
                        </h4>
                        <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                          {art.summary}
                        </p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-slate-400 font-mono text-[11px]">
                          采编: {art.authors?.[0]?.name || '今日长垣'}
                        </span>
                        <Link
                          href={`/article/${art.slug}`}
                          className="text-blue-700 hover:underline font-semibold"
                        >
                          全文 →
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {/* More Feed */}
            {streamArticles.length > 0 && (
              <div className="space-y-4 pt-4">
                <h3 className="text-base font-bold text-slate-900 border-l-3 border-blue-700 pl-2">
                  时间线滚动发布
                </h3>
                <div className="bg-white border border-slate-200 rounded-lg divide-y divide-slate-100">
                  {streamArticles.map((art) => (
                    <div key={art.id} className="p-4 hover:bg-slate-50 transition-colors flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-1">
                          <span>{art.publishedAt}</span>
                          <span>·</span>
                          <span className="font-semibold text-blue-700">{art.authors?.[0]?.name}</span>
                        </div>
                        <h5 className="text-sm font-bold text-slate-900 hover:text-blue-700">
                          <Link href={`/article/${art.slug}`}>{art.title}</Link>
                        </h5>
                        <p className="text-xs text-slate-500 line-clamp-1 mt-1">
                          {art.summary}
                        </p>
                      </div>
                      <VerificationBadge status={art.status} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Column (4 cols) */}
          <aside className="lg:col-span-4 space-y-6">
            {/* 1. Channel Related Topics */}
            {relatedTopics.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <Compass className="w-4 h-4 text-blue-600" />
                  <h3 className="text-sm font-bold text-slate-900">频道关联持续专题</h3>
                </div>

                <div className="space-y-3">
                  {relatedTopics.map((topic) => (
                    <div key={topic.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200/80 space-y-1.5">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-blue-700 font-mono">
                          {topic.status === 'active' ? '● 正在推进' : '● 专题归档'}
                        </span>
                        <span className="text-slate-400">{topic.updatedAt}</span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 hover:text-blue-700 leading-snug">
                        <Link href={`/topic/${topic.slug}`}>{topic.title}</Link>
                      </h4>
                      <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                        {topic.summary}
                      </p>
                      <div className="pt-1">
                        <Link
                          href={`/topic/${topic.slug}`}
                          className="text-[11px] text-blue-700 font-semibold hover:underline inline-flex items-center gap-0.5"
                        >
                          <span>查看事实核验清单与时间线</span>
                          <ChevronRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. Key Entities in this Sphere */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <Building className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-900">核心人物与机构卷宗</h3>
              </div>

              <div className="space-y-2 text-xs">
                {people.map((p) => (
                  <Link
                    key={p.id}
                    href={`/people/${p.slug}`}
                    className="p-2 rounded bg-slate-50 hover:bg-slate-100 border border-slate-200/60 flex items-center justify-between transition-colors block"
                  >
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-purple-600" />
                      <div>
                        <span className="font-bold text-slate-900">{p.displayName}</span>
                        <span className="text-slate-400 text-[11px] ml-1 line-clamp-1">({p.brief || '人物'})</span>
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </Link>
                ))}

                {orgs.map((o) => (
                  <Link
                    key={o.id}
                    href={`/organizations/${o.slug}`}
                    className="p-2 rounded bg-slate-50 hover:bg-slate-100 border border-slate-200/60 flex items-center justify-between transition-colors block"
                  >
                    <div className="flex items-center gap-2">
                      <Building className="w-3.5 h-3.5 text-emerald-600" />
                      <div>
                        <span className="font-bold text-slate-900">{o.displayName}</span>
                        <span className="text-slate-400 text-[11px] ml-1">({o.type})</span>
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </Link>
                ))}
              </div>
            </div>

            {/* 3. Channel Editorial Standards Notice */}
            <div className="bg-blue-50/60 border border-blue-200/80 rounded-xl p-5 space-y-2 text-xs text-slate-700">
              <div className="flex items-center gap-1.5 font-bold text-blue-900">
                <ShieldCheck className="w-4 h-4 text-blue-700" />
                <span>采编独立性与监督信箱</span>
              </div>
              <p className="leading-relaxed text-slate-600">
                《今日长垣》{config.name}全部报道受公开勘误制度与双源交叉核验机制约束。若您对报道内容存疑或掌握新线索，可直接向采编监督专席提出复核。
              </p>
              <div className="pt-2">
                <Link
                  href="/tips"
                  className="text-blue-700 font-bold hover:underline inline-flex items-center gap-1"
                >
                  <span>投递核验补充线索 →</span>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
