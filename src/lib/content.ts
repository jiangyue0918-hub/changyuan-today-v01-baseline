import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import yaml from 'yaml';
import { marked } from 'marked';
import {
  Article,
  ArticleFrontmatter,
  Author,
  Brand,
  EditorialHome,
  Entity,
  SearchItem,
  SectionId,
  Topic,
} from '@/types/content';

const CONTENT_DIR = path.resolve(process.cwd(), 'content');

// Helper to safely read directory
function safeReadDir(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir);
}

// 1. Authors
export function getAllAuthors(): Author[] {
  const dir = path.join(CONTENT_DIR, 'authors');
  const files = safeReadDir(dir);
  return files
    .filter((f) => f.endsWith('.yaml') || f.endsWith('.yml'))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
      return yaml.parse(raw) as Author;
    });
}

export function getAuthorById(id: string): Author | null {
  return getAllAuthors().find((a) => a.id === id) || null;
}

export function getAuthorBySlug(slug: string): Author | null {
  const author = getAllAuthors().find((a) => a.slug === slug) || null;
  if (!author) return null;
  author.articles = getAllArticles().filter((art) => art.authorIds?.includes(author.id));
  return author;
}

// 2. Brands
export function getAllBrands(): Brand[] {
  const dir = path.join(CONTENT_DIR, 'brands');
  const files = safeReadDir(dir);
  return files
    .filter((f) => f.endsWith('.yaml') || f.endsWith('.yml'))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
      return yaml.parse(raw) as Brand;
    });
}

// 3. Topics
export function getAllTopics(): Topic[] {
  const dir = path.join(CONTENT_DIR, 'topics');
  const files = safeReadDir(dir);
  return files
    .filter((f) => f.endsWith('.yaml') || f.endsWith('.yml'))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
      return yaml.parse(raw) as Topic;
    });
}

export function getTopicById(id: string): Topic | null {
  return getAllTopics().find((t) => t.id === id) || null;
}

export function getTopicBySlug(slug: string): Topic | null {
  const topic = getAllTopics().find((t) => t.slug === slug) || null;
  if (!topic) return null;
  // Aggregate articles that reference this topic
  topic.articles = getAllArticles().filter((art) => art.topicIds?.includes(topic.id));
  return topic;
}

// 4. Entities (people, organizations, locations)
export function getAllEntities(type?: 'person' | 'organization' | 'location'): Entity[] {
  const results: Entity[] = [];
  const typeFolderMap: Record<string, string> = {
    person: 'people',
    organization: 'organizations',
    location: 'locations',
  };

  const typesToFetch = type ? [type] : (['person', 'organization', 'location'] as const);

  for (const t of typesToFetch) {
    const dir = path.join(CONTENT_DIR, typeFolderMap[t]);
    const files = safeReadDir(dir);
    for (const file of files) {
      if (!file.endsWith('.yaml') && !file.endsWith('.yml')) continue;
      const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
      const item = yaml.parse(raw) as Entity;
      item.type = t;
      results.push(item);
    }
  }

  return results;
}

export function getEntityById(id: string): Entity | null {
  return getAllEntities().find((e) => e.id === id) || null;
}

export function getEntityBySlug(type: 'person' | 'organization' | 'location', slug: string): Entity | null {
  const entity = getAllEntities(type).find((e) => e.slug === slug) || null;
  if (!entity) return null;

  // Aggregate articles referencing this entity
  entity.articles = getAllArticles().filter((art) => {
    if (type === 'person') return art.personIds?.includes(entity.id);
    if (type === 'organization') return art.organizationIds?.includes(entity.id);
    if (type === 'location') return art.locationIds?.includes(entity.id);
    return false;
  });

  // Aggregate topics referencing this entity
  entity.topics = getAllTopics().filter((top) => {
    if (type === 'person') return top.personIds?.includes(entity.id);
    if (type === 'organization') return top.organizationIds?.includes(entity.id);
    if (type === 'location') return top.locationIds?.includes(entity.id);
    return false;
  });

  return entity;
}

// 5. Articles
function walkArticleFiles(dir: string, fileList: string[] = []): string[] {
  if (!fs.existsSync(dir)) return fileList;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkArticleFiles(fullPath, fileList);
    } else if (entry.isFile() && (entry.name.endsWith('.md') || entry.name.endsWith('.mdx'))) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

export function getAllArticles(): Article[] {
  const articlesDir = path.join(CONTENT_DIR, 'articles');
  const filePaths = walkArticleFiles(articlesDir);

  const authorsMap = new Map(getAllAuthors().map((a) => [a.id, a]));
  const topicsMap = new Map(getAllTopics().map((t) => [t.id, t]));
  const entitiesMap = new Map(getAllEntities().map((e) => [e.id, e]));

  const articles = filePaths.map((filePath) => {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(raw);
    const fm = data as ArticleFrontmatter;

    const contentHtml = marked.parse(content, { gfm: true, breaks: true }) as string;

    const populatedAuthors = (fm.authorIds || [])
      .map((id) => authorsMap.get(id))
      .filter((a): a is Author => !!a);

    const populatedTopics = (fm.topicIds || [])
      .map((id) => topicsMap.get(id))
      .filter((t): t is Topic => !!t);

    const populatedPeople = (fm.personIds || [])
      .map((id) => entitiesMap.get(id))
      .filter((e): e is Entity => !!e);

    const populatedOrgs = (fm.organizationIds || [])
      .map((id) => entitiesMap.get(id))
      .filter((e): e is Entity => !!e);

    const populatedLocations = (fm.locationIds || [])
      .map((id) => entitiesMap.get(id))
      .filter((e): e is Entity => !!e);

    return {
      ...fm,
      rawBody: content,
      contentHtml,
      authors: populatedAuthors,
      topics: populatedTopics,
      people: populatedPeople,
      organizations: populatedOrgs,
      locations: populatedLocations,
    };
  });

  // Sort articles descending by publishedAt
  return articles.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getArticleBySlug(slug: string): Article | null {
  return getAllArticles().find((a) => a.slug === slug) || null;
}

export function getArticleById(id: string): Article | null {
  return getAllArticles().find((a) => a.id === id) || null;
}

export function getArticlesBySection(section: SectionId | string): Article[] {
  return getAllArticles().filter(
    (a) => a.section === section && a.brand === 'today-changyuan'
  );
}

export function getArticlesByBrand(brand: 'today-changyuan' | 'zhuangxianren'): Article[] {
  return getAllArticles().filter((a) => a.brand === brand);
}

// 6. Editorial Home Curation
export function getEditorialHome(): {
  instantAttentionArticles: Article[];
  heroArticle: Article;
  liveTopics: Topic[];
  editorPicksArticles: Article[];
  zhuangxianrenFeature: Article | null;
  premiumFeature: Article | null;
  latestArticles: Article[];
  mostReadArticles: Article[];
} {
  const homeYamlPath = path.join(CONTENT_DIR, 'editorial', 'home.yaml');
  let config: EditorialHome = {
    instantAttentionArticleIds: [],
    heroArticleId: '',
    liveTopicIds: [],
    editorPicksArticleIds: [],
  };

  if (fs.existsSync(homeYamlPath)) {
    try {
      config = yaml.parse(fs.readFileSync(homeYamlPath, 'utf-8')) as EditorialHome;
    } catch (e) {
      console.error('Failed to parse home.yaml, falling back to auto-curation', e);
    }
  }

  const allArticles = getAllArticles();
  const todayChangyuanArticles = allArticles.filter((a) => a.brand === 'today-changyuan');
  const allTopics = getAllTopics();

  // Hero article fallback: first featured today-changyuan article, or first available article
  let heroArticle = todayChangyuanArticles.find((a) => a.id === config.heroArticleId);
  if (!heroArticle) {
    heroArticle = todayChangyuanArticles.find((a) => a.featured) || todayChangyuanArticles[0];
  }

  // Instant Attention (NOW) Articles fallback: 4 latest articles
  let instantAttentionArticles = (config.instantAttentionArticleIds || [])
    .map((id) => allArticles.find((a) => a.id === id))
    .filter((a): a is Article => !!a);
  if (instantAttentionArticles.length === 0) {
    instantAttentionArticles = todayChangyuanArticles.slice(0, 4);
  }

  // Live Topics fallback: first 3 active topics
  let liveTopics = (config.liveTopicIds || [])
    .map((id) => allTopics.find((t) => t.id === id))
    .filter((t): t is Topic => !!t);
  if (liveTopics.length === 0) {
    liveTopics = allTopics.filter((t) => t.status === 'active').slice(0, 3);
  }

  // Editor's picks fallback: next 3 articles
  let editorPicksArticles = (config.editorPicksArticleIds || [])
    .map((id) => allArticles.find((a) => a.id === id))
    .filter((a): a is Article => !!a);
  if (editorPicksArticles.length === 0) {
    editorPicksArticles = todayChangyuanArticles.slice(1, 4);
  }

  // Zhuangxianren Feature
  let zhuangxianrenFeature = config.zhuangxianrenFeatureId
    ? allArticles.find((a) => a.id === config.zhuangxianrenFeatureId) || null
    : null;
  if (!zhuangxianrenFeature) {
    zhuangxianrenFeature = allArticles.find((a) => a.brand === 'zhuangxianren') || null;
  }

  // Premium Feature
  let premiumFeature = config.premiumFeatureId
    ? allArticles.find((a) => a.id === config.premiumFeatureId) || null
    : null;
  if (!premiumFeature) {
    premiumFeature = todayChangyuanArticles.find((a) => a.contentType === 'depth' || a.contentType === 'investigation') || null;
  }

  // Latest Articles: today-changyuan articles
  const latestArticles = todayChangyuanArticles.slice(0, 8);

  // Most Read simulation (clean algorithm ranking)
  const mostReadArticles = [...todayChangyuanArticles].reverse().slice(0, 5);

  return {
    instantAttentionArticles,
    heroArticle,
    liveTopics,
    editorPicksArticles,
    zhuangxianrenFeature,
    premiumFeature,
    latestArticles,
    mostReadArticles,
  };
}

// 7. Search Index
export function getSearchIndex(): SearchItem[] {
  const items: SearchItem[] = [];

  // Articles
  for (const art of getAllArticles()) {
    items.push({
      id: art.id,
      slug: art.slug,
      title: art.title,
      summary: art.summary,
      type: 'article',
      brand: art.brand,
      section: art.section,
      status: art.status,
      publishedAt: art.publishedAt,
      url: `/article/${art.slug}`,
      tags: art.tags,
    });
  }

  // Topics
  for (const top of getAllTopics()) {
    items.push({
      id: top.id,
      slug: top.slug,
      title: top.title,
      summary: top.summary,
      type: 'topic',
      publishedAt: top.updatedAt,
      url: `/topic/${top.slug}`,
      tags: ['持续专题', top.status],
    });
  }

  // Entities
  for (const ent of getAllEntities()) {
    items.push({
      id: ent.id,
      slug: ent.slug,
      title: ent.displayName,
      summary: ent.brief,
      type: ent.type,
      url: `/${ent.type === 'person' ? 'people' : ent.type === 'organization' ? 'organizations' : 'locations'}/${ent.slug}`,
      tags: ent.tags,
    });
  }

  return items;
}
