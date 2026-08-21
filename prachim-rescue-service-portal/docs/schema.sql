-- ==========================================================
-- PostgreSQL & Supabase Database Schema
-- หน่วยกู้ภัยประจิม (สมาคมประจิมสารคาม พุทธศาสตร์สงเคราะห์)
-- ==========================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(64) UNIQUE NOT NULL,
    name_th VARCHAR(120) NOT NULL,
    name_en VARCHAR(120),
    description TEXT,
    icon_name VARCHAR(64) DEFAULT 'ShieldAlert',
    category_type VARCHAR(32) NOT NULL DEFAULT 'mission', -- 'mission', 'news', 'service'
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. EMERGENCY INCIDENTS & DISPATCH TABLE
CREATE TABLE IF NOT EXISTS emergency_incidents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    incident_number VARCHAR(32) UNIQUE NOT NULL,
    caller_name VARCHAR(150) NOT NULL,
    caller_phone VARCHAR(50) NOT NULL,
    incident_type VARCHAR(64) NOT NULL, -- 'ems_traffic', 'snake_wildlife', 'water_rescue', 'patient_transfer', 'fire_flood', 'other'
    urgency_level VARCHAR(20) NOT NULL DEFAULT 'urgent', -- 'critical', 'urgent', 'standard'
    location_name TEXT NOT NULL,
    district VARCHAR(100) DEFAULT 'อำเภอบรบือ',
    province VARCHAR(100) DEFAULT 'จังหวัดมหาสารคาม',
    latitude NUMERIC(10, 7),
    longitude NUMERIC(10, 7),
    victim_count INT DEFAULT 0,
    details TEXT,
    image_url TEXT,
    status VARCHAR(32) NOT NULL DEFAULT 'pending', -- 'pending', 'en_route', 'on_scene', 'transporting', 'resolved', 'cancelled'
    assigned_unit VARCHAR(100),
    responder_notes TEXT,
    reported_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    resolved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. MISSIONS & OPERATIONAL LOGS TABLE (ผลงานการปฏิบัติการ)
CREATE TABLE IF NOT EXISTS mission_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    category_slug VARCHAR(64) NOT NULL,
    incident_date DATE NOT NULL DEFAULT CURRENT_DATE,
    location TEXT NOT NULL,
    district VARCHAR(100) DEFAULT 'บรบือ',
    summary TEXT NOT NULL,
    details TEXT,
    cover_image_url TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    special_tag VARCHAR(100), -- 'ภารกิจระดับจังหวัด', 'ภารกิจพิเศษ', 'กู้ภัยทางน้ำ'
    team_lead VARCHAR(150),
    officer_count INT DEFAULT 1,
    views_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. NEWS & ANNOUNCEMENTS TABLE (ข่าวสารและประกาศ)
CREATE TABLE IF NOT EXISTS news_articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    summary TEXT NOT NULL,
    content TEXT NOT NULL,
    cover_image_url TEXT,
    published_date DATE NOT NULL DEFAULT CURRENT_DATE,
    is_pinned BOOLEAN DEFAULT FALSE,
    author_name VARCHAR(100) DEFAULT 'ฝ่ายประชาสัมพันธ์ กู้ภัยประจิม',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. FLEET & RESCUE EQUIPMENT TABLE (ยานพาหนะและอุปกรณ์กู้ภัย)
CREATE TABLE IF NOT EXISTS equipment_fleet (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    call_sign VARCHAR(64) NOT NULL, -- เช่น 'ประจิม 01', 'ประจิม 02'
    equipment_type VARCHAR(64) NOT NULL, -- 'ambulance_ems', 'rescue_truck', 'boat_scuba', 'hydraulic_cutter'
    name_th VARCHAR(150) NOT NULL,
    plate_number VARCHAR(64),
    status VARCHAR(32) NOT NULL DEFAULT 'available', -- 'available', 'dispatched', 'maintenance'
    location_base VARCHAR(100) DEFAULT 'ศูนย์ใหญ่ อ.บรบือ',
    specifications TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. VOLUNTEER / OFFICER ROSTER (ทำเนียบเจ้าหน้าที่และอาสาสมัคร)
CREATE TABLE IF NOT EXISTS officers_roster (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    officer_code VARCHAR(32) UNIQUE NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    role_title VARCHAR(100) NOT NULL, -- 'หัวหน้าชุดปฏิบัติการ', 'เจ้าหน้าที่เวชกรฉุกเฉิน (EMT)', 'นักประดาน้ำ', 'อาสาสมัคร'
    phone VARCHAR(50),
    station_base VARCHAR(100) DEFAULT 'ศูนย์บรบือ',
    is_on_duty BOOLEAN DEFAULT TRUE,
    joined_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. INDEXES FOR HIGH-PERFORMANCE SEARCH
CREATE INDEX IF NOT EXISTS idx_incidents_status ON emergency_incidents(status);
CREATE INDEX IF NOT EXISTS idx_incidents_date ON emergency_incidents(reported_at DESC);
CREATE INDEX IF NOT EXISTS idx_missions_category ON mission_logs(category_slug);
CREATE INDEX IF NOT EXISTS idx_missions_date ON mission_logs(incident_date DESC);
CREATE INDEX IF NOT EXISTS idx_news_published ON news_articles(published_date DESC);

-- 9. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE emergency_incidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE mission_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE equipment_fleet ENABLE ROW LEVEL SECURITY;
ALTER TABLE officers_roster ENABLE ROW LEVEL SECURITY;

-- Public can read content, categories, fleet & roster
CREATE POLICY "Public can view active categories" ON categories FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Public can view missions" ON mission_logs FOR SELECT USING (TRUE);
CREATE POLICY "Public can view news" ON news_articles FOR SELECT USING (TRUE);
CREATE POLICY "Public can view fleet status" ON equipment_fleet FOR SELECT USING (TRUE);
CREATE POLICY "Public can view on-duty officers" ON officers_roster FOR SELECT USING (TRUE);

-- Public can submit emergency incidents
CREATE POLICY "Public can insert emergency incidents" ON emergency_incidents FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Public can view own incident by ID" ON emergency_incidents FOR SELECT USING (TRUE);
