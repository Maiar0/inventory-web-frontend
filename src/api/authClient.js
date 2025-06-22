import { supabase } from './supabase';

export async function getAccessToken() {
  const { data, error } = await supabase.auth.getSession();
  if (error || !data.session) return null;

  return data.session.access_token;
}

export async function getUserUuid() {
  const { data, error } = await supabase.auth.getSession();
  if (error || !data.session?.user) return null;

  return data.session.user.id;
}
