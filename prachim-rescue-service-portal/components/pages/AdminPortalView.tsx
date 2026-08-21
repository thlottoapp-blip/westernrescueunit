'use client';

import React, { useState } from 'react';
import {
  ShieldAlert,
  Radio,
  Ambulance,
  PhoneCall,
  Edit2,
  Trash2,
  Plus,
  RefreshCw,
  X,
  Volume2,
  AlertTriangle,
  ArrowLeft,
  Key,
  Globe,
  Settings,
  Share2,
  CreditCard,
  Building,
  Image as ImageIcon,
  CheckCircle2,
  Download,
  Upload,
  Clock,
  User,
  MapPin,
  Flame,
  Waves,
  FileText,
  Layers,
  Sparkles,
} from 'lucide-react';
import {
  Category,
  EmergencyIncident,
  EquipmentFleet,
  HeroSlideItem,
  IncidentStatus,
  IncidentType,
  MissionLog,
  NewsArticle,
  OfficerRoster,
  SiteConfig,
  UrgencyLevel,
} from '@/types/database';
import { OfficialLogo } from '@/components/shared/OfficialLogo';
import { FacebookIcon, LineIcon, TikTokIcon, YouTubeIcon } from '@/components/shared/OfficialIcons';

interface AdminPortalViewProps {
  onBackToHome: () => void;
  isAdminAuthenticated: boolean;
  onLogin: (userOrPassword: string, password?: string) => boolean;
  onLogout: () => void;
  onUpdatePassword: (currentPass: string, newPass: string) => boolean;
  currentAdminUser?: string;
  categories: Category[];
  missions: MissionLog[];
  news: NewsArticle[];
  incidents: EmergencyIncident[];
  fleet: EquipmentFleet[];
  officers: OfficerRoster[];
  siteConfig: SiteConfig;
  heroSlides: HeroSlideItem[];
  onUpdateIncidentStatus: (
    id: string,
    status: IncidentStatus,
    assigned_unit?: string,
    notes?: string
  ) => void;
  onDeleteIncident: (id: string) => void;
  onAddCategory: (cat: Omit<Category, 'id' | 'created_at' | 'updated_at'>) => void;
  onUpdateCategory: (id: string, updates: Partial<Category>) => void;
  onDeleteCategory: (id: string) => void;
  onAddMission: (mission: Omit<MissionLog, 'id' | 'created_at' | 'updated_at' | 'views_count'>) => void;
  onUpdateMission: (id: string, updates: Partial<MissionLog>) => void;
  onDeleteMission: (id: string) => void;
  onAddNews: (article: Omit<NewsArticle, 'id' | 'created_at' | 'updated_at'>) => void;
  onUpdateNews: (id: string, updates: Partial<NewsArticle>) => void;
  onDeleteNews: (id: string) => void;
  onUpdateFleetStatus: (id: string, status: EquipmentFleet['status']) => void;
  onAddFleetItem?: (item: Omit<EquipmentFleet, 'id' | 'created_at'>) => void;
  onUpdateFleetItem?: (id: string, updates: Partial<EquipmentFleet>) => void;
  onDeleteFleetItem?: (id: string) => void;
  onToggleOfficerDuty: (id: string) => void;
  onAddOfficer?: (officer: Omit<OfficerRoster, 'id' | 'created_at'>) => void;
  onUpdateOfficer?: (id: string, updates: Partial<OfficerRoster>) => void;
  onDeleteOfficer?: (id: string) => void;
  onUpdateSiteConfig: (updates: Partial<SiteConfig>) => void;
  onAddHeroSlide: (slide: Omit<HeroSlideItem, 'id'>) => void;
  onUpdateHeroSlide: (id: string, updates: Partial<HeroSlideItem>) => void;
  onDeleteHeroSlide: (id: string) => void;
  onExportData: () => void;
  onImportData: (jsonStr: string) => boolean;
  onResetToDefault: () => void;
  onTestSoundAlert: () => void;
}

export function AdminPortalView({
  onBackToHome,
  isAdminAuthenticated,
  onLogin,
  onLogout,
  onUpdatePassword,
  currentAdminUser = '0611193342',
  categories,
  missions,
  news,
  incidents,
  fleet,
  officers,
  siteConfig,
  heroSlides,
  onUpdateIncidentStatus,
  onDeleteIncident,
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory,
  onAddMission,
  onUpdateMission,
  onDeleteMission,
  onAddNews,
  onUpdateNews,
  onDeleteNews,
  onUpdateFleetStatus,
  onToggleOfficerDuty,
  onUpdateSiteConfig,
  onAddHeroSlide,
  onUpdateHeroSlide,
  onDeleteHeroSlide,
  onExportData,
  onImportData,
  onResetToDefault,
  onTestSoundAlert,
}: AdminPortalViewProps) {
  // Login form state
  const [enteredUsername, setEnteredUsername] = useState('0611193342');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Active Admin Tabs
  const [activeTab, setActiveTab] = useState<
    'incidents' | 'site_config' | 'hero_slides' | 'missions' | 'news' | 'categories' | 'fleet' | 'officers' | 'settings'
  >('incidents');

  // Category Modal State
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryForm, setCategoryForm] = useState({
    name_th: '',
    name_en: '',
    slug: '',
    description: '',
    icon_name: 'Layers',
    category_type: 'mission' as 'mission' | 'news' | 'service',
    sort_order: 1,
    is_active: true,
  });

  // Mission Modal State
  const [showMissionModal, setShowMissionModal] = useState(false);
  const [editingMission, setEditingMission] = useState<MissionLog | null>(null);
  const [missionForm, setMissionForm] = useState({
    title: '',
    category_slug: 'ems-accident',
    incident_date: new Date().toISOString().split('T')[0],
    location: '',
    district: 'บรบือ',
    summary: '',
    details: '',
    cover_image_url: 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=1200&q=80',
    is_featured: false,
    special_tag: 'ภารกิจช่วยเหลือประชาชน',
    team_lead: 'ชุดปฏิบัติการกู้ภัยประจิม',
    officer_count: 4,
  });

  // News Modal State
  const [showNewsModal, setShowNewsModal] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsArticle | null>(null);
  const [newsForm, setNewsForm] = useState({
    title: '',
    summary: '',
    content: '',
    cover_image_url: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=1200&q=80',
    published_date: new Date().toISOString().split('T')[0],
    is_pinned: false,
    author_name: 'ศูนย์ประชาสัมพันธ์ สมาคมประจิมสารคาม',
  });

  // Hero Slide Modal State
  const [showSlideModal, setShowSlideModal] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroSlideItem | null>(null);
  const [slideForm, setSlideForm] = useState<Omit<HeroSlideItem, 'id'>>({
    badge: 'พร้อมปฏิบัติการฉุกเฉิน 24 ชั่วโมง',
    title_line1: 'เข้าถึงรวดเร็ว. กู้ชีพฉุกเฉิน.',
    title_line2: 'ช่วยเหลือทุกชีวิต ปลอดภัย.',
    subtitle: '',
    cover_image: 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=1920&q=80',
    icon_name: 'Ambulance',
    stat1_val: '< 8 นาที',
    stat1_lbl: 'เวลาตอบสนองเฉลี่ย',
    stat2_val: 'ฟรี 100%',
    stat2_lbl: 'บริการอุบัติเหตุ EMS',
    stat3_val: '24 ชั่วโมง',
    stat3_lbl: 'ปฏิบัติการต่อเนื่อง',
    primary_btn_text: 'แจ้งเหตุด่วนฉุกเฉิน',
    primary_btn_action: 'report',
    secondary_btn_text: 'โทร 092-925-3839',
    secondary_btn_url: 'tel:0929253839',
    is_active: true,
    sort_order: 1,
  });

  // Site Config Form State
  const [configForm, setConfigForm] = useState<SiteConfig>(siteConfig);
  const [configSaveSuccess, setConfigSaveSuccess] = useState(false);

  // Password & Settings
  const [currentPassInput, setCurrentPassInput] = useState('');
  const [newPassInput, setNewPassInput] = useState('');
  const [settingsMessage, setSettingsMessage] = useState('');
  const [importJsonText, setImportJsonText] = useState('');
  const [importStatus, setImportStatus] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onLogin(enteredUsername, enteredPassword);
    if (!success) {
      setPasswordError('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง');
    } else {
      setPasswordError('');
      setEnteredPassword('');
    }
  };

  const handleOpenCategoryModal = (cat?: Category) => {
    if (cat) {
      setEditingCategory(cat);
      setCategoryForm({
        name_th: cat.name_th,
        name_en: cat.name_en || '',
        slug: cat.slug,
        description: cat.description || '',
        icon_name: cat.icon_name || 'Layers',
        category_type: cat.category_type,
        sort_order: cat.sort_order || 1,
        is_active: cat.is_active,
      });
    } else {
      setEditingCategory(null);
      setCategoryForm({
        name_th: '',
        name_en: '',
        slug: '',
        description: '',
        icon_name: 'Layers',
        category_type: 'mission',
        sort_order: categories.length + 1,
        is_active: true,
      });
    }
    setShowCategoryModal(true);
  };

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryForm.name_th.trim() || !categoryForm.slug.trim()) {
      alert('กรุณากรอกชื่อหมวดหมู่และรหัส Slug');
      return;
    }

    if (editingCategory) {
      onUpdateCategory(editingCategory.id, categoryForm);
    } else {
      onAddCategory(categoryForm);
    }
    setShowCategoryModal(false);
  };

  const handleOpenMissionModal = (mission?: MissionLog) => {
    if (mission) {
      setEditingMission(mission);
      setMissionForm({
        title: mission.title,
        category_slug: mission.category_slug,
        incident_date: mission.incident_date,
        location: mission.location || '',
        district: mission.district,
        summary: mission.summary,
        details: mission.details || '',
        cover_image_url: mission.cover_image_url || '',
        is_featured: mission.is_featured,
        special_tag: mission.special_tag || '',
        team_lead: mission.team_lead || '',
        officer_count: mission.officer_count,
      });
    } else {
      setEditingMission(null);
      setMissionForm({
        title: '',
        category_slug: categories[0]?.slug || 'ems-accident',
        incident_date: new Date().toISOString().split('T')[0],
        location: '',
        district: 'บรบือ',
        summary: '',
        details: '',
        cover_image_url: 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=1200&q=80',
        is_featured: false,
        special_tag: 'ภารกิจช่วยเหลือประชาชน',
        team_lead: 'ชุดปฏิบัติการกู้ภัยประจิม',
        officer_count: 4,
      });
    }
    setShowMissionModal(true);
  };

  const handleSaveMission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!missionForm.title.trim() || !missionForm.summary.trim()) {
      alert('กรุณากรอกหัวข้อภารกิจและสรุปย่อ');
      return;
    }

    if (editingMission) {
      onUpdateMission(editingMission.id, missionForm);
    } else {
      onAddMission(missionForm);
    }
    setShowMissionModal(false);
  };

  const handleOpenNewsModal = (article?: NewsArticle) => {
    if (article) {
      setEditingNews(article);
      setNewsForm({
        title: article.title,
        summary: article.summary,
        content: article.content || '',
        cover_image_url: article.cover_image_url || '',
        published_date: article.published_date,
        is_pinned: article.is_pinned,
        author_name: article.author_name || 'ศูนย์ประชาสัมพันธ์ สมาคมประจิมสารคาม',
      });
    } else {
      setEditingNews(null);
      setNewsForm({
        title: '',
        summary: '',
        content: '',
        cover_image_url: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=1200&q=80',
        published_date: new Date().toISOString().split('T')[0],
        is_pinned: false,
        author_name: 'ศูนย์ประชาสัมพันธ์ สมาคมประจิมสารคาม',
      });
    }
    setShowNewsModal(true);
  };

  const handleSaveNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsForm.title.trim() || !newsForm.summary.trim()) {
      alert('กรุณากรอกหัวข้อข่าวและสรุปเนื้อหา');
      return;
    }

    if (editingNews) {
      onUpdateNews(editingNews.id, newsForm);
    } else {
      onAddNews(newsForm);
    }
    setShowNewsModal(false);
  };

  const handleOpenSlideModal = (slide?: HeroSlideItem) => {
    if (slide) {
      setEditingSlide(slide);
      setSlideForm({
        badge: slide.badge,
        title_line1: slide.title_line1,
        title_line2: slide.title_line2,
        subtitle: slide.subtitle,
        cover_image: slide.cover_image,
        icon_name: slide.icon_name,
        stat1_val: slide.stat1_val,
        stat1_lbl: slide.stat1_lbl,
        stat2_val: slide.stat2_val,
        stat2_lbl: slide.stat2_lbl,
        stat3_val: slide.stat3_val,
        stat3_lbl: slide.stat3_lbl,
        primary_btn_text: slide.primary_btn_text,
        primary_btn_action: slide.primary_btn_action,
        secondary_btn_text: slide.secondary_btn_text,
        secondary_btn_url: slide.secondary_btn_url,
        sort_order: slide.sort_order,
        is_active: slide.is_active,
      });
    } else {
      setEditingSlide(null);
      setSlideForm({
        badge: 'พร้อมปฏิบัติการฉุกเฉิน 24 ชั่วโมง',
        title_line1: 'เข้าถึงรวดเร็ว. กู้ชีพฉุกเฉิน.',
        title_line2: 'ช่วยเหลือทุกชีวิต ปลอดภัย.',
        subtitle: 'หน่วยกู้ภัยประจิม พร้อมดูแลช่วยเหลือประชาชน 24 ชั่วโมง ฟรี 100%',
        cover_image: 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=1920&q=80',
        icon_name: 'Ambulance',
        stat1_val: '< 8 นาที',
        stat1_lbl: 'เวลาตอบสนอง',
        stat2_val: 'ฟรี 100%',
        stat2_lbl: 'บริการอุบัติเหตุ',
        stat3_val: '24 ชม.',
        stat3_lbl: 'ปฏิบัติการ',
        primary_btn_text: 'แจ้งเหตุด่วนฉุกเฉิน',
        primary_btn_action: 'report',
        secondary_btn_text: 'โทรสายด่วน',
        secondary_btn_url: 'tel:0929253839',
        sort_order: heroSlides.length + 1,
        is_active: true,
      });
    }
    setShowSlideModal(true);
  };

  const handleSaveSlide = (e: React.FormEvent) => {
    e.preventDefault();
    if (!slideForm.title_line1.trim()) {
      alert('กรุณากรอกหัวข้อสไลด์');
      return;
    }
    if (editingSlide) {
      onUpdateHeroSlide(editingSlide.id, slideForm);
    } else {
      onAddHeroSlide(slideForm);
    }
    setShowSlideModal(false);
  };

  const handleSaveSiteConfig = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSiteConfig(configForm);
    setConfigSaveSuccess(true);
    setTimeout(() => setConfigSaveSuccess(false), 3000);
  };

  const handlePasswordChangeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassInput.length < 6) {
      setSettingsMessage('รหัสผ่านใหม่ต้องมีความยาวอย่างน้อย 6 ตัวอักษร');
      return;
    }

    const success = onUpdatePassword(currentPassInput, newPassInput);
    if (success) {
      setSettingsMessage('เปลี่ยนรหัสผ่านสำเร็จเรียบร้อย');
      setCurrentPassInput('');
      setNewPassInput('');
    } else {
      setSettingsMessage('รหัสผ่านเดิมไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง');
    }
  };

  const handleImportJson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!importJsonText.trim()) return;
    const ok = onImportData(importJsonText);
    if (ok) {
      setImportStatus('นำเข้าข้อมูลสำเร็จเรียบร้อย!');
      setImportJsonText('');
      setTimeout(() => setImportStatus(''), 4000);
    } else {
      setImportStatus('เกิดข้อผิดพลาด: รูปแบบไฟล์ JSON ไม่ถูกต้อง');
    }
  };

  // If not logged in, show login page
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#060d1f] via-[#09142e] to-[#16377e] flex items-center justify-center p-4 font-prompt">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl border border-blue-900/30 text-center relative overflow-hidden">
          <div className="flex justify-center mb-4">
            <OfficialLogo size={72} withGlow={true} />
          </div>

          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            OFFICIAL COMMAND DISPATCH CMS
          </span>

          <h2 className="text-xl font-bold text-slate-900 font-prompt mt-2">
            ระบบศูนย์สั่งการและจัดการเว็บไซต์
          </h2>
          <p className="text-xs text-slate-500 font-sarabun mt-1 mb-6">
            สมาคมประจิมสารคาม พุทธศาสตร์สงเคราะห์ (กู้ภัยประจิม บรบือ)
          </p>

          <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-slate-700 font-prompt mb-1">
                ชื่อผู้ใช้ / เบอร์โทรศัพท์ (Username)
              </label>
              <input
                type="text"
                required
                placeholder="ระบุชื่อผู้ใช้ เช่น 0611193342"
                value={enteredUsername}
                onChange={(e) => setEnteredUsername(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-full text-slate-900 text-sm focus:outline-none focus:border-[#16377e] font-prompt"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 font-prompt mb-1">
                รหัสผ่านเจ้าหน้าที่ (Password)
              </label>
              <input
                type="password"
                required
                placeholder="กรอกรหัสผ่านเพื่อเข้าสู่ระบบ"
                value={enteredPassword}
                onChange={(e) => setEnteredPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-full text-slate-900 text-sm focus:outline-none focus:border-[#16377e] font-mono tracking-widest"
              />
            </div>

            {passwordError && (
              <p className="text-xs text-red-600 font-sarabun bg-red-50 p-2.5 rounded-2xl border border-red-200">
                {passwordError}
              </p>
            )}

            <button
              type="submit"
              id="admin-login-btn"
              className="w-full py-3.5 bg-gradient-to-r from-[#16377e] to-[#0a193b] hover:from-[#1b4396] hover:to-[#0f2452] text-white font-bold rounded-full shadow-md text-sm font-prompt transition-all cursor-pointer border border-amber-400/50 min-h-[44px]"
            >
              เข้าสู่ระบบศูนย์สั่งการ
            </button>

            <button
              type="button"
              onClick={onBackToHome}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-full text-xs font-prompt transition-colors cursor-pointer"
            >
              ← กลับสู่หน้าเว็บไซต์หลัก
            </button>
          </form>
        </div>
      </div>
    );
  }

  const pendingCount = incidents.filter((i) => i.status === 'pending').length;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-prompt pb-16 flex flex-col">
      {/* Top Bar */}
      <div className="bg-[#0b1838] border-b border-amber-400/30 text-white sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <OfficialLogo size={42} withGlow={true} />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-white font-prompt">
                  ศูนย์ควบคุมสั่งการและจัดการเว็บไซต์ (CMS)
                </h1>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-mono px-2.5 py-0.5 rounded-full border border-emerald-400/40 font-bold">
                  ONLINE 24/7
                </span>
                <span className="bg-blue-950 text-amber-300 text-[10px] font-mono px-2.5 py-0.5 rounded-full border border-amber-400/40 font-bold">
                  User: {currentAdminUser || '0611193342'}
                </span>
              </div>
              <p className="text-xs text-blue-200 font-sarabun hidden sm:block">
                {siteConfig.association_name} อ.บรบือ จ.มหาสารคาม
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onTestSoundAlert}
              title="ทดสอบสัญญาณเสียงฉุกเฉิน"
              className="p-2 rounded-full bg-blue-900/60 hover:bg-blue-800 text-amber-300 border border-amber-400/30 cursor-pointer transition-colors"
            >
              <Volume2 className="w-4 h-4" />
            </button>
            <button
              onClick={onBackToHome}
              className="px-3.5 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold font-prompt flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>หน้าเว็บไซต์</span>
            </button>
            <button
              onClick={onLogout}
              className="px-3.5 py-1.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold font-prompt transition-colors cursor-pointer"
            >
              ออกจากระบบ
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 overflow-x-auto no-scrollbar py-2 border-t border-blue-900/60">
          {[
            { id: 'incidents', label: `แจ้งเหตุสด (${pendingCount})`, icon: AlertTriangle, badge: pendingCount > 0 },
            { id: 'site_config', label: 'จัดการข้อมูลเว็บ & โซเชียล', icon: Globe },
            { id: 'hero_slides', label: 'จัดการสไลด์หน้าแรก', icon: ImageIcon },
            { id: 'missions', label: 'ผลงาน & บันทึกภารกิจ', icon: FileText },
            { id: 'news', label: 'ข่าวสาร & ประชาสัมพันธ์', icon: Radio },
            { id: 'categories', label: 'หมวดหมู่งานกู้ภัย', icon: Layers },
            { id: 'fleet', label: 'ยานพาหนะ & อุปกรณ์', icon: Ambulance },
            { id: 'officers', label: 'ทำเนียบเจ้าหน้าที่', icon: User },
            { id: 'settings', label: 'ตั้งค่า & สำรองข้อมูล', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-bold font-prompt whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-400 text-slate-950 shadow-md font-bold'
                    : 'text-blue-200 hover:bg-blue-900/50 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 w-full flex-1">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
          {/* TAB 1: INCIDENTS */}
          {activeTab === 'incidents' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-prompt">
                    รายงานแจ้งเหตุฉุกเฉินจากประชาชน (Live Emergency Dispatch)
                  </h3>
                  <p className="text-xs text-slate-500 font-sarabun mt-0.5">
                    ตรวจสอบเหตุ สั่งการหน่วยรถพยาบาล และอัปเดตสถานะการช่วยเหลือแบบเรียลไทม์
                  </p>
                </div>
              </div>

              {incidents.length === 0 ? (
                <div className="p-12 text-center text-slate-400 font-sarabun">
                  <AlertTriangle className="w-10 h-10 mx-auto mb-2 opacity-40 text-amber-500" />
                  <p className="text-sm">ไม่มีรายการแจ้งเหตุฉุกเฉินในขณะนี้</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {incidents.map((inc) => (
                    <div
                      key={inc.id}
                      className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs font-bold text-red-700 bg-red-100 px-2.5 py-0.5 rounded-full">
                            {inc.incident_number}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                              inc.urgency_level === 'critical'
                                ? 'bg-red-600 text-white'
                                : inc.urgency_level === 'urgent'
                                ? 'bg-amber-500 text-white'
                                : 'bg-blue-600 text-white'
                            }`}
                          >
                            {inc.urgency_level === 'critical'
                              ? 'วิกฤติต้องการด่วน'
                              : inc.urgency_level === 'urgent'
                              ? 'เร่งด่วน'
                              : 'ทั่วไป'}
                          </span>
                          <span className="text-xs text-slate-500 font-mono">
                            {new Date(inc.reported_at).toLocaleString('th-TH')}
                          </span>
                        </div>

                        <h4 className="text-sm font-bold text-slate-900 font-prompt">
                          {inc.location_name} {inc.district ? `(${inc.district})` : ''}
                        </h4>
                        <p className="text-xs text-slate-600 font-sarabun">
                          ผู้แจ้ง: <strong className="text-slate-800">{inc.caller_name}</strong> (โทร:{' '}
                          <a href={`tel:${inc.caller_phone}`} className="text-blue-700 font-mono underline font-bold">
                            {inc.caller_phone}
                          </a>
                          )
                        </p>
                        {inc.details && (
                          <p className="text-xs text-slate-500 font-sarabun bg-white p-2.5 rounded-xl border border-slate-200 mt-2">
                            {inc.details}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <select
                          value={inc.status}
                          onChange={(e) => onUpdateIncidentStatus(inc.id, e.target.value as IncidentStatus)}
                          className="px-3.5 py-2 rounded-full text-xs font-bold font-prompt bg-white border border-slate-300 text-slate-800 focus:outline-none cursor-pointer"
                        >
                          <option value="pending">รอดำเนินการ (Pending)</option>
                          <option value="en_route">กำลังเดินทาง (En Route)</option>
                          <option value="on_scene">ถึงที่เกิดเหตุ (On Scene)</option>
                          <option value="transporting">นำส่ง รพ. (Transporting)</option>
                          <option value="resolved">เสร็จสิ้น (Resolved)</option>
                          <option value="cancelled">ยกเลิก (Cancelled)</option>
                        </select>

                        <button
                          onClick={() => {
                            if (confirm('คุณต้องการลบรายงานเหตุนี้ใช่หรือไม่?')) {
                              onDeleteIncident(inc.id);
                            }
                          }}
                          className="w-8 h-8 rounded-full bg-slate-100 hover:bg-red-100 text-slate-500 hover:text-red-600 flex items-center justify-center cursor-pointer transition-colors"
                          title="ลบรายงาน"
                        >
                          <Trash2 className="w-4 h-4 shrink-0" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: SITE CONFIG */}
          {activeTab === 'site_config' && (
            <div className="space-y-6 max-w-4xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-prompt">
                    จัดการข้อมูลเว็บไซต์ & ช่องทางติดต่อ (Website General Configuration)
                  </h3>
                  <p className="text-xs text-slate-500 font-sarabun mt-0.5">
                    ปรับแต่งข้อมูลชื่อองค์กร, สายด่วนฉุกเฉิน, วิทยุสื่อสาร, ลิงก์โซเชียลมีเดีย และบัญชีรับบริจาค
                  </p>
                </div>
              </div>

              {configSaveSuccess && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-sarabun flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>บันทึกการตั้งค่าข้อมูลเว็บไซต์เรียบร้อยแล้ว ข้อมูลหน้าบ้านจะอัปเดตทันที</span>
                </div>
              )}

              <form onSubmit={handleSaveSiteConfig} className="space-y-6">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                  <h4 className="text-sm font-bold text-slate-900 font-prompt flex items-center gap-2">
                    <Building className="w-4 h-4 text-[#16377e]" />
                    <span>ชื่อองค์กรและคำขวัญ</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 font-prompt mb-1">
                        ชื่อหน่วยงานหลัก (ภาษาไทย) *
                      </label>
                      <input
                        type="text"
                        required
                        value={configForm.org_name_th}
                        onChange={(e) => setConfigForm({ ...configForm, org_name_th: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-full text-xs text-slate-900 focus:outline-none focus:border-[#16377e]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 font-prompt mb-1">
                        ชื่อสมาคมต้นสังกัด *
                      </label>
                      <input
                        type="text"
                        required
                        value={configForm.association_name}
                        onChange={(e) => setConfigForm({ ...configForm, association_name: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-full text-xs text-slate-900 focus:outline-none focus:border-[#16377e]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 font-prompt mb-1">
                      คำขวัญ / อุดมการณ์หน่วยกู้ภัย
                    </label>
                    <input
                      type="text"
                      value={configForm.slogan}
                      onChange={(e) => setConfigForm({ ...configForm, slogan: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-full text-xs text-slate-900 focus:outline-none focus:border-[#16377e]"
                    />
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                  <h4 className="text-sm font-bold text-slate-900 font-prompt flex items-center gap-2">
                    <PhoneCall className="w-4 h-4 text-red-600" />
                    <span>เบอร์โทรฉุกเฉิน & เครือข่ายวิทยุสื่อสาร</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 font-prompt mb-1">
                        สายตรงกู้ภัยประจิมบรบือ *
                      </label>
                      <input
                        type="text"
                        required
                        value={configForm.hotline_primary}
                        onChange={(e) => setConfigForm({ ...configForm, hotline_primary: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-full text-xs text-slate-900 focus:outline-none focus:border-[#16377e] font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 font-prompt mb-1">
                        สายด่วนการแพทย์ฉุกเฉิน (EMS)
                      </label>
                      <input
                        type="text"
                        value={configForm.hotline_ems}
                        onChange={(e) => setConfigForm({ ...configForm, hotline_ems: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-full text-xs text-slate-900 focus:outline-none focus:border-[#16377e] font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 font-prompt mb-1">
                        ความถี่วิทยุ VHF ประจำการ
                      </label>
                      <input
                        type="text"
                        value={configForm.radio_frequency}
                        onChange={(e) => setConfigForm({ ...configForm, radio_frequency: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-full text-xs text-slate-900 focus:outline-none focus:border-[#16377e] font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                  <h4 className="text-sm font-bold text-slate-900 font-prompt flex items-center gap-2">
                    <Share2 className="w-4 h-4 text-blue-600" />
                    <span>ช่องทางโซเชียลมีเดียทางการ (Social Media URLs)</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 font-prompt mb-1 flex items-center gap-1.5">
                        <FacebookIcon size={14} />
                        <span>Facebook Page URL</span>
                      </label>
                      <input
                        type="url"
                        value={configForm.facebook_url}
                        onChange={(e) => setConfigForm({ ...configForm, facebook_url: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-full text-xs text-slate-900 focus:outline-none font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 font-prompt mb-1 flex items-center gap-1.5">
                        <LineIcon size={14} />
                        <span>LINE Official URL</span>
                      </label>
                      <input
                        type="url"
                        value={configForm.line_url}
                        onChange={(e) => setConfigForm({ ...configForm, line_url: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-full text-xs text-slate-900 focus:outline-none font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 font-prompt mb-1 flex items-center gap-1.5">
                        <TikTokIcon size={14} />
                        <span>TikTok Channel URL</span>
                      </label>
                      <input
                        type="url"
                        value={configForm.tiktok_url}
                        onChange={(e) => setConfigForm({ ...configForm, tiktok_url: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-full text-xs text-slate-900 focus:outline-none font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 font-prompt mb-1 flex items-center gap-1.5">
                        <YouTubeIcon size={14} />
                        <span>YouTube Channel URL</span>
                      </label>
                      <input
                        type="url"
                        value={configForm.youtube_url}
                        onChange={(e) => setConfigForm({ ...configForm, youtube_url: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-full text-xs text-slate-900 focus:outline-none font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                  <h4 className="text-sm font-bold text-slate-900 font-prompt flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-emerald-600" />
                    <span>บัญชีธนาคารรับบริจาคและสนับสนุนสาธารณกุศล</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 font-prompt mb-1">
                        ชื่อธนาคาร
                      </label>
                      <input
                        type="text"
                        value={configForm.bank_name}
                        onChange={(e) => setConfigForm({ ...configForm, bank_name: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-full text-xs text-slate-900 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 font-prompt mb-1">
                        ชื่อบัญชีธนาคาร
                      </label>
                      <input
                        type="text"
                        value={configForm.bank_account_name}
                        onChange={(e) => setConfigForm({ ...configForm, bank_account_name: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-full text-xs text-slate-900 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 font-prompt mb-1">
                        เลขที่บัญชีธนาคาร
                      </label>
                      <input
                        type="text"
                        value={configForm.bank_account_number}
                        onChange={(e) => setConfigForm({ ...configForm, bank_account_number: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-full text-xs text-slate-900 focus:outline-none font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 font-prompt mb-1">
                        พร้อมเพย์ (PromptPay ID)
                      </label>
                      <input
                        type="text"
                        value={configForm.promptpay_id}
                        onChange={(e) => setConfigForm({ ...configForm, promptpay_id: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-full text-xs text-slate-900 focus:outline-none font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-8 py-3 bg-[#16377e] hover:bg-[#0f2452] text-white font-bold text-xs sm:text-sm rounded-full font-prompt transition-colors cursor-pointer shadow-md border border-amber-400/40 min-h-[44px]"
                  >
                    บันทึกข้อมูลเว็บไซต์ทั้งหมด
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 3: HERO SLIDES */}
          {activeTab === 'hero_slides' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-prompt">
                    จัดการสไลด์หน้าแรก & แบนเนอร์ไฮไลท์ (Hero Slides CMS)
                  </h3>
                  <p className="text-xs text-slate-500 font-sarabun mt-0.5">
                    เพิ่ม แก้ไข ปรับลำดับ หรือเปลี่ยนรูปภาพและข้อความไฮไลท์บนส่วนหัวของเว็บไซต์
                  </p>
                </div>
                <button
                  onClick={() => handleOpenSlideModal()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#16377e] text-white text-xs font-bold font-prompt hover:bg-[#0f2452] transition-colors cursor-pointer shadow-xs border border-amber-400/40 shrink-0 min-h-[38px]"
                >
                  <Plus className="w-4 h-4 shrink-0" />
                  <span>เพิ่มสไลด์ใหม่</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {heroSlides.map((slide) => (
                  <div
                    key={slide.id}
                    className="rounded-3xl bg-slate-50 border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between"
                  >
                    <div
                      className="relative aspect-video w-full bg-slate-800 bg-cover bg-center"
                      style={{ backgroundImage: `url(${slide.cover_image})` }}
                    >
                      <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-amber-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-amber-400/30">
                        {slide.badge}
                      </div>
                      <div className="absolute bottom-3 right-3 bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                        {slide.stat1_val}
                      </div>
                    </div>

                    <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 font-prompt line-clamp-2">
                          {slide.title_line1} {slide.title_line2}
                        </h4>
                        <p className="text-xs text-slate-500 font-sarabun line-clamp-2 mt-1">
                          {slide.subtitle}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                        <span className="text-xs text-slate-400 font-mono">ลำดับ: {slide.sort_order}</span>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleOpenSlideModal(slide)}
                            className="p-2 rounded-full bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 transition-colors"
                            title="แก้ไขสไลด์"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm('คุณต้องการลบสไลด์นี้ใช่หรือไม่?')) {
                                onDeleteHeroSlide(slide.id);
                              }
                            }}
                            className="p-2 rounded-full bg-white hover:bg-red-50 text-slate-700 hover:text-red-700 border border-slate-200 transition-colors"
                            title="ลบสไลด์"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: MISSIONS */}
          {activeTab === 'missions' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-prompt">
                    จัดการผลงานและบันทึกภารกิจ (Operational Missions CMS)
                  </h3>
                  <p className="text-xs text-slate-500 font-sarabun mt-0.5">
                    บันทึกผลงานการช่วยเหลือประชาชน ดำน้ำค้นหา อุบัติเหตุ และภัยพิบัติ
                  </p>
                </div>
                <button
                  onClick={() => handleOpenMissionModal()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#16377e] text-white text-xs font-bold font-prompt hover:bg-[#0f2452] transition-colors cursor-pointer shadow-xs border border-amber-400/40 shrink-0 min-h-[38px]"
                >
                  <Plus className="w-4 h-4 shrink-0" />
                  <span>เพิ่มบันทึกภารกิจ</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {missions.map((mission) => (
                  <div
                    key={mission.id}
                    className="rounded-3xl bg-slate-50 border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between"
                  >
                    <div
                      className="relative aspect-video w-full bg-slate-800 bg-cover bg-center"
                      style={{ backgroundImage: `url(${mission.cover_image_url || 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=600&q=80'})` }}
                    >
                      {mission.is_featured && (
                        <div className="absolute top-3 right-3 bg-amber-400 text-slate-900 text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                          ผลงานเด่น
                        </div>
                      )}
                    </div>

                    <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono mb-1">
                          <span>{mission.incident_date}</span>
                          <span>•</span>
                          <span>{mission.district}</span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 font-prompt line-clamp-2">
                          {mission.title}
                        </h4>
                        <p className="text-xs text-slate-600 font-sarabun line-clamp-2 mt-1">
                          {mission.summary}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                        <span className="text-xs text-slate-400 font-sarabun">จนท. {mission.officer_count} นาย</span>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleOpenMissionModal(mission)}
                            className="p-2 rounded-full bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 transition-colors"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm('คุณต้องการลบภารกิจนี้ใช่หรือไม่?')) {
                                onDeleteMission(mission.id);
                              }
                            }}
                            className="p-2 rounded-full bg-white hover:bg-red-50 text-slate-700 hover:text-red-700 border border-slate-200 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: NEWS */}
          {activeTab === 'news' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-prompt">
                    จัดการข่าวสารและประกาศ (News & Announcements CMS)
                  </h3>
                  <p className="text-xs text-slate-500 font-sarabun mt-0.5">
                    เผยแพร่ข่าวสารกิจกรรม อบรมกู้ชีพ และประกาศจากสมาคมประจิมสารคาม
                  </p>
                </div>
                <button
                  onClick={() => handleOpenNewsModal()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#16377e] text-white text-xs font-bold font-prompt hover:bg-[#0f2452] transition-colors cursor-pointer shadow-xs border border-amber-400/40 shrink-0 min-h-[38px]"
                >
                  <Plus className="w-4 h-4 shrink-0" />
                  <span>เพิ่มข่าวสารใหม่</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {news.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-3xl bg-slate-50 border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between"
                  >
                    <div
                      className="relative aspect-video w-full bg-slate-800 bg-cover bg-center"
                      style={{ backgroundImage: `url(${item.cover_image_url || 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=600&q=80'})` }}
                    >
                      {item.is_pinned && (
                        <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                          ประกาศสำคัญ
                        </div>
                      )}
                    </div>

                    <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[11px] text-slate-400 font-mono block mb-1">
                          {item.published_date}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 font-prompt line-clamp-2">
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate-600 font-sarabun line-clamp-2 mt-1">
                          {item.summary}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                        <span className="text-xs text-slate-400 font-sarabun truncate max-w-[130px]">
                          {item.author_name}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleOpenNewsModal(item)}
                            className="p-2 rounded-full bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 transition-colors"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm('คุณต้องการลบข่าวสารนี้ใช่หรือไม่?')) {
                                onDeleteNews(item.id);
                              }
                            }}
                            className="p-2 rounded-full bg-white hover:bg-red-50 text-slate-700 hover:text-red-700 border border-slate-200 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: CATEGORIES */}
          {activeTab === 'categories' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-prompt">
                    หมวดหมู่งานกู้ภัย & บริการประชาชน (Operational Categories)
                  </h3>
                  <p className="text-xs text-slate-500 font-sarabun mt-0.5">
                    จัดการหมวดหมู่ เช่น การแพทย์ฉุกเฉิน, ดำน้ำกู้ภัย, ช่วยเหลือสัตว์มีพิษ
                  </p>
                </div>
                <button
                  onClick={() => handleOpenCategoryModal()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#16377e] text-white text-xs font-bold font-prompt hover:bg-[#0f2452] transition-colors cursor-pointer shadow-xs border border-amber-400/40 shrink-0 min-h-[38px]"
                >
                  <Plus className="w-4 h-4 shrink-0" />
                  <span>เพิ่มหมวดหมู่</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold bg-blue-100 text-blue-900 px-2 py-0.5 rounded-full">
                          {cat.slug}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            cat.is_active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          {cat.is_active ? 'เปิดใช้งาน' : 'ปิด'}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 font-prompt mt-2">
                        {cat.name_th}
                      </h4>
                      {cat.name_en && (
                        <p className="text-xs text-slate-500 font-sarabun">{cat.name_en}</p>
                      )}
                      {cat.description && (
                        <p className="text-xs text-slate-600 font-sarabun mt-2 line-clamp-2">
                          {cat.description}
                        </p>
                      )}
                    </div>

                    <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                      <span className="text-xs text-slate-400 font-mono">ลำดับ: {cat.sort_order}</span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleOpenCategoryModal(cat)}
                          className="p-2 rounded-full bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm('คุณต้องการลบหมวดหมู่นี้ใช่หรือไม่?')) {
                              onDeleteCategory(cat.id);
                            }
                          }}
                          className="p-2 rounded-full bg-white hover:bg-red-50 text-slate-700 hover:text-red-700 border border-slate-200 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: FLEET */}
          {activeTab === 'fleet' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-prompt">
                    ยานพาหนะและอุปกรณ์กู้ภัย (Fleet & Equipment)
                  </h3>
                  <p className="text-xs text-slate-500 font-sarabun mt-0.5">
                    ตรวจสอบความพร้อมรถพยาบาล เรือกู้ภัย อุปกรณ์ตัดถ่าง และชุดประดาน้ำ
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {fleet.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-[#16377e]">
                          {item.call_sign}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            item.status === 'available'
                              ? 'bg-emerald-100 text-emerald-800'
                              : item.status === 'dispatched'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {item.status === 'available'
                            ? 'พร้อมปฏิบัติการ'
                            : item.status === 'dispatched'
                            ? 'ออกเหตุ'
                            : 'ซ่อมบำรุง'}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 font-prompt mt-1">
                        {item.name_th}
                      </h4>
                      <p className="text-xs text-slate-500 font-mono mt-0.5">ทะเบียน: {item.plate_number}</p>
                      <p className="text-xs text-slate-600 font-sarabun mt-2 line-clamp-2">{item.specifications}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] text-slate-500 font-sarabun">เปลี่ยนสถานะ:</span>
                      <select
                        value={item.status}
                        onChange={(e) =>
                          onUpdateFleetStatus(item.id, e.target.value as EquipmentFleet['status'])
                        }
                        className="text-xs font-prompt px-3 py-1.5 rounded-full bg-slate-50 border border-slate-300 focus:outline-none cursor-pointer"
                      >
                        <option value="available">พร้อมปฏิบัติการ (Available)</option>
                        <option value="dispatched">ออกปฏิบัติการ (Dispatched)</option>
                        <option value="maintenance">ซ่อมบำรุง (Maintenance)</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: OFFICERS */}
          {activeTab === 'officers' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-prompt">
                    ทำเนียบเจ้าหน้าที่และเวรปฏิบัติการ (Officer Roster)
                  </h3>
                  <p className="text-xs text-slate-500 font-sarabun mt-0.5">
                    รายชื่อผู้บริหาร หัวหน้าชุดปฏิบัติการ เวชกรฉุกเฉิน และเจ้าหน้าที่เข้าเวร
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {officers.map((officer) => (
                  <div
                    key={officer.id}
                    className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between space-y-3"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#16377e] to-[#0a193b] text-amber-300 border border-amber-400/40 flex items-center justify-center font-bold text-sm shrink-0 aspect-square">
                        {officer.full_name.substring(0, 2)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-mono text-xs font-bold text-red-700">{officer.officer_code}</span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              officer.is_on_duty
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {officer.is_on_duty ? 'เข้าเวร' : 'ออกเวร'}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 font-prompt mt-0.5 truncate">
                          {officer.full_name}
                        </h4>
                        <p className="text-xs text-slate-500 font-sarabun">{officer.role_title}</p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-sarabun">
                      <span className="text-slate-500">{officer.phone}</span>
                      <button
                        onClick={() => onToggleOfficerDuty(officer.id)}
                        className={`px-3 py-1 rounded-full text-xs font-prompt cursor-pointer transition-colors ${
                          officer.is_on_duty
                            ? 'bg-amber-100 hover:bg-amber-200 text-amber-900 font-medium'
                            : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-medium'
                        }`}
                      >
                        {officer.is_on_duty ? 'สลับเป็นออกเวร' : 'สลับเป็นเข้าเวร'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 9: SETTINGS & BACKUP */}
          {activeTab === 'settings' && (
            <div className="space-y-8 max-w-3xl">
              <div className="pb-4 border-b border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 font-prompt">
                  ความปลอดภัยและการสำรองข้อมูล (Security & Data Management)
                </h3>
                <p className="text-xs text-slate-500 font-sarabun mt-0.5">
                  เปลี่ยนรหัสผ่านศูนย์สั่งการ ส่งออกไฟล์ข้อมูลสำรอง และกู้คืนข้อมูล
                </p>
              </div>

              {/* Data Export / Backup */}
              <div className="p-6 rounded-3xl bg-blue-50/50 border border-blue-200 space-y-4">
                <h4 className="text-sm font-bold text-slate-900 font-prompt flex items-center gap-2">
                  <Download className="w-4 h-4 text-[#16377e]" />
                  <span>ส่งออกไฟล์ข้อมูลสำรอง (Full Backup Export)</span>
                </h4>
                <p className="text-xs text-slate-600 font-sarabun">
                  ดาวน์โหลดไฟล์ JSON ที่รวบรวมข้อมูลการตั้งค่าเว็บไซต์ทั้งหมด สไลด์หน้าแรก ข่าวสาร บันทึกภารกิจ และหมวดหมู่
                </p>
                <button
                  type="button"
                  onClick={onExportData}
                  className="px-6 py-2.5 bg-[#16377e] hover:bg-[#0f2452] text-white font-bold text-xs rounded-full font-prompt transition-colors cursor-pointer shadow-xs flex items-center gap-2 min-h-[40px]"
                >
                  <Download className="w-4 h-4 shrink-0" />
                  <span>ดาวน์โหลดไฟล์สำรองข้อมูล (.json)</span>
                </button>
              </div>

              {/* Data Import / Restore */}
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
                <h4 className="text-sm font-bold text-slate-900 font-prompt flex items-center gap-2">
                  <Upload className="w-4 h-4 text-emerald-600" />
                  <span>กู้คืนข้อมูลจากไฟล์สำรอง (Restore Backup)</span>
                </h4>
                <p className="text-xs text-slate-600 font-sarabun">
                  วางข้อความจากไฟล์ JSON ที่สำรองไว้เพื่อกู้คืนข้อมูลทั้งหมดของระบบ
                </p>
                <form onSubmit={handleImportJson} className="space-y-3">
                  <textarea
                    rows={3}
                    placeholder="วางโค้ด JSON ข้อมูลสำรองที่นี่..."
                    value={importJsonText}
                    onChange={(e) => setImportJsonText(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-2xl text-xs font-mono text-slate-900 focus:outline-none focus:border-[#16377e]"
                  />
                  {importStatus && (
                    <p
                      className={`text-xs p-3 rounded-2xl font-sarabun border ${
                        importStatus.includes('สำเร็จ')
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : 'bg-red-50 text-red-800 border-red-200'
                      }`}
                    >
                      {importStatus}
                    </p>
                  )}
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-full font-prompt transition-colors cursor-pointer shadow-xs min-h-[40px]"
                  >
                    กู้คืนข้อมูลเดี๋ยวนี้
                  </button>
                </form>
              </div>

              {/* Password Change */}
              <form
                onSubmit={handlePasswordChangeSubmit}
                className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4"
              >
                <h4 className="text-sm font-bold text-slate-900 font-prompt flex items-center gap-2">
                  <Key className="w-4 h-4 text-amber-600" />
                  <span>เปลี่ยนรหัสผ่านเจ้าหน้าที่ศูนย์สั่งการ (Change Password)</span>
                </h4>

                <div>
                  <label className="block text-xs font-bold text-slate-700 font-prompt mb-1">
                    รหัสผ่านเดิมปัจจุบัน
                  </label>
                  <input
                    type="password"
                    required
                    value={currentPassInput}
                    onChange={(e) => setCurrentPassInput(e.target.value)}
                    placeholder="รหัสผ่านปัจจุบัน"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-full text-sm text-slate-900 focus:outline-none focus:border-[#16377e]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 font-prompt mb-1">
                    รหัสผ่านใหม่ (อย่างน้อย 6 ตัวอักษร)
                  </label>
                  <input
                    type="password"
                    required
                    value={newPassInput}
                    onChange={(e) => setNewPassInput(e.target.value)}
                    placeholder="รหัสผ่านใหม่"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-full text-sm text-slate-900 focus:outline-none focus:border-[#16377e]"
                  />
                </div>

                {settingsMessage && (
                  <p
                    className={`text-xs p-3 rounded-2xl font-sarabun border ${
                      settingsMessage.includes('สำเร็จ')
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : 'bg-red-50 text-red-800 border-red-200'
                    }`}
                  >
                    {settingsMessage}
                  </p>
                )}

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#16377e] hover:bg-[#0f2452] text-white font-bold text-xs rounded-full font-prompt transition-colors cursor-pointer shadow-xs min-h-[40px]"
                >
                  บันทึกรหัสผ่านใหม่
                </button>
              </form>

              {/* Reset to Factory Default */}
              <div className="p-6 rounded-3xl bg-white border border-red-200 shadow-xs space-y-3">
                <h4 className="text-sm font-bold text-slate-900 font-prompt flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-amber-600" />
                  <span>รีเซ็ตข้อมูลระบบกลับสู่ค่าเริ่มต้น (Factory Reset)</span>
                </h4>
                <p className="text-xs text-slate-500 font-sarabun">
                  คืนค่าเริ่มต้นของข่าวสาร ภารกิจ หมวดหมู่ สไลด์หน้าแรก และข้อมูลเว็บไซต์ทั้งหมด
                </p>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm('คุณต้องการรีเซ็ตข้อมูลทั้งหมดกลับสู่ค่าเริ่มต้นใช่หรือไม่? ข้อมูลที่แก้ไขจะถูกรีเซ็ต')) {
                      onResetToDefault();
                      alert('รีเซ็ตข้อมูลเรียบร้อยแล้ว');
                    }
                  }}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-red-50 text-red-700 text-xs font-prompt rounded-full border border-slate-300 hover:border-red-300 transition-colors cursor-pointer font-semibold min-h-[40px]"
                >
                  รีเซ็ตข้อมูลกลับสู่ค่าเริ่มต้น
                </button>
              </div>
            </div>
          )}
        </div>

        {/* MODAL: CATEGORY EDIT/CREATE */}
        {showCategoryModal && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
                <h4 className="text-base font-bold text-slate-900 font-prompt">
                  {editingCategory ? 'แก้ไขหมวดหมู่' : 'เพิ่มหมวดหมู่ใหม่'}
                </h4>
                <button
                  onClick={() => setShowCategoryModal(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center cursor-pointer transition-colors shrink-0 aspect-square"
                >
                  <X className="w-4 h-4 shrink-0" />
                </button>
              </div>

              <form onSubmit={handleSaveCategory} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 font-prompt mb-1.5">
                    ชื่อหมวดหมู่ (ภาษาไทย) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="เช่น กู้ภัยทางน้ำ, การแพทย์ฉุกเฉิน..."
                    value={categoryForm.name_th}
                    onChange={(e) =>
                      setCategoryForm({ ...categoryForm, name_th: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-full text-sm text-slate-900 focus:outline-none focus:border-[#16377e] font-sarabun"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 font-prompt mb-1.5">
                    รหัส Slug (URL Identifier) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="เช่น water-rescue, ems-accident"
                    value={categoryForm.slug}
                    onChange={(e) => setCategoryForm({ ...categoryForm, slug: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-full text-sm text-slate-900 focus:outline-none focus:border-[#16377e] font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 font-prompt mb-1.5">
                    ชื่อภาษาอังกฤษ (English Name)
                  </label>
                  <input
                    type="text"
                    placeholder="เช่น Scuba Diving & Water Rescue"
                    value={categoryForm.name_en}
                    onChange={(e) =>
                      setCategoryForm({ ...categoryForm, name_en: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-full text-sm text-slate-900 focus:outline-none focus:border-[#16377e] font-sarabun"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 font-prompt mb-1.5">
                      ประเภทการใช้งาน
                    </label>
                    <select
                      value={categoryForm.category_type}
                      onChange={(e) =>
                        setCategoryForm({
                          ...categoryForm,
                          category_type: e.target.value as 'mission' | 'news' | 'service',
                        })
                      }
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-full text-xs text-slate-900 focus:outline-none font-sarabun"
                    >
                      <option value="mission">ภารกิจ (Mission)</option>
                      <option value="news">ข่าวสาร (News)</option>
                      <option value="service">บริการ (Service)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 font-prompt mb-1.5">
                      สถานะการใช้งาน
                    </label>
                    <select
                      value={categoryForm.is_active ? '1' : '0'}
                      onChange={(e) =>
                        setCategoryForm({
                          ...categoryForm,
                          is_active: e.target.value === '1',
                        })
                      }
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-full text-xs text-slate-900 focus:outline-none font-sarabun"
                    >
                      <option value="1">เปิดใช้งาน (Active)</option>
                      <option value="0">ปิดชั่วคราว (Inactive)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowCategoryModal(false)}
                    className="px-5 py-2 text-slate-600 hover:text-slate-900 text-xs font-prompt cursor-pointer rounded-full hover:bg-slate-100 transition-colors min-h-[36px]"
                  >
                    ยกเลิก
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#16377e] hover:bg-[#0f2452] text-white font-bold text-xs rounded-full font-prompt transition-colors cursor-pointer shadow-xs min-h-[40px] border border-amber-400/40"
                  >
                    บันทึกหมวดหมู่
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: MISSION EDIT/CREATE */}
        {showMissionModal && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
            <div className="w-full max-w-xl bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl my-8">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
                <h4 className="text-base font-bold text-slate-900 font-prompt">
                  {editingMission ? 'แก้ไขบันทึกภารกิจ' : 'เพิ่มบันทึกภารกิจใหม่'}
                </h4>
                <button
                  onClick={() => setShowMissionModal(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center cursor-pointer transition-colors shrink-0 aspect-square"
                >
                  <X className="w-4 h-4 shrink-0" />
                </button>
              </div>

              <form onSubmit={handleSaveMission} className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
                <div>
                  <label className="block text-xs font-bold text-slate-700 font-prompt mb-1.5">
                    หัวข้อภารกิจ *
                  </label>
                  <input
                    type="text"
                    required
                    value={missionForm.title}
                    onChange={(e) => setMissionForm({ ...missionForm, title: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-full text-sm text-slate-900 focus:outline-none focus:border-[#16377e] font-sarabun"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 font-prompt mb-1.5">
                      หมวดหมู่
                    </label>
                    <select
                      value={missionForm.category_slug}
                      onChange={(e) =>
                        setMissionForm({ ...missionForm, category_slug: e.target.value })
                      }
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-full text-xs text-slate-900 focus:outline-none font-sarabun"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.slug}>
                          {c.name_th}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 font-prompt mb-1.5">
                      วันที่ปฏิบัติการ
                    </label>
                    <input
                      type="date"
                      value={missionForm.incident_date}
                      onChange={(e) =>
                        setMissionForm({ ...missionForm, incident_date: e.target.value })
                      }
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-full text-xs text-slate-900 focus:outline-none font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 font-prompt mb-1.5">
                    รูปภาพหน้าปกภารกิจ (Image URL)
                  </label>
                  <input
                    type="url"
                    value={missionForm.cover_image_url}
                    onChange={(e) =>
                      setMissionForm({ ...missionForm, cover_image_url: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-full text-xs text-slate-900 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 font-prompt mb-1.5">
                    สรุปย่อการปฏิบัติงาน (Summary) *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={missionForm.summary}
                    onChange={(e) => setMissionForm({ ...missionForm, summary: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-sm text-slate-900 focus:outline-none focus:border-[#16377e] font-sarabun resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 font-prompt mb-1.5">
                    รายงานฉบับเต็ม (Full Details)
                  </label>
                  <textarea
                    rows={3}
                    value={missionForm.details}
                    onChange={(e) => setMissionForm({ ...missionForm, details: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-sm text-slate-900 focus:outline-none focus:border-[#16377e] font-sarabun"
                  />
                </div>

                <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowMissionModal(false)}
                    className="px-5 py-2 text-slate-600 hover:text-slate-900 text-xs font-prompt cursor-pointer rounded-full hover:bg-slate-100 transition-colors min-h-[36px]"
                  >
                    ยกเลิก
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#16377e] hover:bg-[#0f2452] text-white font-bold text-xs rounded-full font-prompt transition-colors cursor-pointer shadow-xs min-h-[40px] border border-amber-400/40"
                  >
                    บันทึกภารกิจ
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: NEWS EDIT/CREATE */}
        {showNewsModal && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="w-full max-w-xl bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
                <h4 className="text-base font-bold text-slate-900 font-prompt">
                  {editingNews ? 'แก้ไขข่าวสาร' : 'สร้างข่าวสาร/ประกาศใหม่'}
                </h4>
                <button
                  onClick={() => setShowNewsModal(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center cursor-pointer transition-colors shrink-0 aspect-square"
                >
                  <X className="w-4 h-4 shrink-0" />
                </button>
              </div>

              <form onSubmit={handleSaveNews} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 font-prompt mb-1.5">
                    หัวข้อข่าว / ประกาศ *
                  </label>
                  <input
                    type="text"
                    required
                    value={newsForm.title}
                    onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-full text-sm text-slate-900 focus:outline-none focus:border-[#16377e] font-sarabun"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 font-prompt mb-1.5">
                    สรุปเนื้อหาข่าว *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={newsForm.summary}
                    onChange={(e) => setNewsForm({ ...newsForm, summary: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-sm text-slate-900 focus:outline-none focus:border-[#16377e] font-sarabun resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 font-prompt mb-1.5">
                    เนื้อหาข่าวสารฉบับเต็ม
                  </label>
                  <textarea
                    rows={3}
                    value={newsForm.content}
                    onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-sm text-slate-900 focus:outline-none focus:border-[#16377e] font-sarabun"
                  />
                </div>

                <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowNewsModal(false)}
                    className="px-5 py-2 text-slate-600 hover:text-slate-900 text-xs font-prompt cursor-pointer rounded-full hover:bg-slate-100 transition-colors min-h-[36px]"
                  >
                    ยกเลิก
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#16377e] hover:bg-[#0f2452] text-white font-bold text-xs rounded-full font-prompt transition-colors cursor-pointer shadow-xs min-h-[40px] border border-amber-400/40"
                  >
                    บันทึกข่าวสาร
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: HERO SLIDE EDIT/CREATE */}
        {showSlideModal && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
            <div className="w-full max-w-xl bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl my-8">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
                <h4 className="text-base font-bold text-slate-900 font-prompt">
                  {editingSlide ? 'แก้ไขสไลด์หน้าแรก' : 'เพิ่มสไลด์หน้าแรกใหม่'}
                </h4>
                <button
                  onClick={() => setShowSlideModal(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center cursor-pointer transition-colors shrink-0 aspect-square"
                >
                  <X className="w-4 h-4 shrink-0" />
                </button>
              </div>

              <form onSubmit={handleSaveSlide} className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
                <div>
                  <label className="block text-xs font-bold text-slate-700 font-prompt mb-1.5">
                    ป้ายหัวข้อย่อย (Badge Label)
                  </label>
                  <input
                    type="text"
                    value={slideForm.badge}
                    onChange={(e) => setSlideForm({ ...slideForm, badge: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-full text-xs text-slate-900 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 font-prompt mb-1.5">
                      หัวข้อบรรทัดที่ 1 (Title Line 1) *
                    </label>
                    <input
                      type="text"
                      required
                      value={slideForm.title_line1}
                      onChange={(e) => setSlideForm({ ...slideForm, title_line1: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-full text-sm text-slate-900 focus:outline-none font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 font-prompt mb-1.5">
                      หัวข้อบรรทัดที่ 2 (Title Line 2)
                    </label>
                    <input
                      type="text"
                      value={slideForm.title_line2}
                      onChange={(e) => setSlideForm({ ...slideForm, title_line2: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-full text-sm text-slate-900 focus:outline-none font-bold text-amber-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 font-prompt mb-1.5">
                    คำอธิบายสไลด์ (Subtitle)
                  </label>
                  <textarea
                    rows={2}
                    value={slideForm.subtitle}
                    onChange={(e) => setSlideForm({ ...slideForm, subtitle: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-xs text-slate-900 focus:outline-none font-sarabun"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 font-prompt mb-1.5">
                    รูปภาพพื้นหลัง (Cover Image URL)
                  </label>
                  <input
                    type="url"
                    value={slideForm.cover_image}
                    onChange={(e) => setSlideForm({ ...slideForm, cover_image: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-full text-xs text-slate-900 focus:outline-none font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 font-prompt mb-1.5">
                      ข้อความปุ่มหลัก (Primary Button Text)
                    </label>
                    <input
                      type="text"
                      value={slideForm.primary_btn_text}
                      onChange={(e) => setSlideForm({ ...slideForm, primary_btn_text: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-full text-xs text-slate-900 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 font-prompt mb-1.5">
                      การกระทำปุ่มหลัก
                    </label>
                    <select
                      value={slideForm.primary_btn_action}
                      onChange={(e) => setSlideForm({ ...slideForm, primary_btn_action: e.target.value as HeroSlideItem['primary_btn_action'] })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-full text-xs text-slate-900 focus:outline-none"
                    >
                      <option value="report">เปิดหน้าแจ้งเหตุ (Report)</option>
                      <option value="missions">เปิดหน้าผลงาน (Missions)</option>
                      <option value="contact">เกี่ยวกับองค์กร (About)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 font-prompt mb-1.5">
                      ลำดับการแสดงผล (Sort Order)
                    </label>
                    <input
                      type="number"
                      value={slideForm.sort_order}
                      onChange={(e) => setSlideForm({ ...slideForm, sort_order: parseInt(e.target.value) || 1 })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-full text-xs text-slate-900 focus:outline-none font-mono"
                    />
                  </div>

                  <div className="flex items-center pt-5">
                    <label className="flex items-center gap-2 text-xs text-slate-800 font-prompt cursor-pointer">
                      <input
                        type="checkbox"
                        checked={slideForm.is_active}
                        onChange={(e) => setSlideForm({ ...slideForm, is_active: e.target.checked })}
                        className="rounded-full text-[#16377e] focus:ring-[#16377e] w-4 h-4 aspect-square"
                      />
                      <span>เปิดใช้งานสไลด์นี้</span>
                    </label>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowSlideModal(false)}
                    className="px-5 py-2 text-slate-600 hover:text-slate-900 text-xs font-prompt cursor-pointer rounded-full hover:bg-slate-100 transition-colors min-h-[36px]"
                  >
                    ยกเลิก
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#16377e] hover:bg-[#0f2452] text-white font-bold text-xs rounded-full font-prompt transition-colors cursor-pointer shadow-xs min-h-[40px] border border-amber-400/40"
                  >
                    บันทึกสไลด์
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
