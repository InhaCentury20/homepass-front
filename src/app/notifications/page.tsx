'use client';

import Card from '@/components/common/Card';
import Badge from '@/components/common/Badge';
import Link from 'next/link';

const mockNotifications = [
  {
    id: 1,
    type: 'new_announcement',
    message: '새로운 공고가 등록되었습니다: 서울 강남구 행복주택',
    isRead: false,
    createdAt: '2025-01-20 10:30',
    announcementId: 1,
  },
  {
    id: 2,
    type: 'auto_apply_complete',
    message: '자동 신청이 완료되었습니다: 경기도 성남시 국민임대',
    isRead: false,
    createdAt: '2025-01-19 14:20',
    announcementId: 2,
  },
  {
    id: 3,
    type: 'dday',
    message: 'D-5: 서울 송파구 행복주택 신청 마감이 5일 남았습니다.',
    isRead: true,
    createdAt: '2025-01-18 09:15',
    announcementId: 3,
  },
  {
    id: 4,
    type: 'result',
    message: '신청 결과가 발표되었습니다: 경쟁률 15.2:1',
    isRead: true,
    createdAt: '2025-01-17 16:45',
    announcementId: 4,
  },
];

export default function NotificationsPage() {
  const unreadCount = mockNotifications.filter((n) => !n.isRead).length;

  const getNotificationBadge = (type: string) => {
    switch (type) {
      case 'new_announcement':
        return <Badge variant="info" icon="📢">새 공고</Badge>;
      case 'auto_apply_complete':
        return <Badge variant="success" icon="✅">자동 신청</Badge>;
      case 'dday':
        return <Badge variant="warning" icon="⏰">D-day</Badge>;
      case 'result':
        return <Badge variant="info" icon="📊">결과</Badge>;
      default:
        return null;
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'new_announcement':
        return '🆕';
      case 'auto_apply_complete':
        return '🤖';
      case 'dday':
        return '⏰';
      case 'result':
        return '📊';
      default:
        return '🔔';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30">
      <div className="container mx-auto px-4 py-8">
        {/* 헤더 */}
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

        {/* 알림 리스트 */}
        <div className="space-y-4">
          {mockNotifications.map((notification, idx) => (
            <Card
              key={notification.id}
              hover={!notification.isRead}
              gradient={!notification.isRead}
              className={`animate-fade-in ${notification.isRead ? 'opacity-75' : 'border-l-4 border-l-blue-500'}`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  {/* 아이콘 */}
                  <div className={`
                    w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0
                    ${notification.isRead 
                      ? 'bg-gray-100' 
                      : 'bg-gradient-to-br from-blue-100 to-indigo-100 animate-pulse'
                    }
                  `}>
                    {getNotificationIcon(notification.type)}
                  </div>

                  {/* 컨텐츠 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        {getNotificationBadge(notification.type)}
                        {!notification.isRead && (
                          <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                        {notification.createdAt}
                      </span>
                    </div>
                    
                    <p className={`text-gray-900 mb-4 ${!notification.isRead ? 'font-medium' : ''}`}>
                      {notification.message}
                    </p>

                    <div className="flex gap-2">
                      <Link
                        href={`/announcements/${notification.announcementId}`}
                        className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 rounded-lg hover:from-blue-100 hover:to-indigo-100 hover:shadow-md transition-all duration-200 border border-blue-200"
                      >
                        공고 보기
                      </Link>
                      {!notification.isRead && (
                        <button className="px-4 py-2 text-sm font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 hover:shadow-md transition-all duration-200">
                          읽음 처리
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* 읽음 처리 버튼 */}
        {unreadCount > 0 && (
          <div className="mt-8 text-center animate-fade-in">
            <button className="px-8 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl font-semibold hover:from-gray-200 hover:to-gray-300 shadow-md hover:shadow-lg transition-all duration-200">
              전체 읽음 처리
            </button>
          </div>
        )}

        {/* 빈 상태 */}
        {mockNotifications.length === 0 && (
          <Card className="animate-fade-in">
            <div className="p-16 text-center">
              <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                <span className="text-4xl">🔔</span>
              </div>
              <p className="text-gray-500 text-lg font-medium">알림이 없습니다</p>
              <p className="text-gray-400 text-sm mt-2">새로운 알림이 오면 여기에 표시됩니다</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
