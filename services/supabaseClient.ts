
import { createClient } from '@supabase/supabase-js';

// SECURITY: Credentials are fetched from environment variables.
// Do NOT hardcode keys here in production.
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials missing! The app will default to API-only mode (no caching).');
}

// Only create the client if credentials exist, otherwise export null.
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;
