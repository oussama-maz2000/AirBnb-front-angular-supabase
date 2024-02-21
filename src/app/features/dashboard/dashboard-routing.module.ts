import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {DashboardComponent} from './dashboard.component';
import {AccountComponent} from "./account/account.component";
import {HomeComponent} from "./home/home.component";
import {CalendarComponent} from "./calendar/calendar.component";
import {AnnounceComponent} from "./announce-admin/announce.component";
import {SettingsComponent} from "./settings/settings.component";
import {UpsertAnnounceComponent} from "./announce-admin/upsert-announce/upsert-announce.component";
import { DatatableAnnonceComponent } from './announce-admin/datatable-annonce/datatable-annonce.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      {
        path: 'account', component: AccountComponent
      },
      {
        path: 'home', component: HomeComponent
      },
      {
        path: 'calendar', component: CalendarComponent
      },
      {
        path: 'announce', component: DatatableAnnonceComponent
      },
      {
        path: 'upsert-announce',
        component: UpsertAnnounceComponent
      },
      {
        path: 'settings', component: SettingsComponent
      },
      {
        path: '', component: HomeComponent
      },
      
    ]
  },

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule {

}
