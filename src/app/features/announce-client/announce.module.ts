import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnnounceRoutingModule } from './announce-routing.module';
import { AnnounceService } from 'src/app/core/service/announce.service';
import { DetailAnnounceComponent } from './detail-announce/detail-announce.component';
import { ListAnnounceComponent } from './list-announce/list-announce.component';
import { RouterModule } from '@angular/router';
import { AnnounceComponent } from './announce.component';


@NgModule({
  declarations: [AnnounceComponent],
  imports: [
    CommonModule,
    AnnounceRoutingModule,
    RouterModule,
  ],
  providers:[AnnounceService]
})
export class AnnounceModule { }
