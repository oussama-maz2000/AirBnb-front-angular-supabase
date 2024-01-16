import { createActionGroup, emptyProps } from '@ngrx/store';

export const SupabaseActions = createActionGroup({
    source: 'SUPABASE_CLIENT',
    events: {
        'initSupabaseClient': emptyProps(),
    }
});
