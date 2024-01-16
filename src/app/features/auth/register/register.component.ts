import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { State } from '../../../store';
import { TranslateService } from '@ngx-translate/core';
import { AuthActions } from '../../../store/actions/auth-actions';
import { getRegisterResponse } from '../../../store/selectors/auth-selectors';
import { Router } from '@angular/router';
import { IconNamesEnum } from 'ngx-bootstrap-icons';
import { RegisterValidators } from './register-validators';
import { CustomValidators } from '../../../shared/validators/custom-validators';
import { getLng } from 'src/app/store/selectors/settings-selectors';
import { map } from 'rxjs';
import { SettingsActions } from 'src/app/store/actions/settings-actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  public signUpForm!: FormGroup;
  public iconNames = IconNamesEnum;
  lang: string;

  constructor(
    private store: Store<State>,
    private translateService: TranslateService,
    private router: Router
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
    this.signUpForm = new FormGroup(
      {
        phone: new FormControl('', [
          Validators.required,
          Validators.pattern(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}/),
        ]),
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        confirmedPassword: new FormControl('', [Validators.required]),
        password: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern(
              /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
            ),
            CustomValidators.patternValidator(/\d/, { hasNumber: true }),
            CustomValidators.patternValidator(/[A-Z]/, {
              hasCapitalCase: true,
            }),
            CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
            CustomValidators.patternValidator(/(?=.*[!@#\$%\^&\*])/, {
              hasSpecialChar: true,
            }),
            Validators.minLength(8),
          ])
        ),

        termOfUse: new FormControl(true, [Validators.requiredTrue]),
        isPro: new FormControl(false, [Validators.requiredTrue]),
        //captcha: new FormControl(''),
      },
      {
        validators: RegisterValidators.MatchEmailValidator,
      }
    );

    this.store.pipe(select(getRegisterResponse)).subscribe((data) => {
      console.log(data);
      console.log(data?.error);
      if (data != undefined) {
        if (data.error) {
          //this.snackBar.open('Login failed', this.translateService.instant("SIGN_UP_SCREEN.ERRORS." + data.error.message));
        } else {
          this.goTohHome();
        }
      }
    });
  }

  register() {
    const formValues = this.signUpForm.value;
    console.log(formValues);
    if (this.signUpForm.status === 'VALID') {
      this.store.dispatch(
        AuthActions.register({ registerFormValue: formValues })
      );
    }
  }

  goTohHome() {
    this.router.navigate(['/home']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  public setLng(lang: string) {
    this.store.dispatch(SettingsActions.setLanguage({ lang: lang }));
  }
}
