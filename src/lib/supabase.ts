
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase environment variables are missing. Please connect your Supabase project.');
  // Create a dummy client to prevent build errors
  const supabase = createClient('https://dummy.supabase.co', 'dummy-key');
  export { supabase };
} else {
  const supabase = createClient(supabaseUrl, supabaseKey);
  export { supabase };
}
