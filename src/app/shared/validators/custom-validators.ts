import {
  AbstractControl,
  FormArray,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export class CustomValidators {
  static patternValidator(
    regex: RegExp,
    error: ValidationErrors
  ): ValidatorFn | null {
    return (control: AbstractControl): null | ValidationErrors => {
      if (!control.value) {
        // if control is empty return no error
        return null;
      }

      // test the value of the control against the regexp supplied
      const valid = regex.test(control.value);

      // if true, return no error (no error), else return error passed in the second parameter
      return valid ? null : error;
    };
  }

  static imagesValidator(): ValidatorFn | null {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control as FormGroup;
      const images = formGroup.controls['images'].value as FormArray;
      return images.length > 1 ? null : { required: true };
    };
  }
}
