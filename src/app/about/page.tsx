import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getAllBrands } from '@/lib/content';
import { Building2, Newspaper, Sparkles, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: '关于仙都传媒与今日长垣 - 仙都传媒',
  description: '仙都传媒集团旗下主综合新闻门户《今日长垣》与独立文化子品牌《装仙人》。',
};

export default function AboutPage() {
  const brands = getAllBrands();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="border-b border-slate-200 pb-6 mb-8">
        <div className="flex items-center space-x-2 text-xs text-slate-500 mb-2">
          <Link href="/" className="hover:text-blue-700">
            首页
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-medium">关于我们</span>
        </div>

        <h1 className="text-3xl font-black text-slate-950 font-serif">
          关于仙都传媒集团与旗下媒体矩阵
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-2">
          立足长垣，记录智元纪年城市脉动与人文心象
        </p>
      </div>

      <div className="space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
        {/* Parent Group */}
        <section className="bg-white border border-slate-200 rounded-lg p-6 space-y-3">
          <div className="flex items-center gap-2 text-blue-700 font-bold">
            <Building2 className="w-5 h-5" />
            <h2 className="text-lg text-slate-900">母集团：仙都传媒集团 (Xiandu Media Group)</h2>
          </div>
          <p>
            仙都传媒集团是长垣具有深厚历史积淀的综合性传媒集团。集团坚持专业新闻主义，统筹城市公共新闻报道、智算研报、声音工程与文化先锋刊物出版，致力于构建真实、透明、可信的城市公共记录生态。
          </p>
        </section>

        {/* Brand 1: 今日长垣 */}
        <section className="bg-white border border-slate-200 rounded-lg p-6 space-y-3">
          <div className="flex items-center gap-2 text-blue-700 font-bold">
            <Newspaper className="w-5 h-5" />
            <h2 className="text-lg text-slate-900">主综合新闻门户：《今日长垣》 (TODAY CHANGYUAN)</h2>
          </div>
          <p>
            仙都传媒旗下主综合新闻门户。设长垣要闻、财经智产、社会民生、深度调查、科技文化、体育健康、市井生活、音频专栏等重点频道。全面推行事实核验机制与公开勘误版本回溯，服务全体长垣市民与产业观察者。
          </p>
        </section>

        {/* Brand 2: 《装仙人》 */}
        <section className="bg-zinc-950 text-zinc-200 border border-zinc-800 rounded-lg p-6 space-y-3">
          <div className="flex items-center gap-2 text-rose-400 font-bold">
            <Sparkles className="w-5 h-5" />
            <h2 className="text-lg text-white">独立先锋文化子品牌：《装仙人》 (ZHUANG XIAN REN)</h2>
          </div>
          <p className="text-zinc-400">
            仙都传媒旗下独立子品牌数字期刊。有别于传统市政新闻，专注于城市声音采样、青年夜行探索、人物内心张力与先锋审美实验。享有独立的视觉体系与封面叙事架构。
          </p>
          <div className="pt-2">
            <Link
              href="/zhuangxianren"
              className="text-xs text-rose-400 hover:text-rose-300 font-bold underline inline-flex items-center gap-1"
            >
              <span>前往《装仙人》独立数字子刊 →</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
