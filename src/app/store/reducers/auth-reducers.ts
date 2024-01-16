import {AuthActions} from '../actions/auth-actions';
import {createReducer, on} from '@ngrx/store';
import {AuthResponse} from '../../core/model/auth-response';


export interface AuthState {
  loaded: boolean;
  loading: boolean;
  authenticated: boolean;
  supabaseUser: any | undefined;
  registerResponse: any;
  resetPasswordResponse: AuthResponse | undefined,
  updatePasswordResponse: AuthResponse | undefined,
  loginError: any;
  otpResponse: AuthResponse | undefined;
}

const initialState: AuthState = {
  loaded: false,
  loading: false,
  authenticated: false,
  supabaseUser: undefined,
  registerResponse: undefined,
  resetPasswordResponse: undefined,
  updatePasswordResponse: undefined,
  loginError: undefined,
  otpResponse: undefined
};

export const authReducer = createReducer(initialState,
  on(AuthActions.setSupabaseUser, (state, props) => {
    return {
      ...state,
      loaded: true,
      authenticated: isAuthenticated(props.user),
      supabaseUser: props.user
    }
  }),
  on(AuthActions.loginError, (state, props) => {
    return {
      ...state,
      loaded: true,
      loginError: props.error
    }
  }),
  on(AuthActions.registerSuccess, (state, props) => {
    return {
      ...state,
      loaded: true,
      registerResponse: props.registerResponse
    }
  }),

  on(AuthActions.logOutSuccess, (state, props) => {
    return {
      ...state,
      authenticated: false,
      supabaseUser: undefined
    }
  }),
  on(AuthActions.resetPasswordForEmailResponse, (state, props) => {
    console.log(props.response)
    return {
      ...state,
      resetPasswordResponse: props.response,
    }
  }),
  on(AuthActions.updatePasswordResponse, (state, props) => {
    console.log(props.response)
    return {
      ...state,
      updatePasswordResponse: props.response,
    }
  }),
);

export function isAuthenticated(user: any) {
  return user != undefined || user != null
}
