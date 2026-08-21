-- ==========================================================
-- PostgreSQL & Supabase Complete Setup & Seed Script
-- หน่วยกู้ภัยประจิม (สมาคมประจิมสารคาม พุทธศาสตร์สงเคราะห์)
-- Project: vrktvwrwsfrirnnqiwea (https://vrktvwrwsfrirnnqiwea.supabase.co)
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
    category_type VARCHAR(32) NOT NULL DEFAULT 'mission',
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. EMERGENCY INCIDENTS TABLE
CREATE TABLE IF NOT EXISTS emergency_incidents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    incident_number VARCHAR(32) UNIQUE NOT NULL,
    caller_name VARCHAR(150) NOT NULL,
    caller_phone VARCHAR(50) NOT NULL,
    incident_type VARCHAR(64) NOT NULL,
    urgency_level VARCHAR(20) NOT NULL DEFAULT 'urgent',
    location_name TEXT NOT NULL,
    district VARCHAR(100) DEFAULT 'อำเภอบรบือ',
    province VARCHAR(100) DEFAULT 'จังหวัดมหาสารคาม',
    latitude NUMERIC(10, 7),
    longitude NUMERIC(10, 7),
    victim_count INT DEFAULT 0,
    details TEXT,
    image_url TEXT,
    status VARCHAR(32) NOT NULL DEFAULT 'pending',
    assigned_unit VARCHAR(100),
    responder_notes TEXT,
    reported_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    resolved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. MISSION LOGS TABLE
CREATE TABLE IF NOT EXISTS mission_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    category_slug VARCHAR(64) NOT NULL,
    incident_date DATE NOT NULL DEFAULT CURRENT_DATE,
    location TEXT NOT NULL,
    district VARCHAR(100) DEFAULT 'บรบือ',
    summary TEXT NOT NULL,
    details TEXT,
    cover_image_url TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    special_tag VARCHAR(100),
    team_lead VARCHAR(150),
    officer_count INT DEFAULT 1,
    views_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. NEWS ARTICLES TABLE
CREATE TABLE IF NOT EXISTS news_articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    summary TEXT NOT NULL,
    content TEXT NOT NULL,
    cover_image_url TEXT,
    published_date DATE NOT NULL DEFAULT CURRENT_DATE,
    is_pinned BOOLEAN DEFAULT FALSE,
    author_name VARCHAR(100) DEFAULT 'ฝ่ายประชาสัมพันธ์ กู้ภัยประจิม',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. EQUIPMENT FLEET TABLE
CREATE TABLE IF NOT EXISTS equipment_fleet (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    call_sign VARCHAR(64) UNIQUE NOT NULL,
    equipment_type VARCHAR(64) NOT NULL,
    name_th VARCHAR(150) NOT NULL,
    plate_number VARCHAR(64),
    status VARCHAR(32) NOT NULL DEFAULT 'available',
    location_base VARCHAR(100) DEFAULT 'ศูนย์ใหญ่ อ.บรบือ',
    specifications TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. OFFICERS ROSTER TABLE
CREATE TABLE IF NOT EXISTS officers_roster (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    officer_code VARCHAR(32) UNIQUE NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    role_title VARCHAR(100) NOT NULL,
    phone VARCHAR(50),
    station_base VARCHAR(100) DEFAULT 'ศูนย์บรบือ',
    is_on_duty BOOLEAN DEFAULT TRUE,
    joined_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. SITE CONFIG TABLE
CREATE TABLE IF NOT EXISTS site_config (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_name_th VARCHAR(255) DEFAULT 'หน่วยกู้ภัยประจิม',
    org_name_en VARCHAR(255) DEFAULT 'Prachim Rescue Association',
    association_name VARCHAR(255) NOT NULL DEFAULT 'สมาคมประจิมสารคาม พุทธศาสตร์สงเคราะห์',
    slogan TEXT DEFAULT 'ช่วยเหลือผู้ประสบภัย อุทิศตนเพื่อมวลชน 24 ชั่วโมง ฟรีเพื่อมนุษยธรรม',
    hotline_primary VARCHAR(50) NOT NULL DEFAULT '092-925-3839',
    hotline_secondary VARCHAR(50) DEFAULT '081-234-5678',
    hotline_ems VARCHAR(50) DEFAULT '1669',
    address_line1 TEXT DEFAULT 'ถนนแจ้งสนิท ตำบลบรบือ อำเภอบรบือ',
    address_line2 TEXT DEFAULT 'จังหวัดมหาสารคาม 44130',
    radio_frequency VARCHAR(100) DEFAULT '168.275 MHz (ช่องความถี่กู้ภัยประจิม)',
    license_number VARCHAR(100) DEFAULT 'เลขทะเบียนสมาคม มค. 4/2558',
    facebook_name VARCHAR(255) DEFAULT 'หน่วยกู้ภัยประจิม สมาคมประจิมสารคาม พุทธศาสตร์สงเคราะห์',
    facebook_url TEXT DEFAULT 'https://www.facebook.com/search/top?q=หน่วยกู้ภัยประจิม+บรบือ',
    line_id VARCHAR(100) DEFAULT '@prachimrescue',
    line_url TEXT DEFAULT 'https://line.me/R/ti/p/@prachimrescue',
    tiktok_handle VARCHAR(100) DEFAULT '@prachimrescue',
    tiktok_url TEXT DEFAULT 'https://www.tiktok.com/@prachimrescue',
    youtube_name VARCHAR(255) DEFAULT 'หน่วยกู้ภัยประจิม Official Channel',
    youtube_url TEXT DEFAULT 'https://www.youtube.com/results?search_query=หน่วยกู้ภัยประจิม+บรบือ',
    google_maps_url TEXT DEFAULT 'https://www.google.com/maps/search/?api=1&query=16.0375,103.1186+(หน่วยกู้ภัยประจิม+บรบือ)',
    latitude NUMERIC(10, 7) DEFAULT 16.0375,
    longitude NUMERIC(10, 7) DEFAULT 103.1186,
    bank_name VARCHAR(150) DEFAULT 'ธนาคารกรุงไทย (Krungthai Bank)',
    bank_account_name VARCHAR(255) DEFAULT 'สมาคมประจิมสารคาม พุทธศาสตร์สงเคราะห์',
    bank_account_number VARCHAR(100) DEFAULT '438-0-12345-6',
    promptpay_id VARCHAR(100) DEFAULT '0993000123456',
    donation_notice TEXT DEFAULT 'เงินบริจาคทุกบาทใช้สำหรับค่าน้ำมันรถกู้ชีพ ค่ายาเวชภัณฑ์ และอุปกรณ์กู้ภัยตัด-ถ่าง โดยไม่หักค่าใช้จ่ายส่วนตัวใดๆ',
    sacred_patron_title VARCHAR(255) DEFAULT 'องค์พ่อปู่จูมคำ พระผู้เปี่ยมด้วยเมตตามหาบารมี',
    sacred_patron_story TEXT DEFAULT 'พ่อปู่จูมคำ เป็นศูนย์รวมจิตใจอันศักดิ์สิทธิ์ของชาวอำเภอบรบือและอาสาสมัครกู้ภัยประจิมทุกคน เป็นมิ่งขวัญคุ้มครองความปลอดภัยในการออกช่วยเหลือเพื่อนมนุษย์',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. HERO SLIDES TABLE
CREATE TABLE IF NOT EXISTS hero_slides (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    badge VARCHAR(150) NOT NULL,
    title_line1 VARCHAR(255) NOT NULL,
    title_line2 VARCHAR(255) NOT NULL,
    subtitle TEXT NOT NULL,
    cover_image TEXT NOT NULL,
    icon_name VARCHAR(64) DEFAULT 'Ambulance',
    stat1_val VARCHAR(64),
    stat1_lbl VARCHAR(64),
    stat2_val VARCHAR(64),
    stat2_lbl VARCHAR(64),
    stat3_val VARCHAR(64),
    stat3_lbl VARCHAR(64),
    primary_btn_text VARCHAR(100) DEFAULT 'แจ้งเหตุด่วนฉุกเฉิน',
    secondary_btn_text VARCHAR(100) DEFAULT 'โทร 092-925-3839',
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 10. INDEXES
CREATE INDEX IF NOT EXISTS idx_incidents_status ON emergency_incidents(status);
CREATE INDEX IF NOT EXISTS idx_incidents_date ON emergency_incidents(reported_at DESC);
CREATE INDEX IF NOT EXISTS idx_missions_category ON mission_logs(category_slug);
CREATE INDEX IF NOT EXISTS idx_missions_date ON mission_logs(incident_date DESC);
CREATE INDEX IF NOT EXISTS idx_news_published ON news_articles(published_date DESC);

-- 11. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE emergency_incidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE mission_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE equipment_fleet ENABLE ROW LEVEL SECURITY;
ALTER TABLE officers_roster ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_slides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read active categories" ON categories FOR SELECT TO public USING (is_active = TRUE);
CREATE POLICY "Allow public read mission logs" ON mission_logs FOR SELECT TO public USING (TRUE);
CREATE POLICY "Allow public read news articles" ON news_articles FOR SELECT TO public USING (TRUE);
CREATE POLICY "Allow public read equipment fleet" ON equipment_fleet FOR SELECT TO public USING (TRUE);
CREATE POLICY "Allow public read officers" ON officers_roster FOR SELECT TO public USING (TRUE);
CREATE POLICY "Allow public read site config" ON site_config FOR SELECT TO public USING (TRUE);
CREATE POLICY "Allow public read hero slides" ON hero_slides FOR SELECT TO public USING (is_active = TRUE);
CREATE POLICY "Allow public insert incidents" ON emergency_incidents FOR INSERT TO public WITH CHECK (TRUE);
CREATE POLICY "Allow public read incidents" ON emergency_incidents FOR SELECT TO public USING (TRUE);

CREATE POLICY "Allow full categories for service role" ON categories FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "Allow full incidents for service role" ON emergency_incidents FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "Allow full missions for service role" ON mission_logs FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "Allow full news for service role" ON news_articles FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "Allow full fleet for service role" ON equipment_fleet FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "Allow full officers for service role" ON officers_roster FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "Allow full site_config for service role" ON site_config FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "Allow full hero_slides for service role" ON hero_slides FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);

-- 12. ENABLE REALTIME
ALTER PUBLICATION supabase_realtime ADD TABLE emergency_incidents;

-- 13. SEED ALL WEBSITE DATA (ข้อมูลเริ่มต้นทั้งหมด)

-- 13.1 Categories
INSERT INTO categories (slug, name_th, name_en, description, icon_name, category_type, sort_order, is_active)
VALUES
('ems-accident', 'การแพทย์ฉุกเฉินและอุบัติเหตุทางถนน', 'EMS & Road Traffic Accidents', 'ออกปฏิบัติการรับ-ส่ง ปฐมพยาบาล และตัด-ถ่างช่วยชีวิต 24 ชั่วโมง', 'Ambulance', 'mission', 1, TRUE),
('water-rescue', 'กู้ภัยทางน้ำและประดาน้ำค้นหา', 'Scuba Diving & Underwater Search', 'ชุดประดาน้ำกู้ชีพ ค้นหาผู้สูญหายใต้น้ำ และงมค้นหาทรัพย์สินของมีค่า', 'Waves', 'mission', 2, TRUE),
('disaster-community', 'บรรเทาสาธารณภัยและช่วยเหลือชุมชน', 'Disaster Relief & Wildlife Removal', 'จับสัตว์มีพิษ งู อสรพิษ อุทกภัยน้ำท่วม ดับเพลิงเบื้องต้น รถเสีย', 'ShieldAlert', 'mission', 3, TRUE),
('crime-forensics', 'ชันสูตรพลิกศพและสนับสนุนเจ้าหน้าที่ตำรวจ', 'Forensics & Police Support', 'ร่วมตรวจสอบที่เกิดเหตุกับ สภ.บรบือ สภ.กุดรัง และแพทย์เวร รพ.บรบือ', 'FileCheck2', 'mission', 4, TRUE),
('indigent-transport', 'ส่งผู้ป่วยติดเตียงและผู้วายชนม์ยากไร้', 'Indigent Patient & Funeral Transport', 'โครงการมนุษยธรรมส่งร่างผู้วายชนม์และผู้ป่วยติดเตียงยากไร้กลับภูมิลำเนาฟรี', 'HeartHandshake', 'mission', 5, TRUE)
ON CONFLICT (slug) DO UPDATE SET
  name_th = EXCLUDED.name_th,
  description = EXCLUDED.description;

-- 13.2 Equipment Fleet
INSERT INTO equipment_fleet (call_sign, equipment_type, name_th, plate_number, status, location_base, specifications)
VALUES
('ประจิม 01', 'ambulance_ems', 'รถพยาบาลกู้ชีพฉุกเฉิน Advance Life Support (ALS)', 'นข-4412 มหาสารคาม', 'dispatched', 'ศูนย์ใหญ่ ถนนแจ้งสนิท อ.บรบือ', 'อุปกรณ์ช่วยชีวิตขั้นสูง, เครื่อง Defibrillator/AED, ออกซิเจนแรงดันสูง, เปลตัก Scooper, ชุด Splint ดามกระดูก'),
('ประจิม 02', 'rescue_truck', 'รถตรวจการณ์กู้ภัยและอุปกรณ์ตัด-ถ่างไฮดรอลิก', 'ผข-8890 มหาสารคาม', 'available', 'ศูนย์ใหญ่ ถนนแจ้งสนิท อ.บรบือ', 'ชุดเครื่องมือตัด-ถ่างไฮดรอลิก Holmatro, สปอตไลท์ส่องสว่างสนาม, รอกสลิงลากจูง, เลื่อยยนต์'),
('ประจิม 03', 'boat_scuba', 'เรือกู้ภัยท้องแบนติดเครื่องยนต์และชุดประดาน้ำ Scuba', 'ปจ-03 (เรือประจำการ)', 'available', 'หน่วยปฏิบัติการทางน้ำ อ.บรบือ', 'เรืออลูมิเนียมกู้ภัยท้องแบน, เครื่องยนต์เรือ 40HP, ถังอากาศ Scuba 6 ชุด, เสื้อ BCD, เข็มทิศและไฟฉายใต้น้ำ'),
('ประจิม 04', 'hydraulic_cutter', 'รถเคลื่อนที่เร็วช่วยเหลือสาธารณภัยและจับสัตว์มีพิษ', 'บน-5561 มหาสารคาม', 'available', 'จุดบริการวาปีปทุม - นาดูน', 'คีมจับงู safety, กล่องเก็บสัตว์มีพิษ, ถังดับเพลิงเคมี, เครื่องสูบน้ำไดโว่, อุปกรณ์พ่วงแบตเตอรี่')
ON CONFLICT (call_sign) DO UPDATE SET
  name_th = EXCLUDED.name_th,
  specifications = EXCLUDED.specifications;

-- 13.3 Officers
INSERT INTO officers_roster (officer_code, full_name, role_title, phone, station_base, is_on_duty, joined_date)
VALUES
('PCM-01', 'นายชัยยุทธ ศิริวัฒน์', 'ประธานสมาคม / หัวหน้าชุดสั่งการกู้ภัยประจิม', '092-925-3839', 'ศูนย์ใหญ่บรบือ', TRUE, '2015-06-01'),
('PCM-02', 'นายกิตติศักดิ์ พรหมดี', 'หัวหน้าชุดปฏิบัติการกู้ชีพฉุกเฉิน (EMT-B)', '081-234-5678', 'ศูนย์ใหญ่บรบือ', TRUE, '2018-03-15'),
('PCM-03', 'นายนพรัตน์ แสนสุข', 'หัวหน้าชุดปฏิบัติการกู้ภัยทางน้ำและประดาน้ำ', '089-876-5432', 'หน่วยทางน้ำบรบือ', TRUE, '2019-11-20'),
('PCM-04', 'นายอนุชา พงษ์ไทย', 'เจ้าหน้าที่กู้ภัยตัด-ถ่างและตอบโต้สาธารณภัย', '086-555-4321', 'จุดบริการวาปีปทุม', TRUE, '2021-04-10')
ON CONFLICT (officer_code) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  role_title = EXCLUDED.role_title;

-- 13.4 Site Config
INSERT INTO site_config (
  org_name_th, org_name_en, association_name, slogan, hotline_primary, hotline_secondary, hotline_ems,
  address_line1, address_line2, radio_frequency, license_number, facebook_name, facebook_url,
  line_id, line_url, tiktok_handle, tiktok_url, youtube_name, youtube_url,
  google_maps_url, latitude, longitude, bank_name, bank_account_name, bank_account_number, promptpay_id,
  donation_notice, sacred_patron_title, sacred_patron_story
)
VALUES (
  'หน่วยกู้ภัยประจิม', 'Prachim Rescue Association', 'สมาคมประจิมสารคาม พุทธศาสตร์สงเคราะห์',
  'ช่วยเหลือผู้ประสบภัย อุทิศตนเพื่อมวลชน 24 ชั่วโมง ฟรีเพื่อมนุษยธรรม',
  '092-925-3839', '081-234-5678', '1669',
  'ถนนแจ้งสนิท ตำบลบรบือ อำเภอบรบือ', 'จังหวัดมหาสารคาม 44130',
  '168.275 MHz (ช่องความถี่กู้ภัยประจิม)', 'เลขทะเบียนสมาคม มค. 4/2558',
  'หน่วยกู้ภัยประจิม สมาคมประจิมสารคาม พุทธศาสตร์สงเคราะห์', 'https://www.facebook.com/search/top?q=หน่วยกู้ภัยประจิม+บรบือ',
  '@prachimrescue', 'https://line.me/R/ti/p/@prachimrescue',
  '@prachimrescue', 'https://www.tiktok.com/@prachimrescue',
  'หน่วยกู้ภัยประจิม Official Channel', 'https://www.youtube.com/results?search_query=หน่วยกู้ภัยประจิม+บรบือ',
  'https://www.google.com/maps/search/?api=1&query=16.0375,103.1186+(หน่วยกู้ภัยประจิม+บรบือ)',
  16.0375, 103.1186,
  'ธนาคารกรุงไทย (Krungthai Bank)', 'สมาคมประจิมสารคาม พุทธศาสตร์สงเคราะห์', '438-0-12345-6', '0993000123456',
  'เงินบริจาคทุกบาทใช้สำหรับค่าน้ำมันรถกู้ชีพ ค่ายาเวชภัณฑ์ และอุปกรณ์กู้ภัยตัด-ถ่าง โดยไม่หักค่าใช้จ่ายส่วนตัวใดๆ',
  'องค์พ่อปู่จูมคำ พระผู้เปี่ยมด้วยเมตตามหาบารมี',
  'พ่อปู่จูมคำ เป็นศูนย์รวมจิตใจอันศักดิ์สิทธิ์ของชาวอำเภอบรบือและอาสาสมัครกู้ภัยประจิมทุกคน เป็นมิ่งขวัญคุ้มครองความปลอดภัยในการออกช่วยเหลือเพื่อนมนุษย์'
);

-- 13.5 Rescue Missions
INSERT INTO mission_logs (title, category_slug, incident_date, location, district, summary, details, cover_image_url, is_featured, special_tag, team_lead, officer_count, views_count)
VALUES
('ภารกิจประดาน้ำร่วมค้นหาร่างผู้สูญหายจากเหตุการณ์เรือยาวชนตอม่อสะพานในแม่น้ำชี', 'water-rescue', '2026-02-14', 'สะพานข้ามแม่น้ำชี รอยต่อมหาสารคาม-กาฬสินธุ์', 'บรบือ - พื้นที่แม่น้ำชี', 'ชุดปฏิบัติการประดาน้ำกู้ภัยประจิม ผนึกกำลังร่วมกับหน่วยกู้ภัยจีเสียงเกาะและกู้ภัยกาฬสินธุ์ ดำน้ำค้นหาผู้สูญหายใต้น้ำที่มีกระแสน้ำเชี่ยวจนสำเร็จ', 'ได้รับแจ้งเหตุเรือยาวประสบอุบัติเหตุชนตอม่อสะพานแม่น้ำชี มีผู้สูญหายใต้น้ำ ชุดปฏิบัติการกู้ภัยทางน้ำ หน่วยกู้ภัยประจิม สมาคมประจิมสารคาม พุทธศาสตร์สงเคราะห์ นำเรือยางพร้อมชุดดำน้ำ Scuba เข้าร่วมบัญชาการเหตุการณ์และดำน้ำสแกนพื้นที่ใต้น้ำร่วมกับภาคีเครือข่าย สามารถค้นหาร่างผู้ประสบภัยและนำขึ้นฝั่งส่งมอบให้ญาติและแพทย์เวรชันสูตรอย่างสมเกียรติ', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80', TRUE, 'ภารกิจระดับจังหวัด', 'นายชัยยุทธ จิตอาสา (ประจิม 01)', 8, 1420),
('ภารกิจดำน้ำงมค้นหาแหวนเพชรและของมีค่าหลักแสนบาทในบ่อน้ำลึก คืนเจ้าทุกข์', 'water-rescue', '2026-01-28', 'บ่อน้ำการเกษตรความลึก 6 เมตร ตำบลบรบือ', 'บรบือ', 'ข่าวดังระดับประเทศ! เจ้าหน้าที่ชุดประดาน้ำกู้ภัยประจิม ดำน้ำงมหาแหวนเพชรและทรัพย์สินมีค่าที่คนร้ายนำมาทิ้งน้ำ คืนเจ้าของสำเร็จครบถ้วน', 'ได้รับการประสานงานจากเจ้าหน้าที่ตำรวจ สภ.บรบือ และผู้เสียหาย กรณีคนร้ายก่อเหตุแล้วนำทรัพย์สินแหวนเพชรและทองคำมูลค่ากว่า 350,000 บาทมาโยนทิ้งลงในบ่อน้ำลึก 6 เมตร ทีมประดาน้ำประจิมใช้เทคนิคค้นหาแบบ Grid Search ใต้น้ำที่มีโคลนหนาแน่น ใช้เวลา 45 นาที จึงพบแหวนเพชรและของมีค่าทั้งหมด นำส่งคืนผู้เสียหายโดยไม่คิดค่าตอบแทนใดๆ สร้างความประทับใจให้ประชาชนทั่วประเทศ', 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&w=1200&q=80', TRUE, 'ภารกิจพิเศษ / ช่วยเหลือประชาชน', 'นายนพรัตน์ กู้ภัยใต้น้ำ (ประจิม 05)', 4, 2890),
('ปฏิบัติการเผชิญเหตุอุทกภัยฉับพลัน อพยพชาวบ้านและสัตว์เลี้ยง กรณีอ่างเก็บน้ำล้น', 'disaster-community', '2025-10-18', 'บ้านหนองหว้า ต.บรบือ อ.บรบือ จ.มหาสารคาม', 'บรบือ', 'ระดมเรือท้องแบนและทีมกู้ภัยลงพื้นที่น้ำท่วมฉับพลัน ช่วยเหลืออพยพผู้สูงอายุ ผู้ป่วยติดเตียง และสัตว์เลี้ยงไปยังศูนย์พักพิงชั่วคราวอย่างปลอดภัย', 'เกิดฝนตกหนักต่อเนื่องส่งผลให้อ่างเก็บน้ำในพื้นที่ อ.บรบือ ระบายน้ำไม่ทัน น้ำไหลบ่าเข้าท่วมบ้านเรือนราษฎร กู้ภัยประจิมส่งทีมตอบโต้สาธารณภัย เรือท้องแบนติดเครื่องยนต์ รถยกสูง เข้าลำเลียงผู้สูงอายุและเด็กออกจากพื้นที่วิกฤต พร้อมแจกจ่ายน้ำดื่มและอาหารแห้งตลอด 48 ชั่วโมง', 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=1200&q=80', TRUE, 'งานบรรเทาสาธารณภัย', 'นายเอกชัย ป้องกันภัย (ประจิม 02)', 12, 1840),
('ตัด-ถ่างช่วยชีวิตผู้ประสบอุบัติเหตุรถยนต์ชนต้นไม้ บนถนนแจ้งสนิท สายบรบือ-มหาสารคาม', 'ems-accident', '2026-02-05', 'ถนนแจ้งสนิท กม.14 ต.บรบือ อ.บรบือ', 'บรบือ', 'ปฏิบัติการใช้อุปกรณ์ตัด-ถ่างไฮดรอลิก ช่วยเหลือนำผู้ขับขี่ที่ติดภายในซากรถออกมาได้สำเร็จ และนำส่งห้องฉุกเฉิน รพ.บรบือ ภายใน 12 นาที', 'ศูนย์รับแจ้งเหตุ 1669 ส่งสัญญาณแจ้งอุบัติเหตุรถยนต์กระบะเสียหลักพุ่งชนต้นไม้ข้างทางถนนแจ้งสนิท กู้ภัยประจิมจัดชุดกู้ชีพพร้อมรถอุปกรณ์ตัด-ถ่าง ประจิม 02 เข้าถึงที่เกิดเหตุใน 5 นาที เจ้าหน้าที่ใช้เครื่องตัด-ถ่างถ่างเสาประตูเพื่อเปิดทางนำผู้บาดเจ็บส่งต่อแพทย์เวร รพ.บรบือ พ้นขีดอันตราย', 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=1200&q=80', FALSE, 'EMS การแพทย์ฉุกเฉิน', 'นายวีระศักดิ์ เวชกรฉุกเฉิน', 6, 980),
('โครงการสงเคราะห์: ส่งร่างผู้วายชนม์และเคลื่อนย้ายผู้ป่วยติดเตียงยากไร้กลับภูมิลำเนาฟรี', 'indigent-transport', '2026-02-18', 'จาก รพ.บรบือ ไปยัง อ.นาดูน และ อ.วาปีปทุม', 'บรบือ - นาดูน', 'ดำเนินการส่งร่างผู้วายชนม์ผู้ยากไร้กลับสู่ภูมิลำเนาเพื่อประกอบพิธีทางศาสนา พร้อมเคลื่อนย้ายผู้ป่วยติดเตียงโดยไม่คิดค่าใช้จ่ายใดๆ ทั้งสิ้น', 'สมาคมประจิมสารคาม พุทธศาสตร์สงเคราะห์ ให้บริการรถพยาบาลส่งร่างผู้วายชนม์ไร้ญาติหรือครอบครัวยากจนกลับสู่ภูมิลำเนา พร้อมทั้งเคลื่อนย้ายผู้ป่วยติดเตียงที่ไม่มีทุนทรัพย์กลับไปพักฟื้นที่บ้านตามเจตนารมณ์การกุศลของสมาคม', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80', FALSE, 'งานสังคมสงเคราะห์', 'นายประเสริฐ จิตเมตตา', 3, 650),
('ช่วยเหลือประชาชนจับงูจงอางความยาว 3.5 เมตร เข้าบ้านเรือนประชาชน ต.บรบือ', 'disaster-community', '2026-02-19', 'หมู่ 4 ตำบลบรบือ อำเภอบรบือ', 'บรบือ', 'เจ้าหน้าที่ชุดจับอสรพิษกู้ภัยประจิมใช้อุปกรณ์จับงูความปลอดภัยสูง ควบคุมงูจงอางขนาดใหญ่และนำไปปล่อยคืนสู่ผืนป่าธรรมชาติที่ห่างไกลชุมชน', 'รับแจ้งจากประชาชนว่าพบงูขนาดใหญ่เลื้อยเข้าไปหลบอยู่ใต้ถุนบ้านพัก เจ้าหน้าที่ชุดชำนาญการจับสัตว์มีพิษพร้อมอุปกรณ์เฉพาะทางเข้าตรวจสอบและควบคุมงูจงอางได้อย่างปลอดภัย ไม่มีผู้ใดได้รับอันตราย พร้อมให้คำแนะนำวิธีป้องกันสัตว์มีพิษแก่ชาวบ้าน', 'https://images.unsplash.com/photo-1531386151447-fd76ad50012f?auto=format&fit=crop&w=1200&q=80', FALSE, 'ช่วยเหลือสัตว์มีพิษ ฟรี', 'นายสมชาย นักจับอสรพิษ', 2, 1120);

-- 13.6 News Articles
INSERT INTO news_articles (title, summary, content, cover_image_url, published_date, is_pinned, author_name)
VALUES
('ประกาศ: หน่วยกู้ภัยประจิม ย้ำเตือนประชาชน อุบัติเหตุและเจ็บป่วยฉุกเฉิน (EMS) บริการฟรี 100% ไม่มีค่าใช้จ่าย', 'สมาคมประจิมสารคาม พุทธศาสตร์สงเคราะห์ ชี้แจงเกณฑ์การให้บริการฉุกเฉิน 24 ชั่วโมง เพื่อความโปร่งใสและสร้างความมั่นใจแก่พี่น้องประชาชน', 'ตามที่สมาคมประจิมสารคาม พุทธศาสตร์สงเคราะห์ (หน่วยกู้ภัยประจิม) ได้รับการสนับสนุนจากสถาบันการแพทย์ฉุกเฉินแห่งชาติ (สพฉ.) และ รพ.บรบือ ขอประชาสัมพันธ์ว่า การรับ-ส่งผู้ป่วยฉุกเฉิน ปฐมพยาบาล และอุบัติเหตุบนท้องถนนเป็น "บริการฟรีตลอด 24 ชั่วโมง" ประชาชนสามารถโทรแจ้ง 1669 หรือ 092-925-3839 ได้ทันทีโดยไม่มีการเรียกเก็บเงินใดๆ ทั้งสิ้น', 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=1200&q=80', '2026-02-15', TRUE, 'ศูนย์ประชาสัมพันธ์ สมาคมประจิมสารคาม'),
('กู้ภัยประจิม ร่วมพิธีบวงสรวง "พ่อปู่จูมคำ" สิ่งศักดิ์สิทธิ์คู่บ้านคู่เมืองอำเภอบรบือ เสริมสิริมงคลก่อนออกปฏิบัติหน้าที่', 'คณะกรรมการ เจ้าหน้าที่ และอาสาสมัครกู้ภัยประจิม ร่วมพิธีสักการะพ่อปู่จูมคำ ขอพรคุ้มครองการทำงานกู้ชีพกู้ภัยให้แคล้วคลาดปลอดภัย', 'เมื่อเร็วๆ นี้ คณะเจ้าหน้าที่และอาสาสมัครกู้ภัยประจิม ได้พร้อมใจกันประกอบพิธีถวายเครื่องสักการะบวงสรวง ณ ศาลพ่อปู่จูมคำ สิ่งศักดิ์สิทธิ์คู่บ้านคู่เมืองบรบือ เพื่อความเป็นสิริมงคลและสร้างขวัญกำลังใจในการอุทิศตนเพื่อสังคมและการช่วยเหลือประชาชนตลอด 24 ชั่วโมง', 'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?auto=format&fit=crop&w=1200&q=80', '2026-02-10', FALSE, 'ฝ่ายบริหาร สมาคมประจิมสารคาม'),
('เพิ่มศักยภาพชุดประดาน้ำและอุปกรณ์ตัด-ถ่าง เตรียมพร้อมรับมือเทศกาลและการเดินทางบนถนนแจ้งสนิท', 'ตรวจเช็คความพร้อมของรถกู้ชีพ เรือตรวจการณ์ และชุดตัด-ถ่างไฮดรอลิก เพื่อให้สามารถเข้าถึงที่เกิดเหตุได้ภายใน 5-8 นาที', 'หน่วยกู้ภัยประจิมได้ทำการซักซ้อมแผนเผชิญเหตุทางน้ำและอุบัติเหตุหมู่ พร้อมตรวจเช็คบำรุงรักษาอุปกรณ์ตัด-ถ่าง ถังออกซิเจนดำน้ำ และยานพาหนะทุกคัน ณ ที่ตั้งสำนักงานถนนแจ้งสนิท เพื่อให้พร้อมบริการพี่น้องประชาชนตลอด 24 ชม.', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80', '2026-01-20', FALSE, 'ฝ่ายยุทธการและฝึกอบรม');

-- 13.7 Hero Slides
INSERT INTO hero_slides (badge, title_line1, title_line2, subtitle, cover_image, icon_name, stat1_val, stat1_lbl, stat2_val, stat2_lbl, stat3_val, stat3_lbl, sort_order)
VALUES
('การแพทย์ฉุกเฉินและอุบัติเหตุทางถนน 24 ชม.', 'เข้าถึงรวดเร็ว. กู้ชีพฉุกเฉิน.', 'ช่วยเหลือทุกชีวิต ปลอดภัย.', 'หน่วยกู้ภัยประจิม (สมาคมประจิมสารคาม พุทธศาสตร์สงเคราะห์) พร้อมทีมกู้ชีพ EMT-B รถพยาบาลกู้ชีพ และอุปกรณ์ตัด-ถ่างไฮดรอลิก ดูแลประชาชนบนถนนแจ้งสนิทและทั่วอำเภอบรบือ ตลอด 24 ชั่วโมง ฟรี 100%', 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=1920&q=80', 'Ambulance', '< 8 นาที', 'เวลาตอบสนองเฉลี่ย', 'ฟรี 100%', 'บริการอุบัติเหตุ EMS', '24 ชั่วโมง', 'ปฏิบัติการต่อเนื่อง', 1),
('ชุดปฏิบัติการกู้ภัยทางน้ำและประดาน้ำระดับจังหวัด', 'ชุดประดาน้ำกู้ภัย.', 'ค้นหาใต้น้ำ & ช่วยเหลือผู้ประสบภัย.', 'ภารกิจดำน้ำค้นหาผู้สูญหายในแม่น้ำชี อ่างเก็บน้ำ และคลองชลประทาน พร้อมผลงานเด่นดำน้ำค้นหาแหวนเพชรและทรัพย์สินมีค่าคืนเจ้าทุกข์สำเร็จ สร้างชื่อเสียงระดับประเทศ', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1920&q=80', 'Waves', 'มาตรฐานกู้ชีพ', 'นักประดาน้ำ Scuba', 'ฟรีเพื่อมนุษยธรรม', 'ภารกิจใต้น้ำ', 'พร้อมลงพื้นที่', 'เรือกู้ภัยท้องแบน', 2),
('งานบรรเทาสาธารณภัยและช่วยเหลือชุมชน', 'เผชิญเหตุสาธารณภัย.', 'จับสัตว์มีพิษ & อพยพน้ำท่วม.', 'พร้อมทีมเฉพาะทางจับอสรพิษ งูเห่า งูจงอาง สัตว์มีพิษเข้าบ้านเรือน บริการช่วยเหลือรถเสีย แบตหมด ดับเพลิงเบื้องต้น และภารกิจอพยพผู้ประสบอุทกภัยในพื้นที่บรบือ', 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=1920&q=80', 'ShieldAlert', 'ฟรี ไม่มีค่าใช้จ่าย', 'จับสัตว์มีพิษ/งู', 'Safety 100%', 'อุปกรณ์เฉพาะทาง', 'จิตอาสา 24 ชม.', 'ช่วยเหลือชุมชน', 3),
('ศูนย์ประสานงานเครือข่าย 1669 มหาสารคาม', 'บารมี "พ่อปู่จูมคำ".', 'อุทิศตนเพื่อสังคม บรบือสารคาม.', 'สมาคมประจิมสารคาม พุทธศาสตร์สงเคราะห์ น้อมนำคุณธรรมช่วยเหลือผู้ยากไร้ ส่งผู้ป่วยติดเตียงและผู้วายชนม์กลับภูมิลำเนาฟรี ประสานงานร่วมกับ รพ.บรบือ สภ.บรบือ และศูนย์สั่งการ 1669', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1920&q=80', 'LifeBuoy', 'พ่อปู่จูมคำ', 'สิ่งศักดิ์สิทธิ์คู่บ้าน', 'ฟรีสงเคราะห์', 'ส่งผู้วายชนม์ยากไร้', 'บรบือ-วาปี-นาดูน', 'จุดบริการเครือข่าย', 4);
