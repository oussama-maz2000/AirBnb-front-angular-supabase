import { Injectable } from '@angular/core';
import { CoreModule } from '../core.module';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Annonce } from '../model/annonce.type';
import { v4 as uuidv4 } from 'uuid';
import { Observable, forkJoin, map } from 'rxjs';
import { logResponse } from '../decorators/log-response.decorator';
@Injectable({ providedIn: CoreModule })
export class AnnounceService {
  private supabaseURLStorage: string =
    'https://yarlrybrsqapllwioing.supabase.co/storage/v1/object/ANNOUNCE_IMAGES/';

  private subabaseURLPublic: string =
    'https://yarlrybrsqapllwioing.supabase.co/storage/v1/object/public/';
  private headers = new HttpHeaders({
    apikey:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhcmxyeWJyc3FhcGxsd2lvaW5nIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM1MTk2ODQsImV4cCI6MjAwOTA5NTY4NH0.1idxU3Jybc_V0lAgKEhDtdQwFo_NCjJDv_a0c2-ifpU',

    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhcmxyeWJyc3FhcGxsd2lvaW5nIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM1MTk2ODQsImV4cCI6MjAwOTA5NTY4NH0.1idxU3Jybc_V0lAgKEhDtdQwFo_NCjJDv_a0c2-ifpU',
  });

  constructor(private http: HttpClient) {}

  
  public insertAnnonce(annonce: Annonce, imagesUrl: string[]): Observable<any> {
    this.headers.append('Content-type', 'application/json');
    this.headers.append('Prefer', 'return=representation');
    const body = {
      agence_id: 1,
      estate: annonce.estate,
      type: annonce.type,
      surface: annonce.surface,
      piece: annonce.piece,
      willaya: annonce.willaya,
      codePostal: annonce.codePostal,
      price: annonce.price,
      images: imagesUrl,
      details: annonce.details,
    };

    return this.http.post(
      'https://yarlrybrsqapllwioing.supabase.co/rest/v1/annonce',
      body,
      { headers: this.headers }
    );
  }

  public uploadImages(files: File[]): Observable<string[]> {
    const upload = files.map((file) => {
      const formData = new FormData();
      formData.append('file', file);
      return this.http
        .post<ResponseImg>(`${this.supabaseURLStorage}${uuidv4()}`, formData, {
          headers: this.headers,
        })
        .pipe(map((response) => this.subabaseURLPublic + response.Key));
    });
    return forkJoin(upload);
  }

  public deleteImages(files: readonly string[]): Observable<any> {
    const deleteFiles = files.map((element) => {
      return this.http.delete(element, {
        headers: this.headers,
        observe: 'response',
      });
    });
    return forkJoin(deleteFiles);
  }

  public getAllAnnoncesByID(): Observable<Annonce[]> {
    return this.http.get<Annonce[]>(
      'https://yarlrybrsqapllwioing.supabase.co/rest/v1/annonce?agence_id=eq.1&select=*',
      { headers: this.headers }
    );
  }

  public deleteAnnonce(id:number): Observable<any> {
    return this.http.delete(
      `https://yarlrybrsqapllwioing.supabase.co/rest/v1/annonce?id=eq.${id}`,
      { headers: this.headers, observe: 'response' }
    );
  }

  public deleteImg(path: string): Observable<any> {
    console.log(path);

    return this.http.delete(path, {
      headers: this.headers,
      observe: 'response',
    });
  }



// to get the ip address of client who visit the web site
  getIpAddress(): Observable<any> {
    return this.http.get('https://api.ipify.org?format=json');
  }



  public getAllAnnonces(): Observable<Annonce[]> {
    return this.http.get<Annonce[]>(
      'https://yarlrybrsqapllwioing.supabase.co/rest/v1/annonce?select=*',
      { headers: this.headers }
    );
  }


}
type ResponseImg = {
  Id: string;
  Key: string;
};


