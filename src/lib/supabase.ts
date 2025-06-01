
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase;

if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase environment variables are missing. Please connect your Supabase project.');
  // Create a dummy client to prevent build errors
  supabase = createClient('https://dummy.supabase.co', 'dummy-key');
} else {
  supabase = createClient(supabaseUrl, supabaseKey);
}

export { supabase };
