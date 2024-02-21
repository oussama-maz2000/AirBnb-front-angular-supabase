import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListAnnounceComponent } from './list-announce/list-announce.component';
import { DetailAnnounceComponent } from './detail-announce/detail-announce.component';
import { AnnounceComponent } from './announce.component';

const routes: Routes = [
  {
    path: '',
    component: AnnounceComponent,
    children: [
      {
        path: 'announces',
        component: ListAnnounceComponent,
      },
      {
        path: 'announce/:id',
        component: DetailAnnounceComponent,
      },
      {
        path: '**',
    
        redirectTo:"announces"
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnnounceRoutingModule {}
