import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Copyright, CheckCircle2, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: '版权与转载引用许可 - 今日长垣',
  description: '仙都传媒旗下《今日长垣》与《装仙人》内容知识产权与转载授权说明。',
};

export default function LicensingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="border-b border-slate-200 pb-6 mb-8">
        <div className="flex items-center space-x-2 text-xs text-slate-500 mb-2">
          <Link href="/" className="hover:text-blue-700">
            首页
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-medium">版权合规</span>
        </div>

        <h1 className="text-3xl font-black text-slate-950 font-serif">
          版权与转载引用许可
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-2">
          仙都传媒集团知识产权与长垣传媒出版授权规范
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">
            1. 非营利性学术与公共教育引用
          </h2>
          <p>
            凡属各高校科研院所、公益市政智库就长垣城市治理、供暖调度、智能制造进行之非营利性学术分析，在注明出处（“引自仙都传媒·今日长垣，作者：某某”）的前提下，可直接引用单篇报道中不超过 30% 之文句或数据表格。
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">
            2. 商业机构转载与商业终端转播
          </h2>
          <p>
            商业网站、聚合客户端或企业内网若需完整转载《今日长垣》或《装仙人》原创特稿、封面人物专访或音视频节目母带，须事先取得仙都传媒版权部的书面授权协议，严禁擅自抓取洗稿或静默隐去记者实名。
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">
            3. 《装仙人》文化特刊视觉与音频母带保护
          </h2>
          <p>
            《装仙人》独立期刊之所有声音工程母带、剧场实验摄影及先锋视觉构图，版权均归特约作者与《装仙人》编辑部共同所有，任何机构不得将其用于商业AI模型训练或未经许可之衍生品开发。
          </p>
        </section>
      </div>
    </div>
  );
}
