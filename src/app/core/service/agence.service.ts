import { Inject, Injectable, inject } from '@angular/core';
import { CoreModule } from '../core.module';
import { HttpClient } from '@angular/common/http';
import { Agence } from '../model/agence.model';
import { Observable, map } from 'rxjs';
@Injectable({ providedIn: CoreModule })
export class AgenceService {
  /*  _______--------------------------------_______
  	          Supabase Database Configuration
      _______--------------------------------_______ */

  headers: Record<string, string> = {
    apikey:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhcmxyeWJyc3FhcGxsd2lvaW5nIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM1MTk2ODQsImV4cCI6MjAwOTA5NTY4NH0.1idxU3Jybc_V0lAgKEhDtdQwFo_NCjJDv_a0c2-ifpU',

    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhcmxyeWJyc3FhcGxsd2lvaW5nIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM1MTk2ODQsImV4cCI6MjAwOTA5NTY4NH0.1idxU3Jybc_V0lAgKEhDtdQwFo_NCjJDv_a0c2-ifpU',
  };

  http = inject(HttpClient);

  /*  juste un test pour obtenir toutes les agences   */

  getAllAgence() {
    return this.http
      .get(
        'https://yarlrybrsqapllwioing.supabase.co/rest/v1/agence_01?select=*',
        {
          headers: this.headers,
        }
      )
      .pipe(
        map((data: any) => {
          console.log(data);
        })
      )
      .subscribe();
  }

  createAgence(agence: Agence) {
    this.headers = {
      ...this.headers,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    };
    const body = {
      agence_name: agence.agenceName,
      agence_email: agence.agenceEmail,
      agence_metadata: agence.agenceDetails,
    };
    return this.http.post(
      'https://yarlrybrsqapllwioing.supabase.co/rest/v1/agence_01',
      body,
      { headers: this.headers }
    );
  }
}
