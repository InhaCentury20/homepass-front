import apiClient from './client';
import { API_ENDPOINTS } from './endpoints';
import type {
  Announcement,
  AnnouncementDetail,
  AnnouncementListResponse,
} from '@/types/api';

export interface AnnouncementQueryParams {
  page?: number;
  size?: number;
  region?: string;
  housing_type?: string;
}

export const getAnnouncements = async (
  params: AnnouncementQueryParams = {},
): Promise<AnnouncementListResponse> => {
  const { data } = await apiClient.get<AnnouncementListResponse>(API_ENDPOINTS.ANNOUNCEMENTS.LIST, {
    params,
  });
  return data;
};

export const getAnnouncementDetail = async (
  id: number,
): Promise<AnnouncementDetail> => {
  const { data } = await apiClient.get<AnnouncementDetail>(API_ENDPOINTS.ANNOUNCEMENTS.DETAIL(id));
  return data;
};

export const getAnnouncementByIdFromCache = (
  announcements: Announcement[],
  id: number,
): Announcement | undefined => announcements.find((item) => item.announcement_id === id);

