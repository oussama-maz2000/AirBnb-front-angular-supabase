import {createActionGroup, emptyProps, props} from '@ngrx/store';
import { Annonce } from 'src/app/core/model/annonce.type';


export const AnnonceActions = createActionGroup({
  source: 'ANNONCE',
  events: {
    
    'getAnnonces': emptyProps(),
    'getAnnoncesSuc':props<{annonces:Annonce[]}>(),
    'getAnnoncesErr':props<{err:any}>(),
    'insertAnnonce': props<{ annonce:Annonce }>(),
    'insertAnnonceErr':props<{err:any}>(),
    'insertAnnonceSuc':props<{suc:any}>(),
    'deleteAnnonce': props<{ id:number }>(),
    'deleteAnnonceSuc':props<{id:number}>(),
    'deleteAnnonceErr':props<{err:any}>(),

  }
});

