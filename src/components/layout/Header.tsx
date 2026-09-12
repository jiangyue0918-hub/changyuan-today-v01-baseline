'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Compass, ShieldCheck, UserCheck, Sparkles, Menu, X } from 'lucide-react';

const SECTIONS = [
  { id: 'changyuan', name: '长垣要闻', href: '/section/changyuan' },
  { id: 'finance', name: '财经智产', href: '/section/finance' },
  { id: 'society', name: '社会民生', href: '/section/society' },
  { id: 'depth', name: '深度调查', href: '/section/depth' },
  { id: 'culture', name: '科技文化', href: '/section/culture' },
  { id: 'sports', name: '体育健康', href: '/section/sports' },
  { id: 'lifestyle', name: '市井生活', href: '/section/lifestyle' },
  { id: 'audio', name: '音频专栏', href: '/section/audio' },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // If in Zhuangxianren sub-brand, we can show a tailored header or standard header with brand indicator
  const isZhuangxianren = pathname.startsWith('/zhuangxianren');

  return (
    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      {/* 1. Deep Neutral Group / Utility Topbar */}
      <div className="bg-slate-900 text-slate-300 text-xs px-4 py-1.5 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="font-semibold text-slate-200">仙都传媒集团</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">智元47年09月11日 星期二</span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:inline text-slate-400">长垣市 14℃ 阴转多云 西北风2级 · 空气良</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/archive" className="hover:text-white transition-colors">
              新闻档案卷宗
            </Link>
            <Link href="/corrections" className="hover:text-white transition-colors flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>更正记录</span>
            </Link>
            <Link href="/membership" className="text-slate-300 hover:text-white transition-colors font-medium">
              开通会员
            </Link>
            <Link href="/premium" className="text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1 font-bold">
              <span>💎 深度空间</span>
            </Link>
            <Link href="/me" className="hover:text-white transition-colors flex items-center gap-1">
              <UserCheck className="w-3 h-3" />
              <span>智能终端</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Main Masthead */}
      <div className="max-w-7xl mx-auto px-4 py-4 md:py-6 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link href="/" className="group block">
            <div className="flex items-baseline space-x-2">
              <h1 className="text-2xl md:text-4xl font-black tracking-tight text-slate-950 group-hover:text-blue-700 transition-colors font-serif">
                今日长垣
              </h1>
              <span className="text-xs md:text-sm font-bold tracking-widest text-slate-500 uppercase">
                TODAY CHANGYUAN
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5 tracking-normal">
              仙都传媒旗下主综合新闻门户 · 智元47年第254期
            </p>
          </Link>
        </div>

        {/* Brand Link: 《装仙人》 Distinct Badge & Search */}
        <div className="flex items-center space-x-3">
          <Link
            href="/zhuangxianren"
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-rose-500/30 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold tracking-wide transition-all shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-rose-600" />
            <span>《装仙人》独立子刊</span>
            <span className="bg-rose-600 text-white text-[10px] px-1.5 py-0.2 rounded-full">秋季号</span>
          </Link>

          <Link
            href="/search"
            className="flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md text-xs font-medium transition-colors"
          >
            <Search className="w-4 h-4 text-slate-500" />
            <span className="hidden md:inline">搜索报道 / 专题 / 实体</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 hover:text-slate-900"
            aria-label="切换菜单"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* 3. Primary Section Navigation */}
      <nav className="border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between overflow-x-auto scrollbar-none">
          <ul className="flex items-center space-x-1 sm:space-x-4 py-2 text-sm font-medium whitespace-nowrap">
            <li>
              <Link
                href="/"
                className={`px-2.5 py-1 rounded transition-colors ${
                  pathname === '/'
                    ? 'text-blue-700 font-bold bg-blue-50'
                    : 'text-slate-700 hover:text-blue-700'
                }`}
              >
                首页
              </Link>
            </li>
            {SECTIONS.map((sec) => {
              const active = pathname === sec.href;
              return (
                <li key={sec.id}>
                  <Link
                    href={sec.href}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      active
                        ? 'text-blue-700 font-bold bg-blue-50'
                        : 'text-slate-700 hover:text-blue-700'
                    }`}
                  >
                    {sec.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden lg:flex items-center space-x-3 text-xs text-slate-600 pl-4 border-l border-slate-200 whitespace-nowrap">
            <Link href="/topic/winter-energy-2047" className="text-blue-600 hover:underline flex items-center gap-1 font-semibold">
              <Compass className="w-3.5 h-3.5" />
              <span>重点专题：冬季热网保供</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-slate-50 px-4 py-4 space-y-3">
          <div className="grid grid-cols-2 gap-2 text-sm font-medium">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 bg-white rounded border border-slate-200 text-slate-800"
            >
              今日长垣 首页
            </Link>
            {SECTIONS.map((sec) => (
              <Link
                key={sec.id}
                href={sec.href}
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 bg-white rounded border border-slate-200 text-slate-800"
              >
                {sec.name}
              </Link>
            ))}
          </div>
          <div className="pt-2 border-t border-slate-200 flex flex-col gap-2 text-xs">
            <Link
              href="/zhuangxianren"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 bg-rose-50 text-rose-700 font-bold rounded flex items-center justify-between"
            >
              <span>进入《装仙人》独立子刊</span>
              <Sparkles className="w-4 h-4 text-rose-600" />
            </Link>
            <div className="flex justify-between text-slate-600 pt-1">
              <Link href="/archive" onClick={() => setMobileMenuOpen(false)}>档案库</Link>
              <Link href="/corrections" onClick={() => setMobileMenuOpen(false)}>更正公告</Link>
              <Link href="/membership" onClick={() => setMobileMenuOpen(false)}>会员中心</Link>
              <Link href="/me" onClick={() => setMobileMenuOpen(false)}>终端连接</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
