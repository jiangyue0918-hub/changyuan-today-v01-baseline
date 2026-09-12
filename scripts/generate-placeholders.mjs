import fs from 'fs';
import path from 'path';

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function createSvg({ title, category, photographer, aspect = '16/9', bgColor = '#1e293b', accentColor = '#38bdf8' }) {
  const width = 800;
  const height = 450;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${bgColor}" />
      <stop offset="100%" stop-color="#0f172a" />
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ffffff" stroke-width="0.5" stroke-opacity="0.08" />
    </pattern>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#bgGrad)" />
  <rect width="${width}" height="${height}" fill="url(#grid)" />
  
  <!-- Technical Frame Elements -->
  <rect x="24" y="24" width="${width - 48}" height="${height - 48}" fill="none" stroke="${accentColor}" stroke-width="1" stroke-opacity="0.3" stroke-dasharray="4 4" />
  
  <!-- Corner Marks -->
  <path d="M 20 34 L 20 20 L 34 20" fill="none" stroke="${accentColor}" stroke-width="2" />
  <path d="M ${width - 34} 20 L ${width - 20} 20 L ${width - 20} 34" fill="none" stroke="${accentColor}" stroke-width="2" />
  <path d="M 20 ${height - 34} L 20 ${height - 20} L 34 ${height - 20}" fill="none" stroke="${accentColor}" stroke-width="2" />
  <path d="M ${width - 34} ${height - 20} L ${width - 20} ${height - 20} L ${width - 20} ${height - 34}" fill="none" stroke="${accentColor}" stroke-width="2" />

  <!-- Top Metadata Badge -->
  <rect x="40" y="40" width="160" height="26" rx="4" fill="${accentColor}" fill-opacity="0.15" stroke="${accentColor}" stroke-width="0.75" />
  <text x="50" y="58" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600" fill="${accentColor}">[智元47年 档案纪实]</text>
  
  <text x="${width - 40}" y="58" text-anchor="end" font-family="monospace" font-size="12" fill="#94a3b8">FRAME_STABLE // RAW-CAM</text>

  <!-- Central Visual Symbol / Graphic -->
  <circle cx="${width / 2}" cy="190" r="48" fill="${accentColor}" fill-opacity="0.08" stroke="${accentColor}" stroke-width="1.5" />
  <path d="M ${width / 2 - 20} 190 L ${width / 2 + 20} 190 M ${width / 2} 170 L ${width / 2} 210" stroke="${accentColor}" stroke-width="1.5" stroke-opacity="0.8" />
  <circle cx="${width / 2}" cy="190" r="16" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-opacity="0.9" />

  <!-- Title & Caption -->
  <text x="${width / 2}" y="280" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', sans-serif" font-size="22" font-weight="bold" fill="#f8fafc">${title}</text>
  <text x="${width / 2}" y="315" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', sans-serif" font-size="14" fill="#94a3b8">类别: ${category} | 摄影/来源: ${photographer}</text>

  <!-- Bottom Bar Info -->
  <line x1="40" y1="${height - 50}" x2="${width - 40}" y2="${height - 50}" stroke="#334155" stroke-width="1" />
  <text x="40" y="${height - 32}" font-family="monospace" font-size="11" fill="#64748b">仙都传媒图文档案中心 · 稳定本地存储</text>
  <text x="${width - 40}" y="${height - 32}" text-anchor="end" font-family="monospace" font-size="11" fill="#64748b">ARCHIVE_ID: TC-47-MEDIA</text>
</svg>`;
}

function createAvatar({ name, role, color = '#2563eb' }) {
  const size = 300;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <rect width="${size}" height="${size}" fill="#0f172a" />
  <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2 - 10}" fill="#1e293b" stroke="${color}" stroke-width="2" />
  <circle cx="${size / 2}" cy="110" r="45" fill="${color}" fill-opacity="0.2" stroke="${color}" stroke-width="2" />
  <path d="M 70 230 C 70 180, 230 180, 230 230 Z" fill="${color}" fill-opacity="0.25" stroke="${color}" stroke-width="2" />
  <text x="${size / 2}" y="260" text-anchor="middle" font-family="sans-serif" font-size="16" font-weight="bold" fill="#f8fafc">${name}</text>
  <text x="${size / 2}" y="280" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#94a3b8">${role}</text>
</svg>`;
}

// Ensure base directories
ensureDir('public/media/articles/tc-2047-0911-01');
ensureDir('public/media/articles/tc-2047-0911-02');
ensureDir('public/media/articles/tc-2047-0910-01');
ensureDir('public/media/articles/tc-2047-0909-01');
ensureDir('public/media/articles/tc-2047-0908-01');
ensureDir('public/media/articles/tc-2047-0907-01');
ensureDir('public/media/articles/tc-2047-0906-01');
ensureDir('public/media/articles/tc-2047-0905-01');
ensureDir('public/media/articles/zxr-2047-0910-01');

ensureDir('public/media/topics');
ensureDir('public/media/people');
ensureDir('public/media/organizations');
ensureDir('public/media/locations');
ensureDir('public/media/authors');

// Write article media
fs.writeFileSync('public/media/articles/tc-2047-0911-01/cover.svg', createSvg({
  title: '西区智元热网低温管线注水承压实况',
  category: '市政基础设施 / 保供检修',
  photographer: '今日长垣 记者张正'
}));

fs.writeFileSync('public/media/articles/tc-2047-0911-02/cover.svg', createSvg({
  title: '智元47年长垣产业运行观察发布大厅',
  category: '产业经济 / 智库研报',
  photographer: '仙都传媒供图',
  accentColor: '#10b981'
}));

fs.writeFileSync('public/media/articles/tc-2047-0910-01/cover.svg', createSvg({
  title: '凤栖原外环快速路三标段首日试通车',
  category: '城市交通 / 智能导流',
  photographer: '今日长垣 记者张正'
}));

fs.writeFileSync('public/media/articles/tc-2047-0909-01/cover.svg', createSvg({
  title: '长垣智算核心调度中心地下浸没机房',
  category: '深度调查 / 城市算力中枢',
  photographer: '今日长垣 记者陈墨',
  accentColor: '#6366f1'
}));

fs.writeFileSync('public/media/articles/tc-2047-0908-01/cover.svg', createSvg({
  title: '青年创客展示轻质防寒蜂窝材料样本',
  category: '科技文化 / 青年创新',
  photographer: '今日长垣 记者张正'
}));

fs.writeFileSync('public/media/articles/tc-2047-0907-01/cover.svg', createSvg({
  title: '长垣滨水生态绿道秋季骑行巡游现场',
  category: '体育健身 / 滨河走廊',
  photographer: '今日长垣 记者张正',
  accentColor: '#06b6d4'
}));

fs.writeFileSync('public/media/articles/tc-2047-0906-01/cover.svg', createSvg({
  title: '老棉纺厂街区食堂敬老助餐点清晨',
  category: '民生百态 / 社区服务',
  photographer: '今日长垣 记者陈墨',
  accentColor: '#f59e0b'
}));

fs.writeFileSync('public/media/articles/tc-2047-0905-01/cover.svg', createSvg({
  title: '仙都传媒数字播音室《今日长垣·晨读》',
  category: '音频融媒 / 晨读专栏',
  photographer: '仙都传媒供图',
  accentColor: '#8b5cf6'
}));

fs.writeFileSync('public/media/articles/zxr-2047-0910-01/cover.svg', createSvg({
  title: '林若希在工业回音沉淀池进行声音采样',
  category: '《装仙人》特邀封面人物',
  photographer: '《装仙人》摄影组',
  bgColor: '#18181b',
  accentColor: '#f43f5e'
}));

// Topics
fs.writeFileSync('public/media/topics/winter-energy-2047.svg', createSvg({
  title: '专题：智元47年冬季能源保供与热网统筹',
  category: '持续跟进专题',
  photographer: '今日长垣编辑部'
}));

fs.writeFileSync('public/media/topics/fengqiyuan-upgrade.svg', createSvg({
  title: '专题：凤栖原片区综合更新与交通提质工程',
  category: '持续跟进专题',
  photographer: '今日长垣编辑部'
}));

fs.writeFileSync('public/media/topics/ai-industry-pulse.svg', createSvg({
  title: '专题：智算引擎驱动下的长垣制造业转型',
  category: '持续跟进专题',
  photographer: '仙都传媒智库'
}));

// Entities
fs.writeFileSync('public/media/people/chen-wenlin.svg', createAvatar({ name: '陈文林', role: '市热网总调度长' }));
fs.writeFileSync('public/media/people/lin-ruoxi.svg', createAvatar({ name: '林若希', role: '声音艺术家 / 《装仙人》专访', color: '#f43f5e' }));
fs.writeFileSync('public/media/people/zhao-yutong.svg', createAvatar({ name: '赵雨桐', role: '智算中心首席架构师', color: '#6366f1' }));

fs.writeFileSync('public/media/organizations/xiandu-media.svg', createSvg({ title: '仙都传媒大厦总部外景', category: '集团机构', photographer: '官方归档' }));
fs.writeFileSync('public/media/organizations/changyuan-energy.svg', createSvg({ title: '长垣城市能源与热网集团调度大楼', category: '公共保障机构', photographer: '今日长垣' }));
fs.writeFileSync('public/media/organizations/changyuan-tech-center.svg', createSvg({ title: '长垣智算中心核心枢纽站房', category: '智算基础设施', photographer: '今日长垣' }));

fs.writeFileSync('public/media/locations/fengqiyuan.svg', createSvg({ title: '凤栖原高新片区全景鸟瞰', category: '城市片区', photographer: '今日长垣航拍' }));
fs.writeFileSync('public/media/locations/west-district.svg', createSvg({ title: '长垣西区现代化工业重镇走廊', category: '城市工业区', photographer: '今日长垣航拍' }));
fs.writeFileSync('public/media/locations/city-center.svg', createSvg({ title: '长垣中央文化商务区晨景', category: '核心商务区', photographer: '今日长垣航拍' }));

// Authors
fs.writeFileSync('public/media/authors/author-zhang-zheng.svg', createAvatar({ name: '张正', role: '时政与市政首席采编' }));
fs.writeFileSync('public/media/authors/author-lu-xiao.svg', createAvatar({ name: '陆潇', role: '财经高级调查记者', color: '#10b981' }));
fs.writeFileSync('public/media/authors/author-su-wan.svg', createAvatar({ name: '苏晚', role: '《装仙人》特稿主笔', color: '#f43f5e' }));
fs.writeFileSync('public/media/authors/author-chen-mo.svg', createAvatar({ name: '陈墨', role: '深度调查记者', color: '#6366f1' }));

console.log('All local placeholders generated successfully in public/media/.');
