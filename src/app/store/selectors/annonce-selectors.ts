import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AnnonceState } from "../reducers/annonce-reducers";
import { Annonce } from "src/app/core/model/annonce.type";

export const annonceSelector = createFeatureSelector<AnnonceState>('annonceReducer');

export const getAnnonces=createSelector(annonceSelector,(annState:AnnonceState)=>annState.annonces)

export const getErrAnnonce=createSelector(annonceSelector,(annState:AnnonceState)=>
    annState.errorMsgAnn
)

export const getSucAnnonce=createSelector(annonceSelector,(annState:AnnonceState)=>
    annState.successMsgAnn
)


export const getAnnonceById=(id:number|null)=>createSelector(annonceSelector,(annState:AnnonceState)=>annState.annonces.find((annonce)=>annonce.id===id))
/* export const getAnnonceById = () => createSelector(
    annonceSelector,
    (annState: AnnonceState, props: { id: number }) => annState.annonces.find(annonce => annonce.id === props.id)
  ); */