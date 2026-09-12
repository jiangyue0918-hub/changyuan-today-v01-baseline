'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  AlertOctagon,
  Radio,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  MapPin,
  Clock,
  ExternalLink,
  Info,
} from 'lucide-react';

export default function MajorEventBanner() {
  const { isMajorEventMode, setIsMajorEventMode } = useApp();
  const [expanded, setExpanded] = useState(false);

  if (!isMajorEventMode) {
    return null;
  }

  return (
    <div className="w-full bg-rose-700 text-white border-b-2 border-rose-900 shadow-md">
      {/* 1. Main High-Visibility Emergency Header Strip */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center space-x-2.5">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
          </span>

          <span className="bg-rose-900 text-rose-100 font-mono font-bold px-1.5 py-0.5 rounded text-[10px] tracking-wider uppercase flex items-center gap-1">
            <Radio className="w-3 h-3 text-rose-300 animate-pulse" />
            <span>长垣市应急广播联动信道</span>
          </span>

          <span className="font-bold text-sm text-white font-serif">
            重大事件应急模式：长垣市启动寒潮Ⅱ级防御响应与全域热网调度保障
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-rose-100 hover:text-white flex items-center gap-1 font-semibold underline underline-offset-2 cursor-pointer"
          >
            <span>{expanded ? '收起应急细则' : '展开公共服务通告与防灾指引'}</span>
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => setIsMajorEventMode(false)}
            className="text-[11px] bg-rose-900 hover:bg-rose-950 text-rose-200 px-2 py-0.5 rounded transition-colors cursor-pointer"
            title="关闭应急模拟广播"
          >
            退出应急状态
          </button>
        </div>
      </div>

      {/* 2. Expanded Emergency Briefing Drawer */}
      {expanded && (
        <div className="border-t border-rose-600 bg-rose-800/90 px-4 py-4 text-xs animate-fadeIn">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Box 1: 受影响区域与交通调度 */}
            <div className="bg-rose-900/60 p-3 rounded border border-rose-600 space-y-1.5">
              <div className="font-bold flex items-center gap-1 text-rose-200">
                <MapPin className="w-3.5 h-3.5" />
                <span>受影响重点区域与交通调度</span>
              </div>
              <p className="text-rose-100 leading-relaxed">
                长垣西区供热管网升温升压巡查中，凤栖苑外环路地面桥梁除冰作业中，建议减速慢行。公共交通延长运营 45 分钟。
              </p>
            </div>

            {/* Box 2: 市政供暖应急电话与避寒点 */}
            <div className="bg-rose-900/60 p-3 rounded border border-rose-600 space-y-1.5">
              <div className="font-bold flex items-center gap-1 text-rose-200">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>市民避寒服务点与抢修专线</span>
              </div>
              <p className="text-rose-100 leading-relaxed">
                全市 12 处社区长者食堂开放 24 小时恒温休憩室，备有热姜汤与急救药品。市政热力抢修专席：<strong>800-47-CY-HEAT</strong>。
              </p>
            </div>

            {/* Box 3: 采编核验与辟谣发布 */}
            <div className="bg-rose-900/60 p-3 rounded border border-rose-600 space-y-1.5">
              <div className="font-bold flex items-center gap-1 text-rose-200">
                <Info className="w-3.5 h-3.5" />
                <span>突发事件事实辟谣与公共核验</span>
              </div>
              <p className="text-rose-100 leading-relaxed">
                网传“西区电厂供能中断”经市发改委现场遥测证实为谣言，当前供电负荷充沛。应急报道一律公开，免入付费墙。
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
