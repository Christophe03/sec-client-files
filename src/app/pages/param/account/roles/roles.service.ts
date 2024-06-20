import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ConstanteService } from 'src/app/@common/services/constante.service';
import { FiltreWrapper } from 'src/app/@common/wrappers/filtre-wrapper';
import { environment } from 'src/environments/environment';
import { Roles } from './models/roles.model';
import { RolesFonctions } from './models/roles_fonctions.model';
import { RolesModules } from './models/roles_modules.model';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  private apiUrl: string;
  private baseOption: any;

  constructor(protected httpClient: HttpClient) {
    this.apiUrl = environment.serverUrl;
    this.baseOption = ConstanteService.baseOption();
  }

  address() {
    return '/sys_roles';
  }
  public save(entity: Roles) {
    const url = encodeURI(this.apiUrl.concat(this.address()));
    return this.httpClient
      .post(url, JSON.stringify(entity), this.baseOption)
      .pipe(catchError(this.handleError));
  }

  public update(id: number, entity: Roles) {
    const url = encodeURI(this.apiUrl.concat(this.address() + '/' + id));
    return this.httpClient
      .put(url, JSON.stringify(entity), this.baseOption)
      .pipe(catchError(this.handleError));
  }
  public delete(id: number) {
    const url = encodeURI(this.apiUrl + this.address() + '/' + id);
    return this.httpClient
      .delete(url, this.baseOption)
      .pipe(catchError(this.handleError));
  }

  public find(id: number) {
    const url = encodeURI(this.apiUrl + this.address() + '/' + id);
    return this.httpClient
      .get<Roles>(url, this.baseOption)
      .pipe(catchError(this.handleError));
  }
  public findAll() {
    const url = encodeURI(this.apiUrl + this.address());
    return this.httpClient
      .get<Roles>(url, this.baseOption)
      .pipe(catchError(this.handleError));
  }
  public search(fw: FiltreWrapper) {
    const url = encodeURI(this.apiUrl + this.address() + '/search');
    return this.httpClient
      .post<Roles>(url, JSON.stringify(fw), this.baseOption)
      .pipe(catchError(this.handleError));
  }
  export(f: FiltreWrapper): Observable<Blob> {
    const url = encodeURI(this.apiUrl + this.address() + '/export');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    return this.httpClient.post<Blob>(url, JSON.stringify(f), {
      headers: headers,
      responseType: 'blob' as 'json',
    });
  }

  public saveModule(entity: RolesModules) {
    const url = encodeURI(this.apiUrl.concat(this.address() + '/module/'));
    return this.httpClient
      .post(url, JSON.stringify(entity), this.baseOption)
      .pipe(catchError(this.handleError));
  }

  public updateModule(id: number, entity: RolesModules) {
    const url = encodeURI(this.apiUrl.concat(this.address() + '/module/' + id));
    return this.httpClient
      .put(url, JSON.stringify(entity), this.baseOption)
      .pipe(catchError(this.handleError));
  }
  public deleteModule(id: number) {
    const url = encodeURI(this.apiUrl + this.address() + '/module/' + id);
    return this.httpClient
      .delete(url, this.baseOption)
      .pipe(catchError(this.handleError));
  }
  public searchModule(fw: FiltreWrapper) {
    const url = encodeURI(this.apiUrl + this.address() + '/searchModule');
    return this.httpClient
      .post<RolesModules>(url, JSON.stringify(fw), this.baseOption)
      .pipe(catchError(this.handleError));
  }
  public moduleToAdd(id: number) {
    const url = encodeURI(this.apiUrl + this.address() + '/moduleToAdd/' + id);
    return this.httpClient
      .get<RolesModules>(url, this.baseOption)
      .pipe(catchError(this.handleError));
  }
  public saveFonction(entity: RolesFonctions) {
    const url = encodeURI(this.apiUrl.concat(this.address() + '/fonction/'));
    return this.httpClient
      .post(url, JSON.stringify(entity), this.baseOption)
      .pipe(catchError(this.handleError));
  }

  public updatFonction(id: number, entity: RolesFonctions) {
    const url = encodeURI(
      this.apiUrl.concat(this.address() + '/fonction/' + id)
    );
    return this.httpClient
      .put(url, JSON.stringify(entity), this.baseOption)
      .pipe(catchError(this.handleError));
  }
  public deleteFonction(id: number) {
    const url = encodeURI(this.apiUrl + this.address() + '/fonction/' + id);
    return this.httpClient
      .delete(url, this.baseOption)
      .pipe(catchError(this.handleError));
  }
  public searchFonction(fw: FiltreWrapper) {
    const url = encodeURI(this.apiUrl + this.address() + '/searchFonction');
    return this.httpClient
      .post<RolesFonctions>(url, JSON.stringify(fw), this.baseOption)
      .pipe(catchError(this.handleError));
  }
  public fonctionToAdd(id: number) {
    const url = encodeURI(
      this.apiUrl + this.address() + '/fonctionToAdd/' + id
    );
    return this.httpClient
      .get<RolesFonctions>(url, this.baseOption)
      .pipe(catchError(this.handleError));
  }
  protected handleError(error) {
    return throwError(error);
  }
}
