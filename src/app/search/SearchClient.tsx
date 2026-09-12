'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { SearchItem } from '@/types/content';
import { Search, Filter, FileText, Compass, User, Building, MapPin, ArrowRight } from 'lucide-react';
import VerificationBadge from '@/components/article/VerificationBadge';

interface Props {
  initialIndex: SearchItem[];
}

export default function SearchClient({ initialIndex }: Props) {
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'article' | 'topic' | 'person' | 'organization' | 'location'>('all');
  const [sectionFilter, setSectionFilter] = useState<string>('all');

  const filtered = useMemo(() => {
    return initialIndex.filter((item) => {
      // Type filter
      if (typeFilter !== 'all' && item.type !== typeFilter) {
        return false;
      }
      // Section filter
      if (sectionFilter !== 'all' && item.section !== sectionFilter) {
        return false;
      }
      // Query filter
      if (query.trim()) {
        const q = query.toLowerCase();
        const inTitle = item.title.toLowerCase().includes(q);
        const inSummary = item.summary.toLowerCase().includes(q);
        const inTags = item.tags?.some((t) => t.toLowerCase().includes(q));
        if (!inTitle && !inSummary && !inTags) {
          return false;
        }
      }
      return true;
    });
  }, [initialIndex, query, typeFilter, sectionFilter]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Search Header */}
      <div className="border-b border-slate-200 pb-6 mb-6">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-950 font-serif mb-2">
          全站检索 / SEARCH & ARCHIVE
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          检索今日长垣全部已核验报道、持续专题、核心人物、机构及地理地标卷宗
        </p>

        {/* Input Bar */}
        <div className="mt-4 relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="输入关键词（如：热网、算力、凤栖原、林若希、陈文林...）"
            className="w-full px-4 py-3 pl-11 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-transparent shadow-2xs"
          />
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-3 text-xs text-slate-400 hover:text-slate-600 p-1"
            >
              清空
            </button>
          )}
        </div>

        {/* Filter Badges */}
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" />
            <span>筛选实体类型:</span>
          </span>

          {[
            { id: 'all', label: '全部' },
            { id: 'article', label: '新闻报道' },
            { id: 'topic', label: '持续专题' },
            { id: 'person', label: '人物' },
            { id: 'organization', label: '机构组织' },
            { id: 'location', label: '地标' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTypeFilter(t.id as any)}
              className={`px-2.5 py-1 rounded transition-colors ${
                typeFilter === t.id
                  ? 'bg-blue-700 text-white font-medium shadow-2xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results summary */}
      <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
        <span>
          找到符合条件的卷宗 <strong>{filtered.length}</strong> 条
        </span>
        {query && <span>检索词: “{query}”</span>}
      </div>

      {/* Results List */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-slate-200 rounded-lg text-slate-500 text-sm">
          未检索到匹配的内容。请尝试更换关键词，或切换筛选条件。
        </div>
      ) : (
        <div className="divide-y divide-slate-200">
          {filtered.map((item) => {
            const icon =
              item.type === 'article' ? (
                <FileText className="w-4 h-4 text-blue-600" />
              ) : item.type === 'topic' ? (
                <Compass className="w-4 h-4 text-amber-600" />
              ) : item.type === 'person' ? (
                <User className="w-4 h-4 text-purple-600" />
              ) : item.type === 'organization' ? (
                <Building className="w-4 h-4 text-emerald-600" />
              ) : (
                <MapPin className="w-4 h-4 text-rose-600" />
              );

            const badgeLabel =
              item.type === 'article'
                ? '新闻报道'
                : item.type === 'topic'
                ? '持续专题'
                : item.type === 'person'
                ? '人物卷宗'
                : item.type === 'organization'
                ? '机构组织'
                : '地理地标';

            return (
              <div key={item.id} className="py-4 hover:bg-slate-50/80 px-2 rounded transition-colors group">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span className="inline-flex items-center gap-1 font-medium text-slate-600">
                    {icon}
                    <span>{badgeLabel}</span>
                    {item.section && <span>· {item.section}</span>}
                  </span>
                  {item.publishedAt && <span>{item.publishedAt}</span>}
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                  <Link href={item.url}>{item.title}</Link>
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 mt-1 leading-relaxed">
                  {item.summary}
                </p>

                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {item.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-[10px]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
