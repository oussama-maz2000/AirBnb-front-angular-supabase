import { Component, inject, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { State } from '../../../store';
import { AuthActions } from '../../../store/actions/auth-actions';
import {
  getLoginError,
  isAuthenticated,
} from '../../../store/selectors/auth-selectors';
import { Router } from '@angular/router';
import { IconNamesEnum } from 'ngx-bootstrap-icons';
import { HotToastService } from '@ngneat/hot-toast';
import { getLng } from 'src/app/store/selectors/settings-selectors';
import { map } from 'rxjs';
import { SettingsActions } from 'src/app/store/actions/settings-actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  public signInForm!: FormGroup;
  public otp!: string;
  private user: Record<string, string> = {};
  public iconNames = IconNamesEnum;

  lang: string;

  private toast = inject(HotToastService);
  constructor(
    private store: Store<State>,
    private translateService: TranslateService,
    private route: Router
  ) {
    this.store
      .select(getLng)
      .pipe(
        map((data: string) => {
          this.lang = data;
          this.translateService.use(data);
        })
      )
      .subscribe();
    translateService.setDefaultLang(this.lang);
  }

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
        ),
        Validators.minLength(8),
      ]),
    });

    this.signInForm.statusChanges.subscribe((value) => {
      if (value == 'VALID') {
        this.user['email'] = this.signInForm.get('email')?.value;
        this.user['password'] = this.signInForm.get('password')?.value;
      }
    });

    this.store.pipe(select(getLoginError)).subscribe((data) => {
      console.log(data);
      if (data) {
        this.toast.error(data.message, {
          theme: 'snackbar',
          position: 'bottom-center',
        });
      }
    });

    this.store.pipe(select(isAuthenticated)).subscribe((data) => {
      console.log(data);
      if (data) {
        // this.route.navigate(['/dashboard/decision']);
      }
    });
  }

  handleSubmit() {
    if (this.signInForm.status === 'VALID') {
      this.store.dispatch(
        AuthActions.login({
          credentials: {
            email: this.signInForm.get('email')?.value,
            password: this.signInForm.get('password')?.value,
          },
        })
      );
    }
  }

  goToRegister() {
    this.route.navigate(['/register']);
  }

  goToHome() {
    this.route.navigate(['/home']);
  }

  goToResetPassword() {
    this.route.navigate(['/reset-password']);
  }

  public setLng(lang: string) {
    this.store.dispatch(SettingsActions.setLanguage({ lang: lang }));
  }
}
