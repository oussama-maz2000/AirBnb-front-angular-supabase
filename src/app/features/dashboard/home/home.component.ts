import { Component, OnInit, inject } from '@angular/core';
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
import { AnnounceService } from 'src/app/core/service/announce.service';
import { SharedService } from 'src/app/core/service/shared.service';
import { getIpAddressDeco } from 'src/app/core/decorators/shared.decorator';

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
  ],
  
})


export class HomeComponent implements OnInit {
  supabaseUser: any | undefined;
  data: readonly Annonce[];
  constructor(
    private store: Store<State>,
    private router: Router,
    translate: TranslateService,
    
    public sharedService:SharedService
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
  }

  logout() {
    this.store.dispatch(AuthActions.logOut());
  }

 

  

}
