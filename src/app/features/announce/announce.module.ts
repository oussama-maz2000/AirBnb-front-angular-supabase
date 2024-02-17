import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnnounceRoutingModule } from './announce-routing.module';
import { AnnounceService } from 'src/app/core/service/announce.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AnnounceRoutingModule,

  ],
  providers:[AnnounceService]
})
export class AnnounceModule { }
