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
    console.log('--------------------------- LOAD MENU CONF ---------------------------');
    return this.httpClient.get(environment.supabaseUrl + '/rest/v1/IMMO_MENU_ITEM'
      ,{
        headers: {
          'apikey':environment.supabaseKey,
        }
      });
  }


}
