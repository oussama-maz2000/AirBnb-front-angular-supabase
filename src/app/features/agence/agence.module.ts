import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgenceRoutingModule } from './agence-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AddAgenceComponent } from './add-agence/add-agence.component';
import { CustomInput } from 'src/app/shared/components/custom-input';
import { CustomInputError } from 'src/app/shared/components/custom-input-error';

@NgModule({
  declarations: [AddAgenceComponent],
  imports: [
    CommonModule,
    AgenceRoutingModule,
    FormsModule,
    CustomInput,
    ReactiveFormsModule,
    TranslateModule,
    CustomInputError,
  ],
})
export class AgenceModule {}
