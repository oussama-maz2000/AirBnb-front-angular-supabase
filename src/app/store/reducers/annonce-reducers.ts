import { createReducer, on } from "@ngrx/store";
import { Annonce } from "src/app/core/model/annonce.type";
import { AnnonceActions } from "../actions/annonce-action";

export interface AnnonceState{
    annonces:Annonce[],
    errorMsgAnn:string|undefined
    successMsgAnn:string|undefined
}

const initialState:AnnonceState={
    annonces:[],
    errorMsgAnn:undefined,
    successMsgAnn:undefined
}

export const annonceReducer=createReducer(initialState,
on(AnnonceActions.getAnnoncesSuc,(state,{annonces})=>{
    return{
       ...state,
        annonces:annonces
    }
}),
on(AnnonceActions.getAnnoncesErr,(state,{err})=>{
    return{
        ...state,
        errorMsgAnn:err
    }
}),
    on(AnnonceActions.insertAnnonce,(state,{annonce})=>{
        return{
            ...state,
            annonces:[...state.annonces,annonce]
        }
    }),
    on(AnnonceActions.insertAnnonceErr,(state,{err})=>{
        return{
            ...state,
            errorMsgAnn:err
        }
    }),
    on(AnnonceActions.insertAnnonceSuc,(state,{suc})=>{
        return{
            ...state,
            successMsgAnn:suc
        }
    }),
    on(AnnonceActions.deleteAnnonceSuc,(state,{id})=>{
        return {
            ...state,
            annonces:state.annonces.filter(annonce => annonce.id !== id)
        }
    })
    )