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
  // Login State
  const [enteredUsername, setEnteredUsername] = useState('0611193342');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // 3-Pane Navigation Active States
  const [activeMenu, setActiveMenu] = useState<
    'incidents' | 'missions' | 'news' | 'fleet' | 'officers' | 'categories' | 'hero_slides' | 'site_config' | 'settings'
  >('incidents');

  // Selected Item IDs in Pane 2 (Master List)
  const [selectedIncidentId, setSelectedIncidentId] = useState<string | null>(incidents[0]?.id || null);
  const [selectedMissionId, setSelectedMissionId] = useState<string | null>(missions[0]?.id || null);
  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(news[0]?.id || null);
  const [selectedFleetId, setSelectedFleetId] = useState<string | null>(fleet[0]?.id || null);
  const [selectedOfficerId, setSelectedOfficerId] = useState<string | null>(officers[0]?.id || null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(categories[0]?.id || null);
  const [selectedSlideId, setSelectedSlideId] = useState<string | null>(heroSlides[0]?.id || null);

  // Search & Filter
  const [searchTerm, setSearchTerm] = useState('');
  const [incidentFilter, setIncidentFilter] = useState<'all' | 'pending' | 'dispatched' | 'en_route' | 'on_scene' | 'resolved'>('all');

  // Mobile Drilldown Mode (list vs detail)
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Creating Mode State
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  // Password Update Form State
  const [currentPassInput, setCurrentPassInput] = useState('');
  const [newPassInput, setNewPassInput] = useState('');
  const [confirmPassInput, setConfirmPassInput] = useState('');

  // Site Config Edit State
  const [configForm, setConfigForm] = useState<SiteConfig>(siteConfig);

  // Handle Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    const success = onLogin(enteredUsername, enteredPassword);
    if (!success) {
      setPasswordError('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง (ค่าเริ่มต้น 0611193342 / @0611193342)');
    }
  };

  // If Not Logged In, Show Secure Login Screen
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#060e22] via-[#0c1c42] to-[#060e22] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-amber-400/40 p-8 sm:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
          <div className="text-center mb-8">
            <div className="inline-block p-3 rounded-full bg-blue-50 border border-blue-200 shadow-sm mb-4">
              <OfficialLogo size={64} withGlow={true} />
            </div>
            <h2 className="text-2xl font-black text-slate-900 font-prompt tracking-tight">
              ศูนย์สั่งการและจัดการระบบ (CMS)
            </h2>
            <p className="text-xs text-slate-600 font-sarabun mt-1">
              หน่วยกู้ภัยประจิม (สมาคมประจิมสารคาม พุทธศาสตร์สงเคราะห์)
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 font-prompt mb-1.5">
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
              <label className="block text-xs font-bold text-slate-700 font-prompt mb-1.5">
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
              className="w-full py-3.5 bg-gradient-to-r from-[#16377e] to-[#0a193b] hover:from-[#1b4396] hover:to-[#0f2452] text-white font-bold rounded-2xl shadow-md text-sm font-prompt transition-all cursor-pointer border border-amber-400/50 min-h-[44px]"
            >
              เข้าสู่ระบบศูนย์สั่งการ
            </button>

            <button
              type="button"
              onClick={onBackToHome}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-2xl text-xs font-prompt transition-colors cursor-pointer"
            >
              ← กลับสู่หน้าเว็บไซต์หลัก
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Active Pending Count
  const pendingCount = incidents.filter((i) => i.status === 'pending').length;

  // Menu Definitions (Pane 1)
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

  // Filtered Master List Data (Pane 2)
  const filteredIncidents = incidents.filter((inc) => {
    const matchSearch =
      inc.incident_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inc.caller_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inc.location_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inc.details?.toLowerCase().includes(searchTerm.toLowerCase());
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

  // Currently Selected Detail Objects (Pane 3)
  const selectedIncident = incidents.find((i) => i.id === selectedIncidentId) || incidents[0];
  const selectedMission = missions.find((m) => m.id === selectedMissionId) || missions[0];
  const selectedNews = news.find((n) => n.id === selectedNewsId) || news[0];
  const selectedFleetItem = fleet.find((f) => f.id === selectedFleetId) || fleet[0];
  const selectedOfficer = officers.find((o) => o.id === selectedOfficerId) || officers[0];
  const selectedCategory = categories.find((c) => c.id === selectedCategoryId) || categories[0];
  const selectedSlide = heroSlides.find((s) => s.id === selectedSlideId) || heroSlides[0];

  return (
    <div className="h-screen w-screen flex flex-col bg-slate-900 text-slate-100 font-prompt overflow-hidden selection:bg-red-600 selection:text-white">
      {/* 1. Global Top Navigation Header */}
      <header className="h-14 bg-[#08132b] border-b border-blue-900/60 px-4 flex items-center justify-between shrink-0 z-30">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="lg:hidden p-2 rounded-xl text-blue-200 hover:bg-blue-900/60 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2.5">
            <OfficialLogo size={34} withGlow={true} />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white leading-tight font-prompt hidden sm:inline">
                หน่วยกู้ภัยประจิม (สมาคมประจิมสารคาม)
              </span>
              <span className="text-xs font-bold text-white leading-tight font-prompt sm:hidden">
                กู้ภัยประจิม CMS
              </span>
              <span className="text-[10px] text-blue-300 font-mono">
                DISPATCH WORKSPACE 3.0 • User: {currentAdminUser}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onTestSoundAlert}
            title="ทดสอบสัญญาณเสียงฉุกเฉิน"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-950 hover:bg-blue-900 text-amber-300 text-xs font-semibold border border-amber-400/40 transition-colors cursor-pointer"
          >
            <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="hidden md:inline">ทดสอบไซเรน</span>
          </button>

          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>หน้าเว็บไซต์</span>
          </button>

          <button
            onClick={onLogout}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-colors cursor-pointer"
          >
            <span>ออกจากระบบ</span>
          </button>
        </div>
      </header>

      {/* 2. Main 3-Pane Body Layout */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* ========================================================================= */}
        {/* PANE 1: LEFT SIDEBAR NAVIGATION (Width: 260px on Desktop) */}
        {/* ========================================================================= */}
        <aside
          className={`
            fixed lg:static inset-y-0 left-0 z-40 w-64 bg-[#0a1738] border-r border-blue-900/60 flex flex-col shrink-0 transition-transform duration-300 ease-in-out
            ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
        >
          <div className="p-4 border-b border-blue-900/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono">
                SUPABASE CONNECTED
              </span>
            </div>
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white p-1"
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
                    setIsCreatingNew(false);
                    setMobileDetailOpen(false);
                    setMobileSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-semibold font-prompt transition-all cursor-pointer group
                    ${
                      isActive
                        ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                        : 'text-blue-200/90 hover:bg-blue-900/40 hover:text-white'
                    }
                  `}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-slate-950' : 'text-blue-400 group-hover:text-amber-300'}`} />
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
                            ? 'bg-slate-950/20 text-slate-950'
                            : 'bg-blue-950/80 text-blue-300 border border-blue-800/60'
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

          <div className="p-3 border-t border-blue-900/50 bg-black/20 space-y-2">
            <button
              onClick={onExportData}
              className="w-full py-2 px-3 rounded-xl bg-blue-950/80 hover:bg-blue-900 text-blue-200 text-xs font-semibold flex items-center justify-center gap-2 border border-blue-800/50 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>สำรองข้อมูล JSON</span>
            </button>
          </div>
        </aside>

        {/* ========================================================================= */}
        {/* PANE 2: MIDDLE MASTER LIST (Width: 340px on Desktop) */}
        {/* ========================================================================= */}
        <section
          className={`
            w-full lg:w-84 xl:w-96 bg-[#0e1f4d] border-r border-blue-900/60 flex flex-col shrink-0 overflow-hidden
            ${mobileDetailOpen ? 'hidden lg:flex' : 'flex'}
          `}
        >
          {/* Pane 2 Header with Search & Add Button */}
          <div className="p-4 border-b border-blue-900/60 space-y-3 bg-[#0c1a40]">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-sm font-bold text-white font-prompt truncate">
                {menuList.find((m) => m.id === activeMenu)?.label}
              </h2>
              {['missions', 'news', 'fleet', 'officers', 'categories', 'hero_slides'].includes(activeMenu) && (
                <button
                  onClick={() => {
                    setIsCreatingNew(true);
                    setMobileDetailOpen(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>เพิ่มใหม่</span>
                </button>
              )}
            </div>

            {/* Search Box */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" />
              <input
                type="text"
                placeholder="ค้นหาข้อมูล..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-blue-950/70 border border-blue-800/60 rounded-xl text-xs text-white placeholder-blue-400/60 focus:outline-none focus:border-amber-400 font-sarabun"
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
                        ? 'bg-amber-400 text-slate-950 font-bold'
                        : 'bg-blue-950 text-blue-300 hover:bg-blue-900'
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
                const isSelected = selectedIncidentId === inc.id && !isCreatingNew;
                return (
                  <div
                    key={inc.id}
                    onClick={() => {
                      setSelectedIncidentId(inc.id);
                      setIsCreatingNew(false);
                      setMobileDetailOpen(true);
                    }}
                    className={`
                      p-3.5 rounded-2xl border transition-all cursor-pointer relative
                      ${
                        isSelected
                          ? 'bg-gradient-to-r from-blue-900/90 to-[#16377e] border-amber-400 shadow-md shadow-amber-400/10'
                          : 'bg-[#0a1636]/70 hover:bg-blue-950/60 border-blue-900/40 text-blue-100'
                      }
                    `}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <span className="text-xs font-mono font-bold text-amber-300">
                        {inc.incident_number}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          inc.status === 'pending'
                            ? 'bg-red-500/20 text-red-300 border border-red-500/40 animate-pulse'
                            : inc.status === 'resolved'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        }`}
                      >
                        {inc.status === 'pending'
                          ? 'รอดำเนินการ'
                          : inc.status === 'resolved'
                          ? 'เสร็จสิ้น'
                          : 'กำลังปฏิบัติการ'}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-white line-clamp-1 mb-1 font-prompt">
                      {inc.caller_name} • {inc.location_name}
                    </h4>
                    <p className="text-[11px] text-blue-200/80 font-sarabun line-clamp-2">
                      {inc.details || 'ไม่มีรายละเอียดเพิ่มเติม'}
                    </p>
                  </div>
                );
              })}

            {/* MISSIONS LIST */}
            {activeMenu === 'missions' &&
              filteredMissions.map((m) => {
                const isSelected = selectedMissionId === m.id && !isCreatingNew;
                return (
                  <div
                    key={m.id}
                    onClick={() => {
                      setSelectedMissionId(m.id);
                      setIsCreatingNew(false);
                      setMobileDetailOpen(true);
                    }}
                    className={`
                      p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-3
                      ${
                        isSelected
                          ? 'bg-[#16377e] border-amber-400 shadow-md'
                          : 'bg-[#0a1636]/70 hover:bg-blue-950/60 border-blue-900/40'
                      }
                    `}
                  >
                    <div
                      className="w-12 h-12 rounded-xl bg-cover bg-center shrink-0 border border-blue-800"
                      style={{ backgroundImage: `url(${m.cover_image_url})` }}
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] text-amber-300 font-mono">{m.incident_date}</span>
                      <h4 className="text-xs font-bold text-white line-clamp-1 font-prompt">{m.title}</h4>
                      <p className="text-[11px] text-blue-200/70 font-sarabun truncate">{m.location}</p>
                    </div>
                  </div>
                );
              })}

            {/* NEWS LIST */}
            {activeMenu === 'news' &&
              filteredNews.map((n) => {
                const isSelected = selectedNewsId === n.id && !isCreatingNew;
                return (
                  <div
                    key={n.id}
                    onClick={() => {
                      setSelectedNewsId(n.id);
                      setIsCreatingNew(false);
                      setMobileDetailOpen(true);
                    }}
                    className={`
                      p-3.5 rounded-2xl border transition-all cursor-pointer
                      ${
                        isSelected
                          ? 'bg-[#16377e] border-amber-400 shadow-md'
                          : 'bg-[#0a1636]/70 hover:bg-blue-950/60 border-blue-900/40'
                      }
                    `}
                  >
                    <span className="text-[10px] text-amber-300 font-mono">{n.published_date}</span>
                    <h4 className="text-xs font-bold text-white line-clamp-2 font-prompt my-1">{n.title}</h4>
                    <p className="text-[11px] text-blue-200/70 font-sarabun line-clamp-2">{n.summary}</p>
                  </div>
                );
              })}

            {/* FLEET LIST */}
            {activeMenu === 'fleet' &&
              filteredFleet.map((f) => {
                const isSelected = selectedFleetId === f.id && !isCreatingNew;
                return (
                  <div
                    key={f.id}
                    onClick={() => {
                      setSelectedFleetId(f.id);
                      setIsCreatingNew(false);
                      setMobileDetailOpen(true);
                    }}
                    className={`
                      p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between
                      ${
                        isSelected
                          ? 'bg-[#16377e] border-amber-400 shadow-md'
                          : 'bg-[#0a1636]/70 hover:bg-blue-950/60 border-blue-900/40'
                      }
                    `}
                  >
                    <div>
                      <span className="text-xs font-mono font-bold text-amber-300">{f.call_sign}</span>
                      <h4 className="text-xs font-bold text-white line-clamp-1 font-prompt mt-0.5">{f.name_th}</h4>
                      <p className="text-[10px] text-blue-300 font-sarabun">{f.plate_number || 'ประจำศูนย์'}</p>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        f.status === 'available'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-red-500/20 text-red-300'
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
                const isSelected = selectedOfficerId === o.id && !isCreatingNew;
                return (
                  <div
                    key={o.id}
                    onClick={() => {
                      setSelectedOfficerId(o.id);
                      setIsCreatingNew(false);
                      setMobileDetailOpen(true);
                    }}
                    className={`
                      p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between
                      ${
                        isSelected
                          ? 'bg-[#16377e] border-amber-400 shadow-md'
                          : 'bg-[#0a1636]/70 hover:bg-blue-950/60 border-blue-900/40'
                      }
                    `}
                  >
                    <div>
                      <span className="text-xs font-mono font-bold text-amber-300">{o.officer_code}</span>
                      <h4 className="text-xs font-bold text-white line-clamp-1 font-prompt mt-0.5">{o.full_name}</h4>
                      <p className="text-[10px] text-blue-300 font-sarabun">{o.role_title}</p>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        o.is_on_duty ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-700 text-slate-400'
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
                const isSelected = selectedCategoryId === c.id && !isCreatingNew;
                return (
                  <div
                    key={c.id}
                    onClick={() => {
                      setSelectedCategoryId(c.id);
                      setIsCreatingNew(false);
                      setMobileDetailOpen(true);
                    }}
                    className={`
                      p-3.5 rounded-2xl border transition-all cursor-pointer
                      ${
                        isSelected
                          ? 'bg-[#16377e] border-amber-400 shadow-md'
                          : 'bg-[#0a1636]/70 hover:bg-blue-950/60 border-blue-900/40'
                      }
                    `}
                  >
                    <span className="text-[10px] font-mono text-amber-300 font-bold">{c.slug}</span>
                    <h4 className="text-xs font-bold text-white font-prompt mt-0.5">{c.name_th}</h4>
                    <p className="text-[11px] text-blue-200/70 font-sarabun line-clamp-2 mt-1">{c.description}</p>
                  </div>
                );
              })}

            {/* HERO SLIDES LIST */}
            {activeMenu === 'hero_slides' &&
              filteredSlides.map((s, idx) => {
                const isSelected = selectedSlideId === s.id && !isCreatingNew;
                return (
                  <div
                    key={s.id}
                    onClick={() => {
                      setSelectedSlideId(s.id);
                      setIsCreatingNew(false);
                      setMobileDetailOpen(true);
                    }}
                    className={`
                      p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-3
                      ${
                        isSelected
                          ? 'bg-[#16377e] border-amber-400 shadow-md'
                          : 'bg-[#0a1636]/70 hover:bg-blue-950/60 border-blue-900/40'
                      }
                    `}
                  >
                    <div
                      className="w-12 h-12 rounded-xl bg-cover bg-center shrink-0 border border-blue-800"
                      style={{ backgroundImage: `url(${s.cover_image})` }}
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] text-amber-300 font-mono">สไลด์ที่ {idx + 1}</span>
                      <h4 className="text-xs font-bold text-white line-clamp-1 font-prompt">{s.title_line1}</h4>
                      <p className="text-[10px] text-blue-200/70 font-sarabun truncate">{s.badge}</p>
                    </div>
                  </div>
                );
              })}

            {/* SITE CONFIG & SETTINGS: Direct Click Info */}
            {['site_config', 'settings'].includes(activeMenu) && (
              <div className="p-4 rounded-2xl bg-blue-950/50 border border-blue-800/40 text-center">
                <Settings className="w-8 h-8 text-amber-300 mx-auto mb-2 opacity-80" />
                <h4 className="text-xs font-bold text-white font-prompt">จัดการข้อมูลระบบส่วนกลาง</h4>
                <p className="text-[11px] text-blue-200 font-sarabun mt-1">
                  แก้ไขข้อมูลผ่านหน้าต่างหลักด้านขวาได้ทันที
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
            flex-1 bg-[#070e24] flex flex-col overflow-y-auto
            ${mobileDetailOpen ? 'flex' : 'hidden lg:flex'}
          `}
        >
          {/* Mobile Back Button */}
          <div className="lg:hidden p-3 bg-[#0a1738] border-b border-blue-900/60 flex items-center justify-between">
            <button
              onClick={() => setMobileDetailOpen(false)}
              className="inline-flex items-center gap-1.5 text-xs text-amber-300 font-bold font-prompt"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>กลับสู่รายการ</span>
            </button>
          </div>

          <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-5xl w-full mx-auto space-y-6">
            {/* ------------------------------------------------------------- */}
            {/* PANE 3 DETAIL: INCIDENT DETAIL & DISPATCH ACTION */}
            {/* ------------------------------------------------------------- */}
            {activeMenu === 'incidents' && selectedIncident && (
              <div className="bg-slate-900/90 rounded-3xl border border-blue-900/60 p-6 sm:p-8 shadow-xl backdrop-blur-md space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-blue-900/60">
                  <div>
                    <span className="text-xs font-mono font-bold text-amber-400">
                      เลขที่แจ้งเหตุ: {selectedIncident.incident_number}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white font-prompt mt-1">
                      {selectedIncident.caller_name}
                    </h3>
                    <p className="text-xs text-blue-300 font-sarabun mt-0.5">
                      เวลาแจ้ง: {new Date(selectedIncident.reported_at).toLocaleString('th-TH')}
                    </p>
                  </div>

                  {/* Incident Action Buttons */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={() => onUpdateIncidentStatus(selectedIncident.id, 'en_route', 'ประจิม 01')}
                      className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs font-prompt cursor-pointer transition-colors"
                    >
                      สั่งการออกเหตุ
                    </button>
                    <button
                      onClick={() => onUpdateIncidentStatus(selectedIncident.id, 'on_scene')}
                      className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs font-prompt cursor-pointer transition-colors"
                    >
                      ถึงที่เกิดเหตุ
                    </button>
                    <button
                      onClick={() => onUpdateIncidentStatus(selectedIncident.id, 'resolved')}
                      className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs font-prompt cursor-pointer transition-colors"
                    >
                      เสร็จสิ้นภารกิจ
                    </button>
                    <button
                      onClick={() => onDeleteIncident(selectedIncident.id)}
                      className="p-2 rounded-xl bg-red-950 hover:bg-red-900 text-red-300 border border-red-800/50 cursor-pointer transition-colors"
                      title="ลบเหตุการณ์"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Incident Detail Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-900/40 space-y-2">
                    <h5 className="text-xs font-bold text-amber-300 font-prompt">ข้อมูลผู้แจ้งและเบอร์ติดต่อ</h5>
                    <div className="flex items-center gap-2 text-sm text-white font-prompt">
                      <PhoneCall className="w-4 h-4 text-emerald-400" />
                      <a href={`tel:${selectedIncident.caller_phone}`} className="hover:underline font-mono font-bold">
                        {selectedIncident.caller_phone}
                      </a>
                    </div>
                    <p className="text-xs text-blue-200 font-sarabun">ผู้แจ้ง: {selectedIncident.caller_name}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-900/40 space-y-2">
                    <h5 className="text-xs font-bold text-amber-300 font-prompt">สถานที่เกิดเหตุ</h5>
                    <div className="flex items-center gap-2 text-sm text-white font-prompt">
                      <MapPin className="w-4 h-4 text-red-400" />
                      <span>{selectedIncident.location_name}</span>
                    </div>
                    <p className="text-xs text-blue-200 font-sarabun">
                      {selectedIncident.district} {selectedIncident.province}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-blue-950/30 border border-blue-900/40">
                  <h5 className="text-xs font-bold text-amber-300 font-prompt mb-1.5">รายละเอียดเหตุการณ์</h5>
                  <p className="text-sm text-slate-200 font-sarabun leading-relaxed">
                    {selectedIncident.details || 'ไม่มีรายละเอียดเพิ่มเติม'}
                  </p>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* PANE 3 DETAIL: MISSIONS EDITOR */}
            {/* ------------------------------------------------------------- */}
            {activeMenu === 'missions' && (
              <div className="bg-slate-900/90 rounded-3xl border border-blue-900/60 p-6 sm:p-8 shadow-xl backdrop-blur-md space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-blue-900/60">
                  <h3 className="text-lg font-bold text-white font-prompt">
                    {isCreatingNew ? '✨ เพิ่มบันทึกภารกิจปฏิบัติการใหม่' : `📝 แก้ไขภารกิจ: ${selectedMission?.title}`}
                  </h3>
                  {!isCreatingNew && selectedMission && (
                    <button
                      onClick={() => onDeleteMission(selectedMission.id)}
                      className="px-3 py-1.5 rounded-xl bg-red-950 hover:bg-red-900 text-red-300 border border-red-800 text-xs font-bold font-prompt"
                    >
                      ลบภารกิจนี้
                    </button>
                  )}
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const title = (form.elements.namedItem('mission_title') as HTMLInputElement).value;
                    const location = (form.elements.namedItem('mission_location') as HTMLInputElement).value;
                    const summary = (form.elements.namedItem('mission_summary') as HTMLTextAreaElement).value;
                    const details = (form.elements.namedItem('mission_details') as HTMLTextAreaElement).value;
                    const cover = (form.elements.namedItem('mission_cover') as HTMLInputElement).value;
                    const catSlug = (form.elements.namedItem('mission_cat') as HTMLSelectElement).value;

                    if (isCreatingNew) {
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
                      setIsCreatingNew(false);
                    } else if (selectedMission) {
                      onUpdateMission(selectedMission.id, {
                        title,
                        location,
                        category_slug: catSlug,
                        summary,
                        details,
                        cover_image_url: cover,
                      });
                    }
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-xs font-bold text-blue-200 font-prompt mb-1">หัวข้อภารกิจ</label>
                    <input
                      name="mission_title"
                      defaultValue={isCreatingNew ? '' : selectedMission?.title}
                      required
                      className="w-full px-4 py-2.5 bg-blue-950/60 border border-blue-800/60 rounded-xl text-white text-sm focus:border-amber-400 focus:outline-none font-prompt"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-blue-200 font-prompt mb-1">หมวดหมู่</label>
                      <select
                        name="mission_cat"
                        defaultValue={isCreatingNew ? 'ems-accident' : selectedMission?.category_slug}
                        className="w-full px-4 py-2.5 bg-blue-950/60 border border-blue-800/60 rounded-xl text-white text-sm focus:border-amber-400 focus:outline-none font-prompt"
                      >
                        {categories.map((c) => (
                          <option key={c.slug} value={c.slug} className="bg-slate-900 text-white">
                            {c.name_th}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-blue-200 font-prompt mb-1">สถานที่ปฏิบัติการ</label>
                      <input
                        name="mission_location"
                        defaultValue={isCreatingNew ? '' : selectedMission?.location}
                        required
                        className="w-full px-4 py-2.5 bg-blue-950/60 border border-blue-800/60 rounded-xl text-white text-sm focus:border-amber-400 focus:outline-none font-sarabun"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-blue-200 font-prompt mb-1">รูปภาพหน้าปก URL</label>
                    <input
                      name="mission_cover"
                      defaultValue={
                        isCreatingNew
                          ? 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=1200&q=80'
                          : selectedMission?.cover_image_url
                      }
                      required
                      className="w-full px-4 py-2.5 bg-blue-950/60 border border-blue-800/60 rounded-xl text-white text-xs focus:border-amber-400 focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-blue-200 font-prompt mb-1">สรุปย่อภารกิจ</label>
                    <textarea
                      name="mission_summary"
                      rows={2}
                      defaultValue={isCreatingNew ? '' : selectedMission?.summary}
                      required
                      className="w-full px-4 py-2.5 bg-blue-950/60 border border-blue-800/60 rounded-xl text-white text-sm focus:border-amber-400 focus:outline-none font-sarabun"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-blue-200 font-prompt mb-1">รายละเอียดเชิงลึก</label>
                    <textarea
                      name="mission_details"
                      rows={4}
                      defaultValue={isCreatingNew ? '' : selectedMission?.details}
                      className="w-full px-4 py-2.5 bg-blue-950/60 border border-blue-800/60 rounded-xl text-white text-sm focus:border-amber-400 focus:outline-none font-sarabun"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold font-prompt text-sm shadow-md transition-all cursor-pointer"
                  >
                    💾 บันทึกข้อมูลภารกิจขึ้น Supabase
                  </button>
                </form>
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* PANE 3 DETAIL: SITE CONFIG & HOTLINES */}
            {/* ------------------------------------------------------------- */}
            {activeMenu === 'site_config' && (
              <div className="bg-slate-900/90 rounded-3xl border border-blue-900/60 p-6 sm:p-8 shadow-xl backdrop-blur-md space-y-6">
                <div className="pb-4 border-b border-blue-900/60">
                  <h3 className="text-xl font-bold text-white font-prompt">
                    🌐 จัดการข้อมูลองค์กร ช่องวิทยุสื่อสาร & โซเชียลมีเดีย
                  </h3>
                  <p className="text-xs text-blue-300 font-sarabun mt-1">
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
                      <label className="block text-xs font-bold text-blue-200 font-prompt mb-1">
                        เบอร์โทรสายด่วนฉุกเฉิน (Primary Hotline)
                      </label>
                      <input
                        value={configForm.hotline_primary}
                        onChange={(e) => setConfigForm({ ...configForm, hotline_primary: e.target.value })}
                        className="w-full px-4 py-2.5 bg-blue-950/60 border border-blue-800/60 rounded-xl text-white text-sm focus:border-amber-400 focus:outline-none font-mono font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-blue-200 font-prompt mb-1">
                        ช่องความถี่วิทยุสื่อสาร
                      </label>
                      <input
                        value={configForm.radio_frequency}
                        onChange={(e) => setConfigForm({ ...configForm, radio_frequency: e.target.value })}
                        className="w-full px-4 py-2.5 bg-blue-950/60 border border-blue-800/60 rounded-xl text-white text-sm focus:border-amber-400 focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-blue-200 font-prompt mb-1">
                        ชื่อสมาคมทางการ
                      </label>
                      <input
                        value={configForm.association_name}
                        onChange={(e) => setConfigForm({ ...configForm, association_name: e.target.value })}
                        className="w-full px-4 py-2.5 bg-blue-950/60 border border-blue-800/60 rounded-xl text-white text-sm focus:border-amber-400 focus:outline-none font-prompt"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-blue-200 font-prompt mb-1">
                        คำขวัญ/วิสัยทัศน์
                      </label>
                      <input
                        value={configForm.slogan}
                        onChange={(e) => setConfigForm({ ...configForm, slogan: e.target.value })}
                        className="w-full px-4 py-2.5 bg-blue-950/60 border border-blue-800/60 rounded-xl text-white text-sm focus:border-amber-400 focus:outline-none font-sarabun"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-blue-200 font-prompt mb-1">ธนาคารรับบริจาค</label>
                      <input
                        value={configForm.bank_name}
                        onChange={(e) => setConfigForm({ ...configForm, bank_name: e.target.value })}
                        className="w-full px-4 py-2.5 bg-blue-950/60 border border-blue-800/60 rounded-xl text-white text-sm font-prompt"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-blue-200 font-prompt mb-1">เลขที่บัญชี</label>
                      <input
                        value={configForm.bank_account_number}
                        onChange={(e) => setConfigForm({ ...configForm, bank_account_number: e.target.value })}
                        className="w-full px-4 py-2.5 bg-blue-950/60 border border-blue-800/60 rounded-xl text-white text-sm font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-blue-200 font-prompt mb-1">พร้อมเพย์</label>
                      <input
                        value={configForm.promptpay_id}
                        onChange={(e) => setConfigForm({ ...configForm, promptpay_id: e.target.value })}
                        className="w-full px-4 py-2.5 bg-blue-950/60 border border-blue-800/60 rounded-xl text-white text-sm font-mono"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold font-prompt text-sm shadow-md transition-all cursor-pointer"
                  >
                    💾 บันทึกการตั้งค่าองค์กรขึ้น Supabase
                  </button>
                </form>
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* PANE 3 DETAIL: FLEET & VEHICLE EDITOR */}
            {/* ------------------------------------------------------------- */}
            {activeMenu === 'fleet' && selectedFleetItem && (
              <div className="bg-slate-900/90 rounded-3xl border border-blue-900/60 p-6 sm:p-8 shadow-xl backdrop-blur-md space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-blue-900/60">
                  <div>
                    <span className="text-xs font-mono font-bold text-amber-400">{selectedFleetItem.call_sign}</span>
                    <h3 className="text-xl font-bold text-white font-prompt mt-0.5">{selectedFleetItem.name_th}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        onUpdateFleetStatus(
                          selectedFleetItem.id,
                          selectedFleetItem.status === 'available' ? 'dispatched' : 'available'
                        )
                      }
                      className={`px-4 py-2 rounded-xl text-xs font-bold font-prompt cursor-pointer transition-all ${
                        selectedFleetItem.status === 'available'
                          ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                          : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                      }`}
                    >
                      {selectedFleetItem.status === 'available' ? 'สลับเป็น: ออกเหตุ' : 'สลับเป็น: พร้อมออกเหตุ'}
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-900/40">
                      <span className="text-xs font-bold text-blue-300 font-prompt">ทะเบียนรถ / รหัสประจำการ</span>
                      <p className="text-base font-mono font-bold text-white mt-1">
                        {selectedFleetItem.plate_number || 'ประจำศูนย์ใหญ่'}
                      </p>
                    </div>
                    <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-900/40">
                      <span className="text-xs font-bold text-blue-300 font-prompt">จุดประจำการ</span>
                      <p className="text-sm font-sarabun text-white mt-1">{selectedFleetItem.location_base}</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-blue-950/30 border border-blue-900/40">
                    <span className="text-xs font-bold text-amber-300 font-prompt mb-1.5 block">
                      ข้อมูลจำเพาะและอุปกรณ์ประจำรถ
                    </span>
                    <p className="text-sm text-slate-200 font-sarabun leading-relaxed">
                      {selectedFleetItem.specifications}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* PANE 3 DETAIL: OFFICERS ROSTER EDITOR */}
            {/* ------------------------------------------------------------- */}
            {activeMenu === 'officers' && selectedOfficer && (
              <div className="bg-slate-900/90 rounded-3xl border border-blue-900/60 p-6 sm:p-8 shadow-xl backdrop-blur-md space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-blue-900/60">
                  <div>
                    <span className="text-xs font-mono font-bold text-amber-400">{selectedOfficer.officer_code}</span>
                    <h3 className="text-xl font-bold text-white font-prompt mt-0.5">{selectedOfficer.full_name}</h3>
                    <p className="text-xs text-blue-300 font-sarabun">{selectedOfficer.role_title}</p>
                  </div>
                  <button
                    onClick={() => onToggleOfficerDuty(selectedOfficer.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold font-prompt cursor-pointer transition-all ${
                      selectedOfficer.is_on_duty
                        ? 'bg-slate-700 hover:bg-slate-600 text-slate-200'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                    }`}
                  >
                    {selectedOfficer.is_on_duty ? 'สลับเป็น: พักเวร' : 'สลับเป็น: เข้าเวรปฏิบัติการ'}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-900/40">
                    <span className="text-xs font-bold text-blue-300 font-prompt">เบอร์โทรศัพท์ติดต่อ</span>
                    <p className="text-base font-mono font-bold text-white mt-1">{selectedOfficer.phone || '061-119-3342'}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-900/40">
                    <span className="text-xs font-bold text-blue-300 font-prompt">สถานีประจำการ</span>
                    <p className="text-sm font-sarabun text-white mt-1">{selectedOfficer.station_base}</p>
                  </div>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* PANE 3 DETAIL: SYSTEM SETTINGS & PASSWORD */}
            {/* ------------------------------------------------------------- */}
            {activeMenu === 'settings' && (
              <div className="bg-slate-900/90 rounded-3xl border border-blue-900/60 p-6 sm:p-8 shadow-xl backdrop-blur-md space-y-6">
                <div className="pb-4 border-b border-blue-900/60">
                  <h3 className="text-xl font-bold text-white font-prompt">⚙️ ความปลอดภัยและการสำรองข้อมูล</h3>
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
                  <h4 className="text-sm font-bold text-amber-300 font-prompt">เปลี่ยนรหัสผ่านผู้ดูแลระบบ</h4>
                  <div>
                    <label className="block text-xs font-bold text-blue-200 font-prompt mb-1">รหัสผ่านปัจจุบัน</label>
                    <input
                      type="password"
                      required
                      value={currentPassInput}
                      onChange={(e) => setCurrentPassInput(e.target.value)}
                      className="w-full px-4 py-2.5 bg-blue-950/60 border border-blue-800/60 rounded-xl text-white text-sm font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-blue-200 font-prompt mb-1">รหัสผ่านใหม่</label>
                    <input
                      type="password"
                      required
                      value={newPassInput}
                      onChange={(e) => setNewPassInput(e.target.value)}
                      className="w-full px-4 py-2.5 bg-blue-950/60 border border-blue-800/60 rounded-xl text-white text-sm font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-blue-200 font-prompt mb-1">ยืนยันรหัสผ่านใหม่</label>
                    <input
                      type="password"
                      required
                      value={confirmPassInput}
                      onChange={(e) => setConfirmPassInput(e.target.value)}
                      className="w-full px-4 py-2.5 bg-blue-950/60 border border-blue-800/60 rounded-xl text-white text-sm font-mono"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold font-prompt text-xs shadow-md transition-all cursor-pointer"
                  >
                    เปลี่ยนรหัสผ่าน
                  </button>
                </form>

                <div className="pt-6 border-t border-blue-900/60 space-y-3">
                  <h4 className="text-sm font-bold text-red-400 font-prompt">รีเซ็ตระบบ (Factory Reset)</h4>
                  <p className="text-xs text-blue-200 font-sarabun">
                    การรีเซ็ตจะคืนค่าข้อมูลทั้งหมดกลับสู่สถานะเริ่มต้นของหน่วยกู้ภัยประจิม
                  </p>
                  <button
                    onClick={() => {
                      if (confirm('คุณต้องการรีเซ็ตข้อมูลทั้งหมดกลับสู่ค่าเริ่มต้นใช่หรือไม่?')) {
                        onResetToDefault();
                      }
                    }}
                    className="px-4 py-2.5 rounded-xl bg-red-950 hover:bg-red-900 text-red-300 border border-red-800 text-xs font-bold font-prompt cursor-pointer transition-colors"
                  >
                    ⚠️ รีเซ็ตข้อมูลทั้งหมดเป็นค่าเริ่มต้น
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
