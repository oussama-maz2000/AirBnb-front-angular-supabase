import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { State } from '..';
import { AnnonceActions } from '../actions/annonce-action';
import {
  map,
  of,
  switchMap,
  tap,
  withLatestFrom,
  catchError,
  mergeMap,
  concatMap,
  from,
  take,
  merge,
  forkJoin,
  first,
  exhaustMap,
} from 'rxjs';
import { Annonce } from 'src/app/core/model/annonce.type';
import { AnnounceService } from 'src/app/core/service/announce.service';
import { SettingsActions } from '../actions/settings-actions';
import { HotToastService } from '@ngneat/hot-toast';
import { getAnnonceById } from '../selectors/annonce-selectors';
@Injectable()
export class AnnonceEffects {
  // @ts-ignore
  insertAnnonce$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnnonceActions.insertAnnonce),
      mergeMap(({ annonce }) =>
        this.service.uploadImages(<File[]>annonce.images).pipe(
          switchMap((links: string[]) =>
            this.service.insertAnnonce(<Annonce>annonce, links)
          ),
          switchMap(() => {
            return [
              AnnonceActions.insertAnnonceSuc({ suc: 'annonce well inserted' }),
              SettingsActions.loading({ loading: false }),
            ];
          })
        )
      ),
      catchError((error) => {
        console.error('Error during process:', error);
        return [
          SettingsActions.loading({ loading: false }),
          AnnonceActions.insertAnnonceErr({ err: 'Error during process' }),
        ];
      })
    )
  );

  // @ts-ignore
  getAnnonces$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnnonceActions.getAnnonces),
      mergeMap(() =>
        this.service.getAllAnnonces().pipe(
          mergeMap((annonces) => {
            return [
              AnnonceActions.getAnnoncesSuc({ annonces: annonces }),
              SettingsActions.loading({ loading: false }),
            ];
          }),
          catchError((err) => {
            return [
              SettingsActions.loading({ loading: false }),
              AnnonceActions.getAnnoncesErr({ err: err }),
            ];
          })
        )
      )
    )
  );


  // @ts-ignore
  deleteAnnonce$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnnonceActions.deleteAnnonce),
      switchMap((action) =>
        this.store.pipe(
          select(getAnnonceById(action.id)),
          first(), 
          exhaustMap((annonce) => {
            if (!annonce || !annonce.images) {
              console.error('Annonce or images undefined', annonce);
              return of(SettingsActions.loading({ loading: false })); 
            }
            const deleteImageList: any[] = [];
            (annonce.images as string[]).forEach((element) =>
              deleteImageList.push(element.replace('public/', ''))
            );
            const deleteImagesObs = deleteImageList.map((imagePath) =>
              this.service.deleteImg(imagePath)
            );

            return forkJoin(deleteImagesObs).pipe(
              exhaustMap(() => this.service.deleteAnnonce(action.id)),
              tap(() =>
                console.log('Annonce and its images deleted successfully')
              ),
              
              exhaustMap(() =>
                of(
                  AnnonceActions.deleteAnnonceSuc({ id: action.id }),
                  SettingsActions.loading({ loading: false })
                )
              ),
              catchError((err) => {
                console.error(err);
                
                return of(SettingsActions.loading({ loading: false }));
              })
            );
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private router: Router,
    private service: AnnounceService,
    
  ) {}
}
