'use client';

import React, { useState, useEffect } from 'react';
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
  Database,
  Layers,
  Sparkles,
  ChevronRight,
  Eye,
  CheckCircle2,
  X,
  Radio,
  FileCode,
  ShieldCheck,
} from 'lucide-react';
import VerificationBadge from '@/components/article/VerificationBadge';

interface Props {
  exclusiveArticles: Article[];
  publicPreviews: Article[];
}

export default function PremiumClient({ exclusiveArticles, publicPreviews }: Props) {
  const { userRole, setUserRole } = useApp();
  const isSubscriber = userRole === 'vip' || userRole === 'org';

  const [showWelcome, setShowWelcome] = useState(false);
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  // Check URL param or session storage for first-time entry welcome
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const isWelcomeFromQuery = params.get('welcome') === '1';
      const justSubscribed = sessionStorage.getItem('just_subscribed_premium');

      if ((isWelcomeFromQuery || justSubscribed) && isSubscriber) {
        setShowWelcome(true);
        sessionStorage.removeItem('just_subscribed_premium');
      }
    }
  }, [isSubscriber]);

  return (
    <div className="w-full bg-slate-950 text-slate-100 min-h-screen pb-24">
      {/* 1. First Entry Welcome Banner */}
      {showWelcome && (
        <div className="bg-linear-to-r from-amber-600 via-amber-500 to-amber-700 text-slate-950 px-4 py-3 shadow-lg relative animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-slate-950 text-amber-400 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="text-xs sm:text-sm font-medium">
                <span className="font-bold">欢迎尊贵的资深观察员！</span>
                您的终端（CY-NODE-2047-A9）已完成高阶鉴权，深度空间专属特刊、智库白皮书、原始工勘与无损母带已全部为您解锁。
              </div>
            </div>
            <button
              onClick={() => setShowWelcome(false)}
              className="p-1 text-slate-900 hover:text-slate-950 hover:bg-black/10 rounded transition-colors cursor-pointer"
              title="关闭提示"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 2. Premium Top Masthead */}
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
              仙都传媒资深观察员 · 专属深度空间
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
                <Link
                  href="/membership"
                  className="px-2 py-0.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-[10px] font-bold rounded transition-colors cursor-pointer"
                >
                  去开通观察员
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Premium Hero Banner */}
      <header className="max-w-7xl mx-auto px-4 py-12 md:py-16 border-b border-amber-500/20">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/40 bg-amber-500/10 text-amber-300 text-xs font-mono tracking-wider uppercase">
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span>EXCLUSIVE INVESTIGATION & THINK-TANK DOSSIERS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white font-serif tracking-tight leading-tight">
            主站未公开的深度空间与研报智库
          </h1>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-sans">
            本空间为长垣资深观察员专属开辟，严格与公开主站内容区隔。汇集一线闭门研报、算力机房PUE季度白皮书、西区地下管廊原始工勘测绘手稿以及《装仙人》高保真声学母带。
          </p>
        </div>
      </header>

      {/* 4. Exclusive Main Content Section (Strictly access === 'member' | 'premium') */}
      <section className="max-w-7xl mx-auto px-4 py-12 space-y-10">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="space-y-1">
            <h2 className="text-xl font-bold font-serif text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>会员专属特供报道与闭门特刊 ({exclusiveArticles.length})</span>
            </h2>
            <p className="text-xs text-slate-400">
              严格限权：仅限资深观察员（VIP）或机构席位调阅，全篇加注微网安全水印
            </p>
          </div>
          <span className="text-xs text-amber-500/80 font-mono font-bold bg-amber-950/60 border border-amber-500/30 px-2.5 py-1 rounded">
            MEMBER EXCLUSIVE
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exclusiveArticles.map((art) => {
            const hasAccess = isSubscriber;

            return (
              <div
                key={art.id}
                className="bg-slate-900 border border-amber-500/30 rounded-xl p-6 flex flex-col justify-between hover:border-amber-400 transition-all group relative overflow-hidden shadow-lg shadow-black/40"
              >
                <div>
                  {/* Category & Badge */}
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="text-amber-400 font-mono font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {art.section === 'depth'
                        ? '会员独家调查'
                        : art.section === 'finance'
                        ? '量化数据研报'
                        : '《装仙人》特刊数字刊'}
                    </span>
                    <span className="text-slate-500 text-[11px] font-mono">{art.publishedAt}</span>
                  </div>

                  {/* Article Title */}
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors leading-snug font-serif">
                    <Link href={art.brand === 'zhuangxianren' ? `/zhuangxianren/article/${art.slug}` : `/article/${art.slug}`}>
                      {art.title}
                    </Link>
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
                          className="px-2 py-0.5 rounded bg-amber-950/40 text-amber-300/80 border border-amber-500/20 text-[10px] font-mono"
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
                      href={art.brand === 'zhuangxianren' ? `/zhuangxianren/article/${art.slug}` : `/article/${art.slug}`}
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
                      <Lock className="w-3.5 h-3.5 text-amber-400" />
                      <span>开通观察员解锁</span>
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Member-Exclusive Data Whitepaper & Raw Attachments */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-slate-900/90 border border-amber-500/40 rounded-2xl p-6 md:p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-xl font-bold font-serif text-white flex items-center gap-2">
                <Download className="w-5 h-5 text-amber-400" />
                <span>独家资源库：原始附件、数据字典与音频母带</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                包含长垣重点管网工勘剖面、算力集群高频能耗CSV与《装仙人》FLAC 24bit/96kHz高解析度录音
              </p>
            </div>
            <span className="text-[11px] font-mono text-amber-400 self-start md:self-auto bg-amber-950/40 px-2 py-1 rounded border border-amber-500/20">
              FORMAT: PDF / CSV / FLAC
            </span>
          </div>

          {downloadNotice && (
            <div className="p-3 rounded-lg bg-amber-500/20 border border-amber-500/50 text-amber-300 text-xs flex items-center justify-between">
              <span>{downloadNotice}</span>
              <button
                onClick={() => setDownloadNotice(null)}
                className="text-amber-400 hover:text-white cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {/* Whitepaper 1 */}
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>长垣智算中心PUE实测能耗白皮书.pdf</span>
                </div>
                <div className="text-slate-500 font-mono text-[11px]">
                  含完整数据字典 · 28处机房脱水CSV · 18.4 MB
                </div>
              </div>
              <button
                onClick={() => {
                  if (!isSubscriber) {
                    setDownloadNotice('⚠️ 权限不足：请先激活资深观察员或机构席位以获取原始白皮书下载。');
                  } else {
                    setDownloadNotice('✅【终端水印已植入】《长垣智算中心PUE实测能耗白皮书.pdf》数据包已发送至终端 CY-NODE-2047-A9 下载队列。');
                  }
                }}
                className={`w-full py-2 rounded font-bold transition-colors cursor-pointer text-xs ${
                  isSubscriber
                    ? 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                    : 'bg-slate-800 text-slate-400 border border-slate-700 hover:text-amber-300'
                }`}
              >
                {isSubscriber ? '下载完整白皮书与CSV' : '需观察员权限'}
              </button>
            </div>

            {/* Raw Geotechnical Dossier */}
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <Database className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>西区地下管廊原始工勘岩溶测绘手稿.zip</span>
                </div>
                <div className="text-slate-500 font-mono text-[11px]">
                  含42处岩芯声波波形数据 · CAD断面矢量图 · 34.2 MB
                </div>
              </div>
              <button
                onClick={() => {
                  if (!isSubscriber) {
                    setDownloadNotice('⚠️ 权限不足：原始工勘档案仅对已认证观察员终端开放。');
                  } else {
                    setDownloadNotice('✅【档案调阅成功】西区地下管廊工程勘测附录已解密并生成防伪数字副本。');
                  }
                }}
                className={`w-full py-2 rounded font-bold transition-colors cursor-pointer text-xs ${
                  isSubscriber
                    ? 'bg-cyan-500 text-slate-950 hover:bg-cyan-400'
                    : 'bg-slate-800 text-slate-400 border border-slate-700 hover:text-cyan-300'
                }`}
              >
                {isSubscriber ? '调阅原始工勘档案包' : '需观察员权限'}
              </button>
            </div>

            {/* FLAC Audio Master Tape */}
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <Headphones className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>《装仙人》秋季号原声母带 FLAC 24/96</span>
                </div>
                <div className="text-slate-500 font-mono text-[11px]">
                  收录老厂房驻极体回声与城市谐波采样 · 280 MB
                </div>
              </div>
              <button
                onClick={() => {
                  if (!isSubscriber) {
                    setDownloadNotice('⚠️ 权限不足：无损母带串流与下载需资深观察员权限。');
                  } else {
                    setDownloadNotice('✅【音频串流建立】正在向终端声学插孔推送 24bit/96kHz 无损音频串流...');
                  }
                }}
                className={`w-full py-2 rounded font-bold transition-colors cursor-pointer text-xs ${
                  isSubscriber
                    ? 'bg-rose-600 text-white hover:bg-rose-500'
                    : 'bg-slate-800 text-slate-400 border border-slate-700 hover:text-rose-300'
                }`}
              >
                {isSubscriber ? '无损母带试听与下载' : '需观察员权限'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Public Previews & Lead Generation (Clearly marked as "公开预览", strictly not mixed) */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div className="space-y-0.5">
              <h3 className="text-base font-bold text-slate-200 flex items-center gap-2">
                <Radio className="w-4 h-4 text-blue-400" />
                <span>公开报道节选参考（公开预览）</span>
              </h3>
              <p className="text-xs text-slate-500">
                以下内容已在《今日长垣》主站公开刊发，此处仅作为深度内参的背景导读参考，不属于会员付费专属权益
              </p>
            </div>
            <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
              PUBLIC PREVIEW
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {publicPreviews.map((art) => (
              <div
                key={art.id}
                className="bg-slate-950/60 border border-slate-800/60 rounded-lg p-4 flex flex-col justify-between hover:border-slate-700 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 font-mono mb-1.5">
                    <span className="text-blue-400">公开预览 · {art.section === 'depth' ? '深度频道' : '财经频道'}</span>
                    <span>{art.publishedAt}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-200 hover:text-white leading-snug">
                    <Link href={`/article/${art.slug}`}>{art.title}</Link>
                  </h4>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2">{art.summary}</p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-900 flex items-center justify-between text-xs">
                  <span className="text-slate-500 text-[11px]">全网开放免费查阅</span>
                  <Link
                    href={`/article/${art.slug}`}
                    className="text-blue-400 hover:text-blue-300 font-medium text-xs flex items-center gap-1"
                  >
                    <span>阅读主站原文</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Gate Promotion for Non-VIP */}
      {!isSubscriber && (
        <section className="max-w-4xl mx-auto px-4 pt-4">
          <div className="bg-amber-500/10 border border-amber-500/40 rounded-xl p-6 text-center space-y-3">
            <h3 className="text-lg font-bold text-amber-300 font-serif">
              解锁资深观察员专属深度空间
            </h3>
            <p className="text-xs text-slate-300 max-w-lg mx-auto leading-relaxed">
              升级为《今日长垣》资深观察员，每月仅需 28 工币。畅享主站没有的闭门研报、原始工勘数据字典及《装仙人》高保真音频母带。
            </p>
            <div className="pt-2">
              <Link
                href="/membership"
                className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs inline-flex items-center gap-1.5 transition-colors shadow-md cursor-pointer"
              >
                <span>立即进入会员方案体验支付</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
