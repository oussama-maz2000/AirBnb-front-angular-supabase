import { Component, OnInit } from '@angular/core';
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
import { AgenceService } from 'src/app/core/service/agence.service';

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
  ],
  providers: [],
})
export class HomeComponent implements OnInit {
  supabaseUser: any | undefined;
  selectedProjects = [];
  projects = [
    {
      id: 'p1',
      title: 'Project A',
      subprojects: [
        { title: 'Subproject 1 of A', id: 's1p1' },
        { title: 'Subproject 2 of A', id: 's2p1' },
      ],
    },
    {
      id: 'p2',
      title: 'Project B',
      subprojects: [
        { title: 'Subproject 1 of B', id: 's1p2' },
        { title: 'Subproject 2 of B', id: 's2p2' },
      ],
    },
  ];

  constructor(
    private store: Store<State>,
    private router: Router,
    translate: TranslateService,
    private agenceService: AgenceService
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

  ngOnInit(): void {
    this.store.pipe(select(getSupabaseUser)).subscribe((user) => {
      console.log(user);
      this.supabaseUser = user;
    });
  }

  logout() {
    this.store.dispatch(AuthActions.logOut());
  }

  getAllAgence() {
    this.agenceService.getAllAgence();
  }
}
