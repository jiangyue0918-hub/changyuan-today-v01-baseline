'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp, UserRole } from '@/context/AppContext';
import {
  Smartphone,
  CheckCircle2,
  Sliders,
  Bell,
  Volume2,
  ShieldCheck,
  Bookmark,
  Clock,
  BookOpen,
  Crown,
  Heart,
  EyeOff,
  Trash2,
  ExternalLink,
  ChevronRight,
  Info,
  Sparkles,
  Plus,
  Compass,
} from 'lucide-react';

export default function MePage() {
  const {
    userRole,
    setUserRole,
    bookmarks,
    toggleBookmark,
    readLater,
    toggleReadLater,
    history,
    followedTopics,
    toggleFollowTopic,
    followedEntities,
    toggleFollowEntity,
    dislikedTags,
    addDislikedTag,
    removeDislikedTag,
  } = useApp();

  const [terminalId] = useState('CY-NODE-2047-A9');
  const [activeTab, setActiveTab] = useState<
    'overview' | 'bookmarks' | 'readLater' | 'history' | 'following' | 'interests' | 'settings'
  >('overview');

  const [prefs, setPrefs] = useState({
    largeText: false,
    autoAudio: true,
    breakingPush: true,
    offlineSync: true,
  });

  const [newTagInput, setNewTagInput] = useState('');

  const togglePref = (key: keyof typeof prefs) => {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const roleNames: Record<UserRole, { title: string; badge: string; desc: string }> = {
    guest: {
      title: '临时访客 (GUEST)',
      badge: 'bg-slate-100 text-slate-700 border-slate-300',
      desc: '未绑定长垣市民数字信标，享受基础全站公开要闻访问。',
    },
    citizen: {
      title: '长垣市民基础通行证 (CITIZEN)',
      badge: 'bg-blue-50 text-blue-700 border-blue-200',
      desc: '已与本地终端安全通道绑定，享有公开新闻、更正追踪与本地离线缓存。',
    },
    vip: {
      title: '智元资深观察员 (VIP)',
      badge: 'bg-amber-500/20 text-amber-600 border-amber-400',
      desc: '享有特供深度调查、闭门研报、脱水白皮书下载及《装仙人》无损母带。',
    },
    org: {
      title: '机构政企终端席位 (ORG)',
      badge: 'bg-purple-100 text-purple-700 border-purple-300',
      desc: '多席位企业协同通道，接入全量数据导出与优先核验工单。',
    },
  };

  // Mock mapped details for bookmarks & read-later items
  const ARTICLE_MAP: Record<string, { title: string; time: string; section: string }> = {
    'changyuan-west-district-heat-network-maintenance-ready': {
      title: '长垣西区智元热网低温管线完成秋季检修 提前迎接入冬保供测试',
      time: '智元47年09月11日',
      section: '长垣要闻',
    },
    'inside-changyuan-smart-compute-center': {
      title: '探秘长垣智算微枢纽：万卡异构算力集群如何支撑全域智慧调度',
      time: '智元47年09月08日',
      section: '深度调查',
    },
    'xiandu-media-industry-report-2047': {
      title: '仙都传媒发布智元47年长垣实体产业半年研报：高端装备与算力协同加速',
      time: '智元47年09月10日',
      section: '财经智产',
    },
    'fengqiyuan-outer-ring-expressway-trial-operation': {
      title: '凤栖原外环快速路三标段今起试通车 城市早高峰通行效率提升22%',
      time: '智元47年09月10日',
      section: '社会民生',
    },
    'zhuangxianren-cover-sound-designer-lin-ruoxi': {
      title: '《装仙人》封面特稿：声音记录者林若希与工业回声的深宵对话',
      time: '智元47年09月09日',
      section: '先锋特刊',
    },
  };

  const TOPIC_MAP: Record<string, { title: string; slug: string; updates: number }> = {
    'topic-winter-energy-2047': {
      title: '长垣智元47年入冬供暖与能源储备全周期追踪',
      slug: 'winter-energy-2047',
      updates: 8,
    },
    'topic-ai-industry-pulse': {
      title: '长垣智算微枢纽与先进制造产业协同观察',
      slug: 'ai-industry-pulse',
      updates: 5,
    },
    'topic-green-mobility-2047': {
      title: '长垣绿色交通网络与低碳出行体系建设',
      slug: 'green-mobility-2047',
      updates: 4,
    },
  };

  const ENTITY_MAP: Record<string, { name: string; type: string; url: string }> = {
    'person-chen-wenlin': {
      name: '陈文林 (总工程师)',
      type: '人物卷宗',
      url: '/people/chen-wenlin',
    },
    'person-lin-ruoxi': {
      name: '林若希 (声音艺术家)',
      type: '人物卷宗',
      url: '/people/lin-ruoxi',
    },
    'org-xiandu-media': {
      name: '仙都传媒集团 (母集团)',
      type: '机构卷宗',
      url: '/organizations/xiandu-media',
    },
    'org-changyuan-energy': {
      name: '长垣市热力保供集团',
      type: '机构卷宗',
      url: '/organizations/changyuan-energy',
    },
    'loc-west-district': {
      name: '长垣西区工业走廊',
      type: '地标片区',
      url: '/locations/west-district',
    },
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* 1. Header & Navigation Breadcrumb */}
      <div className="border-b-2 border-slate-900 pb-5">
        <div className="flex items-center space-x-2 text-xs text-slate-500 mb-2">
          <Link href="/" className="hover:text-blue-700">
            首页
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">智能终端管理与个人中心</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <h1 className="text-3xl font-black text-slate-950 font-serif tracking-tight">
              我的今日长垣 / 智能终端
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              基于隐私计算的本地端侧控制台，管理卷宗收藏、关注追踪、偏好与专属权益。
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold border ${roleNames[userRole].badge}`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>{roleNames[userRole].title}</span>
            </span>
          </div>
        </div>
      </div>

      {/* 2. Top Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Terminal Connection Status */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 shadow-2xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <Smartphone className="w-4 h-4 text-blue-600" />
              <span>终端安全连接状态</span>
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>已连接</span>
            </span>
          </div>

          <div className="space-y-1.5 text-xs text-slate-600">
            <div className="flex justify-between">
              <span className="text-slate-400">设备标识：</span>
              <span className="font-mono font-bold text-slate-800">{terminalId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">信标协议：</span>
              <span className="text-slate-700">仙都微网本地节点 (End-to-End)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">离线缓存：</span>
              <span className="text-slate-700 font-mono">已启用 (Local Storage)</span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => alert('终端密钥已成功轮换，已与仙都微节点完成哈希对齐。')}
              className="w-full py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-semibold transition-colors cursor-pointer"
            >
              轮换终端加密密钥
            </button>
          </div>
        </div>

        {/* Subscription & VIP Entitlement */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 shadow-2xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <Crown className="w-4 h-4 text-amber-500" />
              <span>数字订阅与权限层级</span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">STATUS</span>
          </div>

          <div className="space-y-1 text-xs">
            <div className="font-bold text-slate-900">{roleNames[userRole].title}</div>
            <p className="text-slate-500 text-[11px] leading-relaxed">
              {roleNames[userRole].desc}
            </p>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
            {userRole === 'vip' || userRole === 'org' ? (
              <Link
                href="/premium"
                className="w-full py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded text-xs font-bold transition-colors text-center shadow-xs"
              >
                进入资深观察员专属空间 (PREMIUM)
              </Link>
            ) : (
              <Link
                href="/membership"
                className="w-full py-1.5 bg-blue-700 hover:bg-blue-600 text-white rounded text-xs font-bold transition-colors text-center shadow-xs"
              >
                了解升级方案 (28工币/月)
              </Link>
            )}
          </div>
        </div>

        {/* Local Storage & Privacy Metrics */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 shadow-2xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>端侧隐私与无痕承诺</span>
            </div>
            <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded font-mono">
              ZERO-CLOUD
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            所有收藏、阅读历史与负反馈兴趣屏蔽规则严格保存在您当前设备本地，仙都传媒不收集任何个人指纹追踪日志。
          </p>

          <div className="pt-1 flex items-center justify-between text-xs text-slate-400 border-t border-slate-100">
            <span>收藏 {bookmarks.length} 篇</span>
            <span>待读 {readLater.length} 篇</span>
            <span>已读 {history.length} 篇</span>
          </div>
        </div>
      </div>

      {/* 3. Navigation Tabs */}
      <div className="border-b border-slate-200 flex flex-wrap gap-2 text-xs font-bold">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 px-3 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'overview'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          全览与数据总览
        </button>

        <button
          onClick={() => setActiveTab('bookmarks')}
          className={`pb-3 px-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'bookmarks'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Bookmark className="w-3.5 h-3.5" />
          <span>离线收藏 ({bookmarks.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('readLater')}
          className={`pb-3 px-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'readLater'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>稍后研读 ({readLater.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`pb-3 px-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'history'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>阅读足迹 ({history.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('following')}
          className={`pb-3 px-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'following'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Heart className="w-3.5 h-3.5" />
          <span>关注专题与实体 ({followedTopics.length + followedEntities.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('interests')}
          className={`pb-3 px-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'interests'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <EyeOff className="w-3.5 h-3.5" />
          <span>推荐机制与屏蔽项</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`pb-3 px-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'settings'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>端侧偏好</span>
        </button>
      </div>

      {/* 4. Tab Contents */}

      {/* TAB A: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Quick List Preview: Bookmarks */}
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h2 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-blue-600" />
                <span>最新离线收藏报道</span>
              </h2>
              <button
                onClick={() => setActiveTab('bookmarks')}
                className="text-xs text-blue-600 hover:underline flex items-center"
              >
                <span>查看全部 ({bookmarks.length})</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {bookmarks.slice(0, 3).map((slug) => {
                const info = ARTICLE_MAP[slug] || {
                  title: `长垣档案报道：${slug}`,
                  time: '最近收录',
                  section: '综合报道',
                };
                return (
                  <div key={slug} className="py-3 flex items-center justify-between gap-4">
                    <div>
                      <div className="text-[11px] text-blue-700 font-medium mb-0.5">
                        {info.section} · {info.time}
                      </div>
                      <Link
                        href={`/article/${slug}`}
                        className="text-sm font-bold text-slate-900 hover:text-blue-700 transition-colors line-clamp-1"
                      >
                        {info.title}
                      </Link>
                    </div>

                    <button
                      onClick={() => toggleBookmark(slug)}
                      className="text-xs text-slate-400 hover:text-rose-600 px-2 py-1 rounded transition-colors cursor-pointer"
                      title="取消收藏"
                    >
                      移除
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick List Preview: Followed Topics */}
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h2 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Compass className="w-4 h-4 text-blue-600" />
                <span>持续追踪中的长垣专题</span>
              </h2>
              <button
                onClick={() => setActiveTab('following')}
                className="text-xs text-blue-600 hover:underline flex items-center"
              >
                <span>管理关注 ({followedTopics.length})</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {followedTopics.map((topicId) => {
                const t = TOPIC_MAP[topicId] || {
                  title: '长垣专题追踪',
                  slug: 'winter-energy-2047',
                  updates: 1,
                };
                return (
                  <div
                    key={topicId}
                    className="p-4 bg-slate-50 border border-slate-200 rounded-lg flex flex-col justify-between hover:border-blue-400 transition-colors"
                  >
                    <div>
                      <span className="text-[10px] font-mono text-blue-700 font-bold uppercase">
                        持续跟进中 · {t.updates} 篇关联动态
                      </span>
                      <h3 className="font-bold text-sm text-slate-900 mt-1">
                        <Link href={`/topic/${t.slug}`}>{t.title}</Link>
                      </h3>
                    </div>

                    <div className="mt-4 flex items-center justify-between text-xs pt-2 border-t border-slate-200/60">
                      <Link
                        href={`/topic/${t.slug}`}
                        className="text-blue-700 font-semibold hover:underline"
                      >
                        查阅事实清单 →
                      </Link>
                      <button
                        onClick={() => toggleFollowTopic(topicId)}
                        className="text-slate-400 hover:text-rose-600 text-[11px] cursor-pointer"
                      >
                        取消追踪
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB B: BOOKMARKS */}
      {activeTab === 'bookmarks' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-blue-600" />
                <span>离线收藏卷宗 ({bookmarks.length})</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                支持离线脱水缓存，阅读内页时点击书签按钮随时增删
              </p>
            </div>
          </div>

          {bookmarks.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-lg">
              暂无离线收藏。浏览任意文章时轻触右上方“收藏”即可持久化于此。
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {bookmarks.map((slug) => {
                const info = ARTICLE_MAP[slug] || {
                  title: `长垣档案报道：${slug}`,
                  time: '最近收录',
                  section: '综合报道',
                };
                return (
                  <div key={slug} className="py-4 flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                        <span className="text-blue-700 font-semibold font-sans">{info.section}</span>
                        <span>·</span>
                        <span>{info.time}</span>
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 hover:text-blue-700 transition-colors">
                        <Link href={`/article/${slug}`}>{info.title}</Link>
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Link
                        href={`/article/${slug}`}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded transition-colors"
                      >
                        阅读全文
                      </Link>
                      <button
                        onClick={() => toggleBookmark(slug)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded transition-colors cursor-pointer"
                        title="移出收藏"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB C: READ LATER */}
      {activeTab === 'readLater' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>稍后研读清单 ({readLater.length})</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                长文速览时随手存入，方便通勤或晚间深度精读
              </p>
            </div>
          </div>

          {readLater.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-lg">
              暂无稍后阅读卷宗。
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {readLater.map((slug) => {
                const info = ARTICLE_MAP[slug] || {
                  title: `长垣长篇卷宗：${slug}`,
                  time: '待读标记',
                  section: '深度观察',
                };
                return (
                  <div key={slug} className="py-4 flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="text-[11px] text-amber-700 font-medium font-mono">
                        待研读 · {info.section}
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 hover:text-blue-700 transition-colors">
                        <Link href={`/article/${slug}`}>{info.title}</Link>
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Link
                        href={`/article/${slug}`}
                        className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded transition-colors"
                      >
                        立即研读
                      </Link>
                      <button
                        onClick={() => toggleReadLater(slug)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded transition-colors cursor-pointer"
                        title="移出稍后阅读"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB D: HISTORY */}
      {activeTab === 'history' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>最近阅读足迹 ({history.length})</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                记录在本地的浏览轨迹，按时间倒序排列
              </p>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {history.map((item, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 hover:text-blue-700">
                    <Link href={`/article/${item.slug}`}>{item.title}</Link>
                  </h3>
                  <span className="text-[11px] text-slate-400 font-mono">浏览于：{item.at}</span>
                </div>
                <Link
                  href={`/article/${item.slug}`}
                  className="text-xs text-blue-600 hover:underline font-medium"
                >
                  重温
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB E: FOLLOWING TOPICS & ENTITIES */}
      {activeTab === 'following' && (
        <div className="space-y-6">
          {/* Followed Topics */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
            <h2 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <Compass className="w-4 h-4 text-blue-600" />
              <span>关注的持续追踪专题 ({followedTopics.length})</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {followedTopics.map((topicId) => {
                const t = TOPIC_MAP[topicId] || {
                  title: '长垣持续专题',
                  slug: 'winter-energy-2047',
                  updates: 3,
                };
                return (
                  <div
                    key={topicId}
                    className="p-4 bg-slate-50 border border-slate-200 rounded-lg flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[11px] text-blue-700 font-bold font-mono">
                        TOPIC TRACKER
                      </span>
                      <h3 className="font-bold text-sm text-slate-900 mt-1">
                        <Link href={`/topic/${t.slug}`} className="hover:text-blue-700">
                          {t.title}
                        </Link>
                      </h3>
                    </div>

                    <div className="mt-4 pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                      <Link
                        href={`/topic/${t.slug}`}
                        className="text-blue-700 font-semibold hover:underline"
                      >
                        查看专题事实清单 →
                      </Link>
                      <button
                        onClick={() => toggleFollowTopic(topicId)}
                        className="text-slate-400 hover:text-rose-600 cursor-pointer"
                      >
                        取消关注
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Followed Entities */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
            <h2 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-500" />
              <span>关注的核心人物、机构与地标 ({followedEntities.length})</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
              {followedEntities.map((entId) => {
                const ent = ENTITY_MAP[entId] || {
                  name: entId,
                  type: '实体档案',
                  url: '#',
                };
                return (
                  <div
                    key={entId}
                    className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between"
                  >
                    <div>
                      <span className="text-[10px] text-slate-400 block font-mono">{ent.type}</span>
                      <Link
                        href={ent.url}
                        className="font-bold text-slate-900 hover:text-blue-700"
                      >
                        {ent.name}
                      </Link>
                    </div>

                    <button
                      onClick={() => toggleFollowEntity(entId)}
                      className="text-slate-400 hover:text-rose-600 text-[11px] cursor-pointer"
                      title="取消关注"
                    >
                      取消
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB F: RECOMMENDATION EXPLANATION & NEGATIVE INTERESTS */}
      {activeTab === 'interests' && (
        <div className="space-y-6">
          {/* Explanation Box */}
          <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
              <Info className="w-4 h-4 text-blue-700" />
              <span>透明推荐机制声明 (Algorithm Transparency)</span>
            </div>
            <p className="text-xs text-blue-800 leading-relaxed">
              《今日长垣》坚守传统报业采编价值。首页与频道的文章排序依据<strong>采编重要性（Editorial Hierarchy）、事实核验等级（Verification Level）与公共突发响应机制</strong>，不以刺激点击率的黑箱算法主导。
              推荐位仅在您主动关注的专题与实体范围内进行轻量本地相关性提升，不建立跨应用画像。
            </p>
          </div>

          {/* Negative Interests & Disliked Tags */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
            <div>
              <h2 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <EyeOff className="w-4 h-4 text-slate-600" />
                <span>降低兴趣 / 屏蔽标签管理 ({dislikedTags.length})</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                若您不希望在推荐流中频繁看到特定类型题材，可在此处添加屏蔽词，端侧将自动降低其展现权重。
              </p>
            </div>

            {/* Tags Pills */}
            <div className="flex flex-wrap gap-2 pt-2">
              {dislikedTags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-700 border border-slate-200 rounded-full text-xs"
                >
                  <span>{tag}</span>
                  <button
                    onClick={() => removeDislikedTag(tag)}
                    className="hover:text-rose-600 font-bold ml-1 cursor-pointer"
                    title="恢复兴趣"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            {/* Add Custom Dislike Tag */}
            <div className="pt-3 border-t border-slate-100 flex items-center gap-2 max-w-md">
              <input
                type="text"
                placeholder="输入希望减少出现的标签 (如: 体育赛事、娱乐快报)..."
                value={newTagInput}
                onChange={(e) => setNewTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && newTagInput.trim()) {
                    addDislikedTag(newTagInput.trim());
                    setNewTagInput('');
                  }
                }}
                className="flex-1 px-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:ring-1 focus:ring-blue-500 outline-hidden"
              />
              <button
                onClick={() => {
                  if (newTagInput.trim()) {
                    addDislikedTag(newTagInput.trim());
                    setNewTagInput('');
                  }
                }}
                className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
              >
                添加屏蔽
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB G: DEVICE PREFERENCES */}
      {activeTab === 'settings' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-5">
          <div>
            <h2 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-blue-600" />
              <span>终端硬件与阅读展示偏好</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              偏好设置保存在本地，重启浏览器或切换网络环境不会丢失
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
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

            <label className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
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

            <label className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
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

            <label className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
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
      )}
    </div>
  );
}
