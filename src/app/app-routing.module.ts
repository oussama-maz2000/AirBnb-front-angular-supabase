import { inject, NgModule } from '@angular/core';
import { mapToCanActivate, RouterModule, Routes } from '@angular/router';
import {UpsertAnnounceComponent} from "./features/dashboard/announce-admin/upsert-announce/upsert-announce.component";
import { SharedService } from './core/service/shared.service';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./features/auth/login/login.module').then((m) => m.LoginModule),
    data: {},
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./features/auth/register/register.module').then(
        (m) => m.RegisterModule
      ),
    data: {},
  },
  {
    path: 'client',
    
        loadChildren: () =>
      import('./features/announce-client/announce.module').then(
        (m) => m.AnnounceModule
      ),
    data: {},
      
  },
  {
    path: 'dashboard',
    canActivate:[authGuard],
    /* canMatch: [() => inject(CanMatchGuard).canMatch()], */
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
        data: {},
      },

      //{
      //  path: 'decision',
      //  loadComponent: () => import('./features/decision/decision.component').then(mod => mod.DecisionComponent)
      //}
    ],
  },

  {
    path: 'agence',
    loadChildren: () =>
      import('./features/agence/agence.module').then((m) => m.AgenceModule),
    data: {},
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[]
})
export class AppRoutingModule {
  canActivate() {
    return true;
  }
}
