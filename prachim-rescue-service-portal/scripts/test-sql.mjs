import fetch from 'node-fetch';

const SUPABASE_URL = 'https://vrktvwrwsfrirnnqiwea.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZya3R2d3J3c2ZyaXJubnFpd2VhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NzI5NTE5NywiZXhwIjoyMTAyODcxMTk3fQ.wjwLhFShpLIaM97zSmj3oehHlU_uxPwMEgDRmfPf6J4';

async function testSqlApi() {
  try {
    const res = await fetch(`${SUPABASE_URL}/pg`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
      },
      body: JSON.stringify({ query: 'SELECT 1 as test;' }),
    });
    console.log('Status:', res.status, res.statusText);
    const text = await res.text();
    console.log('Body:', text);
  } catch (err) {
    console.error('Fetch error:', err.message);
  }
}

testSqlApi();
