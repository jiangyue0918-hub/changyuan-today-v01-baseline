import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-slate-950 text-slate-400 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Top brand row */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 pb-10 border-b border-slate-800">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-baseline space-x-2">
              <span className="text-xl font-black text-white font-serif tracking-tight">
                今日长垣
              </span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                TODAY CHANGYUAN
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs pr-4">
              仙都传媒旗下主综合新闻门户。承担完整原文、城市深度、产业智算、市政保供、人物专访与公共档案服务，坚持事实核验链与公开版本更正准则。
            </p>
            <div className="text-[11px] text-slate-500 space-y-1 pt-2">
              <p>母集团：仙都传媒集团（Xiandu Media Group）</p>
              <p>世界纪年：智元47年（2047）· 连续出版号：TC-47-PUB</p>
            </div>
          </div>

          {/* Column 1: Sections */}
          <div>
            <h4 className="text-slate-200 font-semibold mb-3 text-xs uppercase tracking-wider">
              新闻频道
            </h4>
            <ul className="space-y-2">
              <li><Link href="/section/changyuan" className="hover:text-white transition-colors">长垣要闻</Link></li>
              <li><Link href="/section/finance" className="hover:text-white transition-colors">财经智产</Link></li>
              <li><Link href="/section/society" className="hover:text-white transition-colors">社会民生</Link></li>
              <li><Link href="/section/depth" className="hover:text-white transition-colors">深度调查</Link></li>
              <li><Link href="/section/culture" className="hover:text-white transition-colors">科技文化</Link></li>
              <li><Link href="/section/sports" className="hover:text-white transition-colors">体育健康</Link></li>
              <li><Link href="/section/lifestyle" className="hover:text-white transition-colors">市井生活</Link></li>
              <li><Link href="/section/audio" className="hover:text-white transition-colors">音频专栏</Link></li>
            </ul>
          </div>

          {/* Column 2: Independent Sub-brand & Topics */}
          <div>
            <h4 className="text-slate-200 font-semibold mb-3 text-xs uppercase tracking-wider">
              品牌与专题
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/zhuangxianren" className="text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1">
                  <span>《装仙人》独立子刊</span>
                </Link>
              </li>
              <li><Link href="/topic/winter-energy-2047" className="hover:text-white transition-colors">冬季能源保供专题</Link></li>
              <li><Link href="/topic/fengqiyuan-upgrade" className="hover:text-white transition-colors">凤栖原片区更新工程</Link></li>
              <li><Link href="/topic/ai-industry-pulse" className="hover:text-white transition-colors">智算产业运行观察</Link></li>
              <li><Link href="/archive" className="hover:text-white transition-colors">智元历史卷宗库</Link></li>
              <li><Link href="/search" className="hover:text-white transition-colors">全站复合检索</Link></li>
            </ul>
          </div>

          {/* Column 3: Standards & Services */}
          <div>
            <h4 className="text-slate-200 font-semibold mb-3 text-xs uppercase tracking-wider">
              采编准则与服务
            </h4>
            <ul className="space-y-2">
              <li><Link href="/editorial-standards" className="hover:text-white transition-colors">采编与核验准则</Link></li>
              <li><Link href="/corrections" className="hover:text-white transition-colors">公开更正记录汇总</Link></li>
              <li><Link href="/tips" className="hover:text-white transition-colors">线索提供与安全通道</Link></li>
              <li><Link href="/licensing" className="hover:text-white transition-colors">版权与引用授权</Link></li>
              <li><Link href="/membership" className="hover:text-white transition-colors">会员服务与专享权益</Link></li>
              <li><Link href="/me" className="hover:text-white transition-colors">我的今日长垣 / 终端</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">关于仙都传媒</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-slate-500 text-[11px] gap-4">
          <p>
            © 智元47年 仙都传媒集团 今日长垣编辑部 版权所有 · 本站内容受长垣传媒公开出版条例保护
          </p>
          <p className="text-slate-600 text-center md:text-right">
            采编权限声明：本站记者仅在法定公开材料与公开采访授权范围内履行职责，严守市民隐私底线。
          </p>
        </div>
      </div>
    </footer>
  );
}
