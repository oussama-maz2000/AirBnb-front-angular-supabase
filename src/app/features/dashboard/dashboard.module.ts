import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {allIcons, NgxBootstrapIconsModule} from 'ngx-bootstrap-icons';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {RouterModule} from "@angular/router";
import { SharedService } from 'src/app/core/service/shared.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    DashboardRoutingModule,
    TranslateModule,
    NgxBootstrapIconsModule.pick(allIcons),
    MatSidenavModule,
  ],
  declarations: [
    DashboardComponent,
  ],
  exports: [],
 /*  providers:[SharedService] */
})
export class DashboardModule {

}
