// API 응답 타입 정의

export interface User {
  user_id: number;
  email: string;
  name: string;
  phone_number?: string;
  address?: string;
  created_at: string;
}

export interface SubscriptionInfo {
  info_id: number;
  user_id: number;
  bank_name?: string;
  join_date?: string;
  payment_count?: number;
  total_payment_amount?: number;
  is_household_head?: boolean;
  income_level_percent?: number;
}

export interface Preference {
  pref_id: number;
  user_id: number;
  locations?: Array<{ city: string; district: string }>;
  housing_types?: string[];
  min_area?: number;
  max_area?: number;
  max_deposit?: number;
  max_monthly_rent?: number;
  commute_base_address?: string;
  max_commute_time_minutes?: number;
  auto_apply_mode?: 'full_auto' | 'approval' | 'disabled';
}

export interface Announcement {
  announcement_id: number;
  title: string;
  source_organization?: string;
  source_url?: string;
  housing_type?: string;
  region?: string;
  address_detail?: string;
  latitude?: number;
  longitude?: number;
  application_end_date?: string;
  parsed_content?: Record<string, unknown>;
  scraped_at?: string;
}

export interface Application {
  application_id: number;
  user_id: number;
  announcement_id: number;
  applied_at: string;
  status: 'applied' | 'document_review' | 'won' | 'failed';
  status_updated_at?: string;
}

export interface Notification {
  notification_id: number;
  user_id: number;
  announcement_id?: number;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}

