import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Check, Shield, Zap, Sparkles, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: '会员服务与数字订阅权益 - 今日长垣',
  description: '支持独立采编与深度调查。畅享今日长垣完整档案卷宗库与《装仙人》特刊数字母带。',
};

export default function MembershipPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="text-center space-y-3 mb-12">
        <span className="text-xs font-mono font-bold tracking-widest uppercase text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          仙都传媒 · 今日长垣数字订阅计划
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 font-serif">
          成为今日长垣观察员，支持独立公共采编
        </h1>
        <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
          您的每一份支持，都将用于保障采编团队深入热网一线、算力机房与市井街角的无干预现场核验与事实调查。
        </p>
      </div>

      {/* Subscription Tier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Tier 1 */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-slate-900">市民通行证</h3>
              <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">基础服务</span>
            </div>
            <div className="mb-6">
              <span className="text-3xl font-black text-slate-950 font-serif">免费</span>
              <span className="text-xs text-slate-500 ml-1">/ 永久有效</span>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>全站要闻与公共民生报道无限制阅读</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>实时查看报道核验状态与公开更正日志</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>接收重大突发新闻终端即时推送</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-100">
            <Link
              href="/me"
              className="w-full block py-2.5 text-center text-xs font-bold rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-800 transition-colors"
            >
              当前默认生效中
            </Link>
          </div>
        </div>

        {/* Tier 2: Featured */}
        <div className="bg-slate-900 text-white rounded-xl p-6 flex flex-col justify-between border-2 border-blue-600 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg tracking-wider">
            RECOMMENDED
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-white">智元资深观察员</h3>
              <span className="text-xs bg-blue-900/80 text-blue-300 px-2 py-0.5 rounded">个人专享</span>
            </div>
            <div className="mb-6">
              <span className="text-3xl font-black text-white font-serif">28</span>
              <span className="text-xs text-slate-400 ml-1">长垣工币 / 月</span>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-400 shrink-0" />
                <span>包含市民通行证全部权益</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-400 shrink-0" />
                <span>畅读全部深度调查与内参智库特稿</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-400 shrink-0" />
                <span>《装仙人》高保真无损母带与数字原件完整调阅</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-400 shrink-0" />
                <span>历史新闻卷宗库全量无限制跨年全文检索</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-800">
            <Link
              href="/me"
              className="w-full block py-2.5 text-center text-xs font-bold rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors"
            >
              绑定终端并开启订阅体验
            </Link>
          </div>
        </div>

        {/* Tier 3 */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-slate-900">机构政企终端</h3>
              <span className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded">多席位授权</span>
            </div>
            <div className="mb-6">
              <span className="text-3xl font-black text-slate-950 font-serif">240</span>
              <span className="text-xs text-slate-500 ml-1">长垣工币 / 年</span>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>支持 10 个以上企业/部门终端协同绑定</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>长垣产业运行数据包定期结构化归档导出</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>优先核验工单通道与定制舆情公报接入</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-100">
            <Link
              href="/tips"
              className="w-full block py-2.5 text-center text-xs font-bold rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-800 transition-colors"
            >
              联系仙都传媒政企业务组
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
