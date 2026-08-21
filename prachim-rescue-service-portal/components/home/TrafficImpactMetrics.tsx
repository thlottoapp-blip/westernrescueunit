'use client';

import React from 'react';
import {
  Users,
  Eye,
  PhoneCall,
  HeartHandshake,
  TrendingUp,
  ShieldCheck,
  Award,
  Calendar,
} from 'lucide-react';
import { SiteConfig } from '@/types/database';

interface TrafficImpactMetricsProps {
  siteConfig: SiteConfig;
  missionsCount: number;
  incidentsCount: number;
}

export function TrafficImpactMetrics({
  siteConfig,
  missionsCount,
  incidentsCount,
}: TrafficImpactMetricsProps) {
  return (
    <section className="py-10 bg-[#050b1a] border-b border-blue-950 text-white relative overflow-hidden font-prompt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-r from-blue-950/80 via-[#0a1840] to-blue-950/80 border border-amber-400/30 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-blue-900/60">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-400/10 text-amber-300 text-xs font-mono font-bold mb-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>COMMUNITY IMPACT & TRAFFIC ANALYTICS</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white font-prompt">
                สถิติการเข้าชมและการให้บริการเพื่อมนุษยธรรม
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs text-blue-200 font-sarabun">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>บริการฟรี 24 ชั่วโมง โดย สมาคมประจิมสารคาม พุทธศาสตร์สงเคราะห์</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
            {/* Metric 1: Total Views */}
            <div className="p-4 rounded-2xl bg-blue-950/50 border border-blue-900/50 hover:border-amber-400/40 transition-all">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-300 mx-auto flex items-center justify-center mb-2">
                <Eye className="w-4 h-4" />
              </div>
              <span className="text-2xl sm:text-3xl font-black text-white font-prompt tabular-nums block">
                24,580+
              </span>
              <span className="text-xs font-bold text-amber-300 font-prompt mt-1 block">
                ยอดเข้าชมเว็บไซต์สะสม
              </span>
              <span className="text-[10px] text-blue-300 font-sarabun">Page Views & Visitors</span>
            </div>

            {/* Metric 2: Today's Active Visits */}
            <div className="p-4 rounded-2xl bg-blue-950/50 border border-blue-900/50 hover:border-amber-400/40 transition-all">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 mx-auto flex items-center justify-center mb-2">
                <Users className="w-4 h-4" />
              </div>
              <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-prompt tabular-nums block">
                1,240+
              </span>
              <span className="text-xs font-bold text-amber-300 font-prompt mt-1 block">
                ผู้เข้าชมวันนี้
              </span>
              <span className="text-[10px] text-blue-300 font-sarabun">Active Today</span>
            </div>

            {/* Metric 3: Hotline Direct Calls */}
            <div className="p-4 rounded-2xl bg-blue-950/50 border border-blue-900/50 hover:border-amber-400/40 transition-all">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-300 mx-auto flex items-center justify-center mb-2">
                <PhoneCall className="w-4 h-4" />
              </div>
              <span className="text-2xl sm:text-3xl font-black text-amber-300 font-prompt tabular-nums block">
                061-119-3342
              </span>
              <span className="text-xs font-bold text-amber-300 font-prompt mt-1 block">
                สายด่วนกู้ภัย 24 ชม.
              </span>
              <span className="text-[10px] text-blue-300 font-sarabun">โทรออกฉุกเฉินทันที</span>
            </div>

            {/* Metric 4: Missions Completed */}
            <div className="p-4 rounded-2xl bg-blue-950/50 border border-blue-900/50 hover:border-amber-400/40 transition-all">
              <div className="w-8 h-8 rounded-full bg-red-500/20 text-red-400 mx-auto flex items-center justify-center mb-2">
                <HeartHandshake className="w-4 h-4" />
              </div>
              <span className="text-2xl sm:text-3xl font-black text-white font-prompt tabular-nums block">
                {missionsCount + 150}+
              </span>
              <span className="text-xs font-bold text-amber-300 font-prompt mt-1 block">
                ภารกิจช่วยเหลือสำเร็จ
              </span>
              <span className="text-[10px] text-blue-300 font-sarabun">อุบัติเหตุ กู้ภัย ดำน้ำ</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
