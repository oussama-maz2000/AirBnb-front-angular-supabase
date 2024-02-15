import { HttpClient } from '@angular/common/http';
import {  Injectable, inject } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActionsSubject } from '@ngrx/store';
import { SettingsActions } from 'src/app/store/actions/settings-actions';

@Injectable({ providedIn: 'root' })
export class SharedService {
  
  private http: HttpClient = inject(HttpClient);


  private actionsSubscription = inject(ActionsSubject);


  ipAddressAction() {
    this.actionsSubscription.next(SettingsActions.getIpAddress())
  }

  getIpAddress(): Observable<any> {
    console.log('GET IP ADDRESS FUNCTION HAS BEEN CALLED');
    return this.http.get('https://api.ipify.org?format=json');
  }
}
