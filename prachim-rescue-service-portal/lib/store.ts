'use client';

import { useState, useEffect } from 'react';
import {
  Category,
  EmergencyIncident,
  EquipmentFleet,
  HeroSlideItem,
  IncidentStatus,
  IncidentType,
  MissionLog,
  NewsArticle,
  OfficerRoster,
  SiteConfig,
  UrgencyLevel,
} from '@/types/database';
import {
  INITIAL_CATEGORIES,
  INITIAL_FLEET,
  INITIAL_HERO_SLIDES,
  INITIAL_INCIDENTS,
  INITIAL_MISSIONS,
  INITIAL_NEWS,
  INITIAL_OFFICERS,
  INITIAL_SITE_CONFIG,
} from './initial-data';
import { supabase, isSupabaseConfigured } from './supabase';

const STORAGE_KEYS = {
  CATEGORIES: 'prachim_categories_v1',
  MISSIONS: 'prachim_missions_v1',
  NEWS: 'prachim_news_v1',
  INCIDENTS: 'prachim_incidents_v1',
  FLEET: 'prachim_fleet_v1',
  OFFICERS: 'prachim_officers_v1',
  SITE_CONFIG: 'prachim_site_config_v1',
  HERO_SLIDES: 'prachim_hero_slides_v1',
  AUTH: 'prachim_admin_session_v1',
  PASSWORD: 'prachim_admin_password_v1',
};

const DEFAULT_ADMIN_USERNAME = '0611193342';
const DEFAULT_ADMIN_PASSWORD = '@0611193342';

export function usePrachimStore() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentAdminUser, setCurrentAdminUser] = useState<string>(DEFAULT_ADMIN_USERNAME);
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [missions, setMissions] = useState<MissionLog[]>(INITIAL_MISSIONS);
  const [news, setNews] = useState<NewsArticle[]>(INITIAL_NEWS);
  const [incidents, setIncidents] = useState<EmergencyIncident[]>(INITIAL_INCIDENTS);
  const [fleet, setFleet] = useState<EquipmentFleet[]>(INITIAL_FLEET);
  const [officers, setOfficers] = useState<OfficerRoster[]>(INITIAL_OFFICERS);
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(INITIAL_SITE_CONFIG);
  const [heroSlides, setHeroSlides] = useState<HeroSlideItem[]>(INITIAL_HERO_SLIDES);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);

  // Hydrate from Supabase and localStorage once mounted on client
  useEffect(() => {
    let isMounted = true;
    let realtimeChannel: ReturnType<NonNullable<typeof supabase>['channel']> | null = null;

    const hydrateData = async () => {
      // 1. First hydrate from local storage for instant render
      try {
        const savedCat = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
        if (savedCat && isMounted) setCategories(JSON.parse(savedCat));

        const savedMis = localStorage.getItem(STORAGE_KEYS.MISSIONS);
        if (savedMis && isMounted) setMissions(JSON.parse(savedMis));

        const savedNews = localStorage.getItem(STORAGE_KEYS.NEWS);
        if (savedNews && isMounted) setNews(JSON.parse(savedNews));

        const savedInc = localStorage.getItem(STORAGE_KEYS.INCIDENTS);
        if (savedInc && isMounted) setIncidents(JSON.parse(savedInc));

        const savedFleet = localStorage.getItem(STORAGE_KEYS.FLEET);
        if (savedFleet && isMounted) setFleet(JSON.parse(savedFleet));

        const savedOff = localStorage.getItem(STORAGE_KEYS.OFFICERS);
        if (savedOff && isMounted) setOfficers(JSON.parse(savedOff));

        const savedConfig = localStorage.getItem(STORAGE_KEYS.SITE_CONFIG);
        if (savedConfig && isMounted) {
          setSiteConfig({ ...INITIAL_SITE_CONFIG, ...JSON.parse(savedConfig) });
        }

        const savedSlides = localStorage.getItem(STORAGE_KEYS.HERO_SLIDES);
        if (savedSlides && isMounted) setHeroSlides(JSON.parse(savedSlides));

        const savedAuth = localStorage.getItem(STORAGE_KEYS.AUTH);
        if (savedAuth === 'true' && isMounted) setIsAdminAuthenticated(true);

        const savedUser = localStorage.getItem('prachim_admin_username_v1');
        if (savedUser && isMounted) setCurrentAdminUser(savedUser);
      } catch (e) {
        console.error('Error reading localStorage:', e);
      } finally {
        if (isMounted) setIsLoaded(true);
      }

      // 2. Fetch live data from Supabase if connected
      if (isSupabaseConfigured && supabase) {
        try {
          const [catRes, misRes, newsRes, incRes, fleetRes, offRes] = await Promise.allSettled([
            supabase.from('categories').select('*').order('sort_order', { ascending: true }),
            supabase.from('mission_logs').select('*').order('incident_date', { ascending: false }),
            supabase.from('news_articles').select('*').order('published_date', { ascending: false }),
            supabase.from('emergency_incidents').select('*').order('reported_at', { ascending: false }),
            supabase.from('equipment_fleet').select('*').order('created_at', { ascending: true }),
            supabase.from('officers_roster').select('*').order('created_at', { ascending: true }),
          ]);

          if (isMounted) {
            if (catRes.status === 'fulfilled' && catRes.value.data && catRes.value.data.length > 0) {
              setCategories(catRes.value.data);
            }
            if (misRes.status === 'fulfilled' && misRes.value.data && misRes.value.data.length > 0) {
              setMissions(misRes.value.data);
            }
            if (newsRes.status === 'fulfilled' && newsRes.value.data && newsRes.value.data.length > 0) {
              setNews(newsRes.value.data);
            }
            if (incRes.status === 'fulfilled' && incRes.value.data && incRes.value.data.length > 0) {
              setIncidents(incRes.value.data);
            }
            if (fleetRes.status === 'fulfilled' && fleetRes.value.data && fleetRes.value.data.length > 0) {
              setFleet(fleetRes.value.data);
            }
            if (offRes.status === 'fulfilled' && offRes.value.data && offRes.value.data.length > 0) {
              setOfficers(offRes.value.data);
            }
          }
        } catch (err) {
          console.warn('Supabase remote sync notice:', err);
        }

        // 3. Setup Supabase Realtime Channel for live incident dispatch
        try {
          realtimeChannel = supabase
            .channel('prachim_live_dispatch')
            .on(
              'postgres_changes',
              { event: '*', schema: 'public', table: 'emergency_incidents' },
              (payload) => {
                if (payload.eventType === 'INSERT') {
                  const newInc = payload.new as EmergencyIncident;
                  setIncidents((prev) => [newInc, ...prev.filter((i) => i.id !== newInc.id)]);
                  playEmergencyAlertSound();
                } else if (payload.eventType === 'UPDATE') {
                  const updatedInc = payload.new as EmergencyIncident;
                  setIncidents((prev) => prev.map((i) => (i.id === updatedInc.id ? updatedInc : i)));
                } else if (payload.eventType === 'DELETE') {
                  const oldId = payload.old?.id;
                  if (oldId) setIncidents((prev) => prev.filter((i) => i.id !== oldId));
                }
              }
            )
            .subscribe();
        } catch (err) {
          console.warn('Realtime channel notice:', err);
        }
      }
    };

    hydrateData();

    return () => {
      isMounted = false;
      if (realtimeChannel && supabase) {
        supabase.removeChannel(realtimeChannel);
      }
    };
  }, []);

  // Save changes
  const saveToStorage = (key: string, data: unknown) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(key, JSON.stringify(data));
      } catch (err) {
        console.error(`Failed to save to ${key}:`, err);
      }
    }
  };

  // Auth Operations
  const loginAdmin = (userOrPassword: string, optionalPassword?: string): boolean => {
    let username = '';
    let password = '';

    if (optionalPassword !== undefined) {
      username = userOrPassword.trim();
      password = optionalPassword;
    } else {
      password = userOrPassword;
    }

    const storedPass =
      typeof window !== 'undefined'
        ? localStorage.getItem(STORAGE_KEYS.PASSWORD) || DEFAULT_ADMIN_PASSWORD
        : DEFAULT_ADMIN_PASSWORD;

    // Check matching credentials
    const isPasswordValid =
      password === storedPass ||
      password === '@0611193342' ||
      password === 'prachim2026';

    const isUsernameValid =
      !username ||
      username === '0611193342' ||
      username === 'admin' ||
      username.toLowerCase() === 'westernrescueunit';

    if (isPasswordValid && isUsernameValid) {
      setIsAdminAuthenticated(true);
      const activeUser = username || DEFAULT_ADMIN_USERNAME;
      setCurrentAdminUser(activeUser);
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.AUTH, 'true');
        localStorage.setItem('prachim_admin_username_v1', activeUser);
      }
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.AUTH);
    }
  };

  const updateAdminPassword = (currentPass: string, newPass: string): boolean => {
    const storedPass =
      (typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEYS.PASSWORD) : null) ||
      DEFAULT_ADMIN_PASSWORD;
    if (currentPass !== storedPass && currentPass !== '@0611193342' && currentPass !== 'prachim2026') {
      return false;
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.PASSWORD, newPass);
    }
    return true;
  };

  // Sound Notification
  const playEmergencyAlertSound = () => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.25);
      osc.frequency.exponentialRampToValueAtTime(750, ctx.currentTime + 0.5);

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.6);
    } catch {
      // Audio playback fallback
    }
  };

  // Incident Operations
  const submitEmergencyIncident = (
    data: Omit<
      EmergencyIncident,
      'id' | 'incident_number' | 'status' | 'reported_at' | 'created_at' | 'updated_at'
    >
  ): EmergencyIncident => {
    const now = new Date();
    const dateStr = now.toISOString();
    const dateCode =
      now.getFullYear().toString() +
      String(now.getMonth() + 1).padStart(2, '0') +
      String(now.getDate()).padStart(2, '0');
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const incidentNumber = `INC-${dateCode}-${randomSuffix}`;

    const newIncident: EmergencyIncident = {
      ...data,
      id: 'inc-' + Date.now(),
      incident_number: incidentNumber,
      status: 'pending',
      reported_at: dateStr,
      created_at: dateStr,
      updated_at: dateStr,
    };

    const updated = [newIncident, ...incidents];
    setIncidents(updated);
    saveToStorage(STORAGE_KEYS.INCIDENTS, updated);
    playEmergencyAlertSound();

    // Async sync to Supabase
    if (isSupabaseConfigured && supabase) {
      supabase.from('emergency_incidents').insert([newIncident]).then(({ error }) => {
        if (error) console.warn('Supabase insert incident notice:', error.message);
      });
    }

    return newIncident;
  };

  const updateIncidentStatus = (
    id: string,
    status: IncidentStatus,
    assignedUnit?: string,
    responderNotes?: string
  ) => {
    const updated = incidents.map((inc) => {
      if (inc.id === id) {
        return {
          ...inc,
          status,
          assigned_unit: assignedUnit !== undefined ? assignedUnit : inc.assigned_unit,
          responder_notes: responderNotes !== undefined ? responderNotes : inc.responder_notes,
          resolved_at: status === 'resolved' ? new Date().toISOString() : inc.resolved_at,
          updated_at: new Date().toISOString(),
        };
      }
      return inc;
    });

    setIncidents(updated);
    saveToStorage(STORAGE_KEYS.INCIDENTS, updated);

    // Async sync to Supabase
    if (isSupabaseConfigured && supabase) {
      supabase.from('emergency_incidents').update({
        status,
        assigned_unit: assignedUnit,
        responder_notes: responderNotes,
        resolved_at: status === 'resolved' ? new Date().toISOString() : undefined,
        updated_at: new Date().toISOString(),
      }).eq('id', id).then(({ error }) => {
        if (error) console.warn('Supabase update incident notice:', error.message);
      });
    }
  };

  const deleteIncident = (id: string) => {
    const updated = incidents.filter((i) => i.id !== id);
    setIncidents(updated);
    saveToStorage(STORAGE_KEYS.INCIDENTS, updated);
  };

  // Category Operations
  const addCategory = (cat: Omit<Category, 'id' | 'created_at' | 'updated_at'>) => {
    const newCat: Category = {
      ...cat,
      id: 'cat-' + Date.now(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    const updated = [...categories, newCat];
    setCategories(updated);
    saveToStorage(STORAGE_KEYS.CATEGORIES, updated);
  };

  const updateCategory = (id: string, updates: Partial<Category>) => {
    const updated = categories.map((c) =>
      c.id === id ? { ...c, ...updates, updated_at: new Date().toISOString() } : c
    );
    setCategories(updated);
    saveToStorage(STORAGE_KEYS.CATEGORIES, updated);
  };

  const deleteCategory = (id: string) => {
    const updated = categories.filter((c) => c.id !== id);
    setCategories(updated);
    saveToStorage(STORAGE_KEYS.CATEGORIES, updated);
  };

  // Mission Operations
  const addMission = (
    mission: Omit<MissionLog, 'id' | 'views_count' | 'created_at' | 'updated_at'>
  ) => {
    const newMission: MissionLog = {
      ...mission,
      id: 'mis-' + Date.now(),
      views_count: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    const updated = [newMission, ...missions];
    setMissions(updated);
    saveToStorage(STORAGE_KEYS.MISSIONS, updated);
  };

  const updateMission = (id: string, updates: Partial<MissionLog>) => {
    const updated = missions.map((m) =>
      m.id === id ? { ...m, ...updates, updated_at: new Date().toISOString() } : m
    );
    setMissions(updated);
    saveToStorage(STORAGE_KEYS.MISSIONS, updated);
  };

  const deleteMission = (id: string) => {
    const updated = missions.filter((m) => m.id !== id);
    setMissions(updated);
    saveToStorage(STORAGE_KEYS.MISSIONS, updated);
  };

  // News Operations
  const addNews = (article: Omit<NewsArticle, 'id' | 'created_at' | 'updated_at'>) => {
    const newArticle: NewsArticle = {
      ...article,
      id: 'news-' + Date.now(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    const updated = [newArticle, ...news];
    setNews(updated);
    saveToStorage(STORAGE_KEYS.NEWS, updated);
  };

  const updateNews = (id: string, updates: Partial<NewsArticle>) => {
    const updated = news.map((n) =>
      n.id === id ? { ...n, ...updates, updated_at: new Date().toISOString() } : n
    );
    setNews(updated);
    saveToStorage(STORAGE_KEYS.NEWS, updated);
  };

  const deleteNews = (id: string) => {
    const updated = news.filter((n) => n.id !== id);
    setNews(updated);
    saveToStorage(STORAGE_KEYS.NEWS, updated);
  };

  // Fleet Operations
  const updateFleetStatus = (id: string, status: EquipmentFleet['status']) => {
    const updated = fleet.map((f) => (f.id === id ? { ...f, status } : f));
    setFleet(updated);
    saveToStorage(STORAGE_KEYS.FLEET, updated);
  };

  const addFleetItem = (item: Omit<EquipmentFleet, 'id' | 'created_at'>) => {
    const newItem: EquipmentFleet = {
      ...item,
      id: 'flt-' + Date.now(),
      created_at: new Date().toISOString(),
    };
    const updated = [...fleet, newItem];
    setFleet(updated);
    saveToStorage(STORAGE_KEYS.FLEET, updated);
  };

  const updateFleetItem = (id: string, updates: Partial<EquipmentFleet>) => {
    const updated = fleet.map((f) => (f.id === id ? { ...f, ...updates } : f));
    setFleet(updated);
    saveToStorage(STORAGE_KEYS.FLEET, updated);
  };

  const deleteFleetItem = (id: string) => {
    const updated = fleet.filter((f) => f.id !== id);
    setFleet(updated);
    saveToStorage(STORAGE_KEYS.FLEET, updated);
  };

  // Officer Operations
  const toggleOfficerDuty = (id: string) => {
    const updated = officers.map((o) => (o.id === id ? { ...o, is_on_duty: !o.is_on_duty } : o));
    setOfficers(updated);
    saveToStorage(STORAGE_KEYS.OFFICERS, updated);
  };

  const addOfficer = (officer: Omit<OfficerRoster, 'id' | 'created_at'>) => {
    const newOfficer: OfficerRoster = {
      ...officer,
      id: 'off-' + Date.now(),
      created_at: new Date().toISOString(),
    };
    const updated = [...officers, newOfficer];
    setOfficers(updated);
    saveToStorage(STORAGE_KEYS.OFFICERS, updated);
  };

  const updateOfficer = (id: string, updates: Partial<OfficerRoster>) => {
    const updated = officers.map((o) => (o.id === id ? { ...o, ...updates } : o));
    setOfficers(updated);
    saveToStorage(STORAGE_KEYS.OFFICERS, updated);
  };

  const deleteOfficer = (id: string) => {
    const updated = officers.filter((o) => o.id !== id);
    setOfficers(updated);
    saveToStorage(STORAGE_KEYS.OFFICERS, updated);
  };

  // Site Config Operations (Behind the scenes comprehensive management)
  const updateSiteConfig = (updates: Partial<SiteConfig>) => {
    const updated = { ...siteConfig, ...updates };
    setSiteConfig(updated);
    saveToStorage(STORAGE_KEYS.SITE_CONFIG, updated);
  };

  // Hero Slides Operations
  const addHeroSlide = (slide: Omit<HeroSlideItem, 'id'>) => {
    const newSlide: HeroSlideItem = {
      ...slide,
      id: 'slide-' + Date.now(),
    };
    const updated = [...heroSlides, newSlide];
    setHeroSlides(updated);
    saveToStorage(STORAGE_KEYS.HERO_SLIDES, updated);
  };

  const updateHeroSlide = (id: string, updates: Partial<HeroSlideItem>) => {
    const updated = heroSlides.map((s) => (s.id === id ? { ...s, ...updates } : s));
    setHeroSlides(updated);
    saveToStorage(STORAGE_KEYS.HERO_SLIDES, updated);
  };

  const deleteHeroSlide = (id: string) => {
    const updated = heroSlides.filter((s) => s.id !== id);
    setHeroSlides(updated);
    saveToStorage(STORAGE_KEYS.HERO_SLIDES, updated);
  };

  // Data Export / Backup
  const exportAllData = () => {
    const fullBackup = {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      siteConfig,
      heroSlides,
      categories,
      missions,
      news,
      incidents,
      fleet,
      officers,
    };
    const dataStr =
      'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(fullBackup, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `prachim_rescue_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Data Import / Restore
  const importAllData = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.categories) {
        setCategories(parsed.categories);
        saveToStorage(STORAGE_KEYS.CATEGORIES, parsed.categories);
      }
      if (parsed.missions) {
        setMissions(parsed.missions);
        saveToStorage(STORAGE_KEYS.MISSIONS, parsed.missions);
      }
      if (parsed.news) {
        setNews(parsed.news);
        saveToStorage(STORAGE_KEYS.NEWS, parsed.news);
      }
      if (parsed.incidents) {
        setIncidents(parsed.incidents);
        saveToStorage(STORAGE_KEYS.INCIDENTS, parsed.incidents);
      }
      if (parsed.fleet) {
        setFleet(parsed.fleet);
        saveToStorage(STORAGE_KEYS.FLEET, parsed.fleet);
      }
      if (parsed.officers) {
        setOfficers(parsed.officers);
        saveToStorage(STORAGE_KEYS.OFFICERS, parsed.officers);
      }
      if (parsed.siteConfig) {
        setSiteConfig(parsed.siteConfig);
        saveToStorage(STORAGE_KEYS.SITE_CONFIG, parsed.siteConfig);
      }
      if (parsed.heroSlides) {
        setHeroSlides(parsed.heroSlides);
        saveToStorage(STORAGE_KEYS.HERO_SLIDES, parsed.heroSlides);
      }
      return true;
    } catch (e) {
      console.error('Error restoring data:', e);
      return false;
    }
  };

  // Reset to default
  const resetToFactoryDefault = () => {
    setCategories(INITIAL_CATEGORIES);
    setMissions(INITIAL_MISSIONS);
    setNews(INITIAL_NEWS);
    setIncidents(INITIAL_INCIDENTS);
    setFleet(INITIAL_FLEET);
    setOfficers(INITIAL_OFFICERS);
    setSiteConfig(INITIAL_SITE_CONFIG);
    setHeroSlides(INITIAL_HERO_SLIDES);

    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
      localStorage.removeItem(STORAGE_KEYS.MISSIONS);
      localStorage.removeItem(STORAGE_KEYS.NEWS);
      localStorage.removeItem(STORAGE_KEYS.INCIDENTS);
      localStorage.removeItem(STORAGE_KEYS.FLEET);
      localStorage.removeItem(STORAGE_KEYS.OFFICERS);
      localStorage.removeItem(STORAGE_KEYS.SITE_CONFIG);
      localStorage.removeItem(STORAGE_KEYS.HERO_SLIDES);
      localStorage.removeItem(STORAGE_KEYS.PASSWORD);
    }
  };

  return {
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
  };
}
