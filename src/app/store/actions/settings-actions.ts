import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {MenuItem} from "../../core/model/menu.item";


export const SettingsActions = createActionGroup({
  source: 'SETTINGS',
  events: {
    'setTheme': props<{ theme: string }>(),
    'setBackground': props<{ settings: any }>(),
    'setForeground': props<{ settings: any }>(),
    'setLanguage': props<{ lang: string }>(),
    'setScreenSize': props<{ height: number, width: number }>(),
    'loadMenuList': emptyProps(),
    'loadMenuListSuccess': props<{ menuItems: Array<MenuItem> }>(),
    'loading':props<{loading:boolean}>(),
    'getIpAddress':emptyProps(),
    'getIpAddressSuccess':props<{ip:string}>()

  }
});

