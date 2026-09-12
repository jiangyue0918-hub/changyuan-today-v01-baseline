import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getAllArticles, getArticlesBySection } from '@/lib/content';
import { Layers, ChevronRight, Newspaper } from 'lucide-react';

export const metadata: Metadata = {
  title: '全部新闻频道与分类 - 今日长垣',
  description: '浏览《今日长垣》全部采编频道分类，涵盖长垣要闻、财经智产、社会民生、深度调查等。',
};

const SECTIONS = [
  {
    id: 'changyuan',
    name: '长垣要闻',
    enName: 'CHANGYUAN NEWS',
    desc: '全市政治、重大市政决策、重点工程推进与城市综合治理权威动态。',
  },
  {
    id: 'finance',
    name: '财经智产',
    enName: 'FINANCE & INDUSTRY',
    desc: '智算中心、智能制造、现代物流与实体经济转型最新调查与深度洞察。',
  },
  {
    id: 'society',
    name: '社会民生',
    enName: 'SOCIETY & CIVIC LIFE',
    desc: '城市供暖、交通路网、医疗卫生、社区便民与市民关切真实记录。',
  },
  {
    id: 'depth',
    name: '深度调查',
    enName: 'INVESTIGATIVE & DEPTH',
    desc: '一线走访、详实数据支撑的长篇调查报道，挖掘城市深层逻辑。',
  },
  {
    id: 'culture',
    name: '科技文化',
    enName: 'TECH & CULTURE',
    desc: '前沿蜂窝材料、数字创客生态、历史风貌保护与城市公共文化。',
  },
  {
    id: 'sports',
    name: '体育健康',
    enName: 'SPORTS & WELLNESS',
    desc: '滨河骑行绿道、全民赛事、群众健身设施与健康城市生活方式。',
  },
  {
    id: 'lifestyle',
    name: '市井生活',
    enName: 'URBAN LIFE & PEOPLE',
    desc: '街角食堂、老厂记忆、人间烟火气与普通长垣人的真实日常。',
  },
  {
    id: 'audio',
    name: '音频专栏',
    enName: 'AUDIO & BROADCAST',
    desc: '仙都传媒播音组录制，《今日长垣·晨读》与现场声音融媒。',
  },
];

export default function SectionsIndexPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="border-b-2 border-slate-900 pb-5">
        <div className="flex items-center space-x-2 text-xs text-slate-500 mb-2">
          <Link href="/" className="hover:text-blue-700">
            首页
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">全站频道目录</span>
        </div>

        <div className="flex items-baseline space-x-3">
          <h1 className="text-3xl font-black text-slate-950 font-serif tracking-tight">
            频道全览
          </h1>
          <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">
            SECTIONS DIRECTORY
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
          《今日长垣》依照新闻专业主义设立 8 大主频道，汇聚仙都全域权威事实报道。
        </p>
      </div>

      {/* Grid of Channels */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {SECTIONS.map((sec) => {
          const count = getArticlesBySection(sec.id).length;
          return (
            <Link
              key={sec.id}
              href={`/section/${sec.id}`}
              className="bg-white border border-slate-200 rounded-lg p-5 flex flex-col justify-between hover:border-blue-500 hover:shadow-sm transition-all group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-mono text-[11px] font-bold text-blue-700">
                    {sec.enName}
                  </span>
                  <span>{count} 篇报道</span>
                </div>
                <h2 className="text-xl font-black text-slate-900 font-serif group-hover:text-blue-700 transition-colors">
                  {sec.name}
                </h2>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                  {sec.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-blue-700 font-semibold">
                <span>进入频道主页</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
