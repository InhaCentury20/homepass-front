'use client';

import { useState } from 'react';
import Link from 'next/link';
import Card from '@/components/common/Card';
import Badge from '@/components/common/Badge';

// 임시 데이터
const mockAnnouncements = [
  {
    id: 1,
    title: '서울 강남구 행복주택 입주자 모집',
    housingType: '행복주택',
    region: '서울특별시 강남구',
    dday: 5,
    isCustomized: true,
    minDeposit: 5000,
    maxDeposit: 8000,
    monthlyRent: 30,
    applicationEndDate: '2025-02-15',
  },
  {
    id: 2,
    title: '경기도 성남시 국민임대 주택 입주자 모집',
    housingType: '국민임대',
    region: '경기도 성남시',
    dday: 12,
    isCustomized: false,
    minDeposit: 3000,
    maxDeposit: 5000,
    monthlyRent: 25,
    applicationEndDate: '2025-02-22',
  },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedHousingType, setSelectedHousingType] = useState('');
  const [sortBy, setSortBy] = useState('latest');

  const regions = ['전체', '서울특별시', '경기도', '인천광역시', '부산광역시'];
  const housingTypes = ['전체', '행복주택', '국민임대', '공공임대'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30">
      <div className="container mx-auto px-4 py-8">
        {/* 헤더 섹션 */}
        <div className="mb-8 text-center animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            청약 공고를 한눈에
          </h1>
          <p className="text-gray-600 text-lg">맞춤형 청약 공고를 찾아보세요</p>
        </div>

        {/* 필터 섹션 */}
        <Card className="mb-8 p-6 shadow-lg animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* 검색 바 */}
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="공고명 또는 지역으로 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                />
              </div>

              {/* 필터 그룹 */}
              <div className="flex flex-col sm:flex-row gap-2">
                {/* 지역 필터 */}
                <div className="relative">
                  <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 bg-white appearance-none cursor-pointer transition-all min-w-[140px]"
                  >
                    {regions.map((region) => (
                      <option key={region} value={region === '전체' ? '' : region}>
                        {region}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* 주택 유형 필터 */}
                <div className="relative">
                  <select
                    value={selectedHousingType}
                    onChange={(e) => setSelectedHousingType(e.target.value)}
                    className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 bg-white appearance-none cursor-pointer transition-all min-w-[120px]"
                  >
                    {housingTypes.map((type) => (
                      <option key={type} value={type === '전체' ? '' : type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* 정렬 */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 bg-white appearance-none cursor-pointer transition-all min-w-[130px]"
                  >
                    <option value="latest">최신순</option>
                    <option value="dday">마감 임박순</option>
                    <option value="deposit">보증금 낮은순</option>
                    <option value="rent">월 임대료 낮은순</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* 자주 검색하는 키워드 */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-200">
              <span className="text-sm text-gray-600 font-medium flex items-center gap-1">
                <span>🔥</span> 자주 검색:
              </span>
              {['강남구', '행복주택', '국민임대', '서울'].map((keyword) => (
                <button
                  key={keyword}
                  onClick={() => setSearchQuery(keyword)}
                  className="px-3 py-1.5 text-sm bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 rounded-full hover:from-blue-50 hover:to-indigo-50 hover:text-blue-600 hover:shadow-md transition-all duration-200 font-medium border border-gray-200/50 hover:border-blue-200"
                >
                  {keyword}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* 공고 카드 리스트 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockAnnouncements.map((announcement, idx) => (
            <Link 
              key={announcement.id} 
              href={`/announcements/${announcement.id}`}
              className="animate-fade-in"
              style={{ animationDelay: `${(idx + 1) * 0.1}s` }}
            >
              <Card hover gradient className="h-full overflow-hidden">
                {/* 그라데이션 상단 바 */}
                {announcement.isCustomized && (
                  <div className="h-1.5 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400"></div>
                )}
                
                <div className="p-6">
                  {/* 헤더 */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex flex-wrap gap-2">
                      {announcement.isCustomized && (
                        <Badge variant="success" icon="⭐">
                          맞춤
                        </Badge>
                      )}
                      <Badge variant="danger" icon="⏰">
                        D-{announcement.dday}
                      </Badge>
                    </div>
                    <Badge variant="info" icon="🏠">
                      {announcement.housingType}
                    </Badge>
                  </div>

                  {/* 제목 */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
                    {announcement.title}
                  </h3>

                  {/* 지역 */}
                  <div className="flex items-center gap-1.5 mb-5 text-sm text-gray-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {announcement.region}
                  </div>

                  {/* 금액 정보 */}
                  <div className="space-y-3 mb-5 p-4 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 rounded-xl border border-blue-100/50">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 flex items-center gap-1">
                        💰 보증금
                      </span>
                      <span className="font-bold text-gray-900 text-sm">
                        {announcement.minDeposit.toLocaleString()}만원 ~ {announcement.maxDeposit.toLocaleString()}만원
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 flex items-center gap-1">
                        💵 월 임대료
                      </span>
                      <span className="font-bold text-gray-900 text-sm">
                        {announcement.monthlyRent.toLocaleString()}만원
                      </span>
                    </div>
                  </div>

                  {/* 마감일 */}
                  <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-xs text-gray-500">
                        마감일: {announcement.applicationEndDate}
                      </p>
                    </div>
                    <span className="text-blue-600 text-xs font-semibold flex items-center gap-1">
                      자세히 보기
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* 무한 스크롤 영역 */}
        <div className="mt-12 text-center animate-pulse">
          <div className="inline-flex items-center gap-2 text-gray-500 text-sm">
            <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            더 많은 공고를 불러오는 중...
          </div>
        </div>
      </div>
    </div>
  );
}
