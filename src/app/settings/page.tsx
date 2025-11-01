'use client';

import { useState } from 'react';
import Card from '@/components/common/Card';

type TabType = 'personal' | 'subscription' | 'preferences' | 'auto-apply' | 'notifications';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('personal');

  const tabs = [
    { id: 'personal' as TabType, label: '개인 정보', icon: '👤' },
    { id: 'subscription' as TabType, label: '청약 정보', icon: '🏦' },
    { id: 'preferences' as TabType, label: '희망 조건', icon: '⭐' },
    { id: 'auto-apply' as TabType, label: '자동 신청', icon: '🤖' },
    { id: 'notifications' as TabType, label: '알림 설정', icon: '🔔' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-8 animate-fade-in">
          설정
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* 사이드바 */}
          <div className="lg:col-span-1">
            <Card gradient className="shadow-lg sticky top-24 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <nav className="p-4 space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-3
                      ${activeTab === tab.id
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg scale-105'
                        : 'text-gray-700 hover:bg-gray-100 hover:scale-102'
                      }
                    `}
                  >
                    <span className="text-xl">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </nav>
            </Card>
          </div>

          {/* 컨텐츠 */}
          <div className="lg:col-span-3">
            {activeTab === 'personal' && <PersonalInfoTab />}
            {activeTab === 'subscription' && <SubscriptionInfoTab />}
            {activeTab === 'preferences' && <PreferencesTab />}
            {activeTab === 'auto-apply' && <AutoApplyTab />}
            {activeTab === 'notifications' && <NotificationsTab />}
          </div>
        </div>
      </div>
    </div>
  );
}

// 개인 정보 탭
function PersonalInfoTab() {
  return (
    <Card gradient className="shadow-xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <span>👤</span> 개인 정보
        </h2>
        <p className="text-gray-600 mb-8">개인 신상 정보를 관리하세요</p>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                이름
              </label>
              <input
                type="text"
                defaultValue="홍길동"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                생년월일
              </label>
              <input
                type="date"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                핸드폰 번호
              </label>
              <input
                type="tel"
                defaultValue="010-1234-5678"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                현재 거주 지역
              </label>
              <input
                type="text"
                placeholder="예: 서울특별시 강남구"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                월 평균 소득
              </label>
              <input
                type="number"
                placeholder="만원 단위"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-6 p-6 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 rounded-xl border border-blue-100">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <span className="text-gray-700 font-medium">1인 가구</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <span className="text-gray-700 font-medium">배우자 여부</span>
            </label>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              자가/자차 소유 여부 및 금액
            </label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="자가 소유 여부"
                className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
              />
              <input
                type="number"
                placeholder="금액 (만원)"
                className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
              />
            </div>
          </div>
          
          <button className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-bold text-lg hover:from-blue-600 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200">
            💾 저장하기
          </button>
        </div>
      </div>
    </Card>
  );
}

// 청약 정보 탭
function SubscriptionInfoTab() {
  return (
    <Card gradient className="shadow-xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <span>🏦</span> 청약 정보
        </h2>
        <p className="text-gray-600 mb-8">청약 통장 정보를 입력하세요</p>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              청약 통장 가입 은행
            </label>
            <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all bg-white">
              <option>은행 선택</option>
              <option>KB국민은행</option>
              <option>신한은행</option>
              <option>하나은행</option>
            </select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                청약 통장 가입일
              </label>
              <input
                type="date"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                세대주 여부
              </label>
              <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all bg-white">
                <option>예</option>
                <option>아니오</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                납입 인정 횟수
              </label>
              <input
                type="number"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                총 납입 인정 금액
              </label>
              <input
                type="number"
                placeholder="만원 단위"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
              />
            </div>
          </div>
          
          <button className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-bold text-lg hover:from-blue-600 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200">
            💾 저장하기
          </button>
        </div>
      </div>
    </Card>
  );
}

// 희망 조건 탭
function PreferencesTab() {
  return (
    <Card gradient className="shadow-xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <span>⭐</span> 희망 조건
        </h2>
        <p className="text-gray-600 mb-8">원하는 청약 조건을 설정하세요</p>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              희망 지역
            </label>
            <input
              type="text"
              placeholder="예: 서울특별시 강남구, 경기도 성남시"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              희망 주택 유형
            </label>
            <div className="flex flex-wrap gap-3 p-4 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 rounded-xl border border-blue-100">
              {['행복주택', '국민임대', '공공임대'].map((type) => (
                <label key={type} className="flex items-center gap-2 cursor-pointer px-4 py-2 bg-white rounded-lg border-2 border-gray-200 hover:border-blue-300 transition-all">
                  <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-gray-700 font-medium">{type}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                최소 평형 (m²)
              </label>
              <input
                type="number"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                최대 평형 (m²)
              </label>
              <input
                type="number"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                최대 보증금 (만원)
              </label>
              <input
                type="number"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                최대 월 임대료 (만원)
              </label>
              <input
                type="number"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                출퇴근 기준 주소
              </label>
              <input
                type="text"
                placeholder="예: 서울특별시 강남구"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                최대 출퇴근 소요 시간 (분)
              </label>
              <input
                type="number"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
              />
            </div>
          </div>
          
          <button className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-bold text-lg hover:from-blue-600 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200">
            💾 저장하기
          </button>
        </div>
      </div>
    </Card>
  );
}

// 자동 신청 탭
function AutoApplyTab() {
  const [mode, setMode] = useState<'full_auto' | 'approval' | 'disabled'>('disabled');

  const modes = [
    {
      id: 'full_auto' as const,
      title: '완전 자동',
      description: '조건에 맞는 공고가 올라오면 자동으로 신청합니다.',
      icon: '🤖',
      gradient: 'from-emerald-500 to-teal-600',
    },
    {
      id: 'approval' as const,
      title: '알림 후 승인',
      description: '조건에 맞는 공고 발견 시 알림을 보내고, 승인 시 신청합니다.',
      icon: '🔔',
      gradient: 'from-blue-500 to-indigo-600',
    },
    {
      id: 'disabled' as const,
      title: '비활성화',
      description: '자동 신청을 사용하지 않습니다.',
      icon: '❌',
      gradient: 'from-gray-400 to-gray-500',
    },
  ];

  return (
    <Card gradient className="shadow-xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <span>🤖</span> 자동 신청 모드
        </h2>
        <p className="text-gray-600 mb-8">원하는 자동 신청 방식을 선택하세요</p>
        
        <div className="space-y-4">
          {modes.map((modeOption) => (
            <label
              key={modeOption.id}
              className={`
                flex items-start gap-4 p-6 rounded-xl border-2 cursor-pointer transition-all duration-200
                ${mode === modeOption.id
                  ? `bg-gradient-to-r ${modeOption.gradient} text-white border-transparent shadow-lg scale-105`
                  : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md'
                }
              `}
            >
              <input
                type="radio"
                name="auto-apply-mode"
                value={modeOption.id}
                checked={mode === modeOption.id}
                onChange={() => setMode(modeOption.id)}
                className="mt-1 w-5 h-5"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">{modeOption.icon}</span>
                  <div className={`font-bold text-lg ${mode === modeOption.id ? 'text-white' : 'text-gray-900'}`}>
                    {modeOption.title}
                  </div>
                </div>
                <div className={`text-sm ${mode === modeOption.id ? 'text-white/90' : 'text-gray-500'}`}>
                  {modeOption.description}
                </div>
              </div>
            </label>
          ))}
          
          <button className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-bold text-lg hover:from-blue-600 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200 mt-6">
            💾 저장하기
          </button>
        </div>
      </div>
    </Card>
  );
}

// 알림 설정 탭
function NotificationsTab() {
  const [settings, setSettings] = useState({
    newAnnouncement: true,
    autoApplyComplete: true,
    dday: true,
    result: true,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const notificationItems = [
    { key: 'newAnnouncement' as const, label: '새로운 공고 알림', icon: '📢', color: 'blue' },
    { key: 'autoApplyComplete' as const, label: '자동 신청 완료 알림', icon: '✅', color: 'green' },
    { key: 'dday' as const, label: 'D-day 알림', icon: '⏰', color: 'orange' },
    { key: 'result' as const, label: '경쟁률 및 결과 알림', icon: '📊', color: 'purple' },
  ];

  return (
    <Card gradient className="shadow-xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <span>🔔</span> 알림 설정
        </h2>
        <p className="text-gray-600 mb-8">받고 싶은 알림을 선택하세요</p>
        
        <div className="space-y-4">
          {notificationItems.map((item) => (
            <div
              key={item.key}
              className="flex items-center justify-between p-6 bg-white rounded-xl border-2 border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">{item.icon}</span>
                <span className="text-gray-900 font-semibold text-lg">{item.label}</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings[item.key]}
                  onChange={() => toggleSetting(item.key)}
                  className="sr-only peer"
                />
                <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-indigo-600"></div>
              </label>
            </div>
          ))}
          
          <button className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-bold text-lg hover:from-blue-600 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200 mt-6">
            💾 저장하기
          </button>
        </div>
      </div>
    </Card>
  );
}
