import React from 'react';
import Link from 'next/link';
import { FileQuestion, ArrowLeft, Search, Compass, Archive } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-6">
      <div className="w-16 h-16 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto text-slate-500">
        <FileQuestion className="w-8 h-8 text-blue-600" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
          ERROR 404 · 卷宗未检索到
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 font-serif">
          该文献或报道页面不存在或已归档调整
        </h1>
        <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
          您所查阅的卷宗可能尚未向公众正式签发、已被更正合并，或路径格式有误。
        </p>
      </div>

      {/* Suggested Navigation Actions */}
      <div className="pt-4 flex flex-wrap items-center justify-center gap-3 text-xs">
        <Link
          href="/"
          className="px-4 py-2.5 bg-blue-700 hover:bg-blue-600 text-white font-bold rounded-lg flex items-center gap-1.5 transition-colors shadow-2xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>返回《今日长垣》主门户首页</span>
        </Link>

        <Link
          href="/search"
          className="px-4 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
        >
          <Search className="w-3.5 h-3.5 text-slate-500" />
          <span>全站关键词检索</span>
        </Link>

        <Link
          href="/archive"
          className="px-4 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
        >
          <Archive className="w-3.5 h-3.5 text-slate-500" />
          <span>查阅历史新闻卷宗库</span>
        </Link>
      </div>
    </div>
  );
}
