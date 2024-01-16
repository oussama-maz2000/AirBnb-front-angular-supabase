/*
 * Copyright (c) AVOCATO-LIB 2023 All rights reserved
 * This file and the information it contains are property of AVOCATO-LIB and confidential.
 * They shall not be reproduced nor disclosed to any person except to those having
 * a need to know them without prior written consent of AVOCATO-LIB.
 */

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
  }
});

