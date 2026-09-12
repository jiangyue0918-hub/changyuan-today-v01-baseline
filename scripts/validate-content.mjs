import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import yaml from 'yaml';

const CONTENT_DIR = path.resolve(process.cwd(), 'content');

const VALID_BRANDS = ['today-changyuan', 'zhuangxianren'];
const VALID_SECTIONS = ['changyuan', 'finance', 'society', 'people', 'culture', 'depth', 'sports', 'lifestyle', 'audio'];
const VALID_STATUSES = ['breaking', 'unverified', 'verified', 'updating', 'depth', 'corrected', 'retracted', 'archived'];
const VALID_WORKFLOWS = ['draft', 'ready', 'published'];
const VALID_ACCESS = ['public', 'member', 'premium'];

const errors = [];
const stats = {
  articles: 0,
  topics: 0,
  people: 0,
  organizations: 0,
  locations: 0,
  authors: 0,
  brands: 0,
};

const idRegistry = new Map();
const slugRegistry = new Map();

function register(id, slug, type, file) {
  if (idRegistry.has(id)) {
    errors.push(`[DUPLICATE_ID] ${id} in ${file} already registered in ${idRegistry.get(id)}`);
  } else {
    idRegistry.set(id, `${type}:${file}`);
  }

  if (slug) {
    const slugKey = `${type}:${slug}`;
    if (slugRegistry.has(slugKey)) {
      errors.push(`[DUPLICATE_SLUG] ${slug} (${type}) in ${file} conflicts with ${slugRegistry.get(slugKey)}`);
    } else {
      slugRegistry.set(slugKey, file);
    }
  }
}

// 1. Authors
const authorsDir = path.join(CONTENT_DIR, 'authors');
const authorIds = new Set();
if (fs.existsSync(authorsDir)) {
  for (const file of fs.readdirSync(authorsDir)) {
    if (!file.endsWith('.yaml') && !file.endsWith('.yml')) continue;
    const filePath = path.join(authorsDir, file);
    const data = yaml.parse(fs.readFileSync(filePath, 'utf-8'));
    if (!data.id || !data.name) errors.push(`[INVALID_AUTHOR] Missing id/name in ${file}`);
    register(data.id, data.slug, 'author', file);
    authorIds.add(data.id);
    stats.authors++;
  }
}

// 2. Brands
const brandsDir = path.join(CONTENT_DIR, 'brands');
const brandIds = new Set();
if (fs.existsSync(brandsDir)) {
  for (const file of fs.readdirSync(brandsDir)) {
    if (!file.endsWith('.yaml') && !file.endsWith('.yml')) continue;
    const filePath = path.join(brandsDir, file);
    const data = yaml.parse(fs.readFileSync(filePath, 'utf-8'));
    if (!data.id || !data.name) errors.push(`[INVALID_BRAND] Missing id/name in ${file}`);
    register(data.id, data.id, 'brand', file);
    brandIds.add(data.id);
    stats.brands++;
  }
}

// 3. People
const peopleDir = path.join(CONTENT_DIR, 'people');
const personIds = new Set();
if (fs.existsSync(peopleDir)) {
  for (const file of fs.readdirSync(peopleDir)) {
    if (!file.endsWith('.yaml') && !file.endsWith('.yml')) continue;
    const filePath = path.join(peopleDir, file);
    const data = yaml.parse(fs.readFileSync(filePath, 'utf-8'));
    if (!data.id || !data.displayName) errors.push(`[INVALID_PERSON] Missing id/displayName in ${file}`);
    register(data.id, data.slug, 'people', file);
    personIds.add(data.id);
    stats.people++;
  }
}

// 4. Organizations
const orgsDir = path.join(CONTENT_DIR, 'organizations');
const orgIds = new Set();
if (fs.existsSync(orgsDir)) {
  for (const file of fs.readdirSync(orgsDir)) {
    if (!file.endsWith('.yaml') && !file.endsWith('.yml')) continue;
    const filePath = path.join(orgsDir, file);
    const data = yaml.parse(fs.readFileSync(filePath, 'utf-8'));
    if (!data.id || !data.displayName) errors.push(`[INVALID_ORG] Missing id/displayName in ${file}`);
    register(data.id, data.slug, 'organizations', file);
    orgIds.add(data.id);
    stats.organizations++;
  }
}

// 5. Locations
const locsDir = path.join(CONTENT_DIR, 'locations');
const locIds = new Set();
if (fs.existsSync(locsDir)) {
  for (const file of fs.readdirSync(locsDir)) {
    if (!file.endsWith('.yaml') && !file.endsWith('.yml')) continue;
    const filePath = path.join(locsDir, file);
    const data = yaml.parse(fs.readFileSync(filePath, 'utf-8'));
    if (!data.id || !data.displayName) errors.push(`[INVALID_LOCATION] Missing id/displayName in ${file}`);
    register(data.id, data.slug, 'locations', file);
    locIds.add(data.id);
    stats.locations++;
  }
}

// 6. Topics
const topicsDir = path.join(CONTENT_DIR, 'topics');
const topicIds = new Set();
if (fs.existsSync(topicsDir)) {
  for (const file of fs.readdirSync(topicsDir)) {
    if (!file.endsWith('.yaml') && !file.endsWith('.yml')) continue;
    const filePath = path.join(topicsDir, file);
    const data = yaml.parse(fs.readFileSync(filePath, 'utf-8'));
    if (!data.id || !data.title) errors.push(`[INVALID_TOPIC] Missing id/title in ${file}`);
    register(data.id, data.slug, 'topic', file);
    topicIds.add(data.id);
    stats.topics++;
  }
}

// 7. Articles
const articlesDir = path.join(CONTENT_DIR, 'articles');
const articleIds = new Set();

function walkArticles(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkArticles(fullPath);
    } else if (entry.isFile() && (entry.name.endsWith('.md') || entry.name.endsWith('.mdx'))) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      const { data } = matter(content);

      if (!data.id) errors.push(`[ARTICLE_NO_ID] ${fullPath}`);
      if (!data.slug) errors.push(`[ARTICLE_NO_SLUG] ${fullPath}`);
      if (!data.title) errors.push(`[ARTICLE_NO_TITLE] ${fullPath}`);
      if (!data.publishedAt) errors.push(`[ARTICLE_NO_DATE] ${fullPath}`);

      if (!VALID_BRANDS.includes(data.brand)) {
        errors.push(`[INVALID_BRAND_ENUM] Article ${data.id} has invalid brand '${data.brand}'`);
      }
      if (!VALID_SECTIONS.includes(data.section)) {
        errors.push(`[INVALID_SECTION_ENUM] Article ${data.id} has invalid section '${data.section}'`);
      }
      if (data.status && !VALID_STATUSES.includes(data.status)) {
        errors.push(`[INVALID_STATUS_ENUM] Article ${data.id} has invalid status '${data.status}'`);
      }
      if (data.workflow && !VALID_WORKFLOWS.includes(data.workflow)) {
        errors.push(`[INVALID_WORKFLOW_ENUM] Article ${data.id} has invalid workflow '${data.workflow}'`);
      }
      if (data.access && !VALID_ACCESS.includes(data.access)) {
        errors.push(`[INVALID_ACCESS_ENUM] Article ${data.id} has invalid access '${data.access}'`);
      }

      // Check author IDs
      if (Array.isArray(data.authorIds)) {
        for (const aId of data.authorIds) {
          if (!authorIds.has(aId)) errors.push(`[DANGLING_AUTHOR] Article ${data.id} references non-existent author '${aId}'`);
        }
      }

      // Check topic IDs
      if (Array.isArray(data.topicIds)) {
        for (const tId of data.topicIds) {
          if (!topicIds.has(tId)) errors.push(`[DANGLING_TOPIC] Article ${data.id} references non-existent topic '${tId}'`);
        }
      }

      // Check person IDs
      if (Array.isArray(data.personIds)) {
        for (const pId of data.personIds) {
          if (!personIds.has(pId)) errors.push(`[DANGLING_PERSON] Article ${data.id} references non-existent person '${pId}'`);
        }
      }

      // Check organization IDs
      if (Array.isArray(data.organizationIds)) {
        for (const oId of data.organizationIds) {
          if (!orgIds.has(oId)) errors.push(`[DANGLING_ORG] Article ${data.id} references non-existent organization '${oId}'`);
        }
      }

      // Check location IDs
      if (Array.isArray(data.locationIds)) {
        for (const lId of data.locationIds) {
          if (!locIds.has(lId)) errors.push(`[DANGLING_LOCATION] Article ${data.id} references non-existent location '${lId}'`);
        }
      }

      register(data.id, data.slug, 'article', entry.name);
      articleIds.add(data.id);
      stats.articles++;
    }
  }
}

walkArticles(articlesDir);

// 8. Editorial Curation Validation (home.yaml)
const homeYamlPath = path.join(CONTENT_DIR, 'editorial', 'home.yaml');
if (fs.existsSync(homeYamlPath)) {
  const homeData = yaml.parse(fs.readFileSync(homeYamlPath, 'utf-8'));
  if (homeData.heroArticleId && !articleIds.has(homeData.heroArticleId)) {
    errors.push(`[EDITORIAL_HERO_NOT_FOUND] home.yaml heroArticleId '${homeData.heroArticleId}' not found`);
  }
  if (Array.isArray(homeData.editorPicksArticleIds)) {
    for (const id of homeData.editorPicksArticleIds) {
      if (!articleIds.has(id)) errors.push(`[EDITORIAL_PICK_NOT_FOUND] home.yaml editorPick '${id}' not found`);
    }
  }
  if (Array.isArray(homeData.liveTopicIds)) {
    for (const id of homeData.liveTopicIds) {
      if (!topicIds.has(id)) errors.push(`[EDITORIAL_TOPIC_NOT_FOUND] home.yaml liveTopic '${id}' not found`);
    }
  }
  if (homeData.zhuangxianrenFeatureId && !articleIds.has(homeData.zhuangxianrenFeatureId)) {
    errors.push(`[EDITORIAL_ZXR_NOT_FOUND] home.yaml zhuangxianrenFeatureId '${homeData.zhuangxianrenFeatureId}' not found`);
  }
} else {
  errors.push(`[MISSING_EDITORIAL] content/editorial/home.yaml does not exist!`);
}

console.log('--- 今日长垣 内容层 Schema 校验报告 ---');
console.log(`- 新闻文章 (articles): ${stats.articles}`);
console.log(`- 持续专题 (topics): ${stats.topics}`);
console.log(`- 核心人物 (people): ${stats.people}`);
console.log(`- 重点机构 (organizations): ${stats.organizations}`);
console.log(`- 地标片区 (locations): ${stats.locations}`);
console.log(`- 采编作者 (authors): ${stats.authors}`);
console.log(`- 媒体品牌 (brands): ${stats.brands}`);

if (errors.length > 0) {
  console.error('\n❌ 内容 Schema 校验未通过，发现以下错误:');
  for (const err of errors) {
    console.error(`  - ${err}`);
  }
  process.exit(1);
} else {
  console.log('✅ 所有内容文件、枚举字段与外键引用校验 100% 通过！\n');
}
