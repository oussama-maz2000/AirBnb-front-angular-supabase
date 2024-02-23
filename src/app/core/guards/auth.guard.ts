import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/store';
import { isAuthenticated } from '../../store/selectors/auth-selectors';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  const store = inject(Store<State>);
  const router = inject(Router);
  return store.select(isAuthenticated).pipe(
    take(1),
    map((auth) => {
      console.log(auth)
      if (!auth) {
        router.navigate(['/login']);
        return false;
      }
      return true;
    })
  );
};

