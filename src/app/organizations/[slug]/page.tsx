import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getAllEntities, getEntityBySlug } from '@/lib/content';
import EntityView from '@/components/entity/EntityView';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const orgs = getAllEntities('organization');
  return orgs.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const org = getEntityBySlug('organization', slug);
  if (!org) return { title: '机构档案未找到 - 今日长垣' };

  return {
    title: `${org.displayName} - 机构卷宗 - 今日长垣`,
    description: org.brief,
  };
}

export default async function OrgPage({ params }: Props) {
  const { slug } = await params;
  const org = getEntityBySlug('organization', slug);

  if (!org) {
    notFound();
  }

  return <EntityView entity={org} />;
}
