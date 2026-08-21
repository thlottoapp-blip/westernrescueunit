import React from 'react';
import Link from 'next/link';
import { Home, PhoneCall, AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#080d1a] text-white flex flex-col items-center justify-center p-6 text-center font-prompt">
      <div className="w-20 h-20 bg-red-600/20 text-red-500 rounded-full flex items-center justify-center mb-6 ring-8 ring-red-500/10">
        <AlertTriangle className="w-10 h-10 animate-bounce" />
      </div>
      <h1 className="text-4xl md:text-5xl font-black mb-3 text-white">404 - ไม่พบหน้าที่ต้องการ</h1>
      <p className="text-slate-400 text-lg max-w-md mb-8">
        ขออภัย ไม่พบหน้าที่คุณกำลังค้นหา หรือหน้านี้อาจถูกย้ายหรือปิดปรับปรุง
      </p>

      <div className="flex flex-wrap gap-4 justify-center items-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition shadow-lg shadow-red-600/30"
        >
          <Home className="w-5 h-5" />
          กลับสู่หน้าหลัก
        </Link>
        <a
          href="tel:0611193342"
          className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/30 font-bold rounded-xl transition"
        >
          <PhoneCall className="w-5 h-5" />
          สายด่วนกู้ภัย 061-119-3342
        </a>
      </div>
    </div>
  );
}
