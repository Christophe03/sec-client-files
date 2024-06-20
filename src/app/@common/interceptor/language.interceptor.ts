import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

export class LanguageInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const lang = localStorage.getItem('lang') || 'fr';

    req = req.clone({
      setHeaders: {
        'Accept-Language': lang
      }
    });
    return next.handle(req);
  }
}
