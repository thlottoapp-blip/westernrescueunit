import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://vrktvwrwsfrirnnqiwea.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZya3R2d3J3c2ZyaXJubnFpd2VhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NzI5NTE5NywiZXhwIjoyMTAyODcxMTk3fQ.wjwLhFShpLIaM97zSmj3oehHlU_uxPwMEgDRmfPf6J4';

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

async function testConnection() {
  console.log('Testing Supabase Connection...');
  try {
    const { data, error } = await supabase.from('categories').select('*').limit(5);
    if (error) {
      console.log('Query result on categories:', error.message, error.code);
    } else {
      console.log('Categories table exists! Count:', data.length);
    }
  } catch (err) {
    console.error('Error connecting to Supabase:', err);
  }
}

testConnection();
