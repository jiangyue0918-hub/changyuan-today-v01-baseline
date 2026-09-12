'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Smartphone, CheckCircle2, Sliders, Bell, Volume2, ShieldCheck, Bookmark, Trash2 } from 'lucide-react';

export default function MePage() {
  const [terminalId, setTerminalId] = useState('CY-NODE-2047-A9');
  const [isBound, setIsBound] = useState(true);
  const [prefs, setPrefs] = useState({
    largeText: false,
    autoAudio: true,
    breakingPush: true,
    offlineSync: true,
  });

  const [savedArticles, setSavedArticles] = useState([
    {
      title: '长垣西区智元热网低温管线完成秋季检修 提前迎接入冬保供测试',
      slug: 'changyuan-west-district-heat-network-maintenance-ready',
      time: '智元47年09月11日',
    },
    {
      title: '凤栖原外环快速路三标段今起试通车 城市早高峰通行效率提升22%',
      slug: 'fengqiyuan-outer-ring-expressway-trial-operation',
      time: '智元47年09月10日',
    },
  ]);

  const togglePref = (key: keyof typeof prefs) => {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const removeBookmark = (slug: string) => {
    setSavedArticles((prev) => prev.filter((item) => item.slug !== slug));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6 mb-8">
        <div className="flex items-center space-x-2 text-xs text-slate-500 mb-2">
          <Link href="/" className="hover:text-blue-700">
            首页
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-medium">智能终端服务</span>
        </div>

        <h1 className="text-3xl font-black text-slate-950 font-serif">
          我的今日长垣 / 终端连接
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-2">
          管理您与长垣智能节点的数据同步、阅读偏好及离线收藏卷宗
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Terminal Info Card */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Smartphone className="w-5 h-5 text-blue-600" />
            <h2 className="font-bold text-sm text-slate-900">当前设备终端状态</h2>
          </div>

          <div className="space-y-2 text-xs">
            <div>
              <span className="text-slate-400 block mb-0.5">识别信标：</span>
              <span className="font-mono font-bold text-slate-800">{terminalId}</span>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">协议网关：</span>
              <span className="text-slate-700">仙都传媒城市微枢纽 (Local Hub)</span>
            </div>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>已建立安全加密通道</span>
              </span>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100">
            <button
              onClick={() => alert('终端密钥已重新轮换并与本地存储同步。')}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-semibold transition-colors"
            >
              刷新终端密钥连接
            </button>
          </div>
        </div>

        {/* Preferences */}
        <div className="md:col-span-2 bg-white border border-slate-200 rounded-lg p-5 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Sliders className="w-5 h-5 text-blue-600" />
            <h2 className="font-bold text-sm text-slate-900">终端阅读与推送偏好</h2>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-2.5 rounded bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
              <div>
                <span className="font-bold text-slate-900 block">适老化大字与高对比度排版</span>
                <span className="text-slate-500 text-[11px]">正文字号适度放大，增强暗阶对比</span>
              </div>
              <input
                type="checkbox"
                checked={prefs.largeText}
                onChange={() => togglePref('largeText')}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
              />
            </label>

            <label className="flex items-center justify-between p-2.5 rounded bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
              <div>
                <span className="font-bold text-slate-900 block">晨读音频专栏自动连续播发</span>
                <span className="text-slate-500 text-[11px]">在有声播客结束后平滑过渡下一条短讯</span>
              </div>
              <input
                type="checkbox"
                checked={prefs.autoAudio}
                onChange={() => togglePref('autoAudio')}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
              />
            </label>

            <label className="flex items-center justify-between p-2.5 rounded bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
              <div>
                <span className="font-bold text-slate-900 block">突发快讯与核验更正通知</span>
                <span className="text-slate-500 text-[11px]">当阅读过的报道发生事实修正时主动提示</span>
              </div>
              <input
                type="checkbox"
                checked={prefs.breakingPush}
                onChange={() => togglePref('breakingPush')}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
              />
            </label>

            <label className="flex items-center justify-between p-2.5 rounded bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
              <div>
                <span className="font-bold text-slate-900 block">离线工作副本本地缓存</span>
                <span className="text-slate-500 text-[11px]">支持断网环境下快速检索最近已读卷宗</span>
              </div>
              <input
                type="checkbox"
                checked={prefs.offlineSync}
                onChange={() => togglePref('offlineSync')}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Bookmarks */}
      <div className="mt-8 bg-white border border-slate-200 rounded-lg p-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-blue-600" />
            <h2 className="font-bold text-sm text-slate-900">我的离线收藏卷宗 ({savedArticles.length})</h2>
          </div>
          <span className="text-xs text-slate-400">本地离线同步</span>
        </div>

        {savedArticles.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-400 border border-dashed border-slate-200 rounded">
            暂无收藏报道。在阅读文章时可点击“收藏”按钮随时加入。
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {savedArticles.map((item) => (
              <div key={item.slug} className="py-3 flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 hover:text-blue-700">
                    <Link href={`/article/${item.slug}`}>{item.title}</Link>
                  </h3>
                  <span className="text-[11px] text-slate-400">{item.time}</span>
                </div>
                <button
                  onClick={() => removeBookmark(item.slug)}
                  className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
                  title="移除收藏"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
