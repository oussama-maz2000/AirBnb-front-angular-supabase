import {booleanAttribute, Component, forwardRef, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {IconNamesEnum, NgxBootstrapIconsModule} from 'ngx-bootstrap-icons';
import {BaseControlValueAccessorComponent} from "./base-control-value-accessor.component";

@Component({
  selector: 'app-custom-input',
  template: `
      <style>
          :host{
            width: 100%;
          }
          .error-container {
              height: 15px;
              margin-left: 50px;
              font-weight: bold;
          }
      </style>

      <div class="input-group mb-2" style="position: relative;">
            <span class="input-group-text" id="basic-addon1">
                <i-bs [name]="icon" *ngIf="icon"
                      width="18"
                      height="18"
                      style="margin-right: 5px; margin-top: -5px">
                </i-bs>
            </span>
          <input #input type="{{type}}" class="form-control"
                 placeholder="{{placeholder|translate}}"
                 [value]="value"
                 [attr.aria-label]="label"
                 (focusout)="onTouch()"
                 (input)="onChange(input.value)"
                 [ngClass]="control.touched && control.status==='INVALID'?'is-invalid':''"
          >
      </div>
      <div class="error-container mb-2">
          <ng-container *ngIf="control.touched">
              <ng-content select="app-custom-input-error"></ng-content>
          </ng-container>
      </div>
  `,
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    NgxBootstrapIconsModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInput),
      multi: true
    }
  ],
})
export class CustomInput extends BaseControlValueAccessorComponent<string> {
  protected readonly Validators = Validators;
  @Input({required: true}) id: string;
  @Input({required: true}) label: string;
  @Input({required: true}) type: string;
  @Input({required: false}) icon: IconNamesEnum;
  @Input({transform: booleanAttribute}) required = false;
  @Input() placeholder = '';

}
