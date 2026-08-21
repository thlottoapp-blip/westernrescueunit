'use client';

import React, { useState } from 'react';
import { OfficialLogo } from '@/components/shared/OfficialLogo';
import {
  Lock,
  Unlock,
  Radio,
  FolderTree,
  FileText,
  Ambulance,
  Users,
  Settings,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  AlertTriangle,
  PhoneCall,
  Clock,
  ShieldCheck,
  Search,
  Bell,
  Eye,
  LogOut,
  Layers,
  Sparkles,
  MapPin,
  RefreshCw,
  SlidersHorizontal,
} from 'lucide-react';
import {
  Category,
  EmergencyIncident,
  EquipmentFleet,
  IncidentStatus,
  IncidentType,
  MissionLog,
  NewsArticle,
  OfficerRoster,
  UrgencyLevel,
} from '@/types/database';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
  isAdminAuthenticated: boolean;
  onLogin: (userOrPassword: string, password?: string) => boolean;
  onLogout: () => void;
  onUpdatePassword: (currentPass: string, newPass: string) => boolean;
  categories: Category[];
  missions: MissionLog[];
  news: NewsArticle[];
  incidents: EmergencyIncident[];
  fleet: EquipmentFleet[];
  officers: OfficerRoster[];
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
  onAddFleetItem: (item: Omit<EquipmentFleet, 'id' | 'created_at'>) => void;
  onToggleOfficerDuty: (id: string) => void;
  onResetToDefault: () => void;
  onTestSoundAlert: () => void;
}

export function AdminPortal({
  isOpen,
  onClose,
  isAdminAuthenticated,
  onLogin,
  onLogout,
  onUpdatePassword,
  categories,
  missions,
  news,
  incidents,
  fleet,
  officers,
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
  onToggleOfficerDuty,
  onResetToDefault,
  onTestSoundAlert,
}: AdminPortalProps) {
  const [activeTab, setActiveTab] = useState<
    'incidents' | 'categories' | 'missions' | 'news' | 'fleet' | 'officers' | 'settings'
  >('incidents');
  const [enteredUsername, setEnteredUsername] = useState('0611193342');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Modals inside Admin
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryForm, setCategoryForm] = useState({
    slug: '',
    name_th: '',
    name_en: '',
    description: '',
    icon_name: 'ShieldAlert',
    category_type: 'mission' as 'mission' | 'news' | 'service',
    sort_order: 1,
    is_active: true,
  });

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
    special_tag: '',
    team_lead: 'ชุดปฏิบัติการกู้ภัยประจิม',
    officer_count: 4,
  });

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

  // Settings State
  const [currentPassInput, setCurrentPassInput] = useState('');
  const [newPassInput, setNewPassInput] = useState('');
  const [settingsMessage, setSettingsMessage] = useState('');

  if (!isOpen) return null;

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
        slug: cat.slug,
        name_th: cat.name_th,
        name_en: cat.name_en || '',
        description: cat.description || '',
        icon_name: cat.icon_name || 'ShieldAlert',
        category_type: cat.category_type,
        sort_order: cat.sort_order,
        is_active: cat.is_active,
      });
    } else {
      setEditingCategory(null);
      setCategoryForm({
        slug: 'cat-' + Date.now(),
        name_th: '',
        name_en: '',
        description: '',
        icon_name: 'ShieldAlert',
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
      alert('กรุณากรอกชื่อหมวดหมู่และรหัส Slug ให้ครบถ้วน');
      return;
    }

    if (editingCategory) {
      onUpdateCategory(editingCategory.id, categoryForm);
    } else {
      onAddCategory(categoryForm);
    }
    setShowCategoryModal(false);
  };

  const handleOpenMissionModal = (m?: MissionLog) => {
    if (m) {
      setEditingMission(m);
      setMissionForm({
        title: m.title,
        category_slug: m.category_slug,
        incident_date: m.incident_date,
        location: m.location,
        district: m.district,
        summary: m.summary,
        details: m.details,
        cover_image_url: m.cover_image_url,
        is_featured: m.is_featured,
        special_tag: m.special_tag || '',
        team_lead: m.team_lead || 'ชุดปฏิบัติการกู้ภัยประจิม',
        officer_count: m.officer_count,
      });
    } else {
      setEditingMission(null);
      setMissionForm({
        title: '',
        category_slug: categories[0]?.slug || 'ems-accident',
        incident_date: new Date().toISOString().split('T')[0],
        location: 'อำเภอบรบือ จังหวัดมหาสารคาม',
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
      alert('กรุณากรอกหัวข้อภารกิจและสรุปการปฏิบัติงาน');
      return;
    }

    if (editingMission) {
      onUpdateMission(editingMission.id, missionForm);
    } else {
      onAddMission(missionForm);
    }
    setShowMissionModal(false);
  };

  const handleOpenNewsModal = (n?: NewsArticle) => {
    if (n) {
      setEditingNews(n);
      setNewsForm({
        title: n.title,
        summary: n.summary,
        content: n.content,
        cover_image_url: n.cover_image_url,
        published_date: n.published_date,
        is_pinned: n.is_pinned,
        author_name: n.author_name,
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
      alert('กรุณากรอกหัวข้อข่าวและเนื้อหา');
      return;
    }

    if (editingNews) {
      onUpdateNews(editingNews.id, newsForm);
    } else {
      onAddNews(newsForm);
    }
    setShowNewsModal(false);
  };

  const handlePasswordChangeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onUpdatePassword(currentPassInput, newPassInput);
    if (success) {
      setSettingsMessage('เปลี่ยนรหัสผ่านสำเร็จเรียบร้อยแล้ว');
      setCurrentPassInput('');
      setNewPassInput('');
    } else {
      setSettingsMessage('รหัสผ่านเดิมไม่ถูกต้อง หรือรหัสใหม่สั้นเกินไป (อย่างน้อย 6 ตัวอักษร)');
    }
  };

  // If not authenticated, show secure login screen
  if (!isAdminAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
        <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl animate-fade-in text-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-2 rounded-full cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex justify-center mb-4">
            <OfficialLogo size={68} />
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-prompt">
            ระบบศูนย์สั่งการและจัดการเนื้อหา
          </h3>
          <p className="text-xs text-[#16377e] font-prompt font-bold mt-1">
            สมาคมประจิมสารคาม พุทธศาสตร์สงเคราะห์ (หน่วยกู้ภัยประจิม)
          </p>

          <form onSubmit={handleLoginSubmit} className="mt-6 space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-slate-700 font-prompt mb-1.5 whitespace-nowrap">
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
              <label className="block text-xs font-bold text-slate-700 font-prompt mb-1.5 whitespace-nowrap">
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
              className="w-full py-3 bg-gradient-to-r from-[#16377e] to-[#0a193b] hover:from-[#1b4396] hover:to-[#0f2452] text-white font-bold rounded-full shadow-md text-sm font-prompt transition-all cursor-pointer border border-amber-400/50 whitespace-nowrap min-h-[44px]"
            >
              เข้าสู่ระบบศูนย์สั่งการ
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Pending incidents count
  const pendingCount = incidents.filter((i) => i.status === 'pending').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-6xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[92vh] animate-fade-in">
        {/* Admin Header */}
        <div className="bg-slate-50 border-b border-slate-200 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <OfficialLogo size={42} />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 font-prompt whitespace-nowrap">
                  ศูนย์ควบคุมสั่งการและจัดการระบบ (Admin CMS)
                </h3>
                <span className="bg-emerald-100 text-emerald-700 text-[10px] font-mono px-2.5 py-0.5 rounded-full border border-emerald-300 font-bold whitespace-nowrap">
                  ONLINE 24/7
                </span>
              </div>
              <p className="text-xs text-[#16377e] font-prompt font-bold whitespace-nowrap">
                หน่วยกู้ภัยประจิม (สมาคมประจิมสารคาม พุทธศาสตร์สงเคราะห์ อ.บรบือ)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onTestSoundAlert}
              title="ทดสอบสัญญาณเสียงฉุกเฉิน"
              className="px-3.5 py-1.5 rounded-full bg-white hover:bg-slate-100 text-slate-700 text-xs font-prompt flex items-center gap-1.5 border border-slate-300 transition-colors cursor-pointer shadow-xs whitespace-nowrap shrink-0 min-h-[36px]"
            >
              <Bell className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span className="hidden sm:inline whitespace-nowrap">ทดสอบสัญญาณเตือน</span>
            </button>

            <button
              onClick={onLogout}
              className="px-3.5 py-1.5 rounded-full bg-red-50 hover:bg-red-100 text-red-700 text-xs font-prompt flex items-center gap-1.5 border border-red-200 transition-colors cursor-pointer whitespace-nowrap shrink-0 min-h-[36px]"
            >
              <LogOut className="w-3.5 h-3.5 shrink-0" />
              <span className="whitespace-nowrap">ออกจากระบบ</span>
            </button>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center cursor-pointer transition-colors shrink-0 aspect-square"
            >
              <X className="w-4 h-4 shrink-0" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-100 border-b border-slate-200 px-4 flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0 py-2">
          {[
            {
              id: 'incidents' as const,
              label: 'รับแจ้งเหตุฉุกเฉิน (Dispatch)',
              icon: Radio,
              badge: pendingCount > 0 ? pendingCount : null,
            },
            {
              id: 'categories' as const,
              label: 'จัดการหมวดหมู่ (Categories)',
              icon: FolderTree,
            },
            {
              id: 'missions' as const,
              label: 'จัดการผลงาน & ภารกิจ (Missions)',
              icon: Layers,
            },
            {
              id: 'news' as const,
              label: 'ข่าวสาร & ประกาศ (News)',
              icon: FileText,
            },
            {
              id: 'fleet' as const,
              label: 'ยานพาหนะ & อุปกรณ์ (Fleet)',
              icon: Ambulance,
            },
            {
              id: 'officers' as const,
              label: 'ทำเนียบเจ้าหน้าที่ (Officers)',
              icon: Users,
            },
            {
              id: 'settings' as const,
              label: 'ตั้งค่า & ความปลอดภัย (Settings)',
              icon: Settings,
            },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium font-prompt whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-[#16377e] text-white shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="whitespace-nowrap">{tab.label}</span>
                {tab.badge && (
                  <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 font-bold text-[10px] flex items-center justify-center animate-pulse shrink-0 aspect-square">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50/70">
          {/* TAB 1: INCIDENTS DISPATCH */}
          {activeTab === 'incidents' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
                <div>
                  <h4 className="text-base font-bold text-slate-900 font-prompt whitespace-nowrap">
                    คิวรับแจ้งเหตุฉุกเฉินและการสั่งการ (Incident Dispatch Queue)
                  </h4>
                  <p className="text-xs text-slate-500 font-sarabun">
                    อัปเดตสถานะการออกเหตุ จัดส่งรถพยาบาล และบันทึกผลการปฏิบัติงาน
                  </p>
                </div>
                <div className="text-xs text-slate-500 font-mono whitespace-nowrap">
                  ทั้งหมด: {incidents.length} รายการ | รอดำเนินการ: {pendingCount} เคส
                </div>
              </div>

              {incidents.length === 0 ? (
                <div className="text-center py-16 text-slate-400 font-sarabun">
                  ไม่มีรายการแจ้งเหตุในระบบ
                </div>
              ) : (
                <div className="space-y-3">
                  {incidents.map((inc) => (
                    <div
                      key={inc.id}
                      className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                        inc.status === 'pending'
                          ? 'bg-red-50 border-red-300 shadow-xs'
                          : inc.status === 'en_route' || inc.status === 'on_scene'
                          ? 'bg-amber-50 border-amber-300'
                          : 'bg-white border-slate-200'
                      }`}
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        {/* Incident Info */}
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono text-xs font-bold text-red-700 bg-red-100/70 px-2.5 py-1 rounded-full border border-red-200 whitespace-nowrap">
                              {inc.incident_number}
                            </span>
                            <span
                              className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full font-prompt whitespace-nowrap ${
                                inc.urgency_level === 'critical'
                                  ? 'bg-red-600 text-white'
                                  : inc.urgency_level === 'urgent'
                                  ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                  : 'bg-blue-100 text-blue-800 border border-blue-300'
                              }`}
                            >
                              ความเร่งด่วน: {inc.urgency_level}
                            </span>
                            <span className="text-xs text-slate-500 font-sarabun flex items-center gap-1 whitespace-nowrap">
                              <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span className="whitespace-nowrap">{new Date(inc.reported_at).toLocaleTimeString('th-TH')} น.</span>
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm font-sarabun">
                            <div>
                              <span className="text-slate-500">ผู้แจ้ง: </span>
                              <strong className="text-slate-900">{inc.caller_name}</strong> (
                              <a href={`tel:${inc.caller_phone}`} className="text-[#16377e] font-semibold underline">
                                {inc.caller_phone}
                              </a>
                              )
                            </div>
                            <div>
                              <span className="text-slate-500">สถานที่: </span>
                              <strong className="text-slate-800">{inc.location_name}</strong> (
                              {inc.district})
                            </div>
                          </div>

                          {inc.details && (
                            <p className="text-xs text-slate-700 font-sarabun bg-slate-50 p-2.5 rounded-2xl border border-slate-200">
                              {inc.details}
                            </p>
                          )}

                          {inc.responder_notes && (
                            <p className="text-xs text-amber-800 font-sarabun bg-amber-50/50 p-2 rounded-2xl">
                              <strong>บันทึกเจ้าหน้าที่:</strong> {inc.responder_notes}
                            </p>
                          )}
                        </div>

                        {/* Status Controls */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-200">
                          {/* Status Selector */}
                          <select
                            value={inc.status}
                            onChange={(e) =>
                              onUpdateIncidentStatus(inc.id, e.target.value as IncidentStatus)
                            }
                            className={`text-xs font-bold font-prompt px-3.5 py-2 rounded-full border focus:outline-none whitespace-nowrap cursor-pointer ${
                              inc.status === 'pending'
                                ? 'bg-red-600 text-white border-red-600'
                                : inc.status === 'en_route'
                                ? 'bg-amber-600 text-white border-amber-600'
                                : inc.status === 'on_scene'
                                ? 'bg-blue-600 text-white border-blue-600'
                                : inc.status === 'resolved'
                                ? 'bg-emerald-600 text-white border-emerald-600'
                                : 'bg-slate-100 text-slate-800 border-slate-300'
                            }`}
                          >
                            <option value="pending">1. รอสั่งการ (Pending)</option>
                            <option value="en_route">2. กำลังเดินทาง (En Route)</option>
                            <option value="on_scene">3. ถึงที่เกิดเหตุ (On Scene)</option>
                            <option value="transporting">4. นำส่งโรงพยาบาล (Transporting)</option>
                            <option value="resolved">5. เสร็จสิ้นภารกิจ (Resolved)</option>
                            <option value="cancelled">ยกเลิก (Cancelled)</option>
                          </select>

                          {/* Unit Assigner Quick Dropdown */}
                          <select
                            value={inc.assigned_unit || ''}
                            onChange={(e) =>
                              onUpdateIncidentStatus(inc.id, inc.status, e.target.value)
                            }
                            className="text-xs font-sarabun px-3 py-2 rounded-full bg-white border border-slate-300 text-slate-800 focus:outline-none shadow-xs whitespace-nowrap cursor-pointer"
                          >
                            <option value="">-- กำหนดชุดปฏิบัติการ --</option>
                            <option value="ประจิม 01 (กู้ชีพฉุกเฉิน ALS)">ประจิม 01 (กู้ชีพ ALS)</option>
                            <option value="ประจิม 02 (รถตัด-ถ่าง)">ประจิม 02 (ตัด-ถ่าง)</option>
                            <option value="ประจิม 03 (ชุดประดาน้ำ)">ประจิม 03 (ประดาน้ำ)</option>
                            <option value="ประจิม 04 (จับสัตว์มีพิษ)">ประจิม 04 (สัตว์มีพิษ)</option>
                          </select>

                          <button
                            onClick={() => onDeleteIncident(inc.id)}
                            className="w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-slate-100 transition-colors cursor-pointer shrink-0 aspect-square"
                            title="ลบรายการนี้"
                          >
                            <Trash2 className="w-4 h-4 shrink-0" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: CATEGORY MANAGER */}
          {activeTab === 'categories' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
                <div>
                  <h4 className="text-base font-bold text-slate-900 font-prompt whitespace-nowrap">
                    จัดการหมวดหมู่ระบบ (Category Management)
                  </h4>
                  <p className="text-xs text-slate-500 font-sarabun">
                    เพิ่ม แก้ไข และจัดระเบียบหมวดหมู่ภารกิจ ข่าวสาร และการให้บริการ
                  </p>
                </div>

                <button
                  id="add-category-btn"
                  onClick={() => handleOpenCategoryModal()}
                  className="flex items-center justify-center gap-1.5 px-5 py-2.5 bg-[#16377e] hover:bg-[#0f2452] text-white text-xs font-bold rounded-full shadow-xs font-prompt transition-colors cursor-pointer whitespace-nowrap border border-amber-400/40 min-h-[40px] shrink-0"
                >
                  <Plus className="w-4 h-4 text-amber-300 shrink-0" />
                  <span className="whitespace-nowrap">เพิ่มหมวดหมู่ใหม่</span>
                </button>
              </div>

              {/* Categories Table / Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-[#16377e] shrink-0 aspect-square">
                            <FolderTree className="w-4 h-4 shrink-0" />
                          </div>
                          <div>
                            <h5 className="text-sm font-bold text-slate-900 font-prompt whitespace-nowrap">{cat.name_th}</h5>
                            <span className="text-[11px] font-mono text-slate-500 whitespace-nowrap">{cat.slug}</span>
                          </div>
                        </div>

                        <span
                          className={`text-[10px] px-2.5 py-0.5 rounded-full font-mono font-semibold whitespace-nowrap ${
                            cat.is_active
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {cat.is_active ? 'ACTIVE' : 'INACTIVE'}
                        </span>
                      </div>

                      {cat.name_en && (
                        <p className="text-xs text-[#16377e] font-mono mb-1 whitespace-nowrap">{cat.name_en}</p>
                      )}

                      {cat.description && (
                        <p className="text-xs text-slate-600 font-sarabun line-clamp-2">
                          {cat.description}
                        </p>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-mono whitespace-nowrap">ประเภท: {cat.category_type}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenCategoryModal(cat)}
                          className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer font-medium whitespace-nowrap min-h-[32px]"
                        >
                          <Edit2 className="w-3 h-3 shrink-0" /> <span className="whitespace-nowrap">แก้ไข</span>
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`ยืนยันการลบหมวดหมู่ "${cat.name_th}" หรือไม่?`)) {
                              onDeleteCategory(cat.id);
                            }
                          }}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer shrink-0 aspect-square"
                        >
                          <Trash2 className="w-4 h-4 shrink-0" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: MISSIONS MANAGER */}
          {activeTab === 'missions' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
                <div>
                  <h4 className="text-base font-bold text-slate-900 font-prompt whitespace-nowrap">
                    จัดการผลงานและภารกิจกู้ชีพ (Mission Logs CMS)
                  </h4>
                  <p className="text-xs text-slate-500 font-sarabun">
                    บันทึกผลงานการช่วยเหลือ ผลงานเด่นระดับจังหวัด และภารกิจพิเศษ
                  </p>
                </div>

                <button
                  id="add-mission-btn"
                  onClick={() => handleOpenMissionModal()}
                  className="flex items-center justify-center gap-1.5 px-5 py-2.5 bg-[#16377e] hover:bg-[#0f2452] text-white text-xs font-bold rounded-full shadow-xs font-prompt transition-colors cursor-pointer whitespace-nowrap border border-amber-400/40 min-h-[40px] shrink-0"
                >
                  <Plus className="w-4 h-4 text-amber-300 shrink-0" />
                  <span className="whitespace-nowrap">เพิ่มบันทึกภารกิจใหม่</span>
                </button>
              </div>

              <div className="space-y-3">
                {missions.map((m) => (
                  <div
                    key={m.id}
                    className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-3 flex-1">
                      <div
                        className="w-16 h-16 rounded-2xl bg-cover bg-center shrink-0 border border-slate-200 hidden sm:block aspect-square"
                        style={{ backgroundImage: `url(${m.cover_image_url})` }}
                      />
                      <div>
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="text-[11px] font-mono text-red-700 font-bold bg-red-50 px-2.5 py-0.5 rounded-full border border-red-200 whitespace-nowrap">
                            {m.incident_date}
                          </span>
                          {m.special_tag && (
                            <span className="text-[10px] font-prompt bg-blue-100 text-[#16377e] px-2.5 py-0.5 rounded-full border border-blue-200 font-medium whitespace-nowrap">
                              {m.special_tag}
                            </span>
                          )}
                          <span className="text-xs text-slate-500 font-sarabun whitespace-nowrap">
                            สถานที่: {m.location}
                          </span>
                        </div>
                        <h5 className="text-sm font-bold text-slate-900 font-prompt line-clamp-1">
                          {m.title}
                        </h5>
                        <p className="text-xs text-slate-600 font-sarabun line-clamp-1 mt-0.5">
                          {m.summary}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleOpenMissionModal(m)}
                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full text-xs font-prompt flex items-center gap-1.5 transition-colors cursor-pointer font-medium whitespace-nowrap min-h-[36px]"
                      >
                        <Edit2 className="w-3.5 h-3.5 shrink-0" />
                        <span className="whitespace-nowrap">แก้ไข</span>
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`ยืนยันการลบภารกิจ "${m.title}"?`)) {
                            onDeleteMission(m.id);
                          }
                        }}
                        className="w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer shrink-0 aspect-square"
                      >
                        <Trash2 className="w-4 h-4 shrink-0" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: NEWS MANAGER */}
          {activeTab === 'news' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
                <div>
                  <h4 className="text-base font-bold text-slate-900 font-prompt whitespace-nowrap">
                    จัดการข่าวสารและประกาศ (News & Announcements)
                  </h4>
                  <p className="text-xs text-slate-500 font-sarabun">
                    เผยแพร่ข่าวสาร ประชาสัมพันธ์ และข้อแนะนำฉุกเฉินแก่ประชาชน
                  </p>
                </div>

                <button
                  id="add-news-btn"
                  onClick={() => handleOpenNewsModal()}
                  className="flex items-center justify-center gap-1.5 px-5 py-2.5 bg-[#16377e] hover:bg-[#0f2452] text-white text-xs font-bold rounded-full shadow-xs font-prompt transition-colors cursor-pointer whitespace-nowrap border border-amber-400/40 min-h-[40px] shrink-0"
                >
                  <Plus className="w-4 h-4 text-amber-300 shrink-0" />
                  <span className="whitespace-nowrap">สร้างข่าวสารใหม่</span>
                </button>
              </div>

              <div className="space-y-3">
                {news.map((n) => (
                  <div
                    key={n.id}
                    className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[11px] font-mono text-slate-500 whitespace-nowrap">{n.published_date}</span>
                        {n.is_pinned && (
                          <span className="text-[10px] font-prompt bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full border border-amber-300 font-semibold whitespace-nowrap">
                            ปักหมุดข่าวเด่น
                          </span>
                        )}
                      </div>
                      <h5 className="text-sm font-bold text-slate-900 font-prompt">{n.title}</h5>
                      <p className="text-xs text-slate-600 font-sarabun line-clamp-1 mt-0.5">
                        {n.summary}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleOpenNewsModal(n)}
                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full text-xs font-prompt flex items-center gap-1.5 transition-colors cursor-pointer font-medium whitespace-nowrap min-h-[36px]"
                      >
                        <Edit2 className="w-3.5 h-3.5 shrink-0" />
                        <span className="whitespace-nowrap">แก้ไข</span>
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`ยืนยันการลบข่าว "${n.title}"?`)) {
                            onDeleteNews(n.id);
                          }
                        }}
                        className="w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer shrink-0 aspect-square"
                      >
                        <Trash2 className="w-4 h-4 shrink-0" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: FLEET TRACKER */}
          {activeTab === 'fleet' && (
            <div className="space-y-4">
              <div className="pb-3 border-b border-slate-200">
                <h4 className="text-base font-bold text-slate-900 font-prompt whitespace-nowrap">
                  สถานะยานพาหนะและอุปกรณ์กู้ชีพ (Fleet & Equipment Status)
                </h4>
                <p className="text-xs text-slate-500 font-sarabun">
                  ตรวจสอบความพร้อมของรถพยาบาล เรือกู้ภัย และชุดตัด-ถ่าง
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fleet.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono font-bold text-red-700 bg-red-50 px-2.5 py-1 rounded-full border border-red-200 whitespace-nowrap">
                          {item.call_sign}
                        </span>
                        <select
                          value={item.status}
                          onChange={(e) =>
                            onUpdateFleetStatus(item.id, e.target.value as EquipmentFleet['status'])
                          }
                          className={`text-xs font-bold font-prompt px-3 py-1.5 rounded-full border focus:outline-none whitespace-nowrap cursor-pointer ${
                            item.status === 'available'
                              ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                              : item.status === 'dispatched'
                              ? 'bg-red-100 text-red-800 border-red-300'
                              : 'bg-amber-100 text-amber-800 border-amber-300'
                          }`}
                        >
                          <option value="available">พร้อมปฏิบัติการ (Available)</option>
                          <option value="dispatched">กำลังออกเหตุ (Dispatched)</option>
                          <option value="maintenance">ซ่อมบำรุง (Maintenance)</option>
                        </select>
                      </div>

                      <h5 className="text-sm font-bold text-slate-900 font-prompt mb-1 whitespace-nowrap">{item.name_th}</h5>
                      <div className="text-xs text-slate-500 font-mono mb-2 whitespace-nowrap">
                        ทะเบียน: {item.plate_number} | ฐาน: {item.location_base}
                      </div>
                      <p className="text-xs text-slate-700 font-sarabun bg-slate-50 p-3 rounded-2xl border border-slate-200">
                        {item.specifications}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: OFFICERS ROSTER */}
          {activeTab === 'officers' && (
            <div className="space-y-4">
              <div className="pb-3 border-b border-slate-200">
                <h4 className="text-base font-bold text-slate-900 font-prompt whitespace-nowrap">
                  ทำเนียบเจ้าหน้าที่และอาสาสมัคร (Officer & Volunteer Roster)
                </h4>
                <p className="text-xs text-slate-500 font-sarabun">
                  สถานะการเข้าเวรปฏิบัติการและข้อมูลติดต่อ
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {officers.map((officer) => (
                  <div
                    key={officer.id}
                    className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[11px] font-mono text-red-700 bg-red-50 px-2.5 py-0.5 rounded-full font-semibold border border-red-200 whitespace-nowrap">
                          {officer.officer_code}
                        </span>
                        <span className="text-xs text-slate-500 font-sarabun whitespace-nowrap">{officer.station_base}</span>
                      </div>
                      <h5 className="text-sm font-bold text-slate-900 font-prompt whitespace-nowrap">{officer.full_name}</h5>
                      <p className="text-xs text-slate-600 font-sarabun whitespace-nowrap">{officer.role_title}</p>
                      <a
                        href={`tel:${officer.phone}`}
                        className="text-xs text-[#16377e] font-semibold underline font-mono mt-1 inline-block whitespace-nowrap"
                      >
                        {officer.phone}
                      </a>
                    </div>

                    <button
                      onClick={() => onToggleOfficerDuty(officer.id)}
                      className={`px-4 py-2 rounded-full text-xs font-bold font-prompt border transition-all cursor-pointer whitespace-nowrap min-h-[36px] ${
                        officer.is_on_duty
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-slate-100 text-slate-600 border-slate-300'
                      }`}
                    >
                      {officer.is_on_duty ? 'กำลังเข้าเวร' : 'ออกเวร'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: SETTINGS & SECURITY */}
          {activeTab === 'settings' && (
            <div className="max-w-xl space-y-6">
              <div className="pb-3 border-b border-slate-200">
                <h4 className="text-base font-bold text-slate-900 font-prompt whitespace-nowrap">
                  ความปลอดภัยและการตั้งค่าระบบ (Security & System Settings)
                </h4>
                <p className="text-xs text-slate-500 font-sarabun">
                  เปลี่ยนรหัสผ่านผู้ดูแลระบบ หรือรีเซ็ตข้อมูลระบบ
                </p>
              </div>

              {/* Password Change Form */}
              <form
                onSubmit={handlePasswordChangeSubmit}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4"
              >
                <h5 className="text-sm font-bold text-slate-900 font-prompt flex items-center gap-2 whitespace-nowrap">
                  <Lock className="w-4 h-4 text-[#16377e] shrink-0" />
                  <span className="whitespace-nowrap">เปลี่ยนรหัสผ่านผู้ดูแลระบบ</span>
                </h5>

                <div>
                  <label className="block text-xs text-slate-700 font-prompt font-semibold mb-1 whitespace-nowrap">
                    รหัสผ่านเดิม
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="รหัสผ่านปัจจุบัน"
                    value={currentPassInput}
                    onChange={(e) => setCurrentPassInput(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-full text-sm text-slate-900 focus:outline-none focus:border-[#16377e]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-700 font-prompt font-semibold mb-1 whitespace-nowrap">
                    รหัสผ่านใหม่ (อย่างน้อย 6 ตัวอักษร)
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="รหัสผ่านใหม่ที่ต้องการ"
                    value={newPassInput}
                    onChange={(e) => setNewPassInput(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-full text-sm text-slate-900 focus:outline-none focus:border-[#16377e]"
                  />
                </div>

                {settingsMessage && (
                  <p className="text-xs text-amber-900 font-sarabun bg-amber-50 p-2.5 rounded-2xl border border-amber-200">
                    {settingsMessage}
                  </p>
                )}

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#16377e] hover:bg-[#0f2452] text-white font-bold text-xs rounded-full font-prompt transition-colors cursor-pointer shadow-xs whitespace-nowrap min-h-[40px] border border-amber-400/40"
                >
                  บันทึกรหัสผ่านใหม่
                </button>
              </form>

              {/* Reset to Factory Default */}
              <div className="p-5 rounded-2xl bg-white border border-red-200 shadow-xs space-y-3">
                <h5 className="text-sm font-bold text-slate-900 font-prompt flex items-center gap-2 whitespace-nowrap">
                  <RefreshCw className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="whitespace-nowrap">รีเซ็ตข้อมูลระบบกลับสู่ค่าเริ่มต้น (Factory Reset)</span>
                </h5>
                <p className="text-xs text-slate-500 font-sarabun">
                  คืนค่าเริ่มต้นของข่าวสาร ภารกิจ หมวดหมู่ และสถานะรถกู้ชีพทั้งหมด
                </p>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm('คุณต้องการรีเซ็ตข้อมูลทั้งหมดกลับสู่ค่าเริ่มต้นใช่หรือไม่?')) {
                      onResetToDefault();
                      alert('รีเซ็ตข้อมูลเรียบร้อยแล้ว');
                    }
                  }}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-red-50 text-red-700 text-xs font-prompt rounded-full border border-slate-300 hover:border-red-300 transition-colors cursor-pointer font-semibold whitespace-nowrap min-h-[38px]"
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
            <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl animate-fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
                <h4 className="text-base font-bold text-slate-900 font-prompt whitespace-nowrap">
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
                  <label className="block text-xs font-bold text-slate-700 font-prompt mb-1.5 whitespace-nowrap">
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
                  <label className="block text-xs font-bold text-slate-700 font-prompt mb-1.5 whitespace-nowrap">
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
                  <label className="block text-xs font-bold text-slate-700 font-prompt mb-1.5 whitespace-nowrap">
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

                <div>
                  <label className="block text-xs font-bold text-slate-700 font-prompt mb-1.5 whitespace-nowrap">
                    คำอธิบายหมวดหมู่
                  </label>
                  <textarea
                    rows={2}
                    placeholder="อธิบายขอบเขตของหมวดหมู่นี้..."
                    value={categoryForm.description}
                    onChange={(e) =>
                      setCategoryForm({ ...categoryForm, description: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-sm text-slate-900 focus:outline-none focus:border-[#16377e] font-sarabun resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 font-prompt mb-1.5 whitespace-nowrap">
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
                    <label className="block text-xs font-bold text-slate-700 font-prompt mb-1.5 whitespace-nowrap">
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
                    className="px-5 py-2 text-slate-600 hover:text-slate-900 text-xs font-prompt cursor-pointer rounded-full hover:bg-slate-100 transition-colors whitespace-nowrap min-h-[36px]"
                  >
                    ยกเลิก
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#16377e] hover:bg-[#0f2452] text-white font-bold text-xs rounded-full font-prompt transition-colors cursor-pointer shadow-xs whitespace-nowrap min-h-[40px] border border-amber-400/40"
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
            <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl animate-fade-in my-8">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
                <h4 className="text-base font-bold text-slate-900 font-prompt whitespace-nowrap">
                  {editingMission ? 'แก้ไขบันทึกภารกิจ' : 'เพิ่มบันทึกภารกิจกู้ชีพใหม่'}
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
                  <label className="block text-xs font-bold text-slate-700 font-prompt mb-1.5 whitespace-nowrap">
                    หัวข้อภารกิจ *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="เช่น ภารกิจดำน้ำค้นหาแหวนเพชร..."
                    value={missionForm.title}
                    onChange={(e) => setMissionForm({ ...missionForm, title: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-full text-sm text-slate-900 focus:outline-none focus:border-[#16377e] font-sarabun"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 font-prompt mb-1.5 whitespace-nowrap">
                      หมวดหมู่ภารกิจ
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
                    <label className="block text-xs font-bold text-slate-700 font-prompt mb-1.5 whitespace-nowrap">
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 font-prompt mb-1.5 whitespace-nowrap">
                      สถานที่เกิดเหตุ
                    </label>
                    <input
                      type="text"
                      placeholder="เช่น ถนนแจ้งสนิท, แม่น้ำชี..."
                      value={missionForm.location}
                      onChange={(e) =>
                        setMissionForm({ ...missionForm, location: e.target.value })
                      }
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-full text-xs text-slate-900 focus:outline-none font-sarabun"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 font-prompt mb-1.5 whitespace-nowrap">
                      ป้ายกำกับพิเศษ (Tag)
                    </label>
                    <input
                      type="text"
                      placeholder="เช่น ภารกิจระดับจังหวัด, กู้ภัยทางน้ำ..."
                      value={missionForm.special_tag}
                      onChange={(e) =>
                        setMissionForm({ ...missionForm, special_tag: e.target.value })
                      }
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-full text-xs text-slate-900 focus:outline-none font-sarabun"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 font-prompt mb-1.5 whitespace-nowrap">
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
                  <label className="block text-xs font-bold text-slate-700 font-prompt mb-1.5 whitespace-nowrap">
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
                  <label className="block text-xs font-bold text-slate-700 font-prompt mb-1.5 whitespace-nowrap">
                    รายงานฉบับเต็ม (Full Details)
                  </label>
                  <textarea
                    rows={4}
                    value={missionForm.details}
                    onChange={(e) => setMissionForm({ ...missionForm, details: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-sm text-slate-900 focus:outline-none focus:border-[#16377e] font-sarabun"
                  />
                </div>

                <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowMissionModal(false)}
                    className="px-5 py-2 text-slate-600 hover:text-slate-900 text-xs font-prompt cursor-pointer rounded-full hover:bg-slate-100 transition-colors whitespace-nowrap min-h-[36px]"
                  >
                    ยกเลิก
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#16377e] hover:bg-[#0f2452] text-white font-bold text-xs rounded-full font-prompt transition-colors cursor-pointer shadow-xs whitespace-nowrap min-h-[40px] border border-amber-400/40"
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
            <div className="w-full max-w-xl bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl animate-fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
                <h4 className="text-base font-bold text-slate-900 font-prompt whitespace-nowrap">
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
                  <label className="block text-xs font-bold text-slate-700 font-prompt mb-1.5 whitespace-nowrap">
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
                  <label className="block text-xs font-bold text-slate-700 font-prompt mb-1.5 whitespace-nowrap">
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
                  <label className="block text-xs font-bold text-slate-700 font-prompt mb-1.5 whitespace-nowrap">
                    เนื้อหาข่าวสารฉบับเต็ม
                  </label>
                  <textarea
                    rows={3}
                    value={newsForm.content}
                    onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-sm text-slate-900 focus:outline-none focus:border-[#16377e] font-sarabun"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 font-prompt mb-1.5 whitespace-nowrap">
                      วันที่ประกาศ
                    </label>
                    <input
                      type="date"
                      value={newsForm.published_date}
                      onChange={(e) =>
                        setNewsForm({ ...newsForm, published_date: e.target.value })
                      }
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-full text-xs text-slate-900 focus:outline-none font-mono"
                    />
                  </div>

                  <div className="flex items-center pt-5">
                    <label className="flex items-center gap-2 text-xs text-slate-800 font-prompt cursor-pointer whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={newsForm.is_pinned}
                        onChange={(e) =>
                          setNewsForm({ ...newsForm, is_pinned: e.target.checked })
                        }
                        className="rounded-full text-[#16377e] focus:ring-[#16377e] w-4 h-4 aspect-square"
                      />
                      <span className="whitespace-nowrap">ปักหมุดเป็นข่าวเด่น</span>
                    </label>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowNewsModal(false)}
                    className="px-5 py-2 text-slate-600 hover:text-slate-900 text-xs font-prompt cursor-pointer rounded-full hover:bg-slate-100 transition-colors whitespace-nowrap min-h-[36px]"
                  >
                    ยกเลิก
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#16377e] hover:bg-[#0f2452] text-white font-bold text-xs rounded-full font-prompt transition-colors cursor-pointer shadow-xs whitespace-nowrap min-h-[40px] border border-amber-400/40"
                  >
                    บันทึกข่าวสาร
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
