'use client';

import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  PhoneCall,
  ShieldAlert,
  Ambulance,
  Waves,
  Flame,
  LifeBuoy,
  BadgeAlert,
} from 'lucide-react';
import { usePrachimStore } from '@/lib/store';

function renderSlideIcon(name?: string) {
  switch (name) {
    case 'Waves':
      return <Waves className="w-4 h-4 text-amber-300 shrink-0" />;
    case 'ShieldAlert':
      return <ShieldAlert className="w-4 h-4 text-amber-300 shrink-0" />;
    case 'LifeBuoy':
      return <LifeBuoy className="w-4 h-4 text-amber-300 shrink-0" />;
    case 'Flame':
      return <Flame className="w-4 h-4 text-amber-300 shrink-0" />;
    default:
      return <Ambulance className="w-4 h-4 text-amber-300 shrink-0" />;
  }
}

interface HeroSliderProps {
  onOpenReportModal: () => void;
  onExploreMissions: () => void;
}

export function HeroSlider({ onOpenReportModal, onExploreMissions }: HeroSliderProps) {
  const { heroSlides, siteConfig } = usePrachimStore();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Filter active slides and sort by order
  const activeSlides = (heroSlides && heroSlides.length > 0)
    ? heroSlides.filter((s) => s.is_active).sort((a, b) => a.sort_order - b.sort_order)
    : [];

  const displaySlides = activeSlides.length > 0 ? activeSlides : [
    {
      id: 'default-1',
      badge: 'การแพทย์ฉุกเฉินและอุบัติเหตุทางถนน 24 ชม.',
      title_line1: 'เข้าถึงรวดเร็ว. กู้ชีพฉุกเฉิน.',
      title_line2: 'ช่วยเหลือทุกชีวิต ปลอดภัย.',
      subtitle:
        'หน่วยกู้ภัยประจิม (สมาคมประจิมสารคาม พุทธศาสตร์สงเคราะห์) พร้อมทีมกู้ชีพ EMT-B รถพยาบาลกู้ชีพ และอุปกรณ์ตัด-ถ่างไฮดรอลิก ดูแลประชาชนบนถนนแจ้งสนิทและทั่วอำเภอบรบือ ตลอด 24 ชั่วโมง ฟรี 100%',
      cover_image:
        'https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=1920&q=80',
      icon_name: 'Ambulance',
      stat1_val: '< 8 นาที',
      stat1_lbl: 'เวลาตอบสนองเฉลี่ย',
      stat2_val: 'ฟรี 100%',
      stat2_lbl: 'บริการอุบัติเหตุ EMS',
      stat3_val: '24 ชั่วโมง',
      stat3_lbl: 'ปฏิบัติการต่อเนื่อง',
      primary_btn_text: 'แจ้งเหตุด่วนฉุกเฉิน',
      primary_btn_action: 'report' as const,
      secondary_btn_text: `โทร ${siteConfig?.hotline_primary || '061-119-3342'}`,
      secondary_btn_url: `tel:${siteConfig?.hotline_primary?.replace(/-/g, '') || '0611193342'}`,
      is_active: true,
      sort_order: 1,
    },
  ];

  // Auto-play interval
  useEffect(() => {
    if (isPaused || displaySlides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % displaySlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, displaySlides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? displaySlides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % displaySlides.length);
  };

  const activeSlide = displaySlides[currentSlide] || displaySlides[0];

  return (
    <section
      className="relative w-full overflow-hidden bg-[#070b14] border-b border-slate-800"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image Container with Smooth Transition */}
      <div className="relative min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] flex items-center">
        {displaySlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Image Overlay */}
            <div
              className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-10000 ease-linear"
              style={{
                backgroundImage: `url(${slide.cover_image})`,
                transform: index === currentSlide ? 'scale(1.05)' : 'scale(1)',
              }}
            />
            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#07132e] via-[#0a193b]/90 to-[#07132e]/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07132e] via-transparent to-black/60" />
            <div className="absolute inset-0 bg-blue-950/30 mix-blend-multiply" />
          </div>
        ))}

        {/* Content Overlay */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 w-full">
          <div className="max-w-3xl">
            {/* Slide Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#16377e]/85 border border-amber-400/60 backdrop-blur-md mb-4 shadow-md shadow-blue-950/40 whitespace-nowrap">
              {renderSlideIcon(activeSlide.icon_name)}
              <span className="text-xs sm:text-sm font-bold tracking-wide text-amber-300 font-prompt whitespace-nowrap">
                {activeSlide.badge}
              </span>
            </div>

            {/* Slide Headings */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.2] mb-4 font-prompt">
              <span className="block text-white drop-shadow-md whitespace-normal">{activeSlide.title_line1}</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-200 drop-shadow-md whitespace-normal">
                {activeSlide.title_line2}
              </span>
            </h1>

            {/* Slide Subtitle */}
            <p className="text-blue-100 text-sm sm:text-base lg:text-lg font-sarabun leading-relaxed mb-8 max-w-2xl drop-shadow">
              {activeSlide.subtitle}
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10">
              <button
                id="hero-primary-action-btn"
                onClick={() => {
                  if (activeSlide.primary_btn_action === 'missions') {
                    onExploreMissions();
                  } else {
                    onOpenReportModal();
                  }
                }}
                className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-red-600 via-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold px-7 py-3.5 rounded-full shadow-xl shadow-red-950/60 border border-red-400/40 text-sm sm:text-base transition-all transform hover:-translate-y-0.5 cursor-pointer font-prompt whitespace-nowrap shrink-0 min-h-[48px]"
              >
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <BadgeAlert className="w-4 h-4 animate-pulse text-white" />
                </div>
                <span className="whitespace-nowrap">{activeSlide.primary_btn_text}</span>
              </button>

              <a
                id="hero-secondary-action-btn"
                href={activeSlide.secondary_btn_url || `tel:${siteConfig?.hotline_primary?.replace(/-/g, '') || '0611193342'}`}
                className="inline-flex items-center justify-center gap-2.5 bg-[#16377e]/90 hover:bg-[#1f489e] text-white font-bold px-6 py-3.5 rounded-full border border-amber-400/50 shadow-md text-sm sm:text-base transition-all font-prompt whitespace-nowrap shrink-0 min-h-[48px]"
              >
                <div className="w-5 h-5 rounded-full bg-amber-400/20 flex items-center justify-center shrink-0">
                  <PhoneCall className="w-3.5 h-3.5 text-amber-300" />
                </div>
                <span className="whitespace-nowrap tabular-nums">
                  {activeSlide.secondary_btn_text || `โทร ${siteConfig?.hotline_primary || '061-119-3342'}`}
                </span>
              </a>
            </div>

            {/* Slide Key Metrics Strip */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-6 border-t border-blue-800/60 max-w-xl">
              <div className="flex flex-col">
                <span className="text-base sm:text-xl font-bold text-amber-300 font-prompt whitespace-nowrap tabular-nums">
                  {activeSlide.stat1_val}
                </span>
                <span className="text-[11px] sm:text-xs text-blue-200 font-sarabun whitespace-nowrap">
                  {activeSlide.stat1_lbl}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-xl font-bold text-amber-300 font-prompt whitespace-nowrap tabular-nums">
                  {activeSlide.stat2_val}
                </span>
                <span className="text-[11px] sm:text-xs text-blue-200 font-sarabun whitespace-nowrap">
                  {activeSlide.stat2_lbl}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-xl font-bold text-amber-300 font-prompt whitespace-nowrap tabular-nums">
                  {activeSlide.stat3_val}
                </span>
                <span className="text-[11px] sm:text-xs text-blue-200 font-sarabun whitespace-nowrap">
                  {activeSlide.stat3_lbl}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Navigation Arrows */}
        {displaySlides.length > 1 && (
          <>
            <button
              id="hero-slider-prev-btn"
              onClick={prevSlide}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-[#0a193b]/75 hover:bg-[#16377e] text-white border border-amber-400/40 flex items-center justify-center backdrop-blur-sm transition-all cursor-pointer shadow-lg shrink-0 aspect-square"
              aria-label="สไลด์ก่อนหน้า"
            >
              <ChevronLeft className="w-6 h-6 shrink-0" />
            </button>

            <button
              id="hero-slider-next-btn"
              onClick={nextSlide}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-[#0a193b]/75 hover:bg-[#16377e] text-white border border-amber-400/40 flex items-center justify-center backdrop-blur-sm transition-all cursor-pointer shadow-lg shrink-0 aspect-square"
              aria-label="สไลด์ถัดไป"
            >
              <ChevronRight className="w-6 h-6 shrink-0" />
            </button>

            {/* Slider Indicator Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5">
              {displaySlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    index === currentSlide
                      ? 'w-8 bg-gradient-to-r from-amber-400 to-amber-500 shadow-md shadow-amber-400/50'
                      : 'w-2.5 bg-blue-300/40 hover:bg-amber-300/80'
                  }`}
                  aria-label={`ไปยังสไลด์ที่ ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
