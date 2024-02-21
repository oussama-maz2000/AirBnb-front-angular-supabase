import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActionsSubject } from '@ngrx/store';
import { SettingsActions } from 'src/app/store/actions/settings-actions';
import { AppInjector } from 'src/app/app.module';
import { AnnonceActions } from 'src/app/store/actions/annonce-action';

/* @Injectable({ providedIn: 'root' })
export class SharedService {
  
  static http: HttpClient = inject(HttpClient);


  static actionsSubscription = inject(ActionsSubject);


  ipAddressAction() {
    SharedService.actionsSubscription .next(SettingsActions.getIpAddress())
  }

  getIpAddress(): Observable<any> {
    console.log('GET IP ADDRESS FUNCTION HAS BEEN CALLED');
    return SharedService.http.get('https://api.ipify.org?format=json');
  }
}
 */
@Injectable({ providedIn: 'root' })
export class SharedService {
  static get http(): HttpClient {
    return AppInjector.getInjector().get(HttpClient);
  }

  static get actionSubject(): ActionsSubject {
    return AppInjector.getInjector().get(ActionsSubject);
  }

  static ipAddressAction() {
    SharedService.actionSubject.next(SettingsActions.getIpAddress());
  }

  static getIpAddress(): Observable<any> {
    console.log('GET IP ADDRESS FUNCTION HAS BEEN CALLED');
    return SharedService.http.get('https://api.ipify.org?format=json');
  }

  static updateCounterAction(id_annonce: number, id_agence: number) {
    console.log(id_annonce,id_agence);
    
    SharedService.actionSubject.next(
      AnnonceActions.updateCountAnnonce({
        id_annonce: id_annonce,
        id_agence: id_agence,
      })
    );
  }







}
