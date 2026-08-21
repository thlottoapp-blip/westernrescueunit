'use client';

import React, { useState, useMemo } from 'react';
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
  Search,
  Check,
  ChevronRight,
  Filter,
  Eye,
  Sliders,
  Send,
  Lock,
  Menu,
  Sun,
  Moon,
  Save,
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
  onAddFleetItem,
  onUpdateFleetItem,
  onDeleteFleetItem,
  onToggleOfficerDuty,
  onAddOfficer,
  onUpdateOfficer,
  onDeleteOfficer,
  onUpdateSiteConfig,
  onAddHeroSlide,
  onUpdateHeroSlide,
  onDeleteHeroSlide,
  onExportData,
  onImportData,
  onResetToDefault,
  onTestSoundAlert,
}: AdminPortalViewProps) {
  // Theme Mode: 'light' (default as requested) or 'dark'
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');

  // Login Form States
  const [enteredUsername, setEnteredUsername] = useState('0611193342');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // 3-Pane Navigation Active Tab
  const [activeMenu, setActiveMenu] = useState<
    'incidents' | 'missions' | 'news' | 'fleet' | 'officers' | 'categories' | 'hero_slides' | 'site_config' | 'settings'
  >('incidents');

  // Selected Item IDs for Pane 2 & 3
  const [selectedIncidentId, setSelectedIncidentId] = useState<string | null>(incidents[0]?.id || null);
  const [selectedMissionId, setSelectedMissionId] = useState<string | null>(missions[0]?.id || null);
  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(news[0]?.id || null);
  const [selectedFleetId, setSelectedFleetId] = useState<string | null>(fleet[0]?.id || null);
  const [selectedOfficerId, setSelectedOfficerId] = useState<string | null>(officers[0]?.id || null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(categories[0]?.id || null);
  const [selectedSlideId, setSelectedSlideId] = useState<string | null>(heroSlides[0]?.id || null);

  // Search and Sub-filters
  const [searchTerm, setSearchTerm] = useState('');
  const [incidentFilter, setIncidentFilter] = useState<'all' | 'pending' | 'dispatched' | 'en_route' | 'on_scene' | 'resolved'>('all');

  // Mobile Views
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Right Slide-Over Creation / Edit Drawer State
  const [isSlideDrawerOpen, setIsSlideDrawerOpen] = useState(false);
  const [slideDrawerModule, setSlideDrawerModule] = useState<typeof activeMenu>('missions');
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  // Password Update Form State
  const [currentPassInput, setCurrentPassInput] = useState('');
  const [newPassInput, setNewPassInput] = useState('');
  const [confirmPassInput, setConfirmPassInput] = useState('');

  // Site Config Edit State
  const [configForm, setConfigForm] = useState<SiteConfig>(siteConfig);

  // Toggle Theme
  const toggleTheme = () => {
    setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Open Creation Drawer
  const handleOpenCreateDrawer = (moduleName: typeof activeMenu) => {
    setSlideDrawerModule(moduleName);
    setEditingItemId(null);
    setIsSlideDrawerOpen(true);
  };

  // Open Edit Drawer
  const handleOpenEditDrawer = (moduleName: typeof activeMenu, itemId: string) => {
    setSlideDrawerModule(moduleName);
    setEditingItemId(itemId);
    setIsSlideDrawerOpen(true);
  };

  // Handle Login Submit
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    const success = onLogin(enteredUsername, enteredPassword);
    if (!success) {
      setPasswordError('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง (ค่าเริ่มต้น 0611193342 / @0611193342)');
    }
  };

  // Login Screen
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-prompt">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-slate-200 p-8 sm:p-10 relative overflow-hidden">
          <div className="text-center mb-8">
            <div className="inline-block p-3 rounded-full bg-blue-50 border border-blue-200 shadow-sm mb-4">
              <OfficialLogo size={64} withGlow={false} />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              ศูนย์สั่งการและจัดการระบบ (CMS)
            </h2>
            <p className="text-xs text-slate-600 font-sarabun mt-1">
              หน่วยกู้ภัยประจิม (สมาคมประจิมสารคาม พุทธศาสตร์สงเคราะห์)
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                ชื่อผู้ใช้งาน (Username)
              </label>
              <input
                type="text"
                required
                value={enteredUsername}
                onChange={(e) => setEnteredUsername(e.target.value)}
                placeholder="0611193342"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-slate-900 text-sm focus:outline-none focus:border-[#16377e] font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                รหัสผ่าน (Password)
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={enteredPassword}
                onChange={(e) => setEnteredPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-slate-900 text-sm focus:outline-none focus:border-[#16377e] font-mono tracking-widest"
              />
            </div>

            {passwordError && (
              <p className="text-xs text-red-600 font-sarabun bg-red-50 p-2.5 rounded-2xl border border-red-200">
                {passwordError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-[#16377e] hover:bg-[#0f2452] text-white font-bold rounded-2xl shadow-md text-sm transition-all cursor-pointer min-h-[44px]"
            >
              เข้าสู่ระบบศูนย์สั่งการ
            </button>

            <button
              type="button"
              onClick={onBackToHome}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-2xl text-xs transition-colors cursor-pointer min-h-[40px]"
            >
              ← กลับสู่หน้าเว็บไซต์หลัก
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Pending Incidents Count
  const pendingCount = incidents.filter((i) => i.status === 'pending').length;

  // Navigation Items
  const menuList = [
    { id: 'incidents', label: 'แจ้งเหตุฉุกเฉินสด', icon: AlertTriangle, count: pendingCount, isAlert: pendingCount > 0 },
    { id: 'missions', label: 'บันทึกผลงานภารกิจ', icon: FileText, count: missions.length },
    { id: 'news', label: 'ข่าวสารประชาสัมพันธ์', icon: Radio, count: news.length },
    { id: 'fleet', label: 'ยานพาหนะ & อุปกรณ์', icon: Ambulance, count: fleet.length },
    { id: 'officers', label: 'ทำเนียบเจ้าหน้าที่', icon: User, count: officers.length },
    { id: 'categories', label: 'หมวดหมู่งานกู้ภัย', icon: Layers, count: categories.length },
    { id: 'hero_slides', label: 'สไลด์แบนเนอร์หน้าแรก', icon: ImageIcon, count: heroSlides.length },
    { id: 'site_config', label: 'ข้อมูลองค์กร & โซเชียล', icon: Globe },
    { id: 'settings', label: 'ตั้งค่า & สำรองข้อมูล', icon: Settings },
  ];

  // Filtered Master Data (Pane 2)
  const filteredIncidents = incidents.filter((inc) => {
    const matchSearch =
      inc.incident_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inc.caller_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inc.location_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFilter = incidentFilter === 'all' || inc.status === incidentFilter;
    return matchSearch && matchFilter;
  });

  const filteredMissions = missions.filter((m) =>
    m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredNews = news.filter((n) =>
    n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    n.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredFleet = fleet.filter((f) =>
    f.call_sign.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.name_th.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredOfficers = officers.filter((o) =>
    o.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.officer_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.role_title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCategories = categories.filter((c) =>
    c.name_th.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSlides = heroSlides.filter((s) =>
    s.title_line1.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.badge.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Active Selected Detail Objects for Pane 3
  const selectedIncident = incidents.find((i) => i.id === selectedIncidentId) || incidents[0];
  const selectedMission = missions.find((m) => m.id === selectedMissionId) || missions[0];
  const selectedNews = news.find((n) => n.id === selectedNewsId) || news[0];
  const selectedFleetItem = fleet.find((f) => f.id === selectedFleetId) || fleet[0];
  const selectedOfficer = officers.find((o) => o.id === selectedOfficerId) || officers[0];
  const selectedCategory = categories.find((c) => c.id === selectedCategoryId) || categories[0];
  const selectedSlide = heroSlides.find((s) => s.id === selectedSlideId) || heroSlides[0];

  // Theme-based Styles
  const isLight = themeMode === 'light';
  const bgMain = isLight ? 'bg-white text-slate-900' : 'bg-slate-900 text-slate-100';
  const bgHeader = isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#08132b] border-blue-900/60 text-white';
  const bgSidebar = isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#0a1738] border-blue-900/60';
  const bgMasterList = isLight ? 'bg-slate-100/70 border-slate-200' : 'bg-[#0e1f4d] border-blue-900/60';
  const bgMasterHeader = isLight ? 'bg-white border-slate-200' : 'bg-[#0c1a40] border-blue-900/60';
  const bgWorkspace = isLight ? 'bg-slate-50' : 'bg-[#070e24]';
  const cardBg = isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/90 border-blue-900/60 shadow-xl';
  const cardSubBg = isLight ? 'bg-slate-50 border-slate-200' : 'bg-blue-950/40 border-blue-900/40';

  return (
    <div className={`h-screen w-screen flex flex-col font-prompt overflow-hidden selection:bg-red-600 selection:text-white ${bgMain}`}>
      {/* 1. Global Admin Top Header */}
      <header className={`h-14 border-b px-4 flex items-center justify-between shrink-0 z-30 shadow-xs ${bgHeader}`}>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className={`lg:hidden p-2 rounded-xl transition-colors ${isLight ? 'text-slate-700 hover:bg-slate-100' : 'text-blue-200 hover:bg-blue-900/60'}`}
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2.5">
            <OfficialLogo size={32} withGlow={false} />
            <div className="flex flex-col">
              <span className={`text-sm font-bold leading-tight hidden sm:inline ${isLight ? 'text-slate-900' : 'text-white'}`}>
                หน่วยกู้ภัยประจิม (สมาคมประจิมสารคาม)
              </span>
              <span className={`text-xs font-bold leading-tight sm:hidden ${isLight ? 'text-slate-900' : 'text-white'}`}>
                กู้ภัยประจิม CMS
              </span>
              <span className="text-[10px] text-blue-600 font-mono font-bold">
                ENTERPRISE 3-PANE • User: {currentAdminUser}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Day / Night Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer border ${
              isLight
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                : 'bg-blue-950 hover:bg-blue-900 text-amber-300 border-blue-800'
            }`}
            title="สลับธีมกลางวัน (สีขาว) / กลางคืน (มืด)"
          >
            {isLight ? (
              <>
                <Moon className="w-3.5 h-3.5 text-blue-700" />
                <span className="hidden sm:inline">ธีมกลางคืน</span>
              </>
            ) : (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">ธีมกลางวัน (ขาว)</span>
              </>
            )}
          </button>

          {/* Quick Add Button */}
          <button
            onClick={() => handleOpenCreateDrawer(activeMenu)}
            className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs transition-all cursor-pointer min-h-[36px]"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">เพิ่มรายการใหม่</span>
            <span className="sm:hidden">เพิ่ม</span>
          </button>

          {/* Siren Alert Sound Test */}
          <button
            onClick={onTestSoundAlert}
            title="ทดสอบสัญญาณเสียงฉุกเฉิน"
            className="hidden md:inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-semibold border border-blue-200 transition-colors cursor-pointer min-h-[36px]"
          >
            <Volume2 className="w-3.5 h-3.5 text-blue-600" />
            <span>ทดสอบไซเรน</span>
          </button>

          {/* Back to Web Portal */}
          <button
            onClick={onBackToHome}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors cursor-pointer min-h-[36px] ${
              isLight ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300' : 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">หน้าหลัก</span>
          </button>

          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="inline-flex items-center px-3 py-1.5 rounded-full bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-colors cursor-pointer min-h-[36px]"
          >
            <span>ออกจากระบบ</span>
          </button>
        </div>
      </header>

      {/* 2. Main 3-Pane Desktop Layout (Left Sidebar + Middle Master List + Right Detail Workspace) */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* ========================================================================= */}
        {/* PANE 1: LEFT SIDEBAR NAVIGATION (Width: 250px on Desktop) */}
        {/* ========================================================================= */}
        <aside
          className={`
            fixed lg:static inset-y-0 left-0 z-40 w-64 border-r flex flex-col shrink-0 transition-transform duration-300 ease-in-out
            ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            ${bgSidebar}
          `}
        >
          <div className={`p-4 border-b flex items-center justify-between ${isLight ? 'border-slate-200' : 'border-blue-900/50'}`}>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-bold text-emerald-600 font-mono">
                SUPABASE CONNECTED
              </span>
            </div>
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-slate-700 p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-thin">
            {menuList.map((item) => {
              const Icon = item.icon;
              const isActive = activeMenu === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveMenu(item.id as typeof activeMenu);
                    setSearchTerm('');
                    setMobileDetailOpen(false);
                    setMobileSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-semibold transition-all cursor-pointer
                    ${
                      isActive
                        ? isLight
                          ? 'bg-[#16377e] text-white font-bold shadow-md'
                          : 'bg-amber-400 text-slate-950 font-bold shadow-lg'
                        : isLight
                        ? 'text-slate-700 hover:bg-slate-200/70'
                        : 'text-blue-200/90 hover:bg-blue-900/40 hover:text-white'
                    }
                  `}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? (isLight ? 'text-white' : 'text-slate-950') : 'text-blue-500'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.count !== undefined && (
                    <span
                      className={`
                        text-[10px] font-mono px-2 py-0.5 rounded-full font-bold
                        ${
                          item.isAlert
                            ? 'bg-red-600 text-white animate-pulse'
                            : isActive
                            ? isLight ? 'bg-white/20 text-white' : 'bg-slate-950/20 text-slate-950'
                            : isLight ? 'bg-slate-200 text-slate-700' : 'bg-blue-950 text-blue-300 border border-blue-800'
                        }
                      `}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className={`p-3 border-t space-y-2 ${isLight ? 'border-slate-200 bg-white' : 'border-blue-900/50 bg-black/20'}`}>
            <button
              onClick={onExportData}
              className={`w-full py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border transition-colors cursor-pointer min-h-[40px] ${
                isLight ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300' : 'bg-blue-950/80 hover:bg-blue-900 text-blue-200 border-blue-800'
              }`}
            >
              <Download className="w-3.5 h-3.5 text-blue-600" />
              <span>สำรองข้อมูล JSON</span>
            </button>
          </div>
        </aside>

        {/* ========================================================================= */}
        {/* PANE 2: MIDDLE MASTER LIST (Width: 320px - 380px on Desktop) */}
        {/* ========================================================================= */}
        <section
          className={`
            w-full lg:w-80 xl:w-96 border-r flex flex-col shrink-0 overflow-hidden
            ${mobileDetailOpen ? 'hidden lg:flex' : 'flex'}
            ${bgMasterList}
          `}
        >
          {/* Pane 2 Header with Search & Add Button */}
          <div className={`p-4 border-b space-y-3 ${bgMasterHeader}`}>
            <div className="flex items-center justify-between gap-2">
              <h2 className={`text-sm font-bold truncate ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {menuList.find((m) => m.id === activeMenu)?.label}
              </h2>
              {['incidents', 'missions', 'news', 'fleet', 'officers', 'categories', 'hero_slides'].includes(activeMenu) && (
                <button
                  onClick={() => handleOpenCreateDrawer(activeMenu)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs transition-all cursor-pointer min-h-[34px]"
                  title="เปิดสไลด์เพิ่มรายการใหม่จากฝั่งขวา"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>เพิ่มใหม่</span>
                </button>
              )}
            </div>

            {/* Search Box */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="ค้นหาข้อมูล..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-9 pr-3 py-2 border rounded-xl text-xs focus:outline-none font-sarabun ${
                  isLight ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-[#16377e]' : 'bg-blue-950/70 border-blue-800 text-white focus:border-amber-400'
                }`}
              />
            </div>

            {/* Sub Filter for Incidents */}
            {activeMenu === 'incidents' && (
              <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-1 text-[11px]">
                {[
                  { id: 'all', label: 'ทั้งหมด' },
                  { id: 'pending', label: 'รอดำเนินการ' },
                  { id: 'en_route', label: 'กำลังไป' },
                  { id: 'on_scene', label: 'ถึงที่เกิดเหตุ' },
                  { id: 'resolved', label: 'เสร็จสิ้น' },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setIncidentFilter(f.id as typeof incidentFilter)}
                    className={`px-2.5 py-1 rounded-full whitespace-nowrap font-semibold transition-all ${
                      incidentFilter === f.id
                        ? isLight ? 'bg-[#16377e] text-white font-bold' : 'bg-amber-400 text-slate-950 font-bold'
                        : isLight ? 'bg-slate-200 text-slate-700 hover:bg-slate-300' : 'bg-blue-950 text-blue-300 hover:bg-blue-900'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Pane 2 Scrollable Item Cards List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2.5 scrollbar-thin">
            {/* INCIDENTS LIST */}
            {activeMenu === 'incidents' &&
              filteredIncidents.map((inc) => {
                const isSelected = selectedIncidentId === inc.id;
                return (
                  <div
                    key={inc.id}
                    onClick={() => {
                      setSelectedIncidentId(inc.id);
                      setMobileDetailOpen(true);
                    }}
                    className={`
                      p-3.5 rounded-2xl border transition-all cursor-pointer relative
                      ${
                        isSelected
                          ? isLight
                            ? 'bg-blue-50 border-[#16377e] shadow-sm ring-1 ring-[#16377e]'
                            : 'bg-[#16377e] border-amber-400 shadow-md'
                          : isLight
                          ? 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                          : 'bg-[#0a1636]/70 hover:bg-blue-950/60 border-blue-900/40 text-blue-100'
                      }
                    `}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <span className="text-xs font-mono font-bold text-blue-700">
                        {inc.incident_number}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          inc.status === 'pending'
                            ? 'bg-red-100 text-red-700 border border-red-300'
                            : inc.status === 'resolved'
                            ? 'bg-emerald-100 text-emerald-700 border border-emerald-300'
                            : 'bg-amber-100 text-amber-800 border border-amber-300'
                        }`}
                      >
                        {inc.status === 'pending'
                          ? 'รอดำเนินการ'
                          : inc.status === 'resolved'
                          ? 'เสร็จสิ้น'
                          : 'กำลังปฏิบัติการ'}
                      </span>
                    </div>
                    <h4 className={`text-xs font-bold line-clamp-1 mb-0.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      {inc.caller_name} • {inc.location_name}
                    </h4>
                    <p className={`text-[11px] font-sarabun line-clamp-2 ${isLight ? 'text-slate-600' : 'text-blue-200/80'}`}>
                      {inc.details || 'ไม่มีรายละเอียดเพิ่มเติม'}
                    </p>
                  </div>
                );
              })}

            {/* MISSIONS LIST */}
            {activeMenu === 'missions' &&
              filteredMissions.map((m) => {
                const isSelected = selectedMissionId === m.id;
                return (
                  <div
                    key={m.id}
                    onClick={() => {
                      setSelectedMissionId(m.id);
                      setMobileDetailOpen(true);
                    }}
                    className={`
                      p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-3
                      ${
                        isSelected
                          ? isLight
                            ? 'bg-blue-50 border-[#16377e] shadow-sm ring-1 ring-[#16377e]'
                            : 'bg-[#16377e] border-amber-400 shadow-md'
                          : isLight
                          ? 'bg-white hover:bg-slate-50 border-slate-200'
                          : 'bg-[#0a1636]/70 hover:bg-blue-950/60 border-blue-900/40'
                      }
                    `}
                  >
                    <div
                      className="w-12 h-12 rounded-xl bg-cover bg-center shrink-0 border border-slate-300"
                      style={{ backgroundImage: `url(${m.cover_image_url})` }}
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] text-blue-700 font-mono font-bold">{m.incident_date}</span>
                      <h4 className={`text-xs font-bold line-clamp-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>{m.title}</h4>
                      <p className={`text-[11px] font-sarabun truncate ${isLight ? 'text-slate-600' : 'text-blue-200/70'}`}>{m.location}</p>
                    </div>
                  </div>
                );
              })}

            {/* NEWS LIST */}
            {activeMenu === 'news' &&
              filteredNews.map((n) => {
                const isSelected = selectedNewsId === n.id;
                return (
                  <div
                    key={n.id}
                    onClick={() => {
                      setSelectedNewsId(n.id);
                      setMobileDetailOpen(true);
                    }}
                    className={`
                      p-3.5 rounded-2xl border transition-all cursor-pointer
                      ${
                        isSelected
                          ? isLight
                            ? 'bg-blue-50 border-[#16377e] shadow-sm ring-1 ring-[#16377e]'
                            : 'bg-[#16377e] border-amber-400 shadow-md'
                          : isLight
                          ? 'bg-white hover:bg-slate-50 border-slate-200'
                          : 'bg-[#0a1636]/70 hover:bg-blue-950/60 border-blue-900/40'
                      }
                    `}
                  >
                    <span className="text-[10px] text-blue-700 font-mono font-bold">{n.published_date}</span>
                    <h4 className={`text-xs font-bold line-clamp-2 my-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>{n.title}</h4>
                    <p className={`text-[11px] font-sarabun line-clamp-2 ${isLight ? 'text-slate-600' : 'text-blue-200/70'}`}>{n.summary}</p>
                  </div>
                );
              })}

            {/* FLEET LIST */}
            {activeMenu === 'fleet' &&
              filteredFleet.map((f) => {
                const isSelected = selectedFleetId === f.id;
                return (
                  <div
                    key={f.id}
                    onClick={() => {
                      setSelectedFleetId(f.id);
                      setMobileDetailOpen(true);
                    }}
                    className={`
                      p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between
                      ${
                        isSelected
                          ? isLight
                            ? 'bg-blue-50 border-[#16377e] shadow-sm ring-1 ring-[#16377e]'
                            : 'bg-[#16377e] border-amber-400 shadow-md'
                          : isLight
                          ? 'bg-white hover:bg-slate-50 border-slate-200'
                          : 'bg-[#0a1636]/70 hover:bg-blue-950/60 border-blue-900/40'
                      }
                    `}
                  >
                    <div>
                      <span className="text-xs font-mono font-bold text-blue-700">{f.call_sign}</span>
                      <h4 className={`text-xs font-bold line-clamp-1 mt-0.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>{f.name_th}</h4>
                      <p className={`text-[10px] font-sarabun ${isLight ? 'text-slate-500' : 'text-blue-300'}`}>{f.plate_number || 'ประจำศูนย์'}</p>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        f.status === 'available'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {f.status === 'available' ? 'พร้อมออกเหตุ' : 'ออกเหตุ'}
                    </span>
                  </div>
                );
              })}

            {/* OFFICERS LIST */}
            {activeMenu === 'officers' &&
              filteredOfficers.map((o) => {
                const isSelected = selectedOfficerId === o.id;
                return (
                  <div
                    key={o.id}
                    onClick={() => {
                      setSelectedOfficerId(o.id);
                      setMobileDetailOpen(true);
                    }}
                    className={`
                      p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between
                      ${
                        isSelected
                          ? isLight
                            ? 'bg-blue-50 border-[#16377e] shadow-sm ring-1 ring-[#16377e]'
                            : 'bg-[#16377e] border-amber-400 shadow-md'
                          : isLight
                          ? 'bg-white hover:bg-slate-50 border-slate-200'
                          : 'bg-[#0a1636]/70 hover:bg-blue-950/60 border-blue-900/40'
                      }
                    `}
                  >
                    <div>
                      <span className="text-xs font-mono font-bold text-blue-700">{o.officer_code}</span>
                      <h4 className={`text-xs font-bold line-clamp-1 mt-0.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>{o.full_name}</h4>
                      <p className={`text-[10px] font-sarabun ${isLight ? 'text-slate-500' : 'text-blue-300'}`}>{o.role_title}</p>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        o.is_on_duty ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {o.is_on_duty ? 'เข้าเวร' : 'พักเวร'}
                    </span>
                  </div>
                );
              })}

            {/* CATEGORIES LIST */}
            {activeMenu === 'categories' &&
              filteredCategories.map((c) => {
                const isSelected = selectedCategoryId === c.id;
                return (
                  <div
                    key={c.id}
                    onClick={() => {
                      setSelectedCategoryId(c.id);
                      setMobileDetailOpen(true);
                    }}
                    className={`
                      p-3.5 rounded-2xl border transition-all cursor-pointer
                      ${
                        isSelected
                          ? isLight
                            ? 'bg-blue-50 border-[#16377e] shadow-sm ring-1 ring-[#16377e]'
                            : 'bg-[#16377e] border-amber-400 shadow-md'
                          : isLight
                          ? 'bg-white hover:bg-slate-50 border-slate-200'
                          : 'bg-[#0a1636]/70 hover:bg-blue-950/60 border-blue-900/40'
                      }
                    `}
                  >
                    <span className="text-[10px] font-mono text-blue-700 font-bold">{c.slug}</span>
                    <h4 className={`text-xs font-bold mt-0.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>{c.name_th}</h4>
                    <p className={`text-[11px] font-sarabun line-clamp-2 mt-1 ${isLight ? 'text-slate-600' : 'text-blue-200/70'}`}>{c.description}</p>
                  </div>
                );
              })}

            {/* HERO SLIDES LIST */}
            {activeMenu === 'hero_slides' &&
              filteredSlides.map((s, idx) => {
                const isSelected = selectedSlideId === s.id;
                return (
                  <div
                    key={s.id}
                    onClick={() => {
                      setSelectedSlideId(s.id);
                      setMobileDetailOpen(true);
                    }}
                    className={`
                      p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-3
                      ${
                        isSelected
                          ? isLight
                            ? 'bg-blue-50 border-[#16377e] shadow-sm ring-1 ring-[#16377e]'
                            : 'bg-[#16377e] border-amber-400 shadow-md'
                          : isLight
                          ? 'bg-white hover:bg-slate-50 border-slate-200'
                          : 'bg-[#0a1636]/70 hover:bg-blue-950/60 border-blue-900/40'
                      }
                    `}
                  >
                    <div
                      className="w-12 h-12 rounded-xl bg-cover bg-center shrink-0 border border-slate-300"
                      style={{ backgroundImage: `url(${s.cover_image})` }}
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] text-blue-700 font-mono font-bold">สไลด์ที่ {idx + 1}</span>
                      <h4 className={`text-xs font-bold line-clamp-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>{s.title_line1}</h4>
                      <p className={`text-[10px] font-sarabun truncate ${isLight ? 'text-slate-500' : 'text-blue-200/70'}`}>{s.badge}</p>
                    </div>
                  </div>
                );
              })}

            {/* Direct Info for Site Config & Settings */}
            {['site_config', 'settings'].includes(activeMenu) && (
              <div className={`p-4 rounded-2xl border text-center ${cardSubBg}`}>
                <Settings className="w-8 h-8 text-blue-600 mx-auto mb-2 opacity-80" />
                <h4 className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>จัดการข้อมูลระบบส่วนกลาง</h4>
                <p className={`text-[11px] font-sarabun mt-1 ${isLight ? 'text-slate-600' : 'text-blue-200'}`}>
                  แก้ไขข้อมูลผ่านหน้าต่างหลักคอลัมน์ขวาได้ทันที
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PANE 3: RIGHT DETAIL WORKSPACE / DEEP EDITOR (Flex-1) */}
        {/* ========================================================================= */}
        <main
          className={`
            flex-1 flex flex-col overflow-y-auto
            ${mobileDetailOpen ? 'flex' : 'hidden lg:flex'}
            ${bgWorkspace}
          `}
        >
          {/* Mobile Back Button */}
          <div className={`lg:hidden p-3 border-b flex items-center justify-between ${bgHeader}`}>
            <button
              onClick={() => setMobileDetailOpen(false)}
              className="inline-flex items-center gap-1.5 text-xs text-[#16377e] font-bold font-prompt"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>กลับสู่รายการ</span>
            </button>
            <button
              onClick={() => handleOpenCreateDrawer(activeMenu)}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>เพิ่มใหม่</span>
            </button>
          </div>

          <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-5xl w-full mx-auto space-y-6">
            {/* ------------------------------------------------------------- */}
            {/* PANE 3: INCIDENT DETAIL */}
            {/* ------------------------------------------------------------- */}
            {activeMenu === 'incidents' && selectedIncident && (
              <div className={`rounded-3xl border p-6 sm:p-8 space-y-6 ${cardBg}`}>
                <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b ${isLight ? 'border-slate-200' : 'border-blue-900/60'}`}>
                  <div>
                    <span className="text-xs font-mono font-bold text-blue-700">
                      เลขที่แจ้งเหตุ: {selectedIncident.incident_number}
                    </span>
                    <h3 className={`text-xl sm:text-2xl font-black mt-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      {selectedIncident.caller_name}
                    </h3>
                    <p className={`text-xs font-sarabun mt-0.5 ${isLight ? 'text-slate-500' : 'text-blue-300'}`}>
                      เวลาแจ้ง: {new Date(selectedIncident.reported_at).toLocaleString('th-TH')}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={() => onUpdateIncidentStatus(selectedIncident.id, 'en_route', 'ประจิม 01')}
                      className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer transition-colors min-h-[38px]"
                    >
                      สั่งการออกเหตุ
                    </button>
                    <button
                      onClick={() => onUpdateIncidentStatus(selectedIncident.id, 'on_scene')}
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs cursor-pointer transition-colors min-h-[38px]"
                    >
                      ถึงที่เกิดเหตุ
                    </button>
                    <button
                      onClick={() => onUpdateIncidentStatus(selectedIncident.id, 'resolved')}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer transition-colors min-h-[38px]"
                    >
                      เสร็จสิ้นภารกิจ
                    </button>
                    <button
                      onClick={() => onDeleteIncident(selectedIncident.id)}
                      className="p-2 rounded-xl bg-red-100 hover:bg-red-200 text-red-700 border border-red-300 cursor-pointer transition-colors min-h-[38px]"
                      title="ลบเหตุการณ์"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-2xl border space-y-2 ${cardSubBg}`}>
                    <h5 className="text-xs font-bold text-blue-700">ข้อมูลผู้แจ้งและเบอร์ติดต่อ</h5>
                    <div className={`flex items-center gap-2 text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      <PhoneCall className="w-4 h-4 text-emerald-600" />
                      <a href={`tel:${selectedIncident.caller_phone}`} className="hover:underline font-mono">
                        {selectedIncident.caller_phone}
                      </a>
                    </div>
                    <p className={`text-xs font-sarabun ${isLight ? 'text-slate-600' : 'text-blue-200'}`}>ผู้แจ้ง: {selectedIncident.caller_name}</p>
                  </div>

                  <div className={`p-4 rounded-2xl border space-y-2 ${cardSubBg}`}>
                    <h5 className="text-xs font-bold text-blue-700">สถานที่เกิดเหตุ</h5>
                    <div className={`flex items-center gap-2 text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      <MapPin className="w-4 h-4 text-red-600" />
                      <span>{selectedIncident.location_name}</span>
                    </div>
                    <p className={`text-xs font-sarabun ${isLight ? 'text-slate-600' : 'text-blue-200'}`}>
                      {selectedIncident.district} {selectedIncident.province}
                    </p>
                  </div>
                </div>

                <div className={`p-4 rounded-2xl border ${cardSubBg}`}>
                  <h5 className="text-xs font-bold text-blue-700 mb-1.5">รายละเอียดเหตุการณ์</h5>
                  <p className={`text-sm font-sarabun leading-relaxed break-words ${isLight ? 'text-slate-700' : 'text-slate-200'}`}>
                    {selectedIncident.details || 'ไม่มีรายละเอียดเพิ่มเติม'}
                  </p>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* PANE 3: MISSIONS DETAIL & ACTION */}
            {/* ------------------------------------------------------------- */}
            {activeMenu === 'missions' && selectedMission && (
              <div className={`rounded-3xl border p-6 sm:p-8 space-y-6 ${cardBg}`}>
                <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b ${isLight ? 'border-slate-200' : 'border-blue-900/60'}`}>
                  <div>
                    <span className="text-xs font-mono font-bold text-blue-700">
                      วันที่: {selectedMission.incident_date}
                    </span>
                    <h3 className={`text-xl font-bold mt-0.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>{selectedMission.title}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenCreateDrawer('missions')}
                      className="px-4 py-2 rounded-xl bg-[#16377e] hover:bg-[#0f2452] text-white font-bold text-xs cursor-pointer min-h-[38px]"
                    >
                      + เพิ่มภารกิจใหม่
                    </button>
                    <button
                      onClick={() => onDeleteMission(selectedMission.id)}
                      className="p-2 rounded-xl bg-red-100 hover:bg-red-200 text-red-700 border border-red-300 min-h-[38px]"
                      title="ลบภารกิจ"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="relative h-64 rounded-2xl overflow-hidden bg-cover bg-center border border-slate-200" style={{ backgroundImage: `url(${selectedMission.cover_image_url})` }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                    <span className="text-xs text-white font-sarabun font-bold">{selectedMission.location}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className={`p-4 rounded-2xl border ${cardSubBg}`}>
                    <span className="text-xs font-bold text-blue-700 mb-1 block">สรุปย่อภารกิจ</span>
                    <p className={`text-sm font-sarabun leading-relaxed break-words ${isLight ? 'text-slate-700' : 'text-slate-200'}`}>{selectedMission.summary}</p>
                  </div>
                  {selectedMission.details && (
                    <div className={`p-4 rounded-2xl border ${cardSubBg}`}>
                      <span className="text-xs font-bold text-blue-700 mb-1 block">รายละเอียดการปฏิบัติงาน</span>
                      <p className={`text-sm font-sarabun leading-relaxed whitespace-pre-line break-words ${isLight ? 'text-slate-700' : 'text-slate-200'}`}>{selectedMission.details}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* PANE 3: NEWS DETAIL & ACTION */}
            {/* ------------------------------------------------------------- */}
            {activeMenu === 'news' && selectedNews && (
              <div className={`rounded-3xl border p-6 sm:p-8 space-y-6 ${cardBg}`}>
                <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b ${isLight ? 'border-slate-200' : 'border-blue-900/60'}`}>
                  <div>
                    <span className="text-xs font-mono font-bold text-blue-700">
                      เผยแพร่: {selectedNews.published_date}
                    </span>
                    <h3 className={`text-xl font-bold mt-0.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>{selectedNews.title}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenCreateDrawer('news')}
                      className="px-4 py-2 rounded-xl bg-[#16377e] hover:bg-[#0f2452] text-white font-bold text-xs cursor-pointer min-h-[38px]"
                    >
                      + เพิ่มข่าวใหม่
                    </button>
                    <button
                      onClick={() => onDeleteNews(selectedNews.id)}
                      className="p-2 rounded-xl bg-red-100 hover:bg-red-200 text-red-700 border border-red-300 min-h-[38px]"
                      title="ลบข่าว"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="relative h-64 rounded-2xl overflow-hidden bg-cover bg-center border border-slate-200" style={{ backgroundImage: `url(${selectedNews.cover_image_url})` }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                    <span className="text-xs text-white font-sarabun font-bold">{selectedNews.author_name}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className={`p-4 rounded-2xl border ${cardSubBg}`}>
                    <span className="text-xs font-bold text-blue-700 mb-1 block">สรุปย่อข่าวสาร</span>
                    <p className={`text-sm font-sarabun leading-relaxed break-words ${isLight ? 'text-slate-700' : 'text-slate-200'}`}>{selectedNews.summary}</p>
                  </div>
                  <div className={`p-4 rounded-2xl border ${cardSubBg}`}>
                    <span className="text-xs font-bold text-blue-700 mb-1 block">เนื้อหาข่าวฉบับเต็ม</span>
                    <p className={`text-sm font-sarabun leading-relaxed whitespace-pre-line break-words ${isLight ? 'text-slate-700' : 'text-slate-200'}`}>{selectedNews.content}</p>
                  </div>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* PANE 3: FLEET DETAIL & ACTION */}
            {/* ------------------------------------------------------------- */}
            {activeMenu === 'fleet' && selectedFleetItem && (
              <div className={`rounded-3xl border p-6 sm:p-8 space-y-6 ${cardBg}`}>
                <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b ${isLight ? 'border-slate-200' : 'border-blue-900/60'}`}>
                  <div>
                    <span className="text-xs font-mono font-bold text-blue-700">{selectedFleetItem.call_sign}</span>
                    <h3 className={`text-xl font-bold mt-0.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>{selectedFleetItem.name_th}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        onUpdateFleetStatus(
                          selectedFleetItem.id,
                          selectedFleetItem.status === 'available' ? 'dispatched' : 'available'
                        )
                      }
                      className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all min-h-[38px] ${
                        selectedFleetItem.status === 'available'
                          ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                          : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                      }`}
                    >
                      {selectedFleetItem.status === 'available' ? 'สลับเป็น: ออกเหตุ' : 'สลับเป็น: พร้อมออกเหตุ'}
                    </button>
                    <button
                      onClick={() => handleOpenCreateDrawer('fleet')}
                      className="px-4 py-2 rounded-xl bg-[#16377e] hover:bg-[#0f2452] text-white font-bold text-xs cursor-pointer min-h-[38px]"
                    >
                      + เพิ่มรถ/อุปกรณ์
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-2xl border ${cardSubBg}`}>
                    <span className="text-xs font-bold text-blue-700">ทะเบียนรถ / รหัสประจำการ</span>
                    <p className={`text-base font-mono font-bold mt-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      {selectedFleetItem.plate_number || 'ประจำศูนย์ใหญ่'}
                    </p>
                  </div>
                  <div className={`p-4 rounded-2xl border ${cardSubBg}`}>
                    <span className="text-xs font-bold text-blue-700">จุดประจำการ</span>
                    <p className={`text-sm font-sarabun mt-1 ${isLight ? 'text-slate-800' : 'text-white'}`}>{selectedFleetItem.location_base}</p>
                  </div>
                </div>

                <div className={`p-4 rounded-2xl border ${cardSubBg}`}>
                  <span className="text-xs font-bold text-blue-700 mb-1.5 block">
                    ข้อมูลจำเพาะและอุปกรณ์ประจำรถ
                  </span>
                  <p className={`text-sm font-sarabun leading-relaxed break-words ${isLight ? 'text-slate-700' : 'text-slate-200'}`}>
                    {selectedFleetItem.specifications}
                  </p>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* PANE 3: OFFICERS DETAIL & ACTION */}
            {/* ------------------------------------------------------------- */}
            {activeMenu === 'officers' && selectedOfficer && (
              <div className={`rounded-3xl border p-6 sm:p-8 space-y-6 ${cardBg}`}>
                <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b ${isLight ? 'border-slate-200' : 'border-blue-900/60'}`}>
                  <div>
                    <span className="text-xs font-mono font-bold text-blue-700">{selectedOfficer.officer_code}</span>
                    <h3 className={`text-xl font-bold mt-0.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>{selectedOfficer.full_name}</h3>
                    <p className={`text-xs font-sarabun ${isLight ? 'text-slate-600' : 'text-blue-300'}`}>{selectedOfficer.role_title}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onToggleOfficerDuty(selectedOfficer.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all min-h-[38px] ${
                        selectedOfficer.is_on_duty
                          ? 'bg-slate-200 hover:bg-slate-300 text-slate-800'
                          : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                      }`}
                    >
                      {selectedOfficer.is_on_duty ? 'สลับเป็น: พักเวร' : 'สลับเป็น: เข้าเวรปฏิบัติการ'}
                    </button>
                    <button
                      onClick={() => handleOpenCreateDrawer('officers')}
                      className="px-4 py-2 rounded-xl bg-[#16377e] hover:bg-[#0f2452] text-white font-bold text-xs cursor-pointer min-h-[38px]"
                    >
                      + เพิ่มจนท.
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-2xl border ${cardSubBg}`}>
                    <span className="text-xs font-bold text-blue-700">เบอร์โทรศัพท์ติดต่อ</span>
                    <p className={`text-base font-mono font-bold mt-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>{selectedOfficer.phone || '061-119-3342'}</p>
                  </div>
                  <div className={`p-4 rounded-2xl border ${cardSubBg}`}>
                    <span className="text-xs font-bold text-blue-700">สถานีประจำการ</span>
                    <p className={`text-sm font-sarabun mt-1 ${isLight ? 'text-slate-800' : 'text-white'}`}>{selectedOfficer.station_base}</p>
                  </div>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* PANE 3: SITE CONFIG & HOTLINES */}
            {/* ------------------------------------------------------------- */}
            {activeMenu === 'site_config' && (
              <div className={`rounded-3xl border p-6 sm:p-8 space-y-6 ${cardBg}`}>
                <div className={`pb-4 border-b ${isLight ? 'border-slate-200' : 'border-blue-900/60'}`}>
                  <h3 className={`text-xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    🌐 จัดการข้อมูลองค์กร ช่องวิทยุสื่อสาร & โซเชียลมีเดีย
                  </h3>
                  <p className={`text-xs font-sarabun mt-1 ${isLight ? 'text-slate-600' : 'text-blue-300'}`}>
                    ปรับแก้เบอร์โทรศัพท์สายด่วน ความถี่วิทยุ บัญชีรับบริจาค และข้อมูลองค์พ่อปู่จูมคำ
                  </p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    onUpdateSiteConfig(configForm);
                  }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isLight ? 'text-slate-700' : 'text-blue-200'}`}>
                        เบอร์โทรสายด่วนฉุกเฉิน (Primary Hotline)
                      </label>
                      <input
                        value={configForm.hotline_primary}
                        onChange={(e) => setConfigForm({ ...configForm, hotline_primary: e.target.value })}
                        className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none font-mono font-bold ${
                          isLight ? 'bg-white border-slate-300 text-slate-900 focus:border-[#16377e]' : 'bg-blue-950/60 border-blue-800 text-white focus:border-amber-400'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isLight ? 'text-slate-700' : 'text-blue-200'}`}>
                        ช่องความถี่วิทยุสื่อสาร
                      </label>
                      <input
                        value={configForm.radio_frequency}
                        onChange={(e) => setConfigForm({ ...configForm, radio_frequency: e.target.value })}
                        className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none font-mono ${
                          isLight ? 'bg-white border-slate-300 text-slate-900 focus:border-[#16377e]' : 'bg-blue-950/60 border-blue-800 text-white focus:border-amber-400'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isLight ? 'text-slate-700' : 'text-blue-200'}`}>
                        ชื่อสมาคมทางการ
                      </label>
                      <input
                        value={configForm.association_name}
                        onChange={(e) => setConfigForm({ ...configForm, association_name: e.target.value })}
                        className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none ${
                          isLight ? 'bg-white border-slate-300 text-slate-900 focus:border-[#16377e]' : 'bg-blue-950/60 border-blue-800 text-white focus:border-amber-400'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isLight ? 'text-slate-700' : 'text-blue-200'}`}>
                        คำขวัญ/วิสัยทัศน์
                      </label>
                      <input
                        value={configForm.slogan}
                        onChange={(e) => setConfigForm({ ...configForm, slogan: e.target.value })}
                        className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none font-sarabun ${
                          isLight ? 'bg-white border-slate-300 text-slate-900 focus:border-[#16377e]' : 'bg-blue-950/60 border-blue-800 text-white focus:border-amber-400'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isLight ? 'text-slate-700' : 'text-blue-200'}`}>ธนาคารรับบริจาค</label>
                      <input
                        value={configForm.bank_name}
                        onChange={(e) => setConfigForm({ ...configForm, bank_name: e.target.value })}
                        className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none ${
                          isLight ? 'bg-white border-slate-300 text-slate-900 focus:border-[#16377e]' : 'bg-blue-950/60 border-blue-800 text-white focus:border-amber-400'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isLight ? 'text-slate-700' : 'text-blue-200'}`}>เลขที่บัญชี</label>
                      <input
                        value={configForm.bank_account_number}
                        onChange={(e) => setConfigForm({ ...configForm, bank_account_number: e.target.value })}
                        className={`w-full px-4 py-2.5 border rounded-xl text-sm font-mono focus:outline-none ${
                          isLight ? 'bg-white border-slate-300 text-slate-900 focus:border-[#16377e]' : 'bg-blue-950/60 border-blue-800 text-white focus:border-amber-400'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isLight ? 'text-slate-700' : 'text-blue-200'}`}>พร้อมเพย์</label>
                      <input
                        value={configForm.promptpay_id}
                        onChange={(e) => setConfigForm({ ...configForm, promptpay_id: e.target.value })}
                        className={`w-full px-4 py-2.5 border rounded-xl text-sm font-mono focus:outline-none ${
                          isLight ? 'bg-white border-slate-300 text-slate-900 focus:border-[#16377e]' : 'bg-blue-950/60 border-blue-800 text-white focus:border-amber-400'
                        }`}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-[#16377e] hover:bg-[#0f2452] text-white font-bold text-sm shadow-md transition-all cursor-pointer min-h-[44px]"
                  >
                    💾 บันทึกการตั้งค่าองค์กรขึ้น Supabase
                  </button>
                </form>
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* PANE 3: SETTINGS & PASSWORD */}
            {/* ------------------------------------------------------------- */}
            {activeMenu === 'settings' && (
              <div className={`rounded-3xl border p-6 sm:p-8 space-y-6 ${cardBg}`}>
                <div className={`pb-4 border-b ${isLight ? 'border-slate-200' : 'border-blue-900/60'}`}>
                  <h3 className={`text-xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>⚙️ ความปลอดภัยและการสำรองข้อมูล</h3>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (newPassInput !== confirmPassInput) {
                      alert('รหัสผ่านใหม่และการยืนยันไม่ตรงกัน');
                      return;
                    }
                    onUpdatePassword(currentPassInput, newPassInput);
                    setCurrentPassInput('');
                    setNewPassInput('');
                    setConfirmPassInput('');
                  }}
                  className="space-y-4 max-w-md"
                >
                  <h4 className="text-sm font-bold text-blue-700">เปลี่ยนรหัสผ่านผู้ดูแลระบบ</h4>
                  <div>
                    <label className={`block text-xs font-bold mb-1 ${isLight ? 'text-slate-700' : 'text-blue-200'}`}>รหัสผ่านปัจจุบัน</label>
                    <input
                      type="password"
                      required
                      value={currentPassInput}
                      onChange={(e) => setCurrentPassInput(e.target.value)}
                      className={`w-full px-4 py-2.5 border rounded-xl text-sm font-mono ${
                        isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-blue-950/60 border-blue-800 text-white'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-bold mb-1 ${isLight ? 'text-slate-700' : 'text-blue-200'}`}>รหัสผ่านใหม่</label>
                    <input
                      type="password"
                      required
                      value={newPassInput}
                      onChange={(e) => setNewPassInput(e.target.value)}
                      className={`w-full px-4 py-2.5 border rounded-xl text-sm font-mono ${
                        isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-blue-950/60 border-blue-800 text-white'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-bold mb-1 ${isLight ? 'text-slate-700' : 'text-blue-200'}`}>ยืนยันรหัสผ่านใหม่</label>
                    <input
                      type="password"
                      required
                      value={confirmPassInput}
                      onChange={(e) => setConfirmPassInput(e.target.value)}
                      className={`w-full px-4 py-2.5 border rounded-xl text-sm font-mono ${
                        isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-blue-950/60 border-blue-800 text-white'
                      }`}
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#16377e] hover:bg-[#0f2452] text-white font-bold text-xs shadow-md transition-all cursor-pointer min-h-[40px]"
                  >
                    เปลี่ยนรหัสผ่าน
                  </button>
                </form>

                <div className={`pt-6 border-t space-y-3 ${isLight ? 'border-slate-200' : 'border-blue-900/60'}`}>
                  <h4 className="text-sm font-bold text-red-600">รีเซ็ตระบบ (Factory Reset)</h4>
                  <p className={`text-xs font-sarabun ${isLight ? 'text-slate-600' : 'text-blue-200'}`}>
                    การรีเซ็ตจะคืนค่าข้อมูลทั้งหมดกลับสู่สถานะเริ่มต้นของหน่วยกู้ภัยประจิม
                  </p>
                  <button
                    onClick={() => {
                      if (confirm('คุณต้องการรีเซ็ตข้อมูลทั้งหมดกลับสู่ค่าเริ่มต้นใช่หรือไม่?')) {
                        onResetToDefault();
                      }
                    }}
                    className="px-4 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-300 text-xs font-bold cursor-pointer transition-colors min-h-[40px]"
                  >
                    ⚠️ รีเซ็ตข้อมูลทั้งหมดเป็นค่าเริ่มต้น
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* ========================================================================= */}
      {/* RIGHT SLIDE-OVER DRAWER (For adding & editing items on desktop & mobile) */}
      {/* ========================================================================= */}
      {isSlideDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          {/* Backdrop Blur Overlay */}
          <div
            onClick={() => setIsSlideDrawerOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
          />

          {/* Slide-over Right Sheet */}
          <div className={`relative w-full max-w-xl border-l-2 shadow-2xl z-10 flex flex-col h-full overflow-hidden transform transition-transform duration-300 ease-out animate-in slide-in-from-right ${isLight ? 'bg-white border-[#16377e]' : 'bg-[#081538] border-amber-400'}`}>
            {/* Drawer Header */}
            <div className={`p-5 border-b flex items-center justify-between ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#060e24] border-blue-900/60'}`}>
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${isLight ? 'bg-[#16377e] text-white' : 'bg-amber-400 text-slate-950'}`}>
                  <Plus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {slideDrawerModule === 'missions' && 'เพิ่มบันทึกภารกิจปฏิบัติการใหม่'}
                    {slideDrawerModule === 'news' && 'เผยแพร่ข่าวสารประชาสัมพันธ์ใหม่'}
                    {slideDrawerModule === 'fleet' && 'เพิ่มยานพาหนะหรืออุปกรณ์กู้ชีพใหม่'}
                    {slideDrawerModule === 'officers' && 'เพิ่มเจ้าหน้าที่กู้ภัยใหม่'}
                    {slideDrawerModule === 'categories' && 'เพิ่มหมวดหมู่งานกู้ภัยใหม่'}
                    {slideDrawerModule === 'hero_slides' && 'เพิ่มสไลด์แบนเนอร์หน้าแรก'}
                    {slideDrawerModule === 'incidents' && 'รับแจ้งเหตุฉุกเฉินด่วน (Admin Quick Dispatch)'}
                  </h3>
                  <span className="text-[11px] text-blue-600 font-mono font-bold">
                    SLIDE-IN DRAWER • REALTIME SUPABASE SYNC
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsSlideDrawerOpen(false)}
                className={`p-2 rounded-full transition-colors cursor-pointer ${isLight ? 'text-slate-500 hover:bg-slate-200' : 'text-slate-400 hover:text-white hover:bg-white/10'}`}
                title="ปิดหน้าต่างสไลด์"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Scrollable Body Form */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 scrollbar-thin">
              {/* FORM: MISSIONS */}
              {slideDrawerModule === 'missions' && (
                <form
                  id="drawer-mission-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const title = (form.elements.namedItem('m_title') as HTMLInputElement).value;
                    const location = (form.elements.namedItem('m_location') as HTMLInputElement).value;
                    const catSlug = (form.elements.namedItem('m_cat') as HTMLSelectElement).value;
                    const summary = (form.elements.namedItem('m_summary') as HTMLTextAreaElement).value;
                    const details = (form.elements.namedItem('m_details') as HTMLTextAreaElement).value;
                    const cover = (form.elements.namedItem('m_cover') as HTMLInputElement).value;

                    onAddMission({
                      title,
                      location,
                      district: 'บรบือ',
                      incident_date: new Date().toISOString().split('T')[0],
                      category_slug: catSlug,
                      summary,
                      details,
                      cover_image_url: cover,
                      is_featured: true,
                      officer_count: 4,
                    });
                    setIsSlideDrawerOpen(false);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">หัวข้อภารกิจ</label>
                    <input
                      name="m_title"
                      required
                      placeholder="เช่น ช่วยเหลือผู้ประสบอุบัติเหตุทางถนน บริเวณแยกบรบือ"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:border-[#16377e] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">หมวดหมู่</label>
                      <select
                        name="m_cat"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:border-[#16377e] focus:outline-none"
                      >
                        {categories.map((c) => (
                          <option key={c.slug} value={c.slug}>
                            {c.name_th}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">สถานที่เกิดเหตุ</label>
                      <input
                        name="m_location"
                        required
                        placeholder="ต.บรบือ อ.บรบือ จ.มหาสารคาม"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:border-[#16377e] focus:outline-none font-sarabun"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">รูปภาพหน้าปกภารกิจ (URL)</label>
                    <input
                      name="m_cover"
                      required
                      defaultValue="https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=1200&q=80"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-xs font-mono focus:border-[#16377e] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">สรุปย่อผลการปฏิบัติงาน</label>
                    <textarea
                      name="m_summary"
                      rows={2}
                      required
                      placeholder="สรุปย่อเหตุการณ์และการให้ความช่วยเหลือ..."
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:border-[#16377e] focus:outline-none font-sarabun"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">รายละเอียดเชิงลึก</label>
                    <textarea
                      name="m_details"
                      rows={4}
                      placeholder="บันทึกขั้นตอนการใช้อุปกรณ์ตัด-ถ่าง การปฐมพยาบาล และการนำส่งโรงพยาบาล..."
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:border-[#16377e] focus:outline-none font-sarabun"
                    />
                  </div>
                </form>
              )}

              {/* FORM: FLEET */}
              {slideDrawerModule === 'fleet' && (
                <form
                  id="drawer-fleet-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const callSign = (form.elements.namedItem('f_callsign') as HTMLInputElement).value;
                    const nameTh = (form.elements.namedItem('f_name') as HTMLInputElement).value;
                    const plate = (form.elements.namedItem('f_plate') as HTMLInputElement).value;
                    const base = (form.elements.namedItem('f_base') as HTMLInputElement).value;
                    const specs = (form.elements.namedItem('f_specs') as HTMLTextAreaElement).value;

                    if (onAddFleetItem) {
                      onAddFleetItem({
                        call_sign: callSign,
                        name_th: nameTh,
                        equipment_type: 'ambulance_ems',
                        status: 'available',
                        plate_number: plate,
                        location_base: base,
                        specifications: specs,
                      });
                    }
                    setIsSlideDrawerOpen(false);
                  }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">รหัสเรียกขาน</label>
                      <input
                        name="f_callsign"
                        required
                        placeholder="เช่น ประจิม 05"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm font-mono focus:border-[#16377e] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">ทะเบียนรถ</label>
                      <input
                        name="f_plate"
                        placeholder="เช่น กข-1234 มค"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm font-mono focus:border-[#16377e] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">ขื่อยานพาหนะ/อุปกรณ์</label>
                    <input
                      name="f_name"
                      required
                      placeholder="เช่น รถพยาบาลกู้ชีพฉุกเฉินระดับสูง (Advanced ALS)"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:border-[#16377e] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">จุดประจำการ</label>
                    <input
                      name="f_base"
                      defaultValue="ศูนย์ใหญ่บรบือ ถนนแจ้งสนิท"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:border-[#16377e] focus:outline-none font-sarabun"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">ข้อมูลจำเพาะและอุปกรณ์ประจำรถ</label>
                    <textarea
                      name="f_specs"
                      rows={3}
                      placeholder="เครื่องกระตุกหัวใจ AED, ชุดถังออกซิเจน 6,000L, บอร์ดดามหลัง Spinal Board..."
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:border-[#16377e] focus:outline-none font-sarabun"
                    />
                  </div>
                </form>
              )}

              {/* FORM: OFFICERS */}
              {slideDrawerModule === 'officers' && (
                <form
                  id="drawer-officer-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const code = (form.elements.namedItem('o_code') as HTMLInputElement).value;
                    const name = (form.elements.namedItem('o_name') as HTMLInputElement).value;
                    const role = (form.elements.namedItem('o_role') as HTMLInputElement).value;
                    const phone = (form.elements.namedItem('o_phone') as HTMLInputElement).value;
                    const station = (form.elements.namedItem('o_station') as HTMLInputElement).value;

                    if (onAddOfficer) {
                      onAddOfficer({
                        officer_code: code,
                        full_name: name,
                        role_title: role,
                        phone: phone || '061-119-3342',
                        station_base: station,
                        is_on_duty: true,
                        joined_date: new Date().toISOString().split('T')[0],
                      });
                    }
                    setIsSlideDrawerOpen(false);
                  }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">รหัสเจ้าหน้าที่</label>
                      <input
                        name="o_code"
                        required
                        placeholder="เช่น PCM-05"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm font-mono focus:border-[#16377e] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">เบอร์โทรศัพท์</label>
                      <input
                        name="o_phone"
                        defaultValue="061-119-3342"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm font-mono focus:border-[#16377e] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">ชื่อ-นามสกุล</label>
                    <input
                      name="o_name"
                      required
                      placeholder="เช่น นายสมชาย ใจกล้า"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:border-[#16377e] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">ตำแหน่งหน้าที่</label>
                    <input
                      name="o_role"
                      required
                      placeholder="เช่น เจ้าหน้าที่กู้ชีพฉุกเฉิน (EMT-B) / ผู้ช่วยนักประดาน้ำ"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:border-[#16377e] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">สถานีประจำการ</label>
                    <input
                      name="o_station"
                      defaultValue="ศูนย์ใหญ่บรบือ"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:border-[#16377e] focus:outline-none font-sarabun"
                    />
                  </div>
                </form>
              )}

              {/* FORM: NEWS */}
              {slideDrawerModule === 'news' && (
                <form
                  id="drawer-news-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const title = (form.elements.namedItem('n_title') as HTMLInputElement).value;
                    const summary = (form.elements.namedItem('n_summary') as HTMLTextAreaElement).value;
                    const content = (form.elements.namedItem('n_content') as HTMLTextAreaElement).value;
                    const cover = (form.elements.namedItem('n_cover') as HTMLInputElement).value;

                    onAddNews({
                      title,
                      summary,
                      content,
                      cover_image_url: cover,
                      published_date: new Date().toISOString().split('T')[0],
                      is_pinned: false,
                      author_name: 'ศูนย์ประชาสัมพันธ์ สมาคมประจิมสารคาม',
                    });
                    setIsSlideDrawerOpen(false);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">หัวข้อข่าวประชาสัมพันธ์</label>
                    <input
                      name="n_title"
                      required
                      placeholder="เช่น ประกาศแจ้งเตือนสภาพอากาศ และการเฝ้าระวังอุบัติเหตุ"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:border-[#16377e] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">รูปภาพข่าว (URL)</label>
                    <input
                      name="n_cover"
                      required
                      defaultValue="https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=1200&q=80"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-xs font-mono focus:border-[#16377e] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">สรุปย่อ</label>
                    <textarea
                      name="n_summary"
                      rows={2}
                      required
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:border-[#16377e] focus:outline-none font-sarabun"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">เนื้อหาข่าวฉบับเต็ม</label>
                    <textarea
                      name="n_content"
                      rows={4}
                      required
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:border-[#16377e] focus:outline-none font-sarabun"
                    />
                  </div>
                </form>
              )}
            </div>

            {/* Drawer Footer */}
            <div className={`p-4 border-t flex items-center justify-end gap-3 shrink-0 ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#060e24] border-blue-900/60'}`}>
              <button
                type="button"
                onClick={() => setIsSlideDrawerOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold transition-colors cursor-pointer min-h-[40px]"
              >
                ยกเลิก
              </button>
              <button
                type="submit"
                form={
                  slideDrawerModule === 'missions'
                    ? 'drawer-mission-form'
                    : slideDrawerModule === 'fleet'
                    ? 'drawer-fleet-form'
                    : slideDrawerModule === 'officers'
                    ? 'drawer-officer-form'
                    : 'drawer-news-form'
                }
                className="px-6 py-2.5 rounded-xl bg-[#16377e] hover:bg-[#0f2452] text-white text-xs font-bold shadow-md transition-all cursor-pointer min-h-[40px]"
              >
                💾 บันทึกข้อมูลขึ้นระบบ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
