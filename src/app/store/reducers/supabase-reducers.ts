import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';
import { createReducer, on } from '@ngrx/store';
import { SupabaseActions } from '../actions/supabase-actions';


export interface SupabaseState {
    supabase: SupabaseClient;
}

const initialState: SupabaseState = {
    supabase: createClient(environment.supabaseUrl, environment.supabaseKey),

};

export const supabaseReducer = createReducer(initialState,
    on(SupabaseActions.initSupabaseClient, (state, props) => {
        return {
            ...state,
            supabase: createClient(environment.supabaseUrl, environment.supabaseKey)
        }
    }),
);
