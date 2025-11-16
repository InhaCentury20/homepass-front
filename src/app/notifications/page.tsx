'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Card from '@/components/common/Card';
import Badge from '@/components/common/Badge';
import { getNotifications, markNotificationsAsRead } from '@/lib/api/notifications';
import type { NotificationItem } from '@/types/api';

const badgeByCategory: Record<string, { variant: 'info' | 'success' | 'warning' | 'danger'; icon: string; label: string }> = {
  new_announcement: { variant: 'info', icon: '📢', label: '새 공고' },
  auto_apply_complete: { variant: 'success', icon: '✅', label: '자동 신청' },
  dday: { variant: 'warning', icon: '⏰', label: 'D-day' },
  result: { variant: 'info', icon: '📊', label: '결과' },
};

const iconByCategory: Record<string, string> = {
  new_announcement: '🆕',
  auto_apply_complete: '🤖',
  dday: '⏰',
  result: '📊',
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const unreadCount = useMemo(() => notifications.filter((item) => !item.is_read).length, [notifications]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getNotifications();
        setNotifications(data.items);
      } catch (err) {
        console.error(err);
        setError('알림을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleMarkAllRead = async () => {
    try {
      const data = await markNotificationsAsRead();
      setNotifications(data.items);
    } catch (err) {
      console.error(err);
    }
  };

  const formatDateTime = (value?: string) => {
    if (!value) return '방금';
    return value.replace('T', ' ').slice(0, 16);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between animate-fade-in">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              알림
            </h1>
            <p className="text-gray-600">새로운 소식을 확인하세요</p>
          </div>
          {unreadCount > 0 && (
            <div className="relative">
              <span className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full text-sm font-semibold shadow-lg animate-pulse">
                읽지 않은 알림 {unreadCount}개
              </span>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full border-2 border-white animate-bounce"></span>
            </div>
          )}
        </div>

        {loading && (
          <div className="py-16 text-center text-gray-500 animate-pulse">알림을 불러오는 중입니다...</div>
        )}

        {!loading && error && (
          <Card className="mb-6 border-red-200 bg-red-50 text-red-700">
            <div className="p-6 text-center font-medium">{error}</div>
          </Card>
        )}

        {!loading && !error && (
          <>
            <div className="space-y-4">
              {notifications.map((notification, idx) => {
                const badgeInfo = badgeByCategory[notification.category];
                const leadingIcon = iconByCategory[notification.category] ?? '🔔';

                return (
                  <Card
                    key={notification.notification_id}
                    hover={!notification.is_read}
                    gradient={!notification.is_read}
                    className={`animate-fade-in ${notification.is_read ? 'opacity-75' : 'border-l-4 border-l-blue-500'}`}
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${
                            notification.is_read ? 'bg-gray-100' : 'bg-gradient-to-br from-blue-100 to-indigo-100 animate-pulse'
                          }`}
                        >
                          {leadingIcon}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2 flex-wrap">
                              {badgeInfo ? (
                                <Badge variant={badgeInfo.variant} icon={badgeInfo.icon}>
                                  {badgeInfo.label}
                                </Badge>
                              ) : (
                                <Badge variant="default">알림</Badge>
                              )}
                              {!notification.is_read && (
                                <span className="relative flex h-3 w-3">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                              {formatDateTime(notification.created_at)}
                            </span>
                          </div>

                          <p className={`text-gray-900 mb-4 ${!notification.is_read ? 'font-medium' : ''}`}>
                            {notification.message}
                          </p>

                          <div className="flex gap-2">
                            {notification.announcement_id !== undefined && (
                              <Link
                                href={`/announcements/${notification.announcement_id}`}
                                className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 rounded-lg hover:from-blue-100 hover:to-indigo-100 hover:shadow-md transition-all duration-200 border border-blue-200"
                              >
                                공고 보기
                              </Link>
                            )}
                            {!notification.is_read && (
                              <button
                                onClick={handleMarkAllRead}
                                className="px-4 py-2 text-sm font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 hover:shadow-md transition-all duration-200"
                              >
                                읽음 처리
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {notifications.length === 0 && (
              <Card className="animate-fade-in mt-8">
                <div className="p-16 text-center">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                    <span className="text-4xl">🔔</span>
                  </div>
                  <p className="text-gray-500 text-lg font-medium">알림이 없습니다</p>
                  <p className="text-gray-400 text-sm mt-2">새로운 알림이 오면 여기에 표시됩니다</p>
                </div>
              </Card>
            )}

            {unreadCount > 0 && (
              <div className="mt-8 text-center animate-fade-in">
                <button
                  onClick={handleMarkAllRead}
                  className="px-8 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl font-semibold hover:from-gray-200 hover:to-gray-300 shadow-md hover:shadow-lg transition-all duration-200"
                >
                  전체 읽음 처리
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
