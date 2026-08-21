'use client';

import React, { useState } from 'react';
import { TopEmergencyBar } from '@/components/shared/TopEmergencyBar';
import { Navbar } from '@/components/shared/Navbar';
import { HeroSlider } from '@/components/home/HeroSlider';
import { QuickServicesStrip } from '@/components/home/QuickServicesStrip';
import { LiveOperationsDashboard } from '@/components/home/LiveOperationsDashboard';
import { DepartmentsGrid } from '@/components/home/DepartmentsGrid';
import { NetworkCoverageMap } from '@/components/home/NetworkCoverageMap';
import { AboutSacredSection } from '@/components/home/AboutSacredSection';
import { RescueProcessFlow } from '@/components/home/RescueProcessFlow';
import { FeePolicyCard } from '@/components/home/FeePolicyCard';
import { FeaturedMissions } from '@/components/home/FeaturedMissions';
import { TrafficImpactMetrics } from '@/components/home/TrafficImpactMetrics';
import { EmergencyHotlineBanner } from '@/components/home/EmergencyHotlineBanner';
import { Footer } from '@/components/shared/Footer';
import { EmergencyReportView } from '@/components/pages/EmergencyReportView';
import { MissionDetailView } from '@/components/pages/MissionDetailView';
import { NewsArticlesView } from '@/components/pages/NewsArticlesView';
import { AdminPortalView } from '@/components/pages/AdminPortalView';
import { ToastContainer } from '@/components/shared/ToastNotification';
import { usePrachimStore } from '@/lib/store';
import { MissionLog } from '@/types/database';

export default function HomePage() {
  const [currentView, setCurrentView] = useState<'home' | 'report' | 'mission-detail' | 'news' | 'admin'>('home');
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
    toasts,
    dismissToast,
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

  const handleOpenNewsPage = () => {
    setCurrentView('news');
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
      <>
        <ToastContainer toasts={toasts} onDismiss={dismissToast} />
        <EmergencyReportView
          onBackToHome={handleBackToHome}
          onSubmitIncident={submitEmergencyIncident}
        />
      </>
    );
  }

  // 2. Full Page: Mission Detail View
  if (currentView === 'mission-detail') {
    return (
      <>
        <ToastContainer toasts={toasts} onDismiss={dismissToast} />
        <MissionDetailView
          mission={selectedMission || missions[0]}
          allMissions={missions}
          onBack={handleBackToHome}
          onSelectMission={handleOpenMissionDetail}
          onOpenReportPage={handleOpenReportPage}
        />
      </>
    );
  }

  // 3. Full Page: Dedicated News & Public Relations Page (NEW)
  if (currentView === 'news') {
    return (
      <>
        <ToastContainer toasts={toasts} onDismiss={dismissToast} />
        <NewsArticlesView
          news={news}
          onBackToHome={handleBackToHome}
          onOpenReportModal={handleOpenReportPage}
        />
      </>
    );
  }

  // 4. Full Page: Admin Dispatch & CMS Control Center
  if (currentView === 'admin') {
    return (
      <>
        <ToastContainer toasts={toasts} onDismiss={dismissToast} />
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
      </>
    );
  }

  // 5. Default: Professional Command Hub Homepage View
  return (
    <div className="min-h-screen bg-[#080d1a] text-slate-100 flex flex-col font-prompt selection:bg-red-600 selection:text-white">
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

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
        onOpenNewsPage={handleOpenNewsPage}
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

      {/* 5. Live Operations Dashboard & Real-Time Dispatch Hub */}
      <div id="section-live-dashboard">
        <LiveOperationsDashboard
          incidents={incidents}
          fleet={fleet}
          officers={officers}
          missions={missions}
          onOpenReportModal={handleOpenReportPage}
          onSelectMission={handleOpenMissionDetail}
        />
      </div>

      {/* 6. Specialized Divisions & Departments Grid */}
      <div id="section-departments">
        <DepartmentsGrid onSelectDepartment={handleSelectDepartment} />
      </div>

      {/* 7. Geo-Location & Network Coverage Map */}
      <div id="section-coverage-map">
        <NetworkCoverageMap
          siteConfig={siteConfig}
          onOpenReportModal={handleOpenReportPage}
        />
      </div>

      {/* 8. Organization Heritage & Sacred Patron (พ่อปู่จูมคำ) */}
      <div id="section-sacred">
        <AboutSacredSection onOpenReportModal={handleOpenReportPage} />
      </div>

      {/* 9. Emergency Response Process Flow (4 Steps) */}
      <div id="section-process">
        <RescueProcessFlow onOpenReportModal={handleOpenReportPage} />
      </div>

      {/* 10. Fee Policy & Transparency Section */}
      <div id="section-policy">
        <FeePolicyCard />
      </div>

      {/* 11. Operational Archive & Featured Missions */}
      <div id="section-missions">
        <FeaturedMissions
          missions={missions}
          onSelectMission={handleOpenMissionDetail}
        />
      </div>

      {/* 12. Community Impact & Web Traffic Analytics */}
      <TrafficImpactMetrics
        siteConfig={siteConfig}
        missionsCount={missions.length}
        incidentsCount={incidents.length}
      />

      {/* 13. Emergency Hotline Callout Banner */}
      <EmergencyHotlineBanner onOpenReportModal={handleOpenReportPage} />

      {/* 14. Official Footer */}
      <Footer
        onOpenReportModal={handleOpenReportPage}
        onOpenAdminModal={handleOpenAdminPage}
        onNavigateSection={handleNavigateSection}
      />
    </div>
  );
}
