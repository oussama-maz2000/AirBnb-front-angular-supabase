import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SettingsState } from '../reducers/settings-reducers';

export const settingsSelector =
  createFeatureSelector<SettingsState>('settingsReducer');

export const getMenuItems = createSelector(
  settingsSelector,
  (state: SettingsState) => state.menuItems
);

export const getLng = createSelector(
  settingsSelector,
  (state: SettingsState) => state.lng
);

export const getLang = createSelector(
  settingsSelector,
  (state: SettingsState) => state.lang
);
