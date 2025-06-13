import { createClient } from '@supabase/supabase-js'

// Read credentials from .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a single supabase client for interacting with your database
// This is the Singleton pattern in action
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
