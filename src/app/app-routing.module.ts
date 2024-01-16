import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UpsertAnnounceComponent} from "./features/dashboard/announce/upsert-announce/upsert-announce.component";

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
    path: 'dashboard',
    //canMatch: [() => inject(CanMatchGuard).canMatch()],
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
})
export class AppRoutingModule {}
