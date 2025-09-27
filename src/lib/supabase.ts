import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

// Supabase configuration with your actual credentials
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://hoboinkeubudolzdsbmt.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhvYm9pbmtldWJ1ZG9semRzYm10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5MDM2OTgsImV4cCI6MjA3NDQ3OTY5OH0.yDPlb70UIcxCFQ0Y91jriK2IgPEUj0j5EQVrdalX0mQ';

console.log('✅ Supabase configured successfully');
console.log('Project URL:', supabaseUrl);

// Create Supabase client with error handling
let supabase: any;
try {
  supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
  console.log('✅ Supabase client created successfully');
} catch (error) {
  console.error('❌ Failed to create Supabase client:', error);
  // Create a fallback client for development
  supabase = {
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signUp: () => Promise.resolve({ data: null, error: { message: 'Supabase connection failed' } }),
      signInWithPassword: () => Promise.resolve({ data: null, error: { message: 'Supabase connection failed' } }),
      signOut: () => Promise.resolve({ error: null })
    },
    from: () => ({
      select: () => ({
        eq: () => ({
          order: () => Promise.resolve({ data: [], error: { message: 'Supabase connection failed' } })
        })
      }),
      insert: () => ({
        select: () => ({
          single: () => Promise.resolve({ data: null, error: { message: 'Supabase connection failed' } })
        })
      }),
      update: () => ({
        eq: () => Promise.resolve({ error: { message: 'Supabase connection failed' } })
      }),
      delete: () => ({
        eq: () => Promise.resolve({ error: { message: 'Supabase connection failed' } })
      })
    })
  };
}

export { supabase };
export type { Database };