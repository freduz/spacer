import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, concatMap, map, of } from 'rxjs';

import { environment } from '../../environments/environment';
import { IMessage } from '../types/message.interface';
import { IMessageResponse } from '../types/message-response.interface';
import { ToastrService } from 'ngx-toastr';

const API_URL = `${environment.api.baseUrl}/messages`;
@Injectable({
  providedIn: 'root',
})
export class AlienService {
  /**
   *
   * @param http
   */
  constructor(
    private readonly http: HttpClient,
    private toaster: ToastrService
  ) {}

  /**
   *
   */
  getData(): Observable<IMessage[]> {
    return this.http.get<IMessageResponse>(API_URL).pipe(
      catchError((err) => {
        this.toaster.error('Error occured', err?.message);
        return of(0);
      }),
      map((res: any) => {
        return res?.messages;
      })
    );
  }

  /**
   *
   */
  sendData(data: any): Observable<IMessage[]> {
    return this.http
      .post<any>(API_URL, data, { responseType: 'text' as 'json' })
      .pipe(
        catchError((err) => {
          this.toaster.error('Error occured', err?.message);
          return of(0);
        }),
        concatMap(() => this.getData())
      );
  }
}
