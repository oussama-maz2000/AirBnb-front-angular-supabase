import {AbstractControl} from "@angular/forms";

export class RegisterValidators {

  static MatchEmailValidator(control: AbstractControl) {
    const password: string = control.get("password")?.value;
    const confirmPassword: string = control.get("confirmedPassword")?.value;

    if (!confirmPassword?.length) {
      return null;
    }

    if (password !== confirmPassword) {
      control.get("confirmedPassword")?.setErrors({mismatch: true});
      return {emailMismatch: true};
    } else {
      return null;
    }

  }
}


