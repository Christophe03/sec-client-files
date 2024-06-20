import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Users } from '../models/users';

import { Roles } from 'src/app/pages/param/account/roles/models/roles.model';
import { Fonctions } from 'src/app/pages/param/account/users/models/fonctions.model';
import { Modules } from 'src/app/pages/param/account/users/models/modules.model';
import { UsersDossiers } from 'src/app/pages/param/account/users/models/users_dossiers.model';
import { UsersFonctions } from 'src/app/pages/param/account/users/models/users_fonctions.model';
import { UsersModules } from 'src/app/pages/param/account/users/models/users_modules.model';
import { UsersRoles } from 'src/app/pages/param/account/users/models/users_roles.model';
import { LoginRequest } from '../models/LoginRequest';
import { Dossiers } from '../models/dossiers';
import { FiltreWrapper } from '../wrappers/filtre-wrapper';
import { ConstanteService } from './constante.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl: string;
  private baseOption: any;

  constructor(protected httpClient: HttpClient) {
    this.apiUrl = environment.serverUrl;
    this.baseOption = ConstanteService.baseOption();
  }

  address() {
    return '/sys_users';
  }
  public save(entity: Users) {
    const url = encodeURI(this.apiUrl.concat('/auth/register'));
    return this.httpClient
      .post(url, JSON.stringify(entity), this.baseOption)
      .pipe(catchError(this.handleError));
  }
  public delete(entity: Users) {
    const url = encodeURI(this.apiUrl.concat('/auth/delete'));
    return this.httpClient
      .post(url, JSON.stringify(entity), this.baseOption)
      .pipe(catchError(this.handleError));
  }
  public update(entity: Users) {
    const url = encodeURI(this.apiUrl.concat('/auth/update'));
    return this.httpClient
      .put(url, JSON.stringify(entity), this.baseOption)
      .pipe(catchError(this.handleError));
  }
  public updatePref(entity: Users) {
    const url = encodeURI(this.apiUrl.concat('/auth/updatePref'));
    return this.httpClient
      .put(url, JSON.stringify(entity), this.baseOption)
      .pipe(catchError(this.handleError));
  }
  public updatePassword(entity: any) {
    const url = encodeURI(this.apiUrl.concat('/auth/updatePassword'));
    return this.httpClient
      .put(url, JSON.stringify(entity), this.baseOption)
      .pipe(catchError(this.handleError));
  }
  // public update(id: number, entity: Users) {
  //   const url = encodeURI(this.apiUrl.concat(this.address() + '/' + id));
  //   return this.httpClient
  //     .put(url, JSON.stringify(entity), this.baseOption)
  //     .pipe(catchError(this.handleError));
  // }
  // public delete(id: number) {
  //   const url = encodeURI(this.apiUrl + this.address() + '/' + id);
  //   return this.httpClient
  //     .delete(url, this.baseOption)
  //     .pipe(catchError(this.handleError));
  // }

  public find(id: number) {
    const url = encodeURI(this.apiUrl + this.address() + '/' + id);
    return this.httpClient
      .get<Users>(url, this.baseOption)
      .pipe(catchError(this.handleError));
  }
  public findAll() {
    const url = encodeURI(this.apiUrl + this.address());
    return this.httpClient
      .get<Users>(url, this.baseOption)
      .pipe(catchError(this.handleError));
  }
  public search(fw: FiltreWrapper) {
    const url = encodeURI(this.apiUrl + this.address() + '/search');
    return this.httpClient
      .post<Users>(url, JSON.stringify(fw), this.baseOption)
      .pipe(catchError(this.handleError));
  }

  changePwd(user: LoginRequest) {
    const url = encodeURI(this.apiUrl + this.address() + '/initPassword');
    return this.httpClient
      .post<any>(url, JSON.stringify(user), this.baseOption)
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
  public saveDossier(entity: UsersDossiers) {
    const url = encodeURI(this.apiUrl.concat(this.address() + '/dossier/'));
    return this.httpClient
      .post(url, JSON.stringify(entity), this.baseOption)
      .pipe(catchError(this.handleError));
  }

  public updateDossier(id: number, entity: UsersDossiers) {
    const url = encodeURI(
      this.apiUrl.concat(this.address() + '/dossier/' + id)
    );
    return this.httpClient
      .put(url, JSON.stringify(entity), this.baseOption)
      .pipe(catchError(this.handleError));
  }
  public deleteDossier(id: number) {
    const url = encodeURI(this.apiUrl + this.address() + '/dossier/' + id);
    return this.httpClient
      .delete(url, this.baseOption)
      .pipe(catchError(this.handleError));
  }
  public searchDossiers(fw: FiltreWrapper) {
    const url = encodeURI(this.apiUrl + this.address() + '/searchDossier');
    return this.httpClient
      .post<UsersDossiers>(url, JSON.stringify(fw), this.baseOption)
      .pipe(catchError(this.handleError));
  }
  public dossierToAdd(id: number) {
    const url = encodeURI(this.apiUrl + this.address() + '/dossierToAdd/' + id);
    return this.httpClient
      .get<Dossiers>(url, this.baseOption)
      .pipe(catchError(this.handleError));
  }
  public saveRole(entity: UsersRoles) {
    const url = encodeURI(this.apiUrl.concat(this.address() + '/role/'));
    return this.httpClient
      .post(url, JSON.stringify(entity), this.baseOption)
      .pipe(catchError(this.handleError));
  }

  public updateRole(id: number, entity: UsersRoles) {
    const url = encodeURI(this.apiUrl.concat(this.address() + '/role/' + id));
    return this.httpClient
      .put(url, JSON.stringify(entity), this.baseOption)
      .pipe(catchError(this.handleError));
  }
  public deleteRole(id: number) {
    const url = encodeURI(this.apiUrl + this.address() + '/role/' + id);
    return this.httpClient
      .delete(url, this.baseOption)
      .pipe(catchError(this.handleError));
  }
  public searchRoles(fw: FiltreWrapper) {
    const url = encodeURI(this.apiUrl + this.address() + '/searchRole');
    return this.httpClient
      .post<UsersRoles>(url, JSON.stringify(fw), this.baseOption)
      .pipe(catchError(this.handleError));
  }
  public roleToAdd(id: number) {
    const url = encodeURI(this.apiUrl + this.address() + '/roleToAdd/' + id);
    return this.httpClient
      .get<Roles>(url, this.baseOption)
      .pipe(catchError(this.handleError));
  }
  public saveModule(entity: UsersModules) {
    const url = encodeURI(this.apiUrl.concat(this.address() + '/module/'));
    return this.httpClient
      .post(url, JSON.stringify(entity), this.baseOption)
      .pipe(catchError(this.handleError));
  }

  public updateModule(id: number, entity: UsersModules) {
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
      .post<UsersModules>(url, JSON.stringify(fw), this.baseOption)
      .pipe(catchError(this.handleError));
  }
  public moduleToAdd(id: number) {
    const url = encodeURI(this.apiUrl + this.address() + '/moduleToAdd/' + id);
    return this.httpClient
      .get<Modules>(url, this.baseOption)
      .pipe(catchError(this.handleError));
  }
  public saveFonction(entity: UsersFonctions) {
    const url = encodeURI(this.apiUrl.concat(this.address() + '/fonction/'));
    return this.httpClient
      .post(url, JSON.stringify(entity), this.baseOption)
      .pipe(catchError(this.handleError));
  }

  public updateFonction(id: number, entity: UsersFonctions) {
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
      .post<UsersFonctions>(url, JSON.stringify(fw), this.baseOption)
      .pipe(catchError(this.handleError));
  }
  public fonctionToAdd(id: number) {
    const url = encodeURI(
      this.apiUrl + this.address() + '/fonctionToAdd/' + id
    );
    return this.httpClient
      .get<Fonctions>(url, this.baseOption)
      .pipe(catchError(this.handleError));
  }
  protected handleError(error) {
    return throwError(error);
  }
}
