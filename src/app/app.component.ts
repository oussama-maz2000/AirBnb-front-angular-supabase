import { Component, HostListener, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Session } from '@supabase/supabase-js';
import { State } from './store';
import { select, Store } from '@ngrx/store';
import { SettingsActions } from './store/actions/settings-actions';
import { AuthActions } from './store/actions/auth-actions';
import { getSupabaseClient } from './store/selectors/supabase-selectors';
import { SupabaseActions } from './store/actions/supabase-actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'announcement-front';

  screenWidth: number = 0;
  screenHeight: number = 0;
  session: Session | null = null;
  constructor(private store: Store<State>, translate: TranslateService) {
    translate.setDefaultLang('fr');
    translate.use('fr');
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.store.dispatch(
      SettingsActions.setScreenSize({
        height: this.screenHeight,
        width: this.screenWidth,
      })
    );
  }

  ngOnInit(): void {
    this.store.dispatch(SupabaseActions.initSupabaseClient());

    this.store.pipe(select(getSupabaseClient)).subscribe((supabase) => {
      if (supabase) {
        supabase.auth.onAuthStateChange((event, sess) => {
          console.log('SUPABAS AUTH CHANGED: ', event);
          console.log('SUPABAS AUTH CHANGED sess: ', sess);

          if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
            localStorage.setItem('access_token', sess ? sess.access_token : '');
          } else if (event === 'SIGNED_OUT') {
            localStorage.removeItem('access_token');
            // this.router.navigate(['/login']);
          }
          this.session = sess;
          console.log(sess);
          this.store.dispatch(AuthActions.setSupabaseUser({ user: sess }));
        });
      }
    });

    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.store.dispatch(
      SettingsActions.setScreenSize({
        height: this.screenHeight,
        width: this.screenWidth,
      })
    );
  }
}
