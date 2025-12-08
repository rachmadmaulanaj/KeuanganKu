import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
    },
    global: {
        headers: async () => {
            const userId = localStorage.getItem('user_id');
            if (userId) {
                return {
                    'x-user-id': userId
                };
            }
            return {};
        }
    }
});

export default supabase;