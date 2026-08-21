import type { Metadata } from 'next';
import { Prompt } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';

const promptFont = Prompt({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ['thai', 'latin'],
  variable: '--font-prompt',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://westernrescueunit.vercel.app'),
  title: 'หน่วยกู้ภัยประจิม (สมาคมประจิมสารคาม พุทธศาสตร์สงเคราะห์) | 24 Hours Emergency Rescue',
  description: 'ศูนย์ปฏิบัติการการแพทย์ฉุกเฉิน กู้ภัยทางน้ำ ดำน้ำค้นหา และบรรเทาสาธารณภัย อำเภอบรบือ จังหวัดมหาสารคาม โทร 061-119-3342 / 1669',
  icons: {
    icon: '/prachim-logo.png',
    apple: '/prachim-logo.png',
  },
  openGraph: {
    title: 'หน่วยกู้ภัยประจิม - สมาคมประจิมสารคาม พุทธศาสตร์สงเคราะห์',
    description: 'ศูนย์ปฏิบัติการกู้ชีพ-กู้ภัย 24 ชั่วโมง อ.บรบือ จ.มหาสารคาม',
    type: 'website',
    images: ['/prachim-logo.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" className={`${promptFont.variable} scroll-smooth`}>
      <body className="font-prompt antialiased bg-[#080d1a] text-slate-100 selection:bg-red-600 selection:text-white min-h-screen">
        {children}
        <Analytics />
      </body>
    </html>
  );
}


