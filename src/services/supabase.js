import { createClient } from '@supabase/supabase-js';

// Identifier for this specific client site within the multi-tenant database
export const CURRENT_SITE_ID = import.meta.env.VITE_SITE_ID || 'eduardo-ferrari';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Fetch all sections for the current site from Supabase
 */
export async function fetchSiteContentFromSupabase(siteId = CURRENT_SITE_ID) {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from('site_contents')
      .select('section, data')
      .eq('site_id', siteId);

    if (error) {
      console.warn('[Supabase] Error loading content:', error.message);
      return null;
    }

    if (!data || data.length === 0) return null;

    const contentMap = {};
    data.forEach((row) => {
      contentMap[row.section] = row.data;
    });
    return contentMap;
  } catch (err) {
    console.warn('[Supabase] Connection error:', err);
    return null;
  }
}

/**
 * Save a specific section for the current site in Supabase
 */
export async function saveSiteContentToSupabase(section, data, siteId = CURRENT_SITE_ID) {
  if (!supabase) return false;
  try {
    const { error } = await supabase
      .from('site_contents')
      .upsert(
        {
          site_id: siteId,
          section,
          data,
          updated_at: new Date().toISOString()
        },
        { onConflict: 'site_id,section' }
      );

    if (error) {
      console.error(`[Supabase] Error saving section ${section}:`, error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error(`[Supabase] Exception saving section ${section}:`, err);
    return false;
  }
}

/**
 * Upload an image to the multi-site Storage Bucket (site-media/<site_id>/<filename>)
 */
export async function uploadSiteMedia(file, customName = null, siteId = CURRENT_SITE_ID) {
  if (!supabase) throw new Error('Supabase não configurado');

  const fileExt = file.name ? file.name.split('.').pop() : 'png';
  const cleanBaseName = customName
    ? customName.toLowerCase().replace(/[^a-z0-9]/g, '-')
    : `${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
  
  const filePath = `${siteId}/${cleanBaseName}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from('site-media')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true
    });

  if (uploadError) {
    throw uploadError;
  }

  const { data } = supabase.storage
    .from('site-media')
    .getPublicUrl(filePath);

  return data.publicUrl;
}
