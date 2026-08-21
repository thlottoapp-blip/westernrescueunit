'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { OfficialLogo } from '@/components/shared/OfficialLogo';
import {
  FacebookIcon,
  LineIcon,
  TikTokIcon,
  YouTubeIcon,
} from '@/components/shared/OfficialIcons';
import {
  PhoneCall,
  Flame,
  Ambulance,
  Waves,
  HeartHandshake,
  Lock,
  Menu,
  X,
  Radio,
  FileText,
  BadgeAlert,
  ShieldAlert,
  MapPin,
  Clock,
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenReportModal: () => void;
  onOpenAdminModal: () => void;
  onOpenNewsPage?: () => void;
  isAdminAuthenticated: boolean;
}

export function Navbar({
  activeTab,
  setActiveTab,
  onOpenReportModal,
  onOpenAdminModal,
  onOpenNewsPage,
  isAdminAuthenticated,
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'หน้าหลัก', icon: Radio },
    { id: 'news', label: 'ข่าวสาร', icon: Radio },
    { id: 'departments', label: 'ภารกิจ & แผนก', icon: Ambulance },
    { id: 'missions', label: 'ผลงานปฏิบัติการ', icon: Waves },
    { id: 'pricing', label: 'เกณฑ์ค่าบริการ', icon: FileText },
    { id: 'about', label: 'เกี่ยวกับหน่วยงาน', icon: ShieldAlert },
    { id: 'contact', label: 'ติดต่อฉุกเฉิน', icon: PhoneCall },
  ];

  const handleNavClick = (id: string) => {
    if (id === 'news' && onOpenNewsPage) {
      onOpenNewsPage();
      setIsMobileMenuOpen(false);
      return;
    }
    setActiveTab(id);
    setIsMobileMenuOpen(false);

    if (id !== 'home') {
      const element = document.getElementById(`section-${id}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      {/* Top Official Utility Strip with Social Media & Hotline */}
      <div className="bg-[#08132b] text-slate-200 border-b border-blue-900/60 text-xs py-1.5 px-3 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          {/* Left: Station Status & Address */}
          <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs min-w-0">
            <span className="inline-flex items-center gap-1.5 bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full font-mono font-bold whitespace-nowrap text-[10px] sm:text-xs shrink-0 whitespace-nowrap">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
              <span>DISPATCH 24/7</span>
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-blue-200/80 font-sarabun whitespace-nowrap truncate">
              <MapPin className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span>ถ.แจ้งสนิท อ.บรบือ จ.มหาสารคาม</span>
            </span>
          </div>

          {/* Right: Social Media Icons + Hotlines */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Social Media Official Icons */}
            <div className="hidden sm:flex items-center gap-1.5">
              <a
                href="https://www.facebook.com/search/top?q=หน่วยกู้ภัยประจิม+บรบือ"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook: หน่วยกู้ภัยประจิม บรบือ"
                className="w-5.5 h-5.5 rounded-full flex items-center justify-center hover:scale-110 transition-transform bg-[#1877F2] text-white shadow-xs"
              >
                <FacebookIcon size={12} />
              </a>
              <a
                href="https://line.me/R/ti/p/@prachimrescue"
                target="_blank"
                rel="noopener noreferrer"
                title="LINE Official: @prachimrescue"
                className="w-5.5 h-5.5 rounded-full flex items-center justify-center hover:scale-110 transition-transform bg-[#06C755] text-white shadow-xs"
              >
                <LineIcon size={12} />
              </a>
              <a
                href="https://www.tiktok.com/@prachimrescue"
                target="_blank"
                rel="noopener noreferrer"
                title="TikTok: @prachimrescue"
                className="w-5.5 h-5.5 rounded-full flex items-center justify-center hover:scale-110 transition-transform bg-black text-white border border-slate-700 shadow-xs"
              >
                <TikTokIcon size={12} />
              </a>
              <a
                href="https://www.youtube.com/results?search_query=หน่วยกู้ภัยประจิม+บรบือ"
                target="_blank"
                rel="noopener noreferrer"
                title="YouTube: กู้ภัยประจิม Official"
                className="w-5.5 h-5.5 rounded-full flex items-center justify-center hover:scale-110 transition-transform bg-[#FF0000] text-white shadow-xs"
              >
                <YouTubeIcon size={12} />
              </a>
            </div>

            {/* Quick Hotline Call Button */}
            <a
              href="tel:0611193342"
              className="inline-flex items-center gap-1 sm:gap-1.5 text-amber-300 hover:text-amber-200 font-prompt font-bold text-[11px] sm:text-xs transition-colors whitespace-nowrap whitespace-nowrap"
            >
              <PhoneCall className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 animate-pulse shrink-0" />
              <span className="hidden xs:inline">สายด่วน:</span>
              <span className="font-mono tabular-nums">061-119-3342</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          {/* Logo and Org Name */}
          <div
            className="flex items-center gap-2.5 sm:gap-3.5 cursor-pointer group shrink-0"
            onClick={() => handleNavClick('home')}
          >
            {/* Official Rescue Logo Badge */}
            <div className="relative group-hover:scale-105 transition-transform shrink-0">
              <OfficialLogo size={46} withGlow={false} />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-emerald-500 border-2 border-white shadow-sm" title="ศูนย์สั่งการออนไลน์ 24 ชม."></div>
            </div>

            {/* Typography */}
            <div className="flex flex-col justify-center shrink-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-base sm:text-lg md:text-xl xl:text-2xl font-black tracking-tight text-slate-900 font-prompt leading-none group-hover:text-blue-900 transition-colors whitespace-nowrap">
                  หน่วยกู้ภัยประจิม
                </span>
                <span className="inline-block bg-amber-400 text-slate-950 text-[10px] sm:text-[11px] font-black uppercase tracking-wide px-2 py-0.5 rounded-md border border-amber-500 font-prompt whitespace-nowrap shrink-0 shadow-xs">
                  สมาคมประจิมสารคาม
                </span>
              </div>
              <span className="text-[11px] sm:text-xs text-slate-600 font-sarabun hidden sm:block font-medium whitespace-nowrap mt-1">
                สมาคมประจิมสารคาม พุทธศาสตร์สงเคราะห์ • อ.บรบือ จ.มหาสารคาม
              </span>
              <span className="text-[10px] text-slate-500 font-sarabun block sm:hidden font-medium leading-tight whitespace-nowrap mt-0.5">
                พุทธศาสตร์สงเคราะห์ • บรบือ
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center space-x-1 shrink-0">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => handleNavClick(link.id)}
                  className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer font-prompt whitespace-nowrap min-h-[36px] ${
                    isActive
                      ? 'bg-[#16377e] text-white shadow-md shadow-blue-950/20 font-bold border border-amber-400/50'
                      : 'text-slate-700 hover:text-[#16377e] hover:bg-blue-50/80'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-amber-300' : 'text-slate-500'}`} />
                  <span className="whitespace-nowrap">{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action CTA & Admin Portal Button */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <button
              id="navbar-open-report-btn"
              onClick={onOpenReportModal}
              className="inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-red-600 via-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-xs px-3.5 py-2 rounded-full shadow-md shadow-red-600/25 hover:shadow-red-600/40 border border-red-500 transition-all cursor-pointer transform hover:-translate-y-0.5 font-prompt whitespace-nowrap shrink-0 min-h-[38px]"
            >
              <div className="w-4.5 h-4.5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <BadgeAlert className="w-3 h-3 animate-pulse text-white" />
              </div>
              <span className="whitespace-nowrap">แจ้งเหตุฉุกเฉิน</span>
            </button>

            <button
              id="navbar-open-admin-btn"
              onClick={onOpenAdminModal}
              title="เข้าสู่ระบบจัดการศูนย์สั่งการ (Admin)"
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold border transition-all cursor-pointer font-prompt bg-slate-900 hover:bg-[#16377e] text-amber-300 hover:text-white border-amber-400/60 shadow-md shadow-blue-950/20 whitespace-nowrap shrink-0 min-h-[38px]"
            >
              <div className="w-4 h-4 rounded-full bg-amber-400/20 flex items-center justify-center shrink-0">
                <Lock className="w-2.5 h-2.5 text-amber-300" />
              </div>
              <span suppressHydrationWarning className="whitespace-nowrap">
                {isAdminAuthenticated ? 'ศูนย์สั่งการ' : 'แอดมิน'}
              </span>
            </button>
          </div>

          {/* Mobile/Tablet Right Controls */}
          <div className="flex xl:hidden items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={onOpenReportModal}
              className="inline-flex items-center gap-1 sm:gap-1.5 bg-red-600 hover:bg-red-700 active:scale-95 text-white text-[11px] sm:text-xs font-bold px-2.5 sm:px-3 py-1.5 rounded-full shadow-sm whitespace-nowrap min-h-[32px] sm:min-h-[34px] transition-all cursor-pointer whitespace-nowrap"
            >
              <BadgeAlert className="w-3.5 h-3.5 shrink-0 animate-pulse" />
              <span className="whitespace-nowrap">แจ้งเหตุ</span>
            </button>

            <button
              onClick={onOpenAdminModal}
              title="ระบบแอดมิน"
              className="inline-flex items-center gap-1 bg-slate-900 hover:bg-[#16377e] active:scale-95 text-amber-300 border border-amber-400/60 text-[11px] sm:text-xs font-semibold px-2.5 py-1.5 rounded-full shadow-xs whitespace-nowrap min-h-[32px] sm:min-h-[34px] transition-all cursor-pointer whitespace-nowrap"
            >
              <Lock className="w-3 h-3 text-amber-300 shrink-0" />
              <span className="whitespace-nowrap">แอดมิน</span>
            </button>

            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none transition-colors cursor-pointer"
              aria-label="เมนูหลักแบบแซนวิช"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Sandwich Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-200">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`inline-flex items-center gap-2 p-3 rounded-xl text-xs sm:text-sm text-left transition-colors cursor-pointer font-prompt whitespace-nowrap min-h-[44px] ${
                    isActive
                      ? 'bg-[#16377e] text-white font-bold border border-amber-400/50 shadow-sm'
                      : 'text-slate-700 hover:bg-blue-50/80 hover:text-[#16377e]'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-amber-300' : 'text-slate-500'}`} />
                  <span className="whitespace-nowrap truncate">{link.label}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile Social Links */}
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between gap-2">
            <span className="text-xs font-bold text-slate-700 font-prompt">ช่องทางโซเชียลมีเดีย:</span>
            <div className="flex items-center gap-2">
              <a
                href="https://www.facebook.com/search/top?q=หน่วยกู้ภัยประจิม+บรบือ"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full flex items-center justify-center bg-[#1877F2] text-white shadow-xs"
              >
                <FacebookIcon size={16} />
              </a>
              <a
                href="https://line.me/R/ti/p/@prachimrescue"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full flex items-center justify-center bg-[#06C755] text-white shadow-xs"
              >
                <LineIcon size={16} />
              </a>
              <a
                href="https://www.tiktok.com/@prachimrescue"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full flex items-center justify-center bg-black text-white shadow-xs"
              >
                <TikTokIcon size={16} />
              </a>
              <a
                href="https://www.youtube.com/results?search_query=หน่วยกู้ภัยประจิม+บรบือ"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full flex items-center justify-center bg-[#FF0000] text-white shadow-xs"
              >
                <YouTubeIcon size={16} />
              </a>
            </div>
          </div>

          <div className="pt-1 flex flex-col gap-2.5">
            <a
              href="tel:0611193342"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold py-3 rounded-full shadow text-xs sm:text-sm whitespace-nowrap min-h-[44px] whitespace-nowrap"
            >
              <PhoneCall className="w-4 h-4 shrink-0 animate-pulse" />
              <span className="whitespace-nowrap">โทรด่วนกู้ภัยประจิม 061-119-3342</span>
            </a>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenAdminModal();
              }}
              className="inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 py-3 rounded-full text-xs sm:text-sm border border-slate-300 font-semibold whitespace-nowrap min-h-[44px] whitespace-nowrap"
            >
              <Lock className="w-4 h-4 text-slate-600 shrink-0" />
              <span className="whitespace-nowrap">ระบบศูนย์สั่งการเจ้าหน้าที่ (Admin Portal)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

