import {ActionReducerMap} from "@ngrx/store";
import * as fromUserAuthenticationReducer from './reducers/auth-reducers';
import * as fromSupabaseReducer from './reducers/supabase-reducers';
import * as fromSettingsReducer from './reducers/settings-reducers';
import * as fromAnnonceReducer from './reducers/annonce-reducers'
export interface State {
  supabaseReducer: fromSupabaseReducer.SupabaseState;
  authenticationReducer: fromUserAuthenticationReducer.AuthState;
  settingsReducer: fromSettingsReducer.SettingsState;
  annonceReducer:fromAnnonceReducer.AnnonceState

}

export const reducers: ActionReducerMap<State> = {
  supabaseReducer: fromSupabaseReducer.supabaseReducer,
  authenticationReducer: fromUserAuthenticationReducer.authReducer,
  settingsReducer: fromSettingsReducer.settingsReducer,
  annonceReducer:fromAnnonceReducer.annonceReducer
}
