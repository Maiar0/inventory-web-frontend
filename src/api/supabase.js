import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

export const supabase = globalThis.__supabaseClient__ ?? createClient(supabaseUrl, supabaseKey);

if (import.meta.env.DEV) {
  globalThis.__supabaseClient__ = supabase;
}
