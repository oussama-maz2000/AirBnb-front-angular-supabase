import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAgenceComponent } from './add-agence/add-agence.component';

const routes: Routes = [{ path: 'create', component: AddAgenceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgenceRoutingModule {}
