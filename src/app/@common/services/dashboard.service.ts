import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ConstanteService } from './constante.service';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiUrl: string;
  private baseOption: any;

  constructor(protected httpClient: HttpClient) {
    this.apiUrl = environment.serverUrl;
    this.baseOption = ConstanteService.baseOption();
  }

  address() {
    return '/dashboard';
  }

  public findAlertes() {
    const url = encodeURI(this.apiUrl + this.address() + '/alertes');
    return this.httpClient
      .get<any>(url, this.baseOption)
      .pipe(catchError(this.handleError));
  }

  public findDossiers(id: number) {
    const url = encodeURI(this.apiUrl + this.address() + '/dossiers/' + id);
    return this.httpClient
      .get<any>(url, this.baseOption)
      .pipe(catchError(this.handleError));
  }
  public findActivites() {
    const url = encodeURI(this.apiUrl + this.address() + '/activites');
    return this.httpClient
      .get<any>(url, this.baseOption)
      .pipe(catchError(this.handleError));
  }

  public findCa() {
    const url = encodeURI(this.apiUrl + this.address() + '/ca');
    return this.httpClient
      .get<any>(url, this.baseOption)
      .pipe(catchError(this.handleError));
  }

  protected handleError(error) {
    return throwError(error);
  }
}
