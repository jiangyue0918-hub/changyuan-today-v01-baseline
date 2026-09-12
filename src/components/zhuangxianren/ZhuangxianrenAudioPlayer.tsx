'use client';

import React, { useState } from 'react';
import { Volume2, Play, Pause } from 'lucide-react';

interface Props {
  title?: string;
  duration?: string;
}

export default function ZhuangxianrenAudioPlayer({
  title = '西区老厂房驻极体声音采样切片',
  duration = '08:24',
}: Props) {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="my-8 bg-zinc-900/90 border border-rose-500/30 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-full bg-rose-600 flex items-center justify-center text-white shrink-0 shadow-lg ${
            isPlaying ? 'animate-pulse' : ''
          }`}
        >
          <Volume2 className="w-5 h-5" />
        </div>
        <div>
          <div className="font-bold text-sm text-white flex items-center gap-1.5">
            <span>现场原声伴读：{title}</span>
            {isPlaying && (
              <span className="text-[10px] bg-rose-500/20 text-rose-300 px-1.5 py-0.2 rounded border border-rose-500/40 animate-pulse font-mono">
                播放中
              </span>
            )}
          </div>
          <div className="text-xs text-zinc-400 font-mono">
            时长 {duration} · 采样频响 96kHz / 24bit FLAC · 声音地图实验
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={togglePlay}
          className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-rose-300 border border-rose-500/30 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          {isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span>暂停伴读</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>播放音频伴读</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
