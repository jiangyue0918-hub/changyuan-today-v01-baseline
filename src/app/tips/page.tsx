'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Send, Shield, Lock, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function TipsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'society',
    content: '',
    location: '',
    isAnonymous: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6 mb-8">
        <div className="flex items-center space-x-2 text-xs text-slate-500 mb-2">
          <Link href="/" className="hover:text-blue-700">
            首页
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-medium">采编联系</span>
        </div>

        <h1 className="text-3xl font-black text-slate-950 font-serif">
          新闻线索提供与安全加密通道
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
          今日长垣采编中心实行信源严格保密制度。您的举报与线索将在端到端加密环境下直达当值核验主编。
        </p>
      </div>

      {submitted ? (
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-8 text-center space-y-3">
          <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
          <h2 className="text-xl font-bold text-emerald-950">线索已成功加密归档</h2>
          <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto">
            系统已生成安全投递凭据。当值主编将在 2 小时内完成真实性初步研判。若符合独立立项标准，记者将依法跟进。
          </p>
          <div className="pt-4">
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({ title: '', category: 'society', content: '', location: '', isAnonymous: true });
              }}
              className="px-4 py-2 bg-emerald-700 text-white rounded text-xs font-semibold hover:bg-emerald-800 transition-colors"
            >
              提交另一条线索
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-lg p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">线索简述标题 *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="例如：西区某支路供暖管道压力异常或路面微渗..."
              className="w-full px-3 py-2 border border-slate-300 rounded text-xs focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">线索分类</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded text-xs focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              >
                <option value="changyuan">长垣市政要事</option>
                <option value="society">公共民生与保供</option>
                <option value="depth">深度调查线索</option>
                <option value="finance">产业制造与经济</option>
                <option value="culture">科技创新与文化</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">事发地理区域</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="例如：凤栖原高新片区、西区工业园..."
                className="w-full px-3 py-2 border border-slate-300 rounded text-xs focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">线索详情描述与现场事实 *</label>
            <textarea
              required
              rows={5}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="请尽量提供客观时间、具体地点、现场所见事实。若有照片、工单编号或检测记录，请在文本中注明。"
              className="w-full px-3 py-2 border border-slate-300 rounded text-xs focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
            />
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-slate-100">
            <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isAnonymous}
                onChange={(e) => setFormData({ ...formData, isAnonymous: e.target.checked })}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span>匿名投递（不回传个人终端识别码）</span>
            </label>

            <button
              type="submit"
              className="px-5 py-2 bg-blue-700 hover:bg-blue-600 text-white font-bold rounded text-xs flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>加密投递线索</span>
            </button>
          </div>
        </form>
      )}

      {/* Security Statement */}
      <div className="mt-6 p-4 bg-slate-100 rounded border border-slate-200 text-xs text-slate-500 flex items-start gap-3">
        <Lock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          今日长垣法律事务部郑重声明：新闻线索投递通道受仙都传媒新闻保护公约约束。除非法律法规明确要求，编辑部绝对依法保护线索提供人的身份隐私安全。
        </p>
      </div>
    </div>
  );
}
