import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://vrktvwrwsfrirnnqiwea.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZya3R2d3J3c2ZyaXJubnFpd2VhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NzI5NTE5NywiZXhwIjoyMTAyODcxMTk3fQ.wjwLhFShpLIaM97zSmj3oehHlU_uxPwMEgDRmfPf6J4';

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

async function inspectDuplicates() {
  console.log('--- Inspecting Supabase Tables for duplicates ---');
  
  const tables = ['categories', 'mission_logs', 'news_articles', 'equipment_fleet', 'officers_roster', 'site_config', 'hero_slides', 'emergency_incidents'];
  
  for (const t of tables) {
    const { data, error } = await supabase.from(t).select('*');
    if (error) {
      console.log(`Table ${t}: Error - ${error.message}`);
      continue;
    }
    console.log(`\nTable [${t}] Total rows: ${data?.length}`);
    data?.forEach((row, i) => {
      console.log(`  Row ${i+1}: ID=${row.id}, Key=${row.slug || row.incident_number || row.title || row.call_sign || row.officer_code || row.badge}`);
    });
  }
}

inspectDuplicates();
