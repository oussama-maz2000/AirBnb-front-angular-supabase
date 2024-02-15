import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {takeUntil, tap} from "rxjs";
import {MenuItem} from "../../core/model/menu.item";
import {State} from "../../store";
import {SettingsActions} from "../../store/actions/settings-actions";
import {getSupabaseUser} from "../../store/selectors/auth-selectors";
import {getMenuItems} from "../../store/selectors/settings-selectors";
import {AuthActions} from "../../store/actions/auth-actions";
import {injectDestroyService, provideDestroyService} from "../../core/service/describe-destroy-service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  providers: [provideDestroyService()]
})
export class DashboardComponent implements OnInit {

  supabaseUser: any | undefined;
  public navLinks: Array<MenuItem> = [];
  private readonly destroy$ = injectDestroyService();
  constructor(private store: Store<State>,
              private router: Router,
              translate: TranslateService) {
    translate.setDefaultLang('fr');
    translate.use('fr');

  }

  goToAuth() {
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {

    this.store.dispatch(SettingsActions.loadMenuList());
    this.store.pipe(
      select(getSupabaseUser),
      takeUntil(this.destroy$),
      tap((user) => {
        /* console.log("TAP data")
        console.log(user); */
        this.supabaseUser = user;
      })).subscribe();

    this.store.pipe(
      select(getMenuItems),
      takeUntil(this.destroy$),
      tap((data:Array<MenuItem>) => {
        /* console.log("TAP data")
        console.log(data); */
        this.navLinks = data;
      })).subscribe();
  }

  logOut() {
    this.store.dispatch(AuthActions.logOut());
  }
}
