'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'guest' | 'citizen' | 'vip' | 'org';

interface AppContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  isMajorEventMode: boolean;
  setIsMajorEventMode: (active: boolean) => void;
  debugEnabled: boolean;
  setDebugEnabled: (enabled: boolean) => void;
  // Personalization / me state
  bookmarks: string[];
  toggleBookmark: (slug: string) => void;
  readLater: string[];
  toggleReadLater: (slug: string) => void;
  history: Array<{ slug: string; title: string; at: string }>;
  addHistory: (slug: string, title: string) => void;
  followedTopics: string[];
  toggleFollowTopic: (id: string) => void;
  followedEntities: string[];
  toggleFollowEntity: (id: string) => void;
  dislikedTags: string[];
  addDislikedTag: (tag: string) => void;
  removeDislikedTag: (tag: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [userRole, setUserRole] = useState<UserRole>('citizen');
  const [isMajorEventMode, setIsMajorEventMode] = useState(false);
  const [debugEnabled, setDebugEnabled] = useState(false);

  const [bookmarks, setBookmarks] = useState<string[]>([
    'changyuan-west-district-heat-network-maintenance-ready',
    'inside-changyuan-smart-compute-center',
  ]);

  const [readLater, setReadLater] = useState<string[]>([
    'xiandu-media-industry-report-2047',
    'fengqiyuan-outer-ring-expressway-trial-operation',
  ]);

  const [history, setHistory] = useState<Array<{ slug: string; title: string; at: string }>>([
    {
      slug: 'changyuan-west-district-heat-network-maintenance-ready',
      title: '西区热网主管道抗寒技术改造完成',
      at: '今日 08:35',
    },
    {
      slug: 'xiandu-media-industry-report-2047',
      title: '智元47年长垣实体产业半年研报',
      at: '昨日 19:20',
    },
  ]);

  const [followedTopics, setFollowedTopics] = useState<string[]>([
    'topic-winter-energy-2047',
    'topic-ai-industry-pulse',
  ]);

  const [followedEntities, setFollowedEntities] = useState<string[]>([
    'person-chen-wenlin',
    'org-xiandu-media',
  ]);

  const [dislikedTags, setDislikedTags] = useState<string[]>([
    '短讯快报',
    '商业赞助',
  ]);

  // Read URL query parameter for debug (?debug=1) or emergency mode (?event_mode=1)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('debug') === '1') {
        setDebugEnabled(true);
      }
      if (params.get('event_mode') === '1') {
        setIsMajorEventMode(true);
      }
    }
  }, []);

  const toggleBookmark = (slug: string) => {
    setBookmarks((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const toggleReadLater = (slug: string) => {
    setReadLater((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const addHistory = (slug: string, title: string) => {
    setHistory((prev) => [
      { slug, title, at: '刚刚' },
      ...prev.filter((item) => item.slug !== slug).slice(0, 19),
    ]);
  };

  const toggleFollowTopic = (id: string) => {
    setFollowedTopics((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const toggleFollowEntity = (id: string) => {
    setFollowedEntities((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  const addDislikedTag = (tag: string) => {
    if (!dislikedTags.includes(tag)) {
      setDislikedTags((prev) => [...prev, tag]);
    }
  };

  const removeDislikedTag = (tag: string) => {
    setDislikedTags((prev) => prev.filter((t) => t !== tag));
  };

  return (
    <AppContext.Provider
      value={{
        userRole,
        setUserRole,
        isMajorEventMode,
        setIsMajorEventMode,
        debugEnabled,
        setDebugEnabled,
        bookmarks,
        toggleBookmark,
        readLater,
        toggleReadLater,
        history,
        addHistory,
        followedTopics,
        toggleFollowTopic,
        followedEntities,
        toggleFollowEntity,
        dislikedTags,
        addDislikedTag,
        removeDislikedTag,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return ctx;
}
