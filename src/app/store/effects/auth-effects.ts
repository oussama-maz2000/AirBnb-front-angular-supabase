import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, mergeMap, switchMap, withLatestFrom} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AuthService} from '../../core/service/auth.service';
import {Router} from '@angular/router';
import {AuthActions} from '../actions/auth-actions';
import {State} from '../index';
import {getSupabaseClient} from '../selectors/supabase-selectors';

@Injectable()
export class AuthEffects {

  // @ts-ignore
  login$ = createEffect(() => this.actions$.pipe(
      ofType(AuthActions.login),
      withLatestFrom(this.store.pipe(select(getSupabaseClient))),
      switchMap(([actionData, supabase]) =>
        this.service.signIn(actionData, supabase)
            .pipe(
              mergeMap((response: any) => {
                console.log(response);
                if (response.error) {
                  return [
                    AuthActions.loginError({error: response.error}),
                  ]
                } else {
                  return [
                    AuthActions.setSupabaseUser({user: response.data}),
                  ]
                }
              }),
              catchError(error => {
                console.log(error);
                return [AuthActions.loginError({error: error})];
              })
            ))
    )
  );


  // @ts-ignore
  register$ = createEffect(() => this.actions$.pipe(
      ofType(AuthActions.register),
      withLatestFrom(this.store.pipe(select(getSupabaseClient))),
      switchMap(([actionData, supabase]) =>
        this.service.signUp(actionData.registerFormValue, supabase)
            .pipe(
              mergeMap((data: any) => {
                return [
                  AuthActions.registerSuccess({registerResponse: data})
                ]
              }),
              catchError(error => {
                console.log(error);
                return [AuthActions.authError({error: error})];
              })
            ))
    )
  );

  // @ts-ignore
  logOut$ = createEffect(() => this.actions$.pipe(
      ofType(AuthActions.logOut),
      withLatestFrom(this.store.pipe(select(getSupabaseClient))),
      switchMap(([actionData, supabase]) =>
        this.service.logout(supabase)
            .pipe(
              mergeMap((data: any) => {
                return [
                  AuthActions.logOutSuccess(),
                  //AccountActions.logout()
                ]
              }),
              catchError(error => {
                console.log(error);
                return [AuthActions.authError({error: error})];
              })
            ))
    )
  );

  // @ts-ignore
  resetPasswordForEmail$ = createEffect(() => this.actions$.pipe(
      ofType(AuthActions.resetPasswordForEmail),
      withLatestFrom(this.store.pipe(select(getSupabaseClient))),
      switchMap(([actionData, supabase]) =>
        this.service.sendPwReset(actionData, supabase)
            .pipe(
              mergeMap((data: any) => {
                console.log(data);
                return [
                  AuthActions.resetPasswordForEmailResponse({response: data}),
                ]
              }),
              catchError(error => {
                console.log(error);
                return [AuthActions.resetPasswordForEmailResponse({response: error})];
              })
            ))
    )
  );

  // @ts-ignore
  updatePassword$ = createEffect(() => this.actions$.pipe(
      ofType(AuthActions.updatePassword),
      withLatestFrom(this.store.pipe(select(getSupabaseClient))),
      switchMap(([actionData, supabase]) =>
        this.service.updatePassword(actionData, supabase)
            .pipe(
              mergeMap((data: any) => {
                console.log(data);
                return [
                  AuthActions.updatePasswordResponse({response: data}),
                ]
              }),
              catchError(error => {
                console.log(error);
                return [AuthActions.updatePasswordResponse({response: error})];
              })
            ))
    )
  );

  constructor(private actions$: Actions,
              private store: Store<State>,
              private router: Router,
              private service: AuthService) {

  }
}

