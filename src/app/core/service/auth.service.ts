import {Injectable} from '@angular/core';
import {from, Observable, of} from 'rxjs';
import {CoreModule} from '../core.module';
import {SupabaseClient} from '@supabase/supabase-js';


@Injectable({providedIn: CoreModule})
export class AuthService {

  loadUser(supabase: SupabaseClient): Observable<any> {
    const user = supabase.auth.getUser();
    console.log('🚀 ~ file: auth.service.ts ~ line 33 ~ AuthService ~ loadUser ~ session', user);
    return of(user);
  }

  signUp(data: any, supabase: SupabaseClient): Observable<any> {

    console.log(data);
    let promise = supabase.auth.signUp(
      {
        email: data.email,
        password: data.password,
        options: {
          //captchaToken: data.captcha,
          data: {
            first_name: data.firstName,
            last_name: data.lastName,
            phone: data.phone,
            email: data.email,
            termOfUse: data.termOfUse
          },
        }
      });
    return from(promise);
  }

  signIn(data: any, supabase: SupabaseClient): Observable<any> {
    console.log(data);
    let promise = supabase.auth.signInWithPassword({
      email: data.credentials.email,
      password: data.credentials.password
    });
    return from(promise);
  }

  signInWithOTP(email: string, supabase: SupabaseClient): Observable<any> {
    console.log(email);
    let resss = supabase.from("auth.users").select();
    console.log(resss.then(data => {
      console.log(data);
    }));


    let promise = supabase.auth.signInWithOtp({email: email});
    return from(promise);
  }

  verifyOTP(email: string, otp: string, supabase: SupabaseClient): Observable<any> {
    console.log(otp);
    let promise = supabase.auth.verifyOtp({email, token: otp, type: 'email'});
    return from(promise);
  }

  sendPwReset(data: { email: string, redirectTo: string }, supabase: SupabaseClient) {
    let promise = supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: data.redirectTo,
    });
    return from(promise);
  }

  updatePassword(data: { password: string }, supabase: SupabaseClient) {
    let promise = supabase.auth.updateUser({
      password: data.password,
    });
    return from(promise);
  }

  logout(supabase: SupabaseClient) {
    console.log('logout');
    localStorage.removeItem('access_token');
    return of(supabase.auth.signOut());

  }


  async setSession(supabase: SupabaseClient, access_token: string, refresh_token: string) {
    return supabase.auth.setSession({access_token, refresh_token});
  }
}
