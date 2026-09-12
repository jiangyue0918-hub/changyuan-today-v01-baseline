'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Article } from '@/types/content';
import {
  Crown,
  Lock,
  Unlock,
  FileText,
  Download,
  Headphones,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Eye,
} from 'lucide-react';
import VerificationBadge from '@/components/article/VerificationBadge';

interface Props {
  premiumArticles: Article[];
}

export default function PremiumClient({ premiumArticles }: Props) {
  const { userRole, setUserRole } = useApp();
  const isSubscriber = userRole === 'vip' || userRole === 'org';

  return (
    <div className="w-full bg-slate-950 text-slate-100 min-h-screen pb-24">
      {/* 1. Premium Top Masthead */}
      <div className="border-b border-amber-500/20 bg-black/60 px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2">
            <Link
              href="/"
              className="text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-1 font-medium"
            >
              <span>← 返回《今日长垣》主站</span>
            </Link>
            <span className="text-slate-700">|</span>
            <span className="text-amber-400/90 font-serif font-bold tracking-wider">
              仙都传媒资深观察员 · 深度内参专区
            </span>
          </div>

          {/* User Access Indicator */}
          <div className="flex items-center gap-2">
            {isSubscriber ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[11px] font-mono font-bold">
                <Unlock className="w-3.5 h-3.5 text-amber-400" />
                <span>已验证授权席位：{userRole === 'org' ? '机构终端专线' : '资深观察员 (VIP)'}</span>
              </span>
            ) : (
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 text-slate-400 border border-slate-700 text-[11px] font-mono">
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                  <span>未激活深度权益 ({userRole === 'guest' ? '游客' : '普通市民'})</span>
                </span>
                <button
                  onClick={() => setUserRole('vip')}
                  className="px-2 py-0.5 bg-amber-600 hover:bg-amber-500 text-slate-950 text-[10px] font-bold rounded transition-colors cursor-pointer"
                >
                  点击体验已开通状态
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. Premium Hero Banner */}
      <header className="max-w-7xl mx-auto px-4 py-12 md:py-16 border-b border-amber-500/20">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/40 bg-amber-500/10 text-amber-300 text-xs font-mono tracking-wider uppercase">
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span>EXCLUSIVE INVESTIGATION & THINK-TANK DOSSIERS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white font-serif tracking-tight leading-tight">
            长垣产业深度内参与智库特稿
          </h1>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-sans">
            本专区汇集仙都传媒调查记者一线脱水纪要、长垣核心机房能耗白皮书及《装仙人》无损原声母带。为长垣产业领袖与深度观察家提供不受算法干扰的客观事实图景。
          </p>
        </div>
      </header>

      {/* 3. Main Exclusive Content Grid */}
      <section className="max-w-7xl mx-auto px-4 py-12 space-y-10">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-xl font-bold font-serif text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>特供调查报道与闭门研报 ({premiumArticles.length})</span>
          </h2>
          <span className="text-xs text-slate-500 font-mono">严格防扩散水印保护</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {premiumArticles.map((art) => {
            const hasAccess = isSubscriber || art.access === 'public';

            return (
              <div
                key={art.id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between hover:border-amber-500/50 transition-all group relative overflow-hidden"
              >
                <div>
                  {/* Category & Status */}
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="text-amber-400 font-mono font-semibold">
                      {art.section === 'depth'
                        ? '深度调查'
                        : art.section === 'finance'
                        ? '财经智产'
                        : '特别企划'}
                    </span>
                    <span className="text-slate-500 text-[11px]">{art.publishedAt}</span>
                  </div>

                  {/* Article Title */}
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                    <Link href={`/article/${art.slug}`}>{art.title}</Link>
                  </h3>

                  {/* Summary / Deck */}
                  <p className="text-xs sm:text-sm text-slate-400 mt-2.5 leading-relaxed line-clamp-3">
                    {art.deck || art.summary}
                  </p>

                  {/* Tags */}
                  {art.tags && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {art.tags.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-slate-800/80 text-slate-400 text-[10px] font-mono"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom Action / Access Gate */}
                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <VerificationBadge status={art.status} />
                  </div>

                  {hasAccess ? (
                    <Link
                      href={`/article/${art.slug}`}
                      className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded text-xs flex items-center gap-1 transition-colors shadow-xs"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>全文研读</span>
                    </Link>
                  ) : (
                    <Link
                      href="/membership"
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 rounded text-xs flex items-center gap-1 transition-colors"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>开通观察员解锁</span>
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Whitepaper & Master Tape Downloads */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-slate-900/60 border border-amber-500/30 rounded-2xl p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold font-serif text-white flex items-center gap-2">
                <Download className="w-5 h-5 text-amber-400" />
                <span>资深观察员专享：智库白皮书与声学母带下载</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                包含智元47年秋季长垣算力集群能耗结构化数据包及《装仙人》高保真音频母带
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 flex items-center justify-between">
              <div className="space-y-1">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-amber-400" />
                  <span>长垣先进制造业与供暖管网秋季运行脱水白皮书.pdf</span>
                </div>
                <div className="text-slate-500 font-mono text-[11px]">
                  版本：智元47-秋季核准版 · 大小：18.4 MB
                </div>
              </div>
              <button
                onClick={() => {
                  if (!isSubscriber) {
                    alert('请先激活资深观察员身份以获取下载权限。');
                  } else {
                    alert('【安全水印嵌入中】已为当前终端生成带专属工号的内参文件。');
                  }
                }}
                className={`px-3 py-1.5 rounded font-bold transition-colors cursor-pointer ${
                  isSubscriber
                    ? 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                    : 'bg-slate-800 text-slate-500 border border-slate-700'
                }`}
              >
                {isSubscriber ? '下载白皮书' : '需VIP权限'}
              </button>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 flex items-center justify-between">
              <div className="space-y-1">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <Headphones className="w-4 h-4 text-rose-400" />
                  <span>《装仙人》秋季号声音采样母带 FLAC 24bit/96kHz</span>
                </div>
                <div className="text-slate-500 font-mono text-[11px]">
                  收录：老工业厂区驻极体回声采样 · 大小：280 MB
                </div>
              </div>
              <button
                onClick={() => {
                  if (!isSubscriber) {
                    alert('请先激活资深观察员身份以获取原声母带试听。');
                  } else {
                    alert('正在加载仙都传媒无损音频串流...');
                  }
                }}
                className={`px-3 py-1.5 rounded font-bold transition-colors cursor-pointer ${
                  isSubscriber
                    ? 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                    : 'bg-slate-800 text-slate-500 border border-slate-700'
                }`}
              >
                {isSubscriber ? '无损试听' : '需VIP权限'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Gating Promotion for Non-VIP */}
      {!isSubscriber && (
        <section className="max-w-4xl mx-auto px-4 pt-8">
          <div className="bg-amber-500/10 border border-amber-500/40 rounded-xl p-6 text-center space-y-3">
            <h3 className="text-lg font-bold text-amber-300 font-serif">
              想要畅读全部深度调查与获取一手原始智库数据？
            </h3>
            <p className="text-xs text-slate-300 max-w-lg mx-auto leading-relaxed">
              升级为《今日长垣》资深观察员，每月仅需 28 工币。您也可以点击右下角验收控制台（Debug）随时切换身份进行功能审阅。
            </p>
            <div className="pt-2">
              <Link
                href="/membership"
                className="px-6 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs inline-flex items-center gap-1.5 transition-colors shadow-md"
              >
                <span>查看会员开通方案</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
