import apiClient from './client';
import { API_ENDPOINTS } from './endpoints';
import type { NotificationListResponse } from '@/types/api';

export const getNotifications = async (): Promise<NotificationListResponse> => {
  const { data } = await apiClient.get<NotificationListResponse>(API_ENDPOINTS.NOTIFICATIONS.LIST);
  return data;
};

export const markNotificationsAsRead = async (): Promise<NotificationListResponse> => {
  const { data } = await apiClient.post<NotificationListResponse>(API_ENDPOINTS.NOTIFICATIONS.MARK_READ);
  return data;
};

