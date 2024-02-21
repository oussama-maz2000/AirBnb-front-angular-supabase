import {  Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from '../../../store';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { getSupabaseUser } from '../../../store/selectors/auth-selectors';
import { AuthActions } from '../../../store/actions/auth-actions';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { LottieModule } from 'ngx-lottie';
import { TemplateAnnonce } from 'src/app/shared/components/annonce-template';
import { Annonce } from 'src/app/core/model/annonce.type';
import { SharedService } from 'src/app/core/service/shared.service';
import { getIpAddressDeco,trackAnnonceDeco } from 'src/app/core/decorators/shared.decorator';
import { getAnnonces } from 'src/app/store/selectors/annonce-selectors';
import { Observable } from 'rxjs';
import { ImgesSlider } from 'src/app/shared/components/imges-slider';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    MatSnackBarModule,
    NgxBootstrapIconsModule,
    LottieModule,
    RouterModule,
    TemplateAnnonce,
    ImgesSlider
  ],
  
})


export class HomeComponent implements OnInit{
  supabaseUser: any | undefined;
  data:  Observable<Annonce[]>;
  images:readonly string[]=[
    "https://yarlrybrsqapllwioing.supabase.co/storage/v1/object/public/ANNOUNCE_IMAGES/8a51575d-ec72-4069-abaa-4b296013485d",
    "https://yarlrybrsqapllwioing.supabase.co/storage/v1/object/public/ANNOUNCE_IMAGES/1b681259-9c56-48ca-a369-bae9d582825c"
  ]
  annonce:Annonce={
    
    estate:"Home",
    type:"rent",
    price:20000,
    piece:"f1",
    surface:190,
    willaya:"Batna",
    codePostal:"05000",
    images:[],
    }
  constructor(
    private store: Store<State>,
    private router: Router,
    translate: TranslateService,
    
  ) {
    translate.setDefaultLang('fr');
    translate.use('fr');
  
  }
  

  goToAuth() {
    this.router.navigate(['/login']);
    //219541OVH!!Ld
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
    //219541OVH!!Ld
  }

  @getIpAddressDeco()
  ngOnInit(): void {
    this.store.pipe(select(getSupabaseUser))/* .subscribe((user) => {
      console.log(user);
      this.supabaseUser = user;
    }); */

    this.data=this.store.pipe(select(getAnnonces))

  }

 
  logout() {
    this.store.dispatch(AuthActions.logOut());
  }


  id_annonce:number;
  id_agence :number;
@trackAnnonceDeco()
 trackAnnonce(ids:Track){
this.id_annonce=<number>ids.id_annonce
this.id_agence=<number>ids.id_agence
 }

  

}

type Track={
  id_annonce:number|undefined,
  id_agence:number|undefined
}
