'use client';

import { useState } from 'react';
import Card from '@/components/common/Card';
import Badge from '@/components/common/Badge';

// 임시 데이터
const mockAnnouncement = {
  id: 1,
  title: '서울 강남구 행복주택 입주자 모집',
  housingType: '행복주택',
  region: '서울특별시 강남구',
  address: '서울특별시 강남구 테헤란로 123',
  dday: 5,
  applicationEndDate: '2025-02-15',
  minDeposit: 5000,
  maxDeposit: 8000,
  monthlyRent: 30,
  totalHouseholds: 150,
  eligibility: '소득 하위 80% 이하',
  commuteTime: 25,
  commuteAddress: '서울시 강남구 논현동',
  images: [
    '/placeholder-apartment.jpg',
    '/placeholder-floor-plan.jpg',
  ],
  schedules: [
    { date: '2025-02-10', event: '계약서 작성' },
    { date: '2025-02-12', event: '계약금 납입' },
    { date: '2025-02-15', event: '신청 마감' },
  ],
};

type TabType = 'info' | 'commute' | 'qa';

export default function AnnouncementDetail({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState<TabType>('info');

  const tabs = [
    { id: 'info' as TabType, label: '핵심 정보', icon: '📋' },
    { id: 'commute' as TabType, label: '출퇴근/주변', icon: '🚇' },
    { id: 'qa' as TabType, label: 'Q&A', icon: '💬' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30">
      <div className="container mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="danger" icon="⏰">D-{mockAnnouncement.dday}</Badge>
            <Badge variant="info" icon="🏠">{mockAnnouncement.housingType}</Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {mockAnnouncement.title}
          </h1>
          <div className="flex items-center gap-2 text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-lg">{mockAnnouncement.address}</span>
          </div>
        </div>

        {/* 탭 네비게이션 */}
        <Card className="mb-6 shadow-lg animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <nav className="flex space-x-2 p-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200
                  ${activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg scale-105'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }
                `}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </Card>

        {/* 탭 컨텐츠 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 메인 컨텐츠 */}
          <div className="lg:col-span-2 space-y-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {activeTab === 'info' && <InfoTab announcement={mockAnnouncement} />}
            {activeTab === 'commute' && <CommuteTab announcement={mockAnnouncement} />}
            {activeTab === 'qa' && <QATab />}
          </div>

          {/* 사이드바 */}
          <div className="lg:col-span-1">
            <Sidebar announcement={mockAnnouncement} />
          </div>
        </div>
      </div>
    </div>
  );
}

// 핵심 정보 탭
function InfoTab({ announcement }: { announcement: typeof mockAnnouncement }) {
  return (
    <div className="space-y-6">
      {/* 이미지 */}
      <Card className="overflow-hidden shadow-lg">
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span>🖼️</span> 이미지 갤러리
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {announcement.images.map((img, idx) => (
              <div
                key={idx}
                className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl flex items-center justify-center overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer"
              >
                <span className="text-gray-500 font-medium">이미지 {idx + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* 신청 자격 및 모집 정보 */}
      <Card gradient className="shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span>📊</span> 신청 자격 및 모집 정보
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 rounded-lg border border-blue-100">
              <span className="text-gray-600 font-medium flex items-center gap-2">
                <span>🏘️</span> 모집 세대수
              </span>
              <span className="font-bold text-gray-900 text-lg">{announcement.totalHouseholds}세대</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gradient-to-r from-emerald-50/50 to-teal-50/50 rounded-lg border border-emerald-100">
              <span className="text-gray-600 font-medium flex items-center gap-2">
                <span>💰</span> 소득 기준
              </span>
              <span className="font-bold text-gray-900">{announcement.eligibility}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gradient-to-r from-purple-50/50 to-pink-50/50 rounded-lg border border-purple-100">
              <span className="text-gray-600 font-medium flex items-center gap-2">
                <span>💵</span> 보증금
              </span>
              <span className="font-bold text-gray-900">
                {announcement.minDeposit.toLocaleString()}만원 ~ {announcement.maxDeposit.toLocaleString()}만원
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gradient-to-r from-amber-50/50 to-orange-50/50 rounded-lg border border-amber-100">
              <span className="text-gray-600 font-medium flex items-center gap-2">
                <span>📅</span> 월 임대료
              </span>
              <span className="font-bold text-gray-900">{announcement.monthlyRent.toLocaleString()}만원</span>
            </div>
          </div>
        </div>
      </Card>

      {/* 주요 일정 */}
      <Card gradient className="shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span>📅</span> 주요 일정
          </h2>
          <div className="space-y-3">
            {announcement.schedules.map((schedule, idx) => (
              <div 
                key={idx} 
                className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-xl border border-gray-200 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                    idx === 0 ? 'bg-blue-500' : idx === 1 ? 'bg-indigo-500' : 'bg-purple-500'
                  }`}>
                    {idx + 1}
                  </div>
                  <span className="text-gray-700 font-medium">{schedule.event}</span>
                </div>
                <span className="font-bold text-gray-900">{schedule.date}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}

// 출퇴근/주변 탭
function CommuteTab({ announcement }: { announcement: typeof mockAnnouncement }) {
  const [selectedCategory, setSelectedCategory] = useState('subway');

  return (
    <div className="space-y-6">
      {/* 지도 */}
      <Card className="shadow-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span>🗺️</span> 위치
          </h2>
          <div className="aspect-video bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 rounded-xl flex items-center justify-center border-2 border-dashed border-blue-300">
            <div className="text-center">
              <div className="text-4xl mb-2">🗺️</div>
              <span className="text-gray-600 font-medium">네이버 맵 지도 영역</span>
            </div>
          </div>
        </div>
      </Card>

      {/* 출퇴근 정보 */}
      <Card gradient className="shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span>🚇</span> 출퇴근 정보
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 rounded-xl border border-blue-100">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">기준 주소:</span>
                <span className="font-bold text-gray-900">{announcement.commuteAddress}</span>
              </div>
            </div>
            <div className="p-4 bg-gradient-to-r from-emerald-50/50 to-teal-50/50 rounded-xl border border-emerald-100">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">평균 이동 시간:</span>
                <span className="font-bold text-blue-600 text-xl">{announcement.commuteTime}분</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* 주변 시설 */}
      <Card gradient className="shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span>🏪</span> 주변 시설
          </h2>
          <div className="flex gap-2 mb-6 flex-wrap">
            {[
              { id: 'subway', label: '🚇 지하철역' },
              { id: 'school', label: '🏫 학교' },
              { id: 'store', label: '🏪 편의점' },
            ].map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`
                  px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                  ${selectedCategory === category.id
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                `}
              >
                {category.label}
              </button>
            ))}
          </div>
          <div className="p-6 bg-gray-50 rounded-xl border border-gray-200 text-center">
            <div className="text-4xl mb-2">📍</div>
            <div className="text-sm text-gray-600">선택한 카테고리로 필터링된 주변 시설이 표시됩니다.</div>
          </div>
        </div>
      </Card>
    </div>
  );
}

// Q&A 탭
function QATab() {
  const [question, setQuestion] = useState('');

  return (
    <Card gradient className="shadow-lg">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <span>💬</span> AI 챗봇에게 질문하기
        </h2>
        <div className="space-y-4">
          {/* 채팅 영역 */}
          <div className="h-96 bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-xl p-6 overflow-y-auto border border-gray-200 mb-4">
            <div className="space-y-4">
              <div className="flex justify-end animate-fade-in">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl px-5 py-3 max-w-xs shadow-lg">
                  <p className="font-medium">이 공고의 신청 자격이 무엇인가요?</p>
                </div>
              </div>
              <div className="flex justify-start animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <div className="bg-white border-2 border-gray-200 rounded-2xl px-5 py-3 max-w-xs shadow-md">
                  <p className="text-gray-700">이 공고는 소득 하위 80% 이하 가구가 신청 가능합니다. 상세한 조건은 공고문을 참고해주세요.</p>
                </div>
              </div>
            </div>
          </div>

          {/* 질문 입력 */}
          <div className="flex gap-3">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="질문을 입력하세요..."
              className="flex-1 px-5 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-base"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  setQuestion('');
                }
              }}
            />
            <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200">
              전송
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}

// 사이드바
function Sidebar({ announcement }: { announcement: typeof mockAnnouncement }) {
  return (
    <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
      <Card gradient className="shadow-xl sticky top-24">
        <div className="p-6">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span>💰</span> 임대 금액
          </h3>
          <div className="space-y-4 mb-6">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">보증금</span>
              </div>
              <span className="font-bold text-gray-900 text-lg">
                {announcement.minDeposit.toLocaleString()}만원 ~ {announcement.maxDeposit.toLocaleString()}만원
              </span>
            </div>
            <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">월 임대료</span>
              </div>
              <span className="font-bold text-gray-900 text-lg">
                {announcement.monthlyRent.toLocaleString()}만원
              </span>
            </div>
          </div>
          <div className="pt-6 border-t-2 border-gray-200">
            <p className="text-sm text-gray-500 mb-3 font-medium">상호보완시 금액:</p>
            <div className="p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl border-2 border-purple-300">
              <p className="text-xl font-bold text-purple-700 text-center">
                보증금 {((announcement.minDeposit + announcement.maxDeposit) / 2).toLocaleString()}만원<br />
                + 월 {announcement.monthlyRent.toLocaleString()}만원
              </p>
            </div>
          </div>
        </div>
      </Card>

      <Card gradient className="shadow-xl">
        <div className="p-6">
          <button className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-bold text-lg hover:from-blue-600 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200 mb-3">
            ✨ 신청하기
          </button>
          <button className="w-full px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl font-semibold hover:from-gray-200 hover:to-gray-300 shadow-md hover:shadow-lg transition-all duration-200">
            ⭐ 관심 공고로 저장
          </button>
        </div>
      </Card>
    </div>
  );
}
