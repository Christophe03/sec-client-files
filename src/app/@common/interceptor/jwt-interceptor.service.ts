import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { projectOption } from '../../../environments/project-option';
import { LocalStorageService } from '../services/local-storage.service';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root',
})
export class JwtInterceptorService implements HttpInterceptor {
  constructor(
    private loginService: LoginService,
    private localStorageService: LocalStorageService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // ENVOI
    const token = this.localStorageService.getInLocalStorage(
      projectOption.tokenKey
    );
    //console.log(token);
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `${token}`,
        },
      });
    }

    // RECEPTION
    return next.handle(request).pipe(
      catchError((error) => {
        if (error.status === 403) {
          this.loginService.logout();
        }
        if (error.status === 500) {
          //Quand le token est expiré
          this.loginService.logout();
        }
        throw error;
      })
    );
  }
}
