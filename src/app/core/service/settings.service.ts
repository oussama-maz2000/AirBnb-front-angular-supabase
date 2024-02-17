import {Injectable} from '@angular/core';
import {CoreModule} from '../core.module';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SupabaseClient} from "@supabase/supabase-js";
import {environment} from "../../../environments/environment.prod";


@Injectable({providedIn: CoreModule})
export class SettingsService {

  constructor(private httpClient: HttpClient) {
  }

  loadMenuItems(): Observable<any> {
    /* console.log('--------------------------- LOAD MENU CONF ---------------------------'); */
    return this.httpClient.get(environment.supabaseUrl + '/rest/v1/IMMO_MENU_ITEM'
      ,{
        headers: {
          'apikey':environment.supabaseKey,
        }
      });
  }


}


/* export const createSet=<T=string>()=> new Set<T>(); */

/* default generic is when you use (=) 
exemple T=string
 */


/* export class ComponentGeneric <TProps>{
  private props:TProps;
  constructor(props:TProps){
    this.props=props
  }

getProps(){return this.props}



}

const cloneComponent=<T>(cmp:ComponentGeneric<T>)=>{
  return new ComponentGeneric(cmp.getProps())
}

const cmpVar=new ComponentGeneric({a:1,b:2})
const cmpCloned=cloneComponent(cmpVar) */