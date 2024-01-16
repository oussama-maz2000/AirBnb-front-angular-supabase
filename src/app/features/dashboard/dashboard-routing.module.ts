import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {DashboardComponent} from './dashboard.component';
import {AccountComponent} from "./account/account.component";
import {HomeComponent} from "./home/home.component";
import {CalendarComponent} from "./calendar/calendar.component";
import {AnnounceComponent} from "./announce/announce.component";
import {SettingsComponent} from "./settings/settings.component";
import {UpsertAnnounceComponent} from "./announce/upsert-announce/upsert-announce.component";

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
        path: 'announce', component: AnnounceComponent
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
