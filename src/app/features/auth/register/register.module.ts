import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { CustomInput } from '../../../shared/components/custom-input';
import { allIcons, NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { CustomInputError } from '../../../shared/components/custom-input-error';
import { MarkAllTouchedDirective } from '../../../shared/directives/mark-all-touched.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RegisterRoutingModule,
    TranslateModule,
    CustomInput,
    NgxBootstrapIconsModule.pick(allIcons),
    CustomInputError,
    MarkAllTouchedDirective,
  ],
  declarations: [RegisterComponent],
  exports: [],
})
export class RegisterModule {}
