import { notFound } from 'next/navigation';
import type { AnnouncementDetail } from '@/types/api';
import { AnnouncementDetailClient } from './AnnouncementDetailClient';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

async function fetchAnnouncementDetail(id: string): Promise<AnnouncementDetail> {
  const res = await fetch(`${API_BASE_URL}/api/v1/announcements/${id}`, {
    cache: 'no-store',
  });

  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error('Failed to fetch announcement detail');
  }

  return res.json();
}

export default async function AnnouncementDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const announcement = await fetchAnnouncementDetail(id);
  return <AnnouncementDetailClient announcement={announcement} />;
}