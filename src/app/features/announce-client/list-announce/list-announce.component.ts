import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnounceService } from 'src/app/core/service/announce.service';
import { Observable } from 'rxjs';
import { Annonce } from 'src/app/core/model/annonce.type';
import {  Store, select } from '@ngrx/store';
import { State } from 'src/app/store';
import { getAnnonces } from 'src/app/store/selectors/annonce-selectors';
import { ImgesSlider } from 'src/app/shared/components/imges-slider';
import { trackAnnonceDeco } from 'src/app/core/decorators/shared.decorator';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-announce',
  standalone: true,
  imports: [CommonModule,ImgesSlider,RouterModule],
  templateUrl: './list-announce.component.html',
  styleUrl: './list-announce.component.scss'
})
export class ListAnnounceComponent {
  data:  Observable<Annonce[]>;
    constructor( private store: Store<State>,private router:Router,private route:ActivatedRoute,private service:AnnounceService){
      this.data=this.store.pipe(select(getAnnonces))
}
id_annonce:number;
id_agence :number;
@trackAnnonceDeco()
trackAnnonce(ids:Track){
this.id_annonce=<number>ids.id_annonce
this.id_agence=<number>ids.id_agence
}



update_counter( id_annonce:number|undefined,id_agence:number|undefined){
  this.service.updateAnnonceCountViews(<number>id_annonce,<number>id_agence).subscribe(data=>console.log(data)
  )
}


}
type Track={
  id_annonce:number|undefined,
  id_agence:number|undefined
}
