import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, CheckCircle2, AlertTriangle, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: '采编准则与核验规范 - 今日长垣',
  description: '仙都传媒旗下《今日长垣》新闻采编独立性、事实核验与公开勘误准则。',
};

export default function EditorialStandardsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6 mb-8">
        <div className="flex items-center space-x-2 text-xs text-slate-500 mb-2">
          <Link href="/" className="hover:text-blue-700">
            首页
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-medium">采编公约</span>
        </div>

        <h1 className="text-3xl font-black text-slate-950 font-serif">
          采编准则与事实核验规范
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
          仙都传媒集团《今日长垣》编辑部新闻从业公约（智元47年版）
        </p>
      </div>

      <div className="prose prose-slate max-w-none text-sm leading-relaxed space-y-6 text-slate-700">
        <section className="bg-white border border-slate-200 rounded-lg p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>第一条：双源交叉独立核验机制</span>
          </h2>
          <p>
            凡《今日长垣》冠以“已核实（verified）”标识之要闻报道，必须具备至少两路独立信源佐证，或经现场采编记者实地查验工单、遥测遥感数据确认无误。对于突发事件初期仅凭单一目击者发声的初报，必须如实标注“现场初报（unverified）”，并在正文开头向公众明示其核验状态。
          </p>
        </section>

        <section className="bg-white border border-slate-200 rounded-lg p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            <span>第二条：版本透明度与公开更正承诺</span>
          </h2>
          <p>
            本报坚决杜绝在读者不知情的情况下对新闻正文实施“静默修改”。凡涉及事实偏差、数据错报、人名职务误植，必须在文章顶部保留版本修改记录抽屉入口，并在全站《公开更正记录汇总》中备案修改时间、修改摘要及修正原因。
          </p>
        </section>

        <section className="bg-white border border-slate-200 rounded-lg p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <span>第三条：持续专题与非正史定案边界</span>
          </h2>
          <p>
            《今日长垣》所载之动态报道、各方引述及专题时间线，系采编团队在所处历史阶段忠实记录之现场切片，并非“世界永久绝对正史”。对于未经多方技术论证之推测性说法，编辑部在数据层统一界定为 WEB_DERIVED 或 PLACEHOLDER 级别，保留后续依客观新物证修订之空间。
          </p>
        </section>

        <section className="bg-white border border-slate-200 rounded-lg p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-600" />
            <span>第四条：商业利益隔离与独立调查</span>
          </h2>
          <p>
            深度调查部、财经智产部采编工作不受任何受访商业实体之赞助意愿干预。凡属付费赞助之定制宣讲内容，必须以显著标识在标题前缀冠以“【企业动态】”，不得伪装为独立新闻调查刊播。
          </p>
        </section>
      </div>
    </div>
  );
}
