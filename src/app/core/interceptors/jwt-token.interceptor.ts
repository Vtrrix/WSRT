import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageDataService } from '../services/local-storage-data.service';

@Injectable()
export class JwtTokenInterceptor implements HttpInterceptor {
  constructor(private localStorageDataService: LocalStorageDataService) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.localStorageDataService.getJwtToken) {
      req = req.clone({
        headers: req.headers.set(
          'token',
          this.localStorageDataService.getJwtToken
        ),
      });
    }

    return next.handle(req);
  }
}
