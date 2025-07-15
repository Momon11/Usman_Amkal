// lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://idctdzbyqjmohpvfitwf.supabase.co'; // Ganti ini
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlkY3RkemJ5cWptb2hwdmZpdHdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1NjgwNzEsImV4cCI6MjA2ODE0NDA3MX0.s1N4rqPrNAxfyB5KE5SVfYS1U9xRe3uV-0H3O01CG94';                // Ganti ini

export const supabase = createClient(supabaseUrl, supabaseKey);
