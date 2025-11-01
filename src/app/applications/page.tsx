'use client';

import { useState } from 'react';
import Card from '@/components/common/Card';
import Badge from '@/components/common/Badge';
import Link from 'next/link';

type StatusType = 'all' | 'applied' | 'document_review' | 'won' | 'failed';

const mockApplications = [
  {
    id: 1,
    announcementTitle: '서울 강남구 행복주택 입주자 모집',
    status: 'applied' as const,
    appliedAt: '2025-01-15',
    announcementId: 1,
  },
  {
    id: 2,
    announcementTitle: '경기도 성남시 국민임대 주택 입주자 모집',
    status: 'document_review' as const,
    appliedAt: '2025-01-10',
    announcementId: 2,
  },
  {
    id: 3,
    announcementTitle: '서울 송파구 행복주택 입주자 모집',
    status: 'won' as const,
    appliedAt: '2024-12-20',
    announcementId: 3,
  },
];

const statusLabels = {
  all: { label: '전체', icon: '📋', color: 'from-gray-500 to-gray-600' },
  applied: { label: '신청 완료', icon: '✅', color: 'from-blue-500 to-blue-600' },
  document_review: { label: '서류 심사', icon: '📄', color: 'from-amber-500 to-amber-600' },
  won: { label: '당첨', icon: '🎉', color: 'from-emerald-500 to-emerald-600' },
  failed: { label: '미당첨', icon: '❌', color: 'from-red-500 to-red-600' },
};

export default function ApplicationsPage() {
  const [selectedStatus, setSelectedStatus] = useState<StatusType>('all');

  const filteredApplications =
    selectedStatus === 'all'
      ? mockApplications
      : mockApplications.filter((app) => app.status === selectedStatus);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'applied':
        return <Badge variant="info" icon="✅">신청 완료</Badge>;
      case 'document_review':
        return <Badge variant="warning" icon="📄">서류 심사</Badge>;
      case 'won':
        return <Badge variant="success" icon="🎉">당첨</Badge>;
      case 'failed':
        return <Badge variant="danger" icon="❌">미당첨</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30">
      <div className="container mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            신청 내역
          </h1>
          <p className="text-gray-600">청약 신청 현황을 확인하세요</p>
        </div>

        {/* 상태 필터 */}
        <Card className="mb-8 p-4 shadow-lg animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="flex flex-wrap gap-3">
            {(Object.keys(statusLabels) as StatusType[]).map((status) => {
              const statusInfo = statusLabels[status];
              const isActive = selectedStatus === status;
              
              return (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`
                    relative px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200
                    ${isActive 
                      ? `bg-gradient-to-r ${statusInfo.color} text-white shadow-lg transform scale-105`
                      : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 shadow-sm'
                    }
                  `}
                >
                  <span className="mr-2">{statusInfo.icon}</span>
                  {statusInfo.label}
                  {isActive && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-pulse"></span>
                  )}
                </button>
              );
            })}
          </div>
        </Card>

        {/* 신청 내역 리스트 */}
        <div className="space-y-4">
          {filteredApplications.length === 0 ? (
            <Card className="animate-fade-in">
              <div className="p-16 text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-gray-500 text-lg font-medium">신청 내역이 없습니다</p>
                <p className="text-gray-400 text-sm mt-2">새로운 공고에 신청해보세요!</p>
              </div>
            </Card>
          ) : (
            filteredApplications.map((application, idx) => (
              <Card 
                key={application.id} 
                hover 
                gradient
                className="animate-fade-in"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                        {application.announcementTitle}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1.5">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          신청일: {application.appliedAt}
                        </div>
                      </div>
                    </div>
                    <div className="ml-4">
                      {getStatusBadge(application.status)}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    <Link
                      href={`/announcements/${application.announcementId}`}
                      className="flex-1 px-4 py-2.5 text-sm font-medium bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 rounded-lg hover:from-blue-50 hover:to-indigo-50 hover:text-blue-600 hover:shadow-md transition-all duration-200 text-center border border-gray-200 hover:border-blue-200"
                    >
                      공고 보기
                    </Link>
                    <button className="flex-1 px-4 py-2.5 text-sm font-medium bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all duration-200">
                      상세 보기
                    </button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
