import { createActionGroup, props } from '@ngrx/store';

export const ErrorActions = createActionGroup({
  source: 'ERRORS',
  events: {
    'addError': props<{ error: any }>(),
    'addErrors': props<{ errors: Array<any> }>(),
    'removeError': props<{ id: any }>(),
    'removeErrors': props<{ ids: Array<any> }>(),

  }
});
