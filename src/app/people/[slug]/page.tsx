import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getAllEntities, getEntityBySlug } from '@/lib/content';
import EntityView from '@/components/entity/EntityView';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const people = getAllEntities('person');
  return people.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const person = getEntityBySlug('person', slug);
  if (!person) return { title: '人物档案未找到 - 今日长垣' };

  return {
    title: `${person.displayName} - 人物卷宗 - 今日长垣`,
    description: person.brief,
  };
}

export default async function PersonPage({ params }: Props) {
  const { slug } = await params;
  const person = getEntityBySlug('person', slug);

  if (!person) {
    notFound();
  }

  return <EntityView entity={person} />;
}
