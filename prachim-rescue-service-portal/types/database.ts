export type IncidentType =
  | 'ems_traffic'
  | 'snake_wildlife'
  | 'water_rescue'
  | 'patient_transfer'
  | 'fire_flood'
  | 'other';

export type UrgencyLevel = 'critical' | 'urgent' | 'standard';

export type IncidentStatus =
  | 'pending'
  | 'en_route'
  | 'on_scene'
  | 'transporting'
  | 'resolved'
  | 'cancelled';

export interface Category {
  id: string;
  slug: string;
  name_th: string;
  name_en?: string;
  description?: string;
  icon_name: string;
  category_type: 'mission' | 'news' | 'service';
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface EmergencyIncident {
  id: string;
  incident_number: string;
  caller_name: string;
  caller_phone: string;
  incident_type: IncidentType;
  urgency_level: UrgencyLevel;
  location_name: string;
  district?: string;
  province?: string;
  latitude?: number;
  longitude?: number;
  victim_count?: number;
  details?: string;
  image_url?: string;
  status: IncidentStatus;
  assigned_unit?: string;
  responder_notes?: string;
  reported_at: string;
  resolved_at?: string;
  created_at: string;
  updated_at: string;
}

export interface MissionLog {
  id: string;
  title: string;
  category_id?: string;
  category_slug: string;
  incident_date: string;
  location: string;
  district: string;
  summary: string;
  details: string;
  cover_image_url: string;
  is_featured: boolean;
  special_tag?: string;
  team_lead?: string;
  officer_count: number;
  views_count: number;
  created_at: string;
  updated_at: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  category_id?: string;
  summary: string;
  content: string;
  cover_image_url: string;
  published_date: string;
  is_pinned: boolean;
  author_name: string;
  created_at: string;
  updated_at: string;
}

export interface EquipmentFleet {
  id: string;
  call_sign: string;
  equipment_type: 'ambulance_ems' | 'rescue_truck' | 'boat_scuba' | 'hydraulic_cutter' | 'drone_search';
  name_th: string;
  plate_number: string;
  status: 'available' | 'dispatched' | 'maintenance';
  location_base: string;
  specifications: string;
  image_url?: string;
  created_at: string;
}

export interface OfficerRoster {
  id: string;
  officer_code: string;
  full_name: string;
  role_title: string;
  phone: string;
  station_base: string;
  is_on_duty: boolean;
  joined_date: string;
  photo_url?: string;
  created_at: string;
}

export interface SiteConfig {
  org_name_th: string;
  org_name_en: string;
  association_name: string;
  slogan: string;
  hotline_primary: string;
  hotline_secondary: string;
  hotline_ems: string;
  address_line1: string;
  address_line2: string;
  radio_frequency: string;
  license_number: string;
  facebook_name: string;
  facebook_url: string;
  line_id: string;
  line_url: string;
  tiktok_handle: string;
  tiktok_url: string;
  youtube_name: string;
  youtube_url: string;
  google_maps_url: string;
  latitude: number;
  longitude: number;
  bank_name: string;
  bank_account_name: string;
  bank_account_number: string;
  promptpay_id: string;
  donation_notice: string;
  sacred_patron_title: string;
  sacred_patron_story: string;
}

export interface HeroSlideItem {
  id: string;
  badge: string;
  title_line1: string;
  title_line2: string;
  subtitle: string;
  cover_image: string;
  icon_name: string;
  stat1_val: string;
  stat1_lbl: string;
  stat2_val: string;
  stat2_lbl: string;
  stat3_val: string;
  stat3_lbl: string;
  primary_btn_text: string;
  primary_btn_action: 'report' | 'missions' | 'contact' | 'custom';
  secondary_btn_text: string;
  secondary_btn_url: string;
  is_active: boolean;
  sort_order: number;
}

