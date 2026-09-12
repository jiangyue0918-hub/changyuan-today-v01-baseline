import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getAllEntities, getEntityBySlug } from '@/lib/content';
import EntityView from '@/components/entity/EntityView';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const locs = getAllEntities('location');
  return locs.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const loc = getEntityBySlug('location', slug);
  if (!loc) return { title: '地标档案未找到 - 今日长垣' };

  return {
    title: `${loc.displayName} - 地理地标 - 今日长垣`,
    description: loc.brief,
  };
}

export default async function LocationPage({ params }: Props) {
  const { slug } = await params;
  const loc = getEntityBySlug('location', slug);

  if (!loc) {
    notFound();
  }

  return <EntityView entity={loc} />;
}
