import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, concatMap, isEmpty, map, of, switchMap, tap } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/store';
import { getAnnonceById } from 'src/app/store/selectors/annonce-selectors';
import { SettingsActions } from 'src/app/store/actions/settings-actions';
import { traceDeco, trackAnnonceDeco } from 'src/app/core/decorators/shared.decorator';
import { Annonce } from 'src/app/core/model/annonce.type';
import { AnnounceService } from 'src/app/core/service/announce.service';

@Component({
  selector: 'app-detail-announce',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-announce.component.html',
  styleUrl: './detail-announce.component.scss',
})
export class DetailAnnounceComponent implements OnInit ,OnDestroy{


/* PROPERTIES */
public data:Annonce|undefined;



 
  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        concatMap((params) => {
          console.log(params.get('id'));
          const idParam = params.get('id');
          const id = idParam !== null ? Number(idParam) : null;
          if (id !== null && !isNaN(id)) {
            return this.store.select(getAnnonceById(id)).pipe(
              tap((value) => {
                if (value == undefined) {
                  this.router.navigate(['/client/announces']);
                }
                this.data=value
              })
            );
          } else {
            console.error('Invalid or missing ID');
            return of(SettingsActions.loading({ loading: true }));
          }
        })
      )
      .subscribe();

      
  }


@traceDeco()
  ngOnDestroy(): void {
    const ids={
      id_annonce:this.data?.id,
      id_agence:this.data?.agence_id
    }
    console.log('DETAILS COMPONENT DESTROYED');
    
  }


  constructor(
    private route: ActivatedRoute,
    private store: Store<State>,
    private router: Router,
    private service:AnnounceService
  ) {
    console.log('DETAILS COMPONENT CALLED');
  }
}
