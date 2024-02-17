import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListAnnounceComponent } from './list-announce/list-announce.component';

const routes: Routes = [{
  path:"",component:ListAnnounceComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnnounceRoutingModule { }
