'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp, UserRole } from '@/context/AppContext';
import {
  Wrench,
  AlertTriangle,
  Users,
  Shield,
  Layers,
  ChevronDown,
  ChevronUp,
  X,
  ExternalLink,
  CheckCircle,
} from 'lucide-react';

export default function DebugToolbar() {
  const {
    debugEnabled,
    setDebugEnabled,
    userRole,
    setUserRole,
    isMajorEventMode,
    setIsMajorEventMode,
  } = useApp();

  const [collapsed, setCollapsed] = useState(false);

  // If debug mode is not activated (URL doesn't have ?debug=1 and not manually toggled), hide completely!
  if (!debugEnabled) {
    return null;
  }

  return (
    <aside
      aria-label="验收测试控制台"
      className="fixed bottom-3 right-3 z-50 max-w-sm w-full bg-slate-900/95 text-slate-100 border-2 border-amber-500 rounded-xl shadow-2xl backdrop-blur-md text-xs font-sans overflow-hidden"
    >
      {/* Header bar */}
      <div className="bg-amber-500 text-slate-950 px-3 py-1.5 font-bold flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Wrench className="w-3.5 h-3.5" />
          <span>今日长垣 · 施工验收控制台 (DEBUG)</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-0.5 hover:bg-amber-600 rounded cursor-pointer"
            title={collapsed ? '展开' : '收起'}
          >
            {collapsed ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setDebugEnabled(false)}
            className="p-0.5 hover:bg-amber-600 rounded cursor-pointer"
            title="关闭控制台"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!collapsed && (
        <div className="p-3 space-y-3 divide-y divide-slate-800">
          {/* 1. Identity Switcher */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3 text-blue-400" />
                <span>模拟用户身份：</span>
              </span>
              <span className="font-mono text-amber-400 uppercase font-bold">{userRole}</span>
            </div>

            <div className="grid grid-cols-4 gap-1 text-[10px]">
              {(['guest', 'citizen', 'vip', 'org'] as UserRole[]).map((r) => (
                <button
                  key={r}
                  onClick={() => setUserRole(r)}
                  className={`py-1 rounded font-mono font-bold uppercase transition-colors cursor-pointer ${
                    userRole === r
                      ? 'bg-amber-500 text-slate-950 shadow-xs'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-slate-400">
              切换 VIP/org 可解锁 /premium 深度专区与白皮书下载。
            </p>
          </div>

          {/* 2. Major Event Emergency Mode Switch */}
          <div className="pt-2 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1 font-bold text-rose-400">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>重大事件应急模式：</span>
              </span>
              <button
                onClick={() => setIsMajorEventMode(!isMajorEventMode)}
                className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer transition-colors ${
                  isMajorEventMode
                    ? 'bg-rose-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                {isMajorEventMode ? '已开启 (ON)' : '已关闭 (OFF)'}
              </button>
            </div>
            <p className="text-[10px] text-slate-400">
              开启后首页置顶红色应急广播条、防灾指引与免付费公服专条。
            </p>
          </div>

          {/* 3. Fast Route Navigation for Acceptance (Test A-L) */}
          <div className="pt-2 space-y-1 text-[11px]">
            <span className="text-slate-400 block font-semibold mb-1">验收快捷通道：</span>
            <div className="grid grid-cols-2 gap-1 text-[10px]">
              <Link
                href="/premium"
                className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded truncate"
              >
                💎 深度空间 (/premium)
              </Link>
              <Link
                href="/zhuangxianren"
                className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-rose-300 rounded truncate"
              >
                ✨ 《装仙人》特刊
              </Link>
              <Link
                href="/topic/winter-energy-2047"
                className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-blue-300 rounded truncate"
              >
                🧭 持续专题 (/topic)
              </Link>
              <Link
                href="/me"
                className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-emerald-300 rounded truncate"
              >
                👤 个人终端 (/me)
              </Link>
              <Link
                href="/corrections"
                className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded truncate"
              >
                🛡️ 公开勘误 (/corrections)
              </Link>
              <Link
                href="/section/changyuan"
                className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded truncate"
              >
                📑 频道页 (/section)
              </Link>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
