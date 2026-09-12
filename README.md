# 今日长垣 (TODAY CHANGYUAN) & 《装仙人》(ZHUANG XIAN REN)

仙都传媒集团旗下主综合新闻门户与先锋数字文化特刊前端工程。

本项目专为长期维护、持续增加长垣本地与智元纪年深度新闻内容而设计，采用 **Next.js 15 (App Router) + TypeScript + Tailwind CSS** 架构，以 **Git + Markdown/YAML** 为核心源，直接部署于 **GitHub + Vercel**。

---

## 品牌层级与信息架构 (Brand Hierarchy & IA)

```
仙都传媒集团 (Xiandu Media Group - 母集团)
│
├── 《今日长垣》(TODAY CHANGYUAN - 主综合新闻门户)
│   ├── 长垣要闻 (changyuan)
│   ├── 财经智产 (finance)
│   ├── 社会民生 (society)
│   ├── 深度调查 (depth)
│   ├── 科技文化 (culture)
│   ├── 体育健康 (sports)
│   ├── 市井生活 (lifestyle)
│   ├── 音频专栏 (audio)
│   ├── 持续追踪专题 (/topic/[slug])
│   ├── 核心卷宗档案库 (/people/, /organizations/, /locations/)
│   ├── 资深观察员专属深度空间 (/premium)
│   ├── 采编公约与公开勘误 (/editorial-standards, /corrections)
│   └── 智能终端连接与个人中心 (/me)
│
└── 《装仙人》(ZHUANG XIAN REN - 独立先锋数字特刊)
    ├── 独立品牌特刊首页 (/zhuangxianren)
    ├── 独立特稿沉浸阅读路径 (/zhuangxianren/article/[slug])
    └── 城市声音地图采样与青年先锋文化专栏
```

---

## 技术架构与工程目录

- **框架**: Next.js 15.5+ (App Router, Server Components 优先, SSR/SSG 自动优化)
- **开发语言**: TypeScript 5.8 (全类型定义严格校验)
- **样式引擎**: Tailwind CSS v4 (@tailwindcss/postcss)
- **内容解析**: gray-matter (Markdown Frontmatter) + yaml + marked (HTML 渲染)
- **数据源**: 全部在 `/content/` 目录下以 Markdown / YAML 文件存储，严禁在 UI 组件内硬编码数据。
- **构建前置校验**: `scripts/validate-content.mjs` 强制在构建时进行 Schema 字段校验与实体外键验证。

### 核心目录结构

```
├── content/                     # 内容源目录（Git 即 CMS）
│   ├── articles/                # 新闻报道（按年/月分卷组织）
│   ├── topics/                  # 持续追踪专题定义与事实清单
│   ├── people/                  # 人物实体卷宗
│   ├── organizations/           # 机构与组织卷宗
│   ├── locations/               # 地理地标卷宗
│   ├── authors/                 # 采编记者与主笔资料
│   ├── brands/                  # 品牌元数据
│   └── editorial/               # 首页策展排版配置 (home.yaml)
├── public/                      # 静态资产
│   └── media/                   # 本地高可用图片与 SVG 资产
├── scripts/                     # 运维与校验工具
│   └── validate-content.mjs     # 严格 Schema 与关联性校验器
├── src/
│   ├── app/                     # Next.js App Router 页面路由
│   ├── components/              # 布局、文章、实体、专题组件
│   ├── context/                 # 全局状态（终端绑定、用户角色、重大事件模式）
│   ├── lib/                     # 内容解析引擎与聚合工具
│   └── types/                   # TypeScript 核心数据类型定义
├── vercel.json                  # Vercel 部署路由与安全头配置
├── README.md                    # 本工程手册
├── CONTENT_GUIDE.md             # 内容创作者与记者采编录入规范
└── ASSET_GUIDE.md               # 视觉资产尺寸与存储规范
```

---

## 常用命令与工作流

### 1. 运行内容数据校验
在每次提交新闻稿或修改 YAML 配置后运行：
```bash
npm run validate:content
```
或直接由 build 脚本联动自动运行。

### 2. 本地开发
```bash
npm run dev
```
开发服务器将在端口 3000 启动。

### 3. 类型安全检查
```bash
npm run lint
```

### 4. 生产环境构建
```bash
npm run build
```
执行前置内容校验 + Next.js 静态生成与服务端优化构建。

### 5. 启动生产服务
```bash
npm run start
```

---

## 验收控制台 (Debug Toolbar) 与重大事件模式

为了方便产品审阅、功能验收与应急模拟，系统内置了**免侵入式验收控制台**：

1. **激活方式**: 在任意页面 URL 添加 `?debug=1`（例如 `http://localhost:3000/?debug=1`）。
2. **常规访问**: 未带 `?debug=1` 时，验收面板完全隐藏，不对普通读者产生任何视觉干扰。
3. **控制台功能**:
   - **用户身份切换**: 一键模拟游客 (`guest`)、普通市民 (`citizen`)、资深观察员 VIP (`vip`) 与机构终端 (`org`)，无缝预览 `/premium` 的权限墙门禁效果。
   - **重大事件应急广播模式 (Major Event Mode)**:
     - 切换开启后，全站顶部展示高能见度红色应急状态条（长垣市应急广播联动）；
     - 置顶展示防寒行动提示、受影响区域、交通公共服务变动、滚动调度时间线、辟谣事实澄清；
     - 自动降级非必要广告与娱乐资讯；
     - 应急报道一律公开（PUBLIC ACCESS），免入付费墙。
   - **核心验收路由快速跳转**。

---

## 部署规范 (Vercel + GitHub)

1. `vercel.json` 位于项目根目录，已预设安全响应标头与静态资产缓存策略。
2. 任何推送至 GitHub `main` 分支的代码，均会自动触发 Vercel CI/CD Pipeline。
3. 构建阶段若 `scripts/validate-content.mjs` 报错，构建将自动中断，防止破损数据发布至公网。
