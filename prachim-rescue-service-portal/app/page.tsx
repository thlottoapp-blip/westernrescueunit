'use client';

import React, { useState } from 'react';
import { TopEmergencyBar } from '@/components/shared/TopEmergencyBar';
import { Navbar } from '@/components/shared/Navbar';
import { HeroSlider } from '@/components/home/HeroSlider';
import { QuickServicesStrip } from '@/components/home/QuickServicesStrip';
import { DepartmentsGrid } from '@/components/home/DepartmentsGrid';
import { AboutSacredSection } from '@/components/home/AboutSacredSection';
import { RescueProcessFlow } from '@/components/home/RescueProcessFlow';
import { FeePolicyCard } from '@/components/home/FeePolicyCard';
import { FeaturedMissions } from '@/components/home/FeaturedMissions';
import { EmergencyHotlineBanner } from '@/components/home/EmergencyHotlineBanner';
import { Footer } from '@/components/shared/Footer';
import { EmergencyReportView } from '@/components/pages/EmergencyReportView';
import { MissionDetailView } from '@/components/pages/MissionDetailView';
import { AdminPortalView } from '@/components/pages/AdminPortalView';
import { usePrachimStore } from '@/lib/store';
import { MissionLog } from '@/types/database';

export default function HomePage() {
  const [currentView, setCurrentView] = useState<'home' | 'report' | 'mission-detail' | 'admin'>('home');
  const [activeNavTab, setActiveNavTab] = useState('home');
  const [selectedMission, setSelectedMission] = useState<MissionLog | null>(null);

  const {
    isLoaded,
    currentAdminUser,
    categories,
    missions,
    news,
    incidents,
    fleet,
    officers,
    siteConfig,
    heroSlides,
    isAdminAuthenticated,
    loginAdmin,
    logoutAdmin,
    updateAdminPassword,
    submitEmergencyIncident,
    updateIncidentStatus,
    deleteIncident,
    addCategory,
    updateCategory,
    deleteCategory,
    addMission,
    updateMission,
    deleteMission,
    addNews,
    updateNews,
    deleteNews,
    updateFleetStatus,
    addFleetItem,
    updateFleetItem,
    deleteFleetItem,
    toggleOfficerDuty,
    addOfficer,
    updateOfficer,
    deleteOfficer,
    updateSiteConfig,
    addHeroSlide,
    updateHeroSlide,
    deleteHeroSlide,
    exportAllData,
    importAllData,
    resetToFactoryDefault,
    playEmergencyAlertSound,
  } = usePrachimStore();

  const handleNavigateSection = (sectionId: string) => {
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        setActiveNavTab(sectionId);
        if (sectionId === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const el = document.getElementById(`section-${sectionId}`);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 50);
    } else {
      setActiveNavTab(sectionId);
      if (sectionId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.getElementById(`section-${sectionId}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  const handleSelectDepartment = (deptSlug: string) => {
    handleNavigateSection('missions');
  };

  const handleOpenReportPage = () => {
    setCurrentView('report');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAdminPage = () => {
    setCurrentView('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenMissionDetail = (mission: MissionLog) => {
    setSelectedMission(mission);
    setCurrentView('mission-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedMission(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 1. Full Page: Emergency Citizen Report
  if (currentView === 'report') {
    return (
      <EmergencyReportView
        onBackToHome={handleBackToHome}
        onSubmitIncident={submitEmergencyIncident}
      />
    );
  }

  // 2. Full Page: Mission Detail View
  if (currentView === 'mission-detail' && selectedMission) {
    return (
      <MissionDetailView
        mission={selectedMission}
        allMissions={missions}
        onBack={handleBackToHome}
        onSelectMission={(m) => {
          setSelectedMission(m);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenReportPage={handleOpenReportPage}
      />
    );
  }

  // 3. Full Page: Admin Dispatch and CMS Portal
  if (currentView === 'admin') {
    return (
      <AdminPortalView
        onBackToHome={handleBackToHome}
        isAdminAuthenticated={isAdminAuthenticated}
        onLogin={loginAdmin}
        onLogout={logoutAdmin}
        onUpdatePassword={updateAdminPassword}
        currentAdminUser={currentAdminUser}
        categories={categories}
        missions={missions}
        news={news}
        incidents={incidents}
        fleet={fleet}
        officers={officers}
        siteConfig={siteConfig}
        heroSlides={heroSlides}
        onUpdateIncidentStatus={updateIncidentStatus}
        onDeleteIncident={deleteIncident}
        onAddCategory={addCategory}
        onUpdateCategory={updateCategory}
        onDeleteCategory={deleteCategory}
        onAddMission={addMission}
        onUpdateMission={updateMission}
        onDeleteMission={deleteMission}
        onAddNews={addNews}
        onUpdateNews={updateNews}
        onDeleteNews={deleteNews}
        onUpdateFleetStatus={updateFleetStatus}
        onAddFleetItem={addFleetItem}
        onUpdateFleetItem={updateFleetItem}
        onDeleteFleetItem={deleteFleetItem}
        onToggleOfficerDuty={toggleOfficerDuty}
        onAddOfficer={addOfficer}
        onUpdateOfficer={updateOfficer}
        onDeleteOfficer={deleteOfficer}
        onUpdateSiteConfig={updateSiteConfig}
        onAddHeroSlide={addHeroSlide}
        onUpdateHeroSlide={updateHeroSlide}
        onDeleteHeroSlide={deleteHeroSlide}
        onExportData={exportAllData}
        onImportData={importAllData}
        onResetToDefault={resetToFactoryDefault}
        onTestSoundAlert={playEmergencyAlertSound}
      />
    );
  }

  // 4. Default: Homepage View
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-prompt selection:bg-red-600 selection:text-white">
      {/* 1. Top Emergency Bar */}
      <TopEmergencyBar
        onOpenReportModal={handleOpenReportPage}
        onOpenAdminModal={handleOpenAdminPage}
      />

      {/* 2. Main Navigation Bar */}
      <Navbar
        activeTab={activeNavTab}
        setActiveTab={setActiveNavTab}
        onOpenReportModal={handleOpenReportPage}
        onOpenAdminModal={handleOpenAdminPage}
        isAdminAuthenticated={isAdminAuthenticated}
      />

      {/* 3. Hero Section with Interactive Rescue Slider */}
      <HeroSlider
        onOpenReportModal={handleOpenReportPage}
        onExploreMissions={() => handleNavigateSection('missions')}
      />

      {/* 4. Quick Services 6-Badge Strip */}
      <QuickServicesStrip
        onSelectService={(serviceName) => {
          if (serviceName.includes('การแพทย์') || serviceName.includes('กู้ชีพ')) {
            handleNavigateSection('departments');
          } else {
            handleOpenReportPage();
          }
        }}
      />

      {/* 5. Specialized Divisions & Departments Grid */}
      <DepartmentsGrid onSelectDepartment={handleSelectDepartment} />

      {/* 6. Organization Heritage & Sacred Patron (พ่อปู่จูมคำ) */}
      <AboutSacredSection onOpenReportModal={handleOpenReportPage} />

      {/* 7. Emergency Response Process Flow (4 Steps) */}
      <RescueProcessFlow onOpenReportModal={handleOpenReportPage} />

      {/* 8. Fee Policy & Transparency Section */}
      <FeePolicyCard />

      {/* 9. Operational Archive & Featured Missions */}
      <FeaturedMissions
        missions={missions}
        onSelectMission={handleOpenMissionDetail}
      />

      {/* 10. Emergency Hotline Callout Banner */}
      <EmergencyHotlineBanner onOpenReportModal={handleOpenReportPage} />

      {/* 11. Official Footer */}
      <Footer
        onOpenReportModal={handleOpenReportPage}
        onOpenAdminModal={handleOpenAdminPage}
        onNavigateSection={handleNavigateSection}
      />
    </div>
  );
}
