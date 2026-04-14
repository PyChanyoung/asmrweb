// Supabase 클라이언트를 초기화하고 export합니다.
// 이 파일을 import해서 DB 조회, 실시간 구독 등을 수행합니다.
// URL과 KEY는 .env.local에서 관리하며 GitHub에 올라가지 않습니다.
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
