# 《今日长垣》与《装仙人》内容采编与发布规范 (CONTENT_GUIDE.md)

本文档面向仙都传媒集团采编团队、特约记者与特刊编辑，阐述如何使用 Git + Markdown/YAML 进行日常新闻发布、事实核验与版本修订。

---

## 1. 目录规范与文件命名

所有发布内容位于项目根目录 `/content/` 下：

```
content/
├── articles/YYYY/MM/         # 新闻正文，文件名统一使用短横线命名法，如：tc-2047-0911-01.md
├── topics/                   # 持续专题配置文件，如：topic-winter-energy-2047.yaml
├── people/                   # 人物档案，如：person-chen-wenlin.yaml
├── organizations/            # 机构卷宗，如：org-xiandu-media.yaml
├── locations/                # 地理地标，如：loc-west-district.yaml
├── authors/                  # 采编记者资料，如：author-zhang-zheng.yaml
└── editorial/home.yaml       # 首页排版策展配置
```

---

## 2. 新闻文章 Frontmatter 规范 (Article Schema)

新建或编辑一篇报道时，Markdown 文件顶部必须包含完整的 YAML Frontmatter：

```markdown
---
id: tc-2047-0912-01                         # 唯一文章编号（格式：品牌缩写-年份-月日-序号）
slug: changyuan-advanced-smart-grid-launch  # 路由使用的 URL Slug（英文小写与连字符）
title: "长垣高新产业园智能分布式微电网正式并网发电"  # 文章主标题
deck: "削峰填谷响应速度提升至毫秒级，为算力中心与精密装备制造提供双回路清洁电能保障" # 导读副标题
summary: "今日上午，长垣高新产业园微电网示范工程通过发改委联合验收，标志着工业片区绿色供能实现自平衡。" # 列表摘要
brand: today-changyuan                      # 品牌枚举：today-changyuan 或 zhuangxianren
section: finance                            # 频道枚举：changyuan, finance, society, depth, culture, sports, lifestyle, audio
publishedAt: "智元47年09月12日 10:00"        # 签发时间（采用智元纪年与规范时间）
updatedAt: "智元47年09月12日 10:30"          # 最近修改时间
authors:
  - author-zhang-zheng                      # 必须对应 content/authors/ 中的有效记者 ID
status: verified                            # 核验状态：verified, unverified, developing, in_depth
access: public                              # 权限级别：public (全员公开) 或 subscriber (会员专享)
tags:
  - 微电网
  - 智能电网
  - 算力保障
cover: /media/articles/tc-2047-0912-01/cover.svg # 封面图路径（存放在 public/media/）
relatedTopics:
  - topic-winter-energy-2047                # 关联持续专题 ID
relatedEntities:
  - org-xiandu-media                        # 关联机构或人物 ID
updates:                                    # 版本变更与公开更正记录（重要）
  - at: "智元47年09月12日 10:30"
    type: correction                        # 类型：correction (更正), clarification (澄清), update (动态)
    summary: "更正示范电网二期总装机容量数值，由初报的 45MW 修正为经审核的 42.5MW。"
    reason: "采编记者依据现场联合测试验收单第二联核验后作出的精确更正。"
---

这里撰写 Markdown 正文内容...
支持标准 Markdown 语法：二级标题（##）、强调、引用块（>）、列表及图片。
```

---

## 3. 事实核验与公开勘误（透明度原则）

1. **核验状态标注规则**:
   - `verified` (已核实)：必须有至少两路独立信源交叉佐证，或经现场工单与官方遥测数据验证。
   - `in_depth` (深度调查)：调查特稿，包含完整背景调阅与数据脱水分析。
   - `developing` (持续跟进)：正在演进中的突发事件，后续将随事实进展补充。
   - `unverified` (现场初报)：初期单一信源线索，需向读者明示尚未交叉确证。

2. **公开修订（无静默更正）**:
   - 凡修改报道中的事实性数据、职务、人名，**严禁静默替换**。
   - 必须在 `updates` 数组中追加修订条目，系统将自动在内页标题栏显示“更正抽屉”，并在全站 `/corrections` 页面备案归档。

---

## 4. 持续跟进专题与事实清单 (Topics)

专题配置文件采用 YAML 格式：
- `factChecklist` 必须拆分为 `confirmed`（已核实验证的事实）与 `unconfirmed`（现场存疑或待确证线索）。
- `timeline` 记录事件推进节点，可标注 `canonStatus` 为 `CANON`、`WEB_DERIVED` 或 `PLACEHOLDER`，明确界定历史资料置信度。

---

## 5. 品牌隔离原则：《装仙人》独立特刊

- 若 `brand: zhuangxianren`，该报道归属于《装仙人》文化特刊。
- 《装仙人》文章具有独立的暗色先锋审美，配备原声伴读播放器和独立路由 `/zhuangxianren/article/[slug]`。
- 切勿将市政公文类新闻贴上 `zhuangxianren` 标签。
