'use client';

import React from 'react';
import { ArticleUpdate } from '@/types/content';
import { X, History, AlertCircle, CheckCircle2, ShieldAlert } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  articleTitle: string;
  publishedAt: string;
  updatedAt: string;
  updates?: ArticleUpdate[];
}

export default function CorrectionsDrawer({
  isOpen,
  onClose,
  articleTitle,
  publishedAt,
  updatedAt,
  updates = [],
}: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl z-10 flex flex-col border-l border-slate-200">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-blue-600" />
            <div>
              <h3 className="text-sm font-bold text-slate-900">版本历史与更正记录</h3>
              <p className="text-[11px] text-slate-500">今日长垣采编透明度与公开勘误准则</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
          <div className="p-3 bg-blue-50/60 border border-blue-100 rounded text-slate-700 leading-relaxed">
            <span className="font-semibold text-blue-900 block mb-1">报道标的：</span>
            <p className="font-medium">{articleTitle}</p>
            <div className="mt-2 pt-2 border-t border-blue-200/50 flex justify-between text-[11px] text-slate-500">
              <span>初次签发：{publishedAt}</span>
              <span>最新版本：{updatedAt}</span>
            </div>
          </div>

          {/* Current Version Card */}
          <div className="border border-emerald-300 bg-emerald-50/40 rounded p-3 relative">
            <div className="flex items-center justify-between mb-1.5">
              <span className="inline-flex items-center gap-1 text-emerald-800 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>当前公开生效版本 (CURRENT)</span>
              </span>
              <span className="text-[11px] text-slate-500">{updatedAt}</span>
            </div>
            <p className="text-slate-600">
              读者目前正在阅读的版本。包含截至目前所有已核验的现场补充、表述校正与数据微调。
            </p>
          </div>

          {/* History / Updates Stream */}
          <div>
            <h4 className="font-bold text-slate-800 mb-2 uppercase tracking-wider text-[11px]">
              历史修订与更正日志 ({updates.length} 条记录)
            </h4>

            {updates.length === 0 ? (
              <div className="p-4 border border-dashed border-slate-200 text-center text-slate-400 rounded">
                本篇报道自初次签发以来，除例行标点排版校对无修改外，暂无事实性修正记录。
              </div>
            ) : (
              <div className="space-y-3 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {updates.map((item, idx) => {
                  const isCorrection = item.type === 'correction' || item.type === 'retraction';
                  return (
                    <div key={idx} className="relative pl-7">
                      {/* Timeline dot */}
                      <span
                        className={`absolute left-1.5 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-white -translate-x-1/2 ${
                          isCorrection ? 'bg-orange-500' : 'bg-blue-600'
                        }`}
                      />

                      <div className="bg-slate-50 border border-slate-200 rounded p-3">
                        <div className="flex items-center justify-between mb-1">
                          <span
                            className={`font-semibold px-1.5 py-0.5 rounded text-[10px] ${
                              item.type === 'correction'
                                ? 'bg-orange-100 text-orange-800'
                                : item.type === 'clarification'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {item.type === 'correction'
                              ? '事实更正 (CORRECTION)'
                              : item.type === 'clarification'
                              ? '澄清补充 (CLARIFICATION)'
                              : '内容更新 (UPDATE)'}
                          </span>
                          <span className="text-slate-400 text-[11px]">{item.at}</span>
                        </div>

                        <div className="space-y-1 mt-2 text-slate-700">
                          <div>
                            <span className="font-semibold text-slate-900">修改内容：</span>
                            <span>{item.summary}</span>
                          </div>
                          <div>
                            <span className="font-semibold text-slate-900">修改原因：</span>
                            <span className="text-slate-600">{item.reason}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Ethics statement */}
          <div className="p-3 bg-slate-100 rounded text-[11px] text-slate-500 leading-relaxed border border-slate-200 flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <p>
              今日长垣采编准则严禁私自静默修改报道中的实质事实。任何涉及人名、职务、技术参数、事件定性的修改均须在此保留透明回溯线索。
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-medium transition-colors"
          >
            关闭面板
          </button>
        </div>
      </div>
    </div>
  );
}
