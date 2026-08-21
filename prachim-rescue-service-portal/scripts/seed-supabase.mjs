import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://vrktvwrwsfrirnnqiwea.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZya3R2d3J3c2ZyaXJubnFpd2VhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NzI5NTE5NywiZXhwIjoyMTAyODcxMTk3fQ.wjwLhFShpLIaM97zSmj3oehHlU_uxPwMEgDRmfPf6J4';

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

const CATEGORIES = [
  {
    slug: 'ems-accident',
    name_th: 'การแพทย์ฉุกเฉินและอุบัติเหตุทางถนน',
    name_en: 'EMS & Road Traffic Accidents',
    description: 'ออกปฏิบัติการรับ-ส่ง ปฐมพยาบาล และตัด-ถ่างช่วยชีวิต 24 ชั่วโมง',
    icon_name: 'Ambulance',
    category_type: 'mission',
    sort_order: 1,
    is_active: true,
  },
  {
    slug: 'water-rescue',
    name_th: 'กู้ภัยทางน้ำและประดาน้ำค้นหา',
    name_en: 'Scuba Diving & Underwater Search',
    description: 'ชุดประดาน้ำกู้ชีพ ค้นหาผู้สูญหายใต้น้ำ และงมค้นหาทรัพย์สินของมีค่า',
    icon_name: 'Waves',
    category_type: 'mission',
    sort_order: 2,
    is_active: true,
  },
  {
    slug: 'disaster-community',
    name_th: 'บรรเทาสาธารณภัยและช่วยเหลือชุมชน',
    name_en: 'Disaster Relief & Wildlife Removal',
    description: 'จับสัตว์มีพิษ งู อสรพิษ อุทกภัยน้ำท่วม ดับเพลิงเบื้องต้น รถเสีย',
    icon_name: 'ShieldAlert',
    category_type: 'mission',
    sort_order: 3,
    is_active: true,
  },
  {
    slug: 'crime-forensics',
    name_th: 'ชันสูตรพลิกศพและสนับสนุนเจ้าหน้าที่ตำรวจ',
    name_en: 'Forensics & Police Support',
    description: 'ร่วมตรวจสอบที่เกิดเหตุกับ สภ.บรบือ สภ.กุดรัง และแพทย์เวร รพ.บรบือ',
    icon_name: 'FileCheck2',
    category_type: 'mission',
    sort_order: 4,
    is_active: true,
  },
  {
    slug: 'indigent-transport',
    name_th: 'ส่งผู้ป่วยติดเตียงและผู้วายชนม์ยากไร้',
    name_en: 'Indigent Patient & Funeral Transport',
    description: 'โครงการมนุษยธรรมส่งร่างผู้วายชนม์และผู้ป่วยติดเตียงยากไร้กลับภูมิลำเนาฟรี',
    icon_name: 'HeartHandshake',
    category_type: 'mission',
    sort_order: 5,
    is_active: true,
  },
];

const MISSIONS = [
  {
    title: 'ภารกิจประดาน้ำร่วมค้นหาร่างผู้สูญหายจากเหตุการณ์เรือยาวชนตอม่อสะพานในแม่น้ำชี',
    category_slug: 'water-rescue',
    incident_date: '2026-02-14',
    location: 'สะพานข้ามแม่น้ำชี รอยต่อมหาสารคาม-กาฬสินธุ์',
    district: 'บรบือ - พื้นที่แม่น้ำชี',
    summary: 'ชุดปฏิบัติการประดาน้ำกู้ภัยประจิม ผนึกกำลังร่วมกับหน่วยกู้ภัยจีเสียงเกาะและกู้ภัยกาฬสินธุ์ ดำน้ำค้นหาผู้สูญหายใต้น้ำที่มีกระแสน้ำเชี่ยวจนสำเร็จ',
    details: 'ได้รับแจ้งเหตุเรือยาวประสบอุบัติเหตุชนตอม่อสะพานแม่น้ำชี มีผู้สูญหายใต้น้ำ ชุดปฏิบัติการกู้ภัยทางน้ำ หน่วยกู้ภัยประจิม สมาคมประจิมสารคาม พุทธศาสตร์สงเคราะห์ นำเรือยางพร้อมชุดดำน้ำ Scuba เข้าร่วมบัญชาการเหตุการณ์และดำน้ำสแกนพื้นที่ใต้น้ำร่วมกับภาคีเครือข่าย สามารถค้นหาร่างผู้ประสบภัยและนำขึ้นฝั่งส่งมอบให้ญาติและแพทย์เวรชันสูตรอย่างสมเกียรติ',
    cover_image_url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    is_featured: true,
    special_tag: 'ภารกิจระดับจังหวัด',
    team_lead: 'นายชัยยุทธ จิตอาสา (ประจิม 01)',
    officer_count: 8,
    views_count: 1420,
  },
  {
    title: 'ภารกิจดำน้ำงมค้นหาแหวนเพชรและของมีค่าหลักแสนบาทในบ่อน้ำลึก คืนเจ้าทุกข์',
    category_slug: 'water-rescue',
    incident_date: '2026-01-28',
    location: 'บ่อน้ำการเกษตรความลึก 6 เมตร ตำบลบรบือ',
    district: 'บรบือ',
    summary: 'ข่าวดังระดับประเทศ! เจ้าหน้าที่ชุดประดาน้ำกู้ภัยประจิม ดำน้ำงมหาแหวนเพชรและทรัพย์สินมีค่าที่คนร้ายนำมาทิ้งน้ำ คืนเจ้าของสำเร็จครบถ้วน',
    details: 'ได้รับการประสานงานจากเจ้าหน้าที่ตำรวจ สภ.บรบือ และผู้เสียหาย กรณีคนร้ายก่อเหตุแล้วนำทรัพย์สินแหวนเพชรและทองคำมูลค่ากว่า 350,000 บาทมาโยนทิ้งลงในบ่อน้ำลึก 6 เมตร ทีมประดาน้ำประจิมใช้เทคนิคค้นหาแบบ Grid Search ใต้น้ำที่มีโคลนหนาแน่น ใช้เวลา 45 นาที จึงพบแหวนเพชรและของมีค่าทั้งหมด นำส่งคืนผู้เสียหายโดยไม่คิดค่าตอบแทนใดๆ สร้างความประทับใจให้ประชาชนทั่วประเทศ',
    cover_image_url: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&w=1200&q=80',
    is_featured: true,
    special_tag: 'ภารกิจพิเศษ / ช่วยเหลือประชาชน',
    team_lead: 'นายนพรัตน์ กู้ภัยใต้น้ำ (ประจิม 05)',
    officer_count: 4,
    views_count: 2890,
  },
  {
    title: 'ปฏิบัติการเผชิญเหตุอุทกภัยฉับพลัน อพยพชาวบ้านและสัตว์เลี้ยง กรณีอ่างเก็บน้ำล้น',
    category_slug: 'disaster-community',
    incident_date: '2025-10-18',
    location: 'บ้านหนองหว้า ต.บรบือ อ.บรบือ จ.มหาสารคาม',
    district: 'บรบือ',
    summary: 'ระดมเรือท้องแบนและทีมกู้ภัยลงพื้นที่น้ำท่วมฉับพลัน ช่วยเหลืออพยพผู้สูงอายุ ผู้ป่วยติดเตียง และสัตว์เลี้ยงไปยังศูนย์พักพิงชั่วคราวอย่างปลอดภัย',
    details: 'เกิดฝนตกหนักต่อเนื่องส่งผลให้อ่างเก็บน้ำในพื้นที่ อ.บรบือ ระบายน้ำไม่ทัน น้ำไหลบ่าเข้าท่วมบ้านเรือนราษฎร กู้ภัยประจิมส่งทีมตอบโต้สาธารณภัย เรือท้องแบนติดเครื่องยนต์ รถยกสูง เข้าลำเลียงผู้สูงอายุและเด็กออกจากพื้นที่วิกฤต พร้อมแจกจ่ายน้ำดื่มและอาหารแห้งตลอด 48 ชั่วโมง',
    cover_image_url: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=1200&q=80',
    is_featured: true,
    special_tag: 'งานบรรเทาสาธารณภัย',
    team_lead: 'นายเอกชัย ป้องกันภัย (ประจิม 02)',
    officer_count: 12,
    views_count: 1840,
  },
  {
    title: 'ตัด-ถ่างช่วยชีวิตผู้ประสบอุบัติเหตุรถยนต์ชนต้นไม้ บนถนนแจ้งสนิท สายบรบือ-มหาสารคาม',
    category_slug: 'ems-accident',
    incident_date: '2026-02-05',
    location: 'ถนนแจ้งสนิท กม.14 ต.บรบือ อ.บรบือ',
    district: 'บรบือ',
    summary: 'ปฏิบัติการใช้อุปกรณ์ตัด-ถ่างไฮดรอลิก ช่วยเหลือนำผู้ขับขี่ที่ติดภายในซากรถออกมาได้สำเร็จ และนำส่งห้องฉุกเฉิน รพ.บรบือ ภายใน 12 นาที',
    details: 'ศูนย์รับแจ้งเหตุ 1669 ส่งสัญญาณแจ้งอุบัติเหตุรถยนต์กระบะเสียหลักพุ่งชนต้นไม้ข้างทางถนนแจ้งสนิท กู้ภัยประจิมจัดชุดกู้ชีพพร้อมรถอุปกรณ์ตัด-ถ่าง ประจิม 02 เข้าถึงที่เกิดเหตุใน 5 นาที เจ้าหน้าที่ใช้เครื่องตัด-ถ่างถ่างเสาประตูเพื่อเปิดทางนำผู้บาดเจ็บส่งต่อแพทย์เวร รพ.บรบือ พ้นขีดอันตราย',
    cover_image_url: 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=1200&q=80',
    is_featured: false,
    special_tag: 'EMS การแพทย์ฉุกเฉิน',
    team_lead: 'นายวีระศักดิ์ เวชกรฉุกเฉิน',
    officer_count: 6,
    views_count: 980,
  },
  {
    title: 'โครงการสงเคราะห์: ส่งร่างผู้วายชนม์และเคลื่อนย้ายผู้ป่วยติดเตียงยากไร้กลับภูมิลำเนาฟรี',
    category_slug: 'indigent-transport',
    incident_date: '2026-02-18',
    location: 'จาก รพ.บรบือ ไปยัง อ.นาดูน และ อ.วาปีปทุม',
    district: 'บรบือ - นาดูน',
    summary: 'ดำเนินการส่งร่างผู้วายชนม์ผู้ยากไร้กลับสู่ภูมิลำเนาเพื่อประกอบพิธีทางศาสนา พร้อมเคลื่อนย้ายผู้ป่วยติดเตียงโดยไม่คิดค่าใช้จ่ายใดๆ ทั้งสิ้น',
    details: 'สมาคมประจิมสารคาม พุทธศาสตร์สงเคราะห์ ให้บริการรถพยาบาลส่งร่างผู้วายชนม์ไร้ญาติหรือครอบครัวยากจนกลับสู่ภูมิลำเนา พร้อมทั้งเคลื่อนย้ายผู้ป่วยติดเตียงที่ไม่มีทุนทรัพย์กลับไปพักฟื้นที่บ้านตามเจตนารมณ์การกุศลของสมาคม',
    cover_image_url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
    is_featured: false,
    special_tag: 'งานสังคมสงเคราะห์',
    team_lead: 'นายประเสริฐ จิตเมตตา',
    officer_count: 3,
    views_count: 650,
  },
  {
    title: 'ช่วยเหลือประชาชนจับงูจงอางความยาว 3.5 เมตร เข้าบ้านเรือนประชาชน ต.บรบือ',
    category_slug: 'disaster-community',
    incident_date: '2026-02-19',
    location: 'หมู่ 4 ตำบลบรบือ อำเภอบรบือ',
    district: 'บรบือ',
    summary: 'เจ้าหน้าที่ชุดจับอสรพิษกู้ภัยประจิมใช้อุปกรณ์จับงูความปลอดภัยสูง ควบคุมงูจงอางขนาดใหญ่และนำไปปล่อยคืนสู่ผืนป่าธรรมชาติที่ห่างไกลชุมชน',
    details: 'รับแจ้งจากประชาชนว่าพบงูขนาดใหญ่เลื้อยเข้าไปหลบอยู่ใต้ถุนบ้านพัก เจ้าหน้าที่ชุดชำนาญการจับสัตว์มีพิษพร้อมอุปกรณ์เฉพาะทางเข้าตรวจสอบและควบคุมงูจงอางได้อย่างปลอดภัย ไม่มีผู้ใดได้รับอันตราย พร้อมให้คำแนะนำวิธีป้องกันสัตว์มีพิษแก่ชาวบ้าน',
    cover_image_url: 'https://images.unsplash.com/photo-1531386151447-fd76ad50012f?auto=format&fit=crop&w=1200&q=80',
    is_featured: false,
    special_tag: 'ช่วยเหลือสัตว์มีพิษ ฟรี',
    team_lead: 'นายสมชาย นักจับอสรพิษ',
    officer_count: 2,
    views_count: 1120,
  },
];

const NEWS = [
  {
    title: 'ประกาศ: หน่วยกู้ภัยประจิม ย้ำเตือนประชาชน อุบัติเหตุและเจ็บป่วยฉุกเฉิน (EMS) บริการฟรี 100% ไม่มีค่าใช้จ่าย',
    summary: 'สมาคมประจิมสารคาม พุทธศาสตร์สงเคราะห์ ชี้แจงเกณฑ์การให้บริการฉุกเฉิน 24 ชั่วโมง เพื่อความโปร่งใสและสร้างความมั่นใจแก่พี่น้องประชาชน',
    content: 'ตามที่สมาคมประจิมสารคาม พุทธศาสตร์สงเคราะห์ (หน่วยกู้ภัยประจิม) ได้รับการสนับสนุนจากสถาบันการแพทย์ฉุกเฉินแห่งชาติ (สพฉ.) และ รพ.บรบือ ขอประชาสัมพันธ์ว่า การรับ-ส่งผู้ป่วยฉุกเฉิน ปฐมพยาบาล และอุบัติเหตุบนท้องถนนเป็น "บริการฟรีตลอด 24 ชั่วโมง" ประชาชนสามารถโทรแจ้ง 1669 หรือ 092-925-3839 ได้ทันทีโดยไม่มีการเรียกเก็บเงินใดๆ ทั้งสิ้น',
    cover_image_url: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=1200&q=80',
    published_date: '2026-02-15',
    is_pinned: true,
    author_name: 'ศูนย์ประชาสัมพันธ์ สมาคมประจิมสารคาม',
  },
  {
    title: 'กู้ภัยประจิม ร่วมพิธีบวงสรวง "พ่อปู่จูมคำ" สิ่งศักดิ์สิทธิ์คู่บ้านคู่เมืองอำเภอบรบือ เสริมสิริมงคลก่อนออกปฏิบัติหน้าที่',
    summary: 'คณะกรรมการ เจ้าหน้าที่ และอาสาสมัครกู้ภัยประจิม ร่วมพิธีสักการะพ่อปู่จูมคำ ขอพรคุ้มครองการทำงานกู้ชีพกู้ภัยให้แคล้วคลาดปลอดภัย',
    content: 'เมื่อเร็วๆ นี้ คณะเจ้าหน้าที่และอาสาสมัครกู้ภัยประจิม ได้พร้อมใจกันประกอบพิธีถวายเครื่องสักการะบวงสรวง ณ ศาลพ่อปู่จูมคำ สิ่งศักดิ์สิทธิ์คู่บ้านคู่เมืองบรบือ เพื่อความเป็นสิริมงคลและสร้างขวัญกำลังใจในการอุทิศตนเพื่อสังคมและการช่วยเหลือประชาชนตลอด 24 ชั่วโมง',
    cover_image_url: 'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?auto=format&fit=crop&w=1200&q=80',
    published_date: '2026-02-10',
    is_pinned: false,
    author_name: 'ฝ่ายบริหาร สมาคมประจิมสารคาม',
  },
  {
    title: 'เพิ่มศักยภาพชุดประดาน้ำและอุปกรณ์ตัด-ถ่าง เตรียมพร้อมรับมือเทศกาลและการเดินทางบนถนนแจ้งสนิท',
    summary: 'ตรวจเช็คความพร้อมของรถกู้ชีพ เรือตรวจการณ์ และชุดตัด-ถ่างไฮดรอลิก เพื่อให้สามารถเข้าถึงที่เกิดเหตุได้ภายใน 5-8 นาที',
    content: 'หน่วยกู้ภัยประจิมได้ทำการซักซ้อมแผนเผชิญเหตุทางน้ำและอุบัติเหตุหมู่ พร้อมตรวจเช็คบำรุงรักษาอุปกรณ์ตัด-ถ่าง ถังออกซิเจนดำน้ำ และยานพาหนะทุกคัน ณ ที่ตั้งสำนักงานถนนแจ้งสนิท เพื่อให้พร้อมบริการพี่น้องประชาชนตลอด 24 ชม.',
    cover_image_url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    published_date: '2026-01-20',
    is_pinned: false,
    author_name: 'ฝ่ายยุทธการและฝึกอบรม',
  },
];

const FLEET = [
  {
    call_sign: 'ประจิม 01',
    equipment_type: 'ambulance_ems',
    name_th: 'รถพยาบาลกู้ชีพฉุกเฉิน Advance Life Support (ALS)',
    plate_number: 'นข-4412 มหาสารคาม',
    status: 'dispatched',
    location_base: 'ศูนย์ใหญ่ ถนนแจ้งสนิท อ.บรบือ',
    specifications: 'อุปกรณ์ช่วยชีวิตขั้นสูง, เครื่อง Defibrillator/AED, ออกซิเจนแรงดันสูง, เปลตัก Scooper, ชุด Splint ดามกระดูก',
  },
  {
    call_sign: 'ประจิม 02',
    equipment_type: 'rescue_truck',
    name_th: 'รถตรวจการณ์กู้ภัยและอุปกรณ์ตัด-ถ่างไฮดรอลิก',
    plate_number: 'ผข-8890 มหาสารคาม',
    status: 'available',
    location_base: 'ศูนย์ใหญ่ ถนนแจ้งสนิท อ.บรบือ',
    specifications: 'ชุดเครื่องมือตัด-ถ่างไฮดรอลิก Holmatro, สปอตไลท์ส่องสว่างสนาม, รอกสลิงลากจูง, เลื่อยยนต์',
  },
  {
    call_sign: 'ประจิม 03',
    equipment_type: 'boat_scuba',
    name_th: 'เรือกู้ภัยท้องแบนติดเครื่องยนต์และชุดประดาน้ำ Scuba',
    plate_number: 'ปจ-03 (เรือประจำการ)',
    status: 'available',
    location_base: 'หน่วยปฏิบัติการทางน้ำ อ.บรบือ',
    specifications: 'เรืออลูมิเนียมกู้ภัยท้องแบน, เครื่องยนต์เรือ 40HP, ถังอากาศ Scuba 6 ชุด, เสื้อ BCD, เข็มทิศและไฟฉายใต้น้ำ',
  },
  {
    call_sign: 'ประจิม 04',
    equipment_type: 'hydraulic_cutter',
    name_th: 'รถเคลื่อนที่เร็วช่วยเหลือสาธารณภัยและจับสัตว์มีพิษ',
    plate_number: 'บน-5561 มหาสารคาม',
    status: 'available',
    location_base: 'จุดบริการวาปีปทุม - นาดูน',
    specifications: 'คีมจับงู safety, กล่องเก็บสัตว์มีพิษ, ถังดับเพลิงเคมี, เครื่องสูบน้ำไดโว่, อุปกรณ์พ่วงแบตเตอรี่',
  },
];

const OFFICERS = [
  {
    officer_code: 'PCM-01',
    full_name: 'นายชัยยุทธ ศิริวัฒน์',
    role_title: 'ประธานสมาคม / หัวหน้าชุดสั่งการกู้ภัยประจิม',
    phone: '092-925-3839',
    station_base: 'ศูนย์ใหญ่บรบือ',
    is_on_duty: true,
    joined_date: '2015-06-01',
  },
  {
    officer_code: 'PCM-02',
    full_name: 'นายกิตติศักดิ์ พรหมดี',
    role_title: 'หัวหน้าชุดปฏิบัติการกู้ชีพฉุกเฉิน (EMT-B)',
    phone: '081-234-5678',
    station_base: 'ศูนย์ใหญ่บรบือ',
    is_on_duty: true,
    joined_date: '2018-03-15',
  },
  {
    officer_code: 'PCM-03',
    full_name: 'นายนพรัตน์ แสนสุข',
    role_title: 'หัวหน้าชุดปฏิบัติการกู้ภัยทางน้ำและประดาน้ำ',
    phone: '089-876-5432',
    station_base: 'หน่วยทางน้ำบรบือ',
    is_on_duty: true,
    joined_date: '2019-11-20',
  },
  {
    officer_code: 'PCM-04',
    full_name: 'นายอนุชา พงษ์ไทย',
    role_title: 'เจ้าหน้าที่กู้ภัยตัด-ถ่างและตอบโต้สาธารณภัย',
    phone: '086-555-4321',
    station_base: 'จุดบริการวาปีปทุม',
    is_on_duty: true,
    joined_date: '2021-04-10',
  },
];

const HERO_SLIDES = [
  {
    badge: 'การแพทย์ฉุกเฉินและอุบัติเหตุทางถนน 24 ชม.',
    title_line1: 'เข้าถึงรวดเร็ว. กู้ชีพฉุกเฉิน.',
    title_line2: 'ช่วยเหลือทุกชีวิต ปลอดภัย.',
    subtitle: 'หน่วยกู้ภัยประจิม (สมาคมประจิมสารคาม พุทธศาสตร์สงเคราะห์) พร้อมทีมกู้ชีพ EMT-B รถพยาบาลกู้ชีพ และอุปกรณ์ตัด-ถ่างไฮดรอลิก ดูแลประชาชนบนถนนแจ้งสนิทและทั่วอำเภอบรบือ ตลอด 24 ชั่วโมง ฟรี 100%',
    cover_image: 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=1920&q=80',
    icon_name: 'Ambulance',
    stat1_val: '< 8 นาที',
    stat1_lbl: 'เวลาตอบสนองเฉลี่ย',
    stat2_val: 'ฟรี 100%',
    stat2_lbl: 'บริการอุบัติเหตุ EMS',
    stat3_val: '24 ชั่วโมง',
    stat3_lbl: 'ปฏิบัติการต่อเนื่อง',
    primary_btn_text: 'แจ้งเหตุด่วนฉุกเฉิน',
    secondary_btn_text: 'โทร 092-925-3839',
    is_active: true,
    sort_order: 1,
  },
  {
    badge: 'ชุดปฏิบัติการกู้ภัยทางน้ำและประดาน้ำระดับจังหวัด',
    title_line1: 'ชุดประดาน้ำกู้ภัย.',
    title_line2: 'ค้นหาใต้น้ำ & ช่วยเหลือผู้ประสบภัย.',
    subtitle: 'ภารกิจดำน้ำค้นหาผู้สูญหายในแม่น้ำชี อ่างเก็บน้ำ และคลองชลประทาน พร้อมผลงานเด่นดำน้ำค้นหาแหวนเพชรและทรัพย์สินมีค่าคืนเจ้าทุกข์สำเร็จ สร้างชื่อเสียงระดับประเทศ',
    cover_image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1920&q=80',
    icon_name: 'Waves',
    stat1_val: 'มาตรฐานกู้ชีพ',
    stat1_lbl: 'นักประดาน้ำ Scuba',
    stat2_val: 'ฟรีเพื่อมนุษยธรรม',
    stat2_lbl: 'ภารกิจใต้น้ำ',
    stat3_val: 'พร้อมลงพื้นที่',
    stat3_lbl: 'เรือกู้ภัยท้องแบน',
    primary_btn_text: 'ดูผลงานประดาน้ำ',
    secondary_btn_text: 'ขอความช่วยเหลือกู้ภัยทางน้ำ',
    is_active: true,
    sort_order: 2,
  },
];

async function seedData() {
  console.log('🚀 Starting Supabase Database Seeding...');

  try {
    // 1. Categories
    console.log('Seeding Categories...');
    for (const cat of CATEGORIES) {
      const { error } = await supabase.from('categories').upsert(cat, { onConflict: 'slug' });
      if (error) console.log(`Category [${cat.slug}] notice:`, error.message);
    }

    // 2. Equipment Fleet
    console.log('Seeding Equipment Fleet...');
    for (const flt of FLEET) {
      const { error } = await supabase.from('equipment_fleet').upsert(flt, { onConflict: 'call_sign' });
      if (error) console.log(`Fleet [${flt.call_sign}] notice:`, error.message);
    }

    // 3. Officers
    console.log('Seeding Officers...');
    for (const off of OFFICERS) {
      const { error } = await supabase.from('officers_roster').upsert(off, { onConflict: 'officer_code' });
      if (error) console.log(`Officer [${off.officer_code}] notice:`, error.message);
    }

    // 4. Missions
    console.log('Seeding Mission Logs...');
    for (const mis of MISSIONS) {
      const { error } = await supabase.from('mission_logs').insert(mis);
      if (error) console.log(`Mission notice:`, error.message);
    }

    // 5. News
    console.log('Seeding News Articles...');
    for (const news of NEWS) {
      const { error } = await supabase.from('news_articles').insert(news);
      if (error) console.log(`News notice:`, error.message);
    }

    // 6. Hero Slides
    console.log('Seeding Hero Slides...');
    for (const slide of HERO_SLIDES) {
      const { error } = await supabase.from('hero_slides').insert(slide);
      if (error) console.log(`Slide notice:`, error.message);
    }

    console.log('✅ Seeding process completed successfully!');
  } catch (err) {
    console.error('❌ Error seeding data:', err);
  }
}

seedData();
