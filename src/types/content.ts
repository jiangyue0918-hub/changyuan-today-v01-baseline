export type BrandId = 'today-changyuan' | 'zhuangxianren';

export type SectionId =
  | 'changyuan'
  | 'finance'
  | 'society'
  | 'people'
  | 'culture'
  | 'depth'
  | 'sports'
  | 'lifestyle'
  | 'audio';

export type ContentType =
  | 'breaking'
  | 'report'
  | 'depth'
  | 'interview'
  | 'opinion'
  | 'investigation'
  | 'photo'
  | 'video'
  | 'data';

export type VerificationStatus =
  | 'breaking'
  | 'unverified'
  | 'verified'
  | 'updating'
  | 'depth'
  | 'corrected'
  | 'retracted'
  | 'archived';

export type WorkflowState = 'draft' | 'ready' | 'published';

export type AccessLevel = 'public' | 'member' | 'premium';

export interface ArticleUpdate {
  at: string;
  type: 'update' | 'correction' | 'clarification' | 'retraction';
  reason: string;
  summary: string;
  optionalVersionLabel?: string;
}

export interface ArticleFrontmatter {
  id: string;
  slug: string;
  title: string;
  deck?: string;
  summary: string;
  brand: BrandId;
  section: SectionId;
  contentType: ContentType;
  authorIds: string[];
  publishedAt: string;
  updatedAt: string;
  status: VerificationStatus;
  workflow: WorkflowState;
  access: AccessLevel;
  cover?: string;
  coverCaption?: string;
  tags?: string[];
  topicIds?: string[];
  personIds?: string[];
  organizationIds?: string[];
  locationIds?: string[];
  eventIds?: string[];
  sourceRefs?: string[];
  commentsEnabled?: boolean;
  featured?: boolean;
  issue?: string;
  volume?: string;
  column?: string;
  updates?: ArticleUpdate[];
}

export interface Article extends ArticleFrontmatter {
  contentHtml: string;
  rawBody: string;
  authors?: Author[];
  topics?: Topic[];
  people?: Entity[];
  organizations?: Entity[];
  locations?: Entity[];
}

export interface TopicTimelineItem {
  date: string;
  title: string;
  description: string;
  articleId?: string;
}

export interface Topic {
  id: string;
  slug: string;
  title: string;
  summary: string;
  status: 'active' | 'closed' | 'archived';
  classification?: 'CANON' | 'WEB_DERIVED' | 'PLACEHOLDER';
  cover?: string;
  startedAt: string;
  updatedAt: string;
  eventIds?: string[];
  personIds?: string[];
  organizationIds?: string[];
  locationIds?: string[];
  keyArticleIds?: string[];
  confirmed?: string[];
  unconfirmed?: string[];
  timeline?: TopicTimelineItem[];
  updates?: ArticleUpdate[];
  // Aggregated fields
  articles?: Article[];
}

export interface EntityFact {
  label: string;
  value: string;
}

export interface Entity {
  id: string;
  slug: string;
  displayName: string;
  type: 'person' | 'organization' | 'location';
  classification?: 'CANON' | 'WEB_DERIVED' | 'PLACEHOLDER';
  brief: string;
  cover?: string;
  avatar?: string;
  tags?: string[];
  facts?: EntityFact[];
  organizationIds?: string[];
  locationIds?: string[];
  // Aggregated
  articles?: Article[];
  topics?: Topic[];
}

export interface Author {
  id: string;
  slug: string;
  name: string;
  title: string;
  bio: string;
  avatar?: string;
  verified: boolean;
  section?: string;
  emailPlaceholder?: string;
  // Aggregated
  articles?: Article[];
}

export interface Brand {
  id: BrandId;
  name: string;
  enName: string;
  parentGroup: string;
  tagline: string;
  foundedYear: string;
  primaryColor: string;
  description: string;
}

export interface EditorialHome {
  instantAttentionArticleIds: string[];
  heroArticleId: string;
  liveTopicIds: string[];
  editorPicksArticleIds: string[];
  zhuangxianrenFeatureId?: string;
  premiumFeatureId?: string;
}

export interface SearchItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  type: 'article' | 'topic' | 'person' | 'organization' | 'location';
  brand?: BrandId;
  section?: SectionId;
  status?: VerificationStatus;
  publishedAt?: string;
  url: string;
  tags?: string[];
}
