import { Injectable, inject } from '@angular/core';
import { CoreModule } from '../core.module';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: CoreModule })
export class AnnounceService {}
