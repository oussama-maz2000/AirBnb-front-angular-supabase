import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AuthState} from '../reducers/auth-reducers';

export const userAuthenticationSelector = createFeatureSelector<AuthState>('authenticationReducer');

export const userLoaded =
  createSelector(userAuthenticationSelector, (authState: AuthState) => authState.loaded);

export const userLoading =
  createSelector(userAuthenticationSelector, (authState: AuthState) => authState.loading);

export const getSupabaseUser =
  createSelector(userAuthenticationSelector, (authState: AuthState) => authState.supabaseUser);

export const getRegisterResponse =
  createSelector(userAuthenticationSelector, (authState: AuthState) => authState.registerResponse);

export const getResetPasswordResponse =
  createSelector(userAuthenticationSelector, (authState: AuthState) => authState.resetPasswordResponse);

export const getUpdatePasswordResponse =
  createSelector(userAuthenticationSelector, (authState: AuthState) => authState.updatePasswordResponse);

export const isAuthenticated =
  createSelector(userAuthenticationSelector, (authState: AuthState) => authState.authenticated);

export const getLoginError =
  createSelector(userAuthenticationSelector, (authState: AuthState) => authState.loginError);

export const getOtpResponse =
  createSelector(userAuthenticationSelector, (authState: AuthState) => authState.otpResponse);

