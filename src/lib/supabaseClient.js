import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
)


/*
for local development
VITE_SUPABASE_URL=http://localhost:54321
VITE_SUPABASE_KEY=your-local-key
*/