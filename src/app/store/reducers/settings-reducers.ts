import { createReducer, on } from '@ngrx/store';
import { SettingsActions } from '../actions/settings-actions';
import { MenuItem } from '../../core/model/menu.item';

export interface SettingsState {
  menuItems: Array<MenuItem>;
  lng: string;
  lang: string;
}

const initialState: SettingsState = {
  menuItems: [],
  lng: 'ar',
  lang: 'ar',
};

export const settingsReducer = createReducer(
  initialState,
  on(SettingsActions.loadMenuListSuccess, (state, props) => {
    return {
      ...state,
      menuItems: props.menuItems,
    };
    menuItems: props.menuItems;
  }),
  on(SettingsActions.setLanguage, (state, props) => {
    return {
      ...state,
      lng: props.lang,
      lang: props.lang,
    };
  })
);
