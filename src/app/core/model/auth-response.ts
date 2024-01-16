import { AuthApiError, Session, User } from '@supabase/supabase-js';

export interface AuthResponse {
    data: SupabaseResponseData | {};
    error: AuthApiError | null;
}

export interface SupabaseResponseData {
    user: User | null;
    session: Session | null;
}
