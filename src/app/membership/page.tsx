'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  Check,
  Shield,
  Zap,
  Sparkles,
  Lock,
  Coins,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  X,
  CreditCard,
  Cpu,
} from 'lucide-react';

type PaymentStep = 'idle' | 'verifying' | 'paying' | 'success';

export default function MembershipPage() {
  const router = useRouter();
  const { userRole, setUserRole, userCoins, setUserCoins } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [step, setStep] = useState<PaymentStep>('idle');
  const [planSelected, setPlanSelected] = useState<{
    name: string;
    coins: number;
    role: 'vip' | 'org';
  }>({
    name: '智元资深观察员 (月卡)',
    coins: 28,
    role: 'vip',
  });

  const handleStartPayment = (name: string, coins: number, role: 'vip' | 'org') => {
    setPlanSelected({ name, coins, role });
    setModalOpen(true);
    setStep('idle');
  };

  const handleConfirmPay = () => {
    // 步骤 1: 正在核验终端绑定状态 (1秒)
    setStep('verifying');

    setTimeout(() => {
      // 步骤 2: 扣划工币并下发防伪证书 (1.5秒)
      setStep('paying');

      setTimeout(() => {
        // 步骤 3: 支付成功 / 权益激活成功
        setStep('success');
        // 扣减工币（如果有）并更新角色
        setUserCoins(Math.max(0, userCoins - planSelected.coins));
        setUserRole(planSelected.role);

        if (typeof window !== 'undefined') {
          sessionStorage.setItem('just_subscribed_premium', '1');
        }

        // 步骤 4: 自动跳转至 /premium?welcome=1
        setTimeout(() => {
          setModalOpen(false);
          router.push('/premium?welcome=1');
        }, 1200);
      }, 1500);
    }, 1000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="text-center space-y-3 mb-12">
        <span className="text-xs font-mono font-bold tracking-widest uppercase text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          仙都传媒 · 今日长垣数字订阅计划
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 font-serif">
          成为今日长垣观察员，支持独立公共采编
        </h1>
        <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
          您的每一份支持，都将用于保障采编团队深入热网一线、算力机房与市井街角的无干预现场核验与事实调查。
        </p>
        <div className="pt-2 flex items-center justify-center gap-3">
          <Link
            href="/premium"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 bg-blue-50/80 border border-blue-200/80 px-3.5 py-1.5 rounded-full hover:bg-blue-100 transition-colors cursor-pointer"
          >
            <span>已经开通观察员权益？直接前往「深度空间」专属特刊</span>
            <span>→</span>
          </Link>
        </div>
      </div>

      {/* Subscription Tier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Tier 1: 市民通行证 */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-slate-900">市民通行证</h3>
              <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">基础服务</span>
            </div>
            <div className="mb-6">
              <span className="text-3xl font-black text-slate-950 font-serif">免费</span>
              <span className="text-xs text-slate-500 ml-1">/ 永久有效</span>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>全站要闻与公共民生报道无限制阅读</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>实时查看报道核验状态与公开更正日志</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>接收重大突发新闻终端即时推送</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-100">
            <Link
              href="/me"
              className="w-full block py-2.5 text-center text-xs font-bold rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-800 transition-colors"
            >
              {userRole === 'guest' ? '前往个人中心登录绑定' : '当前默认生效中'}
            </Link>
          </div>
        </div>

        {/* Tier 2: 智元资深观察员 (Featured) */}
        <div className="bg-slate-900 text-white rounded-xl p-6 flex flex-col justify-between border-2 border-blue-600 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg tracking-wider">
            RECOMMENDED
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-white">智元资深观察员</h3>
              <span className="text-xs bg-blue-900/80 text-blue-300 px-2 py-0.5 rounded">个人专享</span>
            </div>
            <div className="mb-6">
              <span className="text-3xl font-black text-white font-serif">28</span>
              <span className="text-xs text-slate-400 ml-1">长垣工币 / 月</span>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-400 shrink-0" />
                <span>包含市民通行证全部基础权益</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-400 shrink-0" />
                <span>独家调阅闭门能源研报与算力PUE白皮书</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-400 shrink-0" />
                <span>《装仙人》高保真FLAC无损母带与数字原件下载</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-400 shrink-0" />
                <span>地下综合管廊原始工勘测绘手稿档案权限</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-800 space-y-2">
            {userRole === 'vip' || userRole === 'org' ? (
              <Link
                href="/premium"
                className="w-full block py-2.5 text-center text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
              >
                已激活观察员身份 · 进入专属深度空间
              </Link>
            ) : (
              <button
                onClick={() => handleStartPayment('智元资深观察员 (月卡)', 28, 'vip')}
                className="w-full py-2.5 text-center text-xs font-bold rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-blue-900/30"
              >
                <Coins className="w-4 h-4 text-amber-300" />
                <span>支付 28 工币开通 / 升级观察员</span>
              </button>
            )}
            <p className="text-[11px] text-center text-slate-400">
              Demo 模拟长垣市民微网扣款 · 即时下发防伪证书
            </p>
          </div>
        </div>

        {/* Tier 3: 机构政企终端 */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-slate-900">机构政企终端</h3>
              <span className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded">多席位授权</span>
            </div>
            <div className="mb-6">
              <span className="text-3xl font-black text-slate-950 font-serif">240</span>
              <span className="text-xs text-slate-500 ml-1">长垣工币 / 年</span>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>支持 10 个以上企业/部门终端协同绑定</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>长垣产业运行数据包定期结构化归档导出</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>优先核验工单通道与定制舆情公报接入</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-100">
            <button
              onClick={() => handleStartPayment('机构政企专线 (年卡席位)', 240, 'org')}
              className="w-full py-2.5 text-center text-xs font-bold rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-800 transition-colors cursor-pointer"
            >
              模拟开通机构专线 (240工币)
            </button>
          </div>
        </div>
      </div>

      {/* 4. Payment Simulation Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 text-slate-100 rounded-2xl max-w-md w-full p-6 shadow-2xl relative overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-5">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-amber-400" />
                <h3 className="font-bold text-white text-sm">仙都传媒 · 模拟工币结算终端</h3>
              </div>
              {step !== 'verifying' && step !== 'paying' && (
                <button
                  onClick={() => setModalOpen(false)}
                  className="text-slate-400 hover:text-white p-1 rounded transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Modal Content depending on state */}
            {step === 'idle' && (
              <div className="space-y-4">
                <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>订购方案</span>
                    <span className="text-white font-bold">{planSelected.name}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>扣款账户</span>
                    <span className="text-amber-400 font-mono">长垣市民微网节点 (CY-2047-A9)</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>当前钱包余额</span>
                    <span className="font-mono text-emerald-400">{userCoins} 工币</span>
                  </div>
                  <div className="flex justify-between text-slate-400 border-t border-slate-800/80 pt-2 text-sm font-bold">
                    <span className="text-slate-200">应付金额</span>
                    <span className="text-amber-400 font-mono">{planSelected.coins} 工币</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-blue-950/40 border border-blue-500/30 text-blue-300 text-xs flex items-start gap-2">
                  <Shield className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>
                    系统将模拟核验长垣市民终端硬件凭证，自动完成工币代扣并下发防伪鉴权证书，支付后即刻为您开放全部特刊与白皮书。
                  </span>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    onClick={() => setModalOpen(false)}
                    className="flex-1 py-2.5 text-xs text-slate-400 border border-slate-700 hover:bg-slate-800 rounded-lg font-medium transition-colors cursor-pointer"
                  >
                    取消
                  </button>
                  <button
                    onClick={handleConfirmPay}
                    className="flex-1 py-2.5 text-xs bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Coins className="w-3.5 h-3.5 text-amber-300" />
                    <span>确认支付 {planSelected.coins} 工币</span>
                  </button>
                </div>
              </div>
            )}

            {step === 'verifying' && (
              <div className="py-8 text-center space-y-4 animate-in fade-in duration-200">
                <Loader2 className="w-10 h-10 text-blue-400 animate-spin mx-auto" />
                <div className="space-y-1">
                  <h4 className="font-bold text-white text-base">正在核验市民终端绑定状态...</h4>
                  <p className="text-xs text-slate-400 font-mono">
                    VERIFYING NODE: CY-NODE-2047-A9 · VALIDATING CITIZEN ID
                  </p>
                </div>
                <div className="text-[11px] text-slate-500">
                  长垣城市微电网多重签名确认中，预计耗时 1 秒...
                </div>
              </div>
            )}

            {step === 'paying' && (
              <div className="py-8 text-center space-y-4 animate-in fade-in duration-200">
                <div className="relative w-12 h-12 mx-auto">
                  <Coins className="w-12 h-12 text-amber-400 animate-bounce" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-white text-base">
                    正在划扣 {planSelected.coins} 长垣工币...
                  </h4>
                  <p className="text-xs text-amber-400 font-mono">
                    ISSUING VIP WATERMARK LICENSE KEY · ENCRYPTING
                  </p>
                </div>
                <div className="text-[11px] text-slate-500">
                  扣划微网能源补贴积分，向长垣数字知识产权局注册防伪水印...
                </div>
              </div>
            )}

            {step === 'success' && (
              <div className="py-8 text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-white text-base">支付成功！观察员身份已激活</h4>
                  <p className="text-xs text-emerald-400 font-mono">
                    AUTHORIZATION GRANTED · REDIRECTING TO PREMIUM
                  </p>
                </div>
                <div className="text-xs text-slate-400">
                  正在为您进入《今日长垣》专属深度空间...
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
