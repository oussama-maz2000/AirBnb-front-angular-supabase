import {createActionGroup, emptyProps, props} from '@ngrx/store';


export const AuthActions = createActionGroup({
  source: 'AUTH',
  events: {
    'login': props<{ credentials: any }>(),
    'setSupabaseUser': props<{ user: any }>(),
    'loginError': props<{ error: any }>(),
    'register': props<{ registerFormValue: any }>(),
    'registerSuccess': props<{ registerResponse: any }>(),
    'authError': props<{ error: any }>(),
    'logOut': emptyProps(),
    'logOutSuccess': emptyProps(),
    'resetPasswordForEmail': props<{ email: string, redirectTo: string }>(),
    'resetPasswordForEmailResponse': props<{ response: any }>(),
    'updatePassword': props<{ password: string }>(),
    'updatePasswordResponse': props<{ response: any }>(),

  }
});

