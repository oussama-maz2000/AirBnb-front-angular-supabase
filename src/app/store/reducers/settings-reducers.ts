import { createReducer, on } from '@ngrx/store';
import { SettingsActions } from '../actions/settings-actions';
import { MenuItem } from '../../core/model/menu.item';

export interface SettingsState {
  menuItems: Array<MenuItem>;
  lng: string;
  lang: string;
  loading:boolean,
  ipAddress:string|undefined,
}

const initialState: SettingsState = {
  menuItems: [],
  lng: 'en',
  lang: 'en',
  loading:false,
  ipAddress:undefined,

};

export const settingsReducer = createReducer(
  initialState,
  on(SettingsActions.loadMenuListSuccess, (state, props) => {
    return {
      ...state,
      menuItems: props.menuItems,
    };  
/*     menuItems: props.menuItems; */
  }),
  on(SettingsActions.setLanguage, (state, props) => {
    return {
      ...state,
      lng: props.lang,
      lang: props.lang,
    };
  }),
  on(SettingsActions.loading,(state,props)=>
  {
    return{
      ...state,
      loading:props.loading
    }
  }),
  on(SettingsActions.getIpAddressSuccess,(state,props)=>
  {
    return{
      ...state,
      ipAddress:props.ip
    }
  })
);
