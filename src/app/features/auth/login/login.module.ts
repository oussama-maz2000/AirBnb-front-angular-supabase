import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {LoginComponent} from './login.component';
import {LoginRoutingModule} from './login-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {CustomInput} from "../../../shared/components/custom-input";
import {CustomInputError} from "../../../shared/components/custom-input-error";
import {MarkAllTouchedDirective} from "../../../shared/directives/mark-all-touched.directive";
import {allIcons, NgxBootstrapIconsModule} from "ngx-bootstrap-icons";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    TranslateModule,
    CustomInput,
    CustomInputError,
    MarkAllTouchedDirective,
    NgxBootstrapIconsModule.pick(allIcons),
  ],
  declarations: [
    LoginComponent
  ],
  exports: []
})
export class LoginModule {

}
