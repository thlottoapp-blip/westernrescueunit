import { createClient } from '@supabase/supabase-js';
import {
  Category,
  EmergencyIncident,
  EquipmentFleet,
  HeroSlideItem,
  MissionLog,
  NewsArticle,
  OfficerRoster,
  SiteConfig,
} from '@/types/database';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
      },
    })
  : null;

// Database Types Helper for Type Safety
export interface Database {
  public: {
    Tables: {
      categories: {
        Row: Category;
        Insert: Omit<Category, 'id' | 'created_at' | 'updated_at'> & { id?: string };
        Update: Partial<Category>;
      };
      emergency_incidents: {
        Row: EmergencyIncident;
        Insert: Omit<EmergencyIncident, 'id' | 'created_at' | 'updated_at'> & { id?: string };
        Update: Partial<EmergencyIncident>;
      };
      mission_logs: {
        Row: MissionLog;
        Insert: Omit<MissionLog, 'id' | 'created_at' | 'updated_at'> & { id?: string };
        Update: Partial<MissionLog>;
      };
      news_articles: {
        Row: NewsArticle;
        Insert: Omit<NewsArticle, 'id' | 'created_at' | 'updated_at'> & { id?: string };
        Update: Partial<NewsArticle>;
      };
      equipment_fleet: {
        Row: EquipmentFleet;
        Insert: Omit<EquipmentFleet, 'id' | 'created_at'> & { id?: string };
        Update: Partial<EquipmentFleet>;
      };
      officers_roster: {
        Row: OfficerRoster;
        Insert: Omit<OfficerRoster, 'id' | 'created_at'> & { id?: string };
        Update: Partial<OfficerRoster>;
      };
      site_config: {
        Row: SiteConfig;
        Insert: Partial<SiteConfig>;
        Update: Partial<SiteConfig>;
      };
      hero_slides: {
        Row: HeroSlideItem;
        Insert: Omit<HeroSlideItem, 'id'> & { id?: string };
        Update: Partial<HeroSlideItem>;
      };
    };
  };
}
