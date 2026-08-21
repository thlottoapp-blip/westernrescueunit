import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://vrktvwrwsfrirnnqiwea.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZya3R2d3J3c2ZyaXJubnFpd2VhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NzI5NTE5NywiZXhwIjoyMTAyODcxMTk3fQ.wjwLhFShpLIaM97zSmj3oehHlU_uxPwMEgDRmfPf6J4';

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

async function updatePhoneNumberInSupabase() {
  console.log('🔄 Updating primary phone number to 061-119-3342 / 0611193342 across Supabase database...');

  // 1. Update site_config
  const { data: configData, error: configError } = await supabase
    .from('site_config')
    .update({
      hotline_primary: '061-119-3342',
      updated_at: new Date().toISOString(),
    })
    .neq('id', '00000000-0000-0000-0000-000000000000');

  if (configError) console.error('Error updating site_config:', configError.message);
  else console.log('✅ Updated site_config hotline_primary to 061-119-3342');

  // 2. Update officers_roster PCM-01
  const { error: offError } = await supabase
    .from('officers_roster')
    .update({
      phone: '061-119-3342',
    })
    .eq('officer_code', 'PCM-01');

  if (offError) console.error('Error updating officers_roster:', offError.message);
  else console.log('✅ Updated officers_roster PCM-01 phone to 061-119-3342');

  // 3. Update hero_slides secondary button text
  const { data: slides, error: slideFetchErr } = await supabase.from('hero_slides').select('*');
  if (!slideFetchErr && slides) {
    for (const slide of slides) {
      if (slide.secondary_btn_text && slide.secondary_btn_text.includes('092-925-3839')) {
        await supabase
          .from('hero_slides')
          .update({
            secondary_btn_text: slide.secondary_btn_text.replace('092-925-3839', '061-119-3342'),
          })
          .eq('id', slide.id);
        console.log(`✅ Updated hero_slide [${slide.id}] secondary_btn_text`);
      }
    }
  }

  // 4. Update news_articles mentioning old number
  const { data: news, error: newsFetchErr } = await supabase.from('news_articles').select('*');
  if (!newsFetchErr && news) {
    for (const article of news) {
      if (article.content && article.content.includes('092-925-3839')) {
        await supabase
          .from('news_articles')
          .update({
            content: article.content.replaceAll('092-925-3839', '061-119-3342'),
          })
          .eq('id', article.id);
        console.log(`✅ Updated news_article [${article.id}] content`);
      }
    }
  }

  console.log('🎉 Supabase database update complete!');
}

updatePhoneNumberInSupabase();
