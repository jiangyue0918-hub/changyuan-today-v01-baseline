import React from 'react';
import { VerificationStatus } from '@/types/content';
import { ShieldCheck, Clock, AlertTriangle, FileText, CheckCircle2, History } from 'lucide-react';

interface Props {
  status: VerificationStatus;
  hasUpdates?: boolean;
  onOpenHistory?: () => void;
}

export default function VerificationBadge({ status, hasUpdates, onOpenHistory }: Props) {
  const configMap: Record<
    VerificationStatus,
    { label: string; bg: string; text: string; border: string; icon: React.ReactNode; desc: string }
  > = {
    verified: {
      label: '多方核验已通过',
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      border: 'border-emerald-200',
      icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />,
      desc: '本篇报道已由仙都传媒采编团队完成双源独立交叉核验与主编签发。',
    },
    depth: {
      label: '深度采编调查',
      bg: 'bg-indigo-50',
      text: 'text-indigo-700',
      border: 'border-indigo-200',
      icon: <FileText className="w-3.5 h-3.5 text-indigo-600" />,
      desc: '包含一线实地走访、数据取样或深度对谈的专题调研报道。',
    },
    updating: {
      label: '事件持续跟进中',
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      border: 'border-blue-200',
      icon: <Clock className="w-3.5 h-3.5 text-blue-600" />,
      desc: '此事件正处于发展阶段，采编记者正于现场持续发回补充报道。',
    },
    breaking: {
      label: '突发即时初报',
      bg: 'bg-red-50',
      text: 'text-red-700',
      border: 'border-red-200',
      icon: <AlertTriangle className="w-3.5 h-3.5 text-red-600" />,
      desc: '事发初期的即时通报，部分细节仍在现场滚动核验。',
    },
    unverified: {
      label: '待多方交叉核验',
      bg: 'bg-amber-50',
      text: 'text-amber-700',
      border: 'border-amber-200',
      icon: <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />,
      desc: '来自单一现场目击或初步口传，尚未取得官方或技术遥测交叉佐证。',
    },
    corrected: {
      label: '包含公开更正',
      bg: 'bg-orange-50',
      text: 'text-orange-700',
      border: 'border-orange-200',
      icon: <History className="w-3.5 h-3.5 text-orange-600" />,
      desc: '本报道发布后经读者或记者核验发现事实勘误，已追加透明修正说明。',
    },
    retracted: {
      label: '已撤稿',
      bg: 'bg-rose-50',
      text: 'text-rose-700',
      border: 'border-rose-200',
      icon: <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />,
      desc: '经核实原报道存在重大失实，已被编辑部撤回并记录存档。',
    },
    archived: {
      label: '历史归档',
      bg: 'bg-slate-100',
      text: 'text-slate-600',
      border: 'border-slate-300',
      icon: <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />,
      desc: '报道已作为智元纪年历史文献封存。',
    },
  };

  const current = configMap[status] || configMap.verified;

  return (
    <div className="flex flex-wrap items-center gap-2 text-xs">
      <div
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm border ${current.bg} ${current.border} ${current.text} font-medium`}
        title={current.desc}
      >
        {current.icon}
        <span>核验状态：{current.label}</span>
      </div>

      {hasUpdates && onOpenHistory && (
        <button
          type="button"
          onClick={onOpenHistory}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-sm border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium cursor-pointer transition-colors shadow-2xs"
        >
          <History className="w-3.5 h-3.5 text-blue-600" />
          <span>查看版本历史与更正 ({hasUpdates ? '有更新' : '初始版本'})</span>
        </button>
      )}
    </div>
  );
}
