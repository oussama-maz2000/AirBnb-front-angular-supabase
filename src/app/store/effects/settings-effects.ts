import { Injectable } from '@angular/core';
import { SettingsActions } from '../actions/settings-actions';
import { MenuItem } from '../../core/model/menu.item';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  map,
  mergeMap,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { SettingsService } from '../../core/service/settings.service';
import { ErrorActions } from '../actions/errors-handler-actions';
import { select, Store } from '@ngrx/store';
import { getSupabaseClient } from '../selectors/supabase-selectors';
import { State } from '../index';
import { SharedService } from 'src/app/core/service/shared.service';

@Injectable()
export class SettingsEffects {
  // @ts-ignore
  loadMenuList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettingsActions.loadMenuList),
      switchMap(() =>
        this.settingsService.loadMenuItems().pipe(
          mergeMap((data: Array<MenuItem>) => {
            /* console.log(data); */
            return [SettingsActions.loadMenuListSuccess({ menuItems: data })];
          }),
          catchError((error) => {
            console.log(error);
            return [ErrorActions.addError({ error: error })];
          })
        )
      )
    )
  );

  //@ts-ignore
  getIpAddress$ = createEffect(() => {
   return this.actions$.pipe(
      ofType(SettingsActions.getIpAddress),
      switchMap(() =>
        this.sharedService.getIpAddress().pipe(
          map((ip: any) => {
            return SettingsActions.getIpAddressSuccess({ ip: ip.ip });
          })
        )
      ));
  });

  constructor(
    private actions$: Actions,
   /*  private store: Store<State>, */
    private settingsService: SettingsService,
    private sharedService: SharedService
  ) {}
}
