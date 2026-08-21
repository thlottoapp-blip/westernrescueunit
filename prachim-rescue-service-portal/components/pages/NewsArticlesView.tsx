'use client';

import React, { useState, useMemo } from 'react';
import {
  Radio,
  Search,
  Calendar,
  User,
  ArrowLeft,
  Share2,
  Tag,
  Clock,
  Sparkles,
  ChevronRight,
  Filter,
  CheckCircle,
  Eye,
  PhoneCall,
  Flame,
  ShieldAlert,
} from 'lucide-react';
import { NewsArticle } from '@/types/database';
import { OfficialLogo } from '@/components/shared/OfficialLogo';

interface NewsArticlesViewProps {
  news: NewsArticle[];
  onBackToHome: () => void;
  onOpenReportModal: () => void;
}

export function NewsArticlesView({
  news,
  onBackToHome,
  onOpenReportModal,
}: NewsArticlesViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'announcement' | 'rescue' | 'activity'>('all');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  // Filtered Articles
  const filteredNews = useMemo(() => {
    return news.filter((art) => {
      const matchSearch =
        art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        art.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        art.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        art.author_name?.toLowerCase().includes(searchTerm.toLowerCase());

      if (selectedCategory === 'all') return matchSearch;
      if (selectedCategory === 'announcement') return matchSearch && (art.title.includes('ประกาศ') || art.is_pinned);
      if (selectedCategory === 'rescue') return matchSearch && (art.title.includes('กู้ภัย') || art.title.includes('อุบัติเหตุ'));
      if (selectedCategory === 'activity') return matchSearch && (art.title.includes('พิธี') || art.title.includes('กิจกรรม') || art.title.includes('พ่อปู่'));
      return matchSearch;
    });
  }, [news, searchTerm, selectedCategory]);

  const pinnedArticle = news.find((n) => n.is_pinned) || news[0];

  const handleShare = async (article: NewsArticle) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.summary,
          url: window.location.href,
        });
      } catch {
        // Fallback
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('คัดลอกลิงก์ข่าวเรียบร้อยแล้ว');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-prompt selection:bg-red-600 selection:text-white flex flex-col">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-[#08132b] text-white border-b border-blue-900/60 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-950/80 hover:bg-blue-900 text-blue-200 text-xs font-bold border border-blue-800 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>กลับสู่หน้าหลัก</span>
            </button>
            <div className="hidden sm:flex items-center gap-2">
              <OfficialLogo size={32} withGlow={false} />
              <span className="text-sm font-bold text-white">ศูนย์ข่าวสารและประชาสัมพันธ์</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="tel:0611193342"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold font-prompt shadow-sm transition-all"
            >
              <PhoneCall className="w-3.5 h-3.5 text-slate-950" />
              <span>061-119-3342</span>
            </a>
            <button
              onClick={onOpenReportModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              <span>แจ้งเหตุด่วน</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        {/* Banner Title */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-[#16377e] text-xs font-bold font-mono">
            <Radio className="w-3.5 h-3.5 text-[#16377e] animate-pulse" />
            <span>PRACHIM RESCUE MEDIA & NEWSROOM</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            ข่าวสารและประกาศประชาสัมพันธ์
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm font-sarabun">
            ติดตามข่าวสารการแจ้งเตือนภัย กิจกรรมช่วยเหลือสังคม และประกาศทางการจากสมาคมประจิมสารคาม พุทธศาสตร์สงเคราะห์
          </p>
        </div>

        {/* Featured Pinned Article (if available) */}
        {pinnedArticle && selectedCategory === 'all' && !searchTerm && (
          <div
            onClick={() => setSelectedArticle(pinnedArticle)}
            className="rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-xl hover:shadow-2xl transition-all cursor-pointer group grid grid-cols-1 lg:grid-cols-12 gap-0"
          >
            <div className="lg:col-span-7 relative h-64 sm:h-80 lg:h-auto overflow-hidden bg-slate-900">
              <div
                className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                style={{ backgroundImage: `url(${pinnedArticle.cover_image_url})` }}
              />
              <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-bold shadow-md">
                <Sparkles className="w-3.5 h-3.5" />
                <span>ข่าวเด่น / ปักหมุด</span>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                  <Calendar className="w-3.5 h-3.5 text-blue-600" />
                  <span>{pinnedArticle.published_date}</span>
                  <span>•</span>
                  <span>{pinnedArticle.author_name}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-blue-700 transition-colors leading-snug">
                  {pinnedArticle.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 font-sarabun line-clamp-3 leading-relaxed">
                  {pinnedArticle.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#16377e]">
                <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  อ่านรายละเอียดฉบับเต็ม <ChevronRight className="w-4 h-4" />
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShare(pinnedArticle);
                  }}
                  className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
                  title="แชร์ข่าวสาร"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full md:w-auto pb-1 md:pb-0">
            {[
              { id: 'all', label: 'ทั้งหมด' },
              { id: 'announcement', label: '📢 ประกาศทางการ' },
              { id: 'rescue', label: '🚑 ข่าวกู้ภัย & อุบัติเหตุ' },
              { id: 'activity', label: '🙏 กิจกรรมสมาคม & พ่อปู่' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as typeof selectedCategory)}
                className={`
                  px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer
                  ${
                    selectedCategory === cat.id
                      ? 'bg-[#16377e] text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }
                `}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="ค้นหาหัวข้อข่าวสาร..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#16377e] font-sarabun"
            />
          </div>
        </div>

        {/* News Grid (3 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((article) => (
            <article
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all overflow-hidden flex flex-col cursor-pointer group"
            >
              <div className="relative h-48 overflow-hidden bg-slate-900">
                <div
                  className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                  style={{ backgroundImage: `url(${article.cover_image_url})` }}
                />
                {article.is_pinned && (
                  <span className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-red-600 text-white shadow-sm">
                    ปักหมุด
                  </span>
                )}
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-blue-600" />
                      {article.published_date}
                    </span>
                    <span className="truncate max-w-[120px]">{article.author_name}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs text-slate-600 font-sarabun line-clamp-2 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#16377e]">
                  <span>อ่านต่อ →</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShare(article);
                    }}
                    className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-800"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
            <Radio className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">ไม่พบข่าวสารที่ค้นหา</h3>
            <p className="text-xs text-slate-500 font-sarabun mt-1">
              ลองเปลี่ยนคำค้นหา หรือเลือกหมวดหมู่อื่น
            </p>
          </div>
        )}
      </main>

      {/* Read Article Full Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-slate-200 flex flex-col font-prompt animate-in zoom-in-95">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-blue-700">{selectedArticle.published_date}</span>
                <span className="text-slate-400">•</span>
                <span className="text-xs text-slate-600 font-sarabun">{selectedArticle.author_name}</span>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-4">
              <div className="h-64 sm:h-72 rounded-2xl overflow-hidden bg-slate-900 relative">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${selectedArticle.cover_image_url})` }}
                />
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                {selectedArticle.title}
              </h2>

              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 text-xs sm:text-sm font-sarabun text-blue-900 font-medium leading-relaxed">
                {selectedArticle.summary}
              </div>

              <div className="text-sm text-slate-700 font-sarabun leading-relaxed whitespace-pre-line space-y-3">
                {selectedArticle.content}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <button
                onClick={() => handleShare(selectedArticle)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>แชร์ข่าวนี้</span>
              </button>

              <button
                onClick={() => setSelectedArticle(null)}
                className="px-6 py-2 rounded-xl bg-[#16377e] hover:bg-[#0f2452] text-white text-xs font-bold shadow-md cursor-pointer"
              >
                ปิดหน้าต่าง
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
