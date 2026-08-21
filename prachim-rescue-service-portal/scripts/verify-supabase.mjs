import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://vrktvwrwsfrirnnqiwea.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZya3R2d3J3c2ZyaXJubnFpd2VhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NzI5NTE5NywiZXhwIjoyMTAyODcxMTk3fQ.wjwLhFShpLIaM97zSmj3oehHlU_uxPwMEgDRmfPf6J4';

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

async function verifyAllTables() {
  console.log('🔍 Checking Supabase Tables Health...');
  
  const tables = [
    'categories',
    'mission_logs',
    'news_articles',
    'equipment_fleet',
    'officers_roster',
    'site_config',
    'hero_slides',
    'emergency_incidents',
  ];

  for (const table of tables) {
    try {
      const { data, count, error } = await supabase
        .from(table)
        .select('*', { count: 'exact' });

      if (error) {
        console.log(`❌ Table [${table}]: Error - ${error.message}`);
      } else {
        console.log(`✅ Table [${table}]: Ready! Row Count = ${data?.length ?? 0}`);
      }
    } catch (err) {
      console.log(`⚠️ Table [${table}]: Exception - ${err.message}`);
    }
  }
}

verifyAllTables();
