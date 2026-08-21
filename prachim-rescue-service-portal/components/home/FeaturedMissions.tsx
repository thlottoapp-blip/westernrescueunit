'use client';

import React, { useState } from 'react';
import {
  Waves,
  Ambulance,
  ShieldAlert,
  Calendar,
  MapPin,
  Users,
  Search,
  Eye,
  Tag,
  ArrowUpRight,
} from 'lucide-react';
import { MissionLog } from '@/types/database';

interface FeaturedMissionsProps {
  missions: MissionLog[];
  onSelectMission: (mission: MissionLog) => void;
}

export function FeaturedMissions({ missions, onSelectMission }: FeaturedMissionsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filterTabs = [
    { id: 'all', label: 'ภารกิจทั้งหมด' },
    { id: 'water-rescue', label: 'กู้ภัยทางน้ำ & ประดาน้ำ' },
    { id: 'ems-accident', label: 'EMS & อุบัติเหตุถนน' },
    { id: 'disaster-community', label: 'บรรเทาสาธารณภัย & สัตว์มีพิษ' },
    { id: 'indigent-transport', label: 'สงเคราะห์ผู้ยากไร้' },
  ];

  const filteredMissions = missions.filter((m) => {
    const matchesCat = selectedCategory === 'all' || m.category_slug === selectedCategory;
    const matchesSearch =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section id="section-missions" className="py-16 sm:py-24 bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#16377e] font-mono text-xs uppercase tracking-widest font-bold mb-2">
              <span className="w-6 h-[2px] bg-amber-500 inline-block"></span>
              <span className="text-amber-700">OPERATIONAL ARCHIVE & HALL OF FAME</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-prompt">
              ผลงานและภารกิจการปฏิบัติการ
            </h2>
            <p className="text-slate-600 text-sm sm:text-base font-sarabun mt-1">
              บันทึกผลงานการกู้ชีพ-กู้ภัย ภารกิจประดาน้ำระดับจังหวัด และการช่วยเหลือประชาชนในพื้นที่
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 shrink-0" />
            <input
              type="text"
              placeholder="ค้นหาภารกิจ เช่น แม่น้ำชี, ตัดถ่าง..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-300 rounded-full text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#16377e] font-sarabun shadow-xs"
            />
          </div>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`inline-flex items-center justify-center px-4.5 py-2 rounded-full text-xs sm:text-sm font-semibold font-prompt whitespace-nowrap transition-all cursor-pointer border min-h-[38px] ${
                selectedCategory === tab.id
                  ? 'bg-[#16377e] border-amber-400 text-white shadow-md shadow-blue-950/20'
                  : 'bg-white hover:bg-blue-50/50 border-slate-200 text-slate-700 hover:text-[#16377e] shadow-xs'
              }`}
            >
              <span className="whitespace-nowrap">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Missions Grid */}
        {filteredMissions.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 shadow-xs">
            <p className="text-slate-500 text-sm font-sarabun whitespace-nowrap">ไม่พบรายการภารกิจที่ตรงกับคำค้นหา</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMissions.map((mission) => (
              <div
                key={mission.id}
                onClick={() => onSelectMission(mission)}
                className="group rounded-3xl bg-white border border-slate-200 hover:border-[#16377e] overflow-hidden shadow-xs hover:shadow-xl hover:shadow-blue-950/10 transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1"
              >
                {/* Image Container */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${mission.cover_image_url})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a193b]/90 via-[#0a193b]/30 to-transparent" />

                  {/* Special Tag */}
                  {mission.special_tag && (
                    <div className="absolute top-3 left-3 z-10">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-[#16377e]/95 text-amber-200 border border-amber-400/40 shadow-md font-prompt whitespace-nowrap">
                        <Tag className="w-3 h-3 text-amber-300 shrink-0" />
                        <span className="whitespace-nowrap">{mission.special_tag}</span>
                      </span>
                    </div>
                  )}

                  {/* Date Badge */}
                  <div className="absolute bottom-3 right-3 z-10 bg-black/75 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20 text-xs text-white font-mono flex items-center gap-1.5 shadow-sm whitespace-nowrap">
                    <Calendar className="w-3 h-3 text-amber-400 shrink-0" />
                    <span className="whitespace-nowrap tabular-nums">{mission.incident_date}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Location */}
                    <div className="flex items-center gap-1.5 text-xs text-[#16377e] font-sarabun mb-2 font-bold whitespace-nowrap truncate">
                      <MapPin className="w-3.5 h-3.5 shrink-0 text-amber-600" />
                      <span className="truncate">{mission.location}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-bold text-slate-900 font-prompt group-hover:text-[#16377e] transition-colors line-clamp-2 mb-2 leading-snug">
                      {mission.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-slate-600 text-xs sm:text-sm font-sarabun line-clamp-3 leading-relaxed">
                      {mission.summary}
                    </p>
                  </div>

                  {/* Card Bottom Meta */}
                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-sarabun">
                    <div className="flex items-center gap-1 whitespace-nowrap">
                      <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="whitespace-nowrap">{mission.officer_count} นาย</span>
                    </div>

                    <span className="text-[#16377e] font-bold font-prompt inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform whitespace-nowrap">
                      <span className="whitespace-nowrap">อ่านรายงาน</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
