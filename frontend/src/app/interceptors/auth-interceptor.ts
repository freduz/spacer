import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const apikey = environment.api.key;
    const clonedRequest = req.clone({
      headers: req.headers.append('x-api-key', apikey),
    });
    return next.handle(clonedRequest);
  }

  constructor() {}
}
