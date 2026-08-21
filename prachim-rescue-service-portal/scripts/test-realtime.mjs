import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://vrktvwrwsfrirnnqiwea.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZya3R2d3J3c2ZyaXJubnFpd2VhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NzI5NTE5NywiZXhwIjoyMTAyODcxMTk3fQ.wjwLhFShpLIaM97zSmj3oehHlU_uxPwMEgDRmfPf6J4';

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

async function testIncidentFlow() {
  console.log('Testing emergency incident submission on Supabase...');
  const { data, error } = await supabase.from('emergency_incidents').insert([
    {
      incident_number: 'TEST-' + Date.now(),
      caller_name: 'ศูนย์สั่งการทดสอบระบบ',
      caller_phone: '092-925-3839',
      incident_type: 'ems_traffic',
      urgency_level: 'urgent',
      location_name: 'หน้าสำนักงานกู้ภัยประจิม ถ.แจ้งสนิท',
      district: 'อำเภอบรบือ',
      province: 'จังหวัดมหาสารคาม',
      latitude: 16.0375,
      longitude: 103.1186,
      victim_count: 0,
      details: 'ทดสอบการส่งข้อมูลและระบบไซเรนแจ้งเหตุแบบ Realtime',
      status: 'pending',
    },
  ]).select();

  if (error) {
    console.error('Insert error:', error.message);
  } else {
    console.log('✅ Incident created successfully on Supabase:', data[0].incident_number);
  }
}

testIncidentFlow();
