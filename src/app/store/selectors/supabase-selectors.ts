import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SupabaseState } from '../reducers/supabase-reducers';

export const userAuthenticationSelector = createFeatureSelector<SupabaseState>('supabaseReducer');

export const getSupabaseClient =
    createSelector(userAuthenticationSelector, (supabaseState: SupabaseState) => supabaseState.supabase);



