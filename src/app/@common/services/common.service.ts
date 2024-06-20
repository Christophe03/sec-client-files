import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ConstanteService } from './constante.service';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private apiUrl: string;
  private baseOption: any;

  constructor(
    protected translate: TranslateService,
    protected httpClient: HttpClient
  ) {
    this.apiUrl = environment.serverUrl;
    this.baseOption = ConstanteService.baseOption();
  }

  public findSexe() {
    const items = [];
    items.push({ code: 'M', libelle: this.translate.instant('masculin') });
    items.push({ code: 'F', libelle: this.translate.instant('feminin') });
    items.push({ code: 'A', libelle: this.translate.instant('autre') });
    return items;
  }
  public findEtatCivile() {
    const items = [];
    items.push({ code: 'C', libelle: this.translate.instant('celibataire') });
    items.push({ code: 'M', libelle: this.translate.instant('marie') });
    items.push({ code: 'D', libelle: this.translate.instant('divorce') });
    items.push({ code: 'V', libelle: this.translate.instant('veuf') });
    return items;
  }
  public findNombreEnfant() {
    const items = [];
    for (let i = 0; i <= 10; i++) {
      items.push({ code: i, libelle: i + '' });
    }
    return items;
  }
  public gestAnnees(a: number) {
    const items = [];
    for (let i = a; i > a - 5; i--) {
      items.push({ code: i, libelle: i + '' });
    }
    return items;
  }
  public gestPeriodes() {
    const items = [];
    for (let i = 1; i <= 4; i++) {
      items.push({ code: i, libelle: i + '' });
    }
    return items;
  }

  public formatNumber(n): number {
    return n.replace(/[^0-9]/g, '');
  }
  public getPhoto(img, nature, id): Observable<Blob> {
    const url = encodeURI(
      this.apiUrl + '/photo/load/' + img + '/' + nature + '/' + id
    );
    return this.httpClient.get(url, { responseType: 'blob' });
  }
  public uploadPhoto(photo: File, emp, nature, id) {
    const url = encodeURI(
      this.apiUrl + '/photo/upload/' + emp + '/' + nature + '/' + id
    );
    const uploadImageData = new FormData();
    uploadImageData.append('file', photo);
    this.httpClient
      .post(url, uploadImageData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          console.log('image enregistre avec succes');
        } else {
          console.log('image non enregistre');
        }
      });
  }
  public deletePhoto(emp, nature) {
    const url = encodeURI(this.apiUrl + '/photo/delete/' + emp + '/' + nature);
    return this.httpClient
      .get(url, this.baseOption)
      .pipe(catchError(this.handleError));
  }
  public eventRappels() {
    const items = [];
    items.push({ code: 'N15M', libelle: this.translate.instant('N15M') });
    items.push({ code: 'N30M', libelle: this.translate.instant('N30M') });
    items.push({ code: 'N1H', libelle: this.translate.instant('N1H') });
    items.push({ code: 'N2H', libelle: this.translate.instant('N2H') });
    items.push({ code: 'N1J', libelle: this.translate.instant('N1J') });
    items.push({ code: 'E3H', libelle: this.translate.instant('E3H') });
    items.push({ code: 'E6H', libelle: this.translate.instant('E6H') });
    return items;
  }

  public getProjetPeriodicites() {
    const items = [];
    items.push({ code: 'J', libelle: this.translate.instant('jours') });
    items.push({ code: 'S', libelle: this.translate.instant('semaines') });
    items.push({ code: 'M', libelle: this.translate.instant('mois') });
    items.push({ code: 'A', libelle: this.translate.instant('annees') });
    return items;
  }
  public periodiciteContrat() {
    const items = [];
    items.push({ code: 'N', libelle: this.translate.instant('aucune') });
    items.push({ code: 'M', libelle: this.translate.instant('mensuelle') });
    items.push({ code: 'S', libelle: this.translate.instant('semestrielle') });
    items.push({ code: 'A', libelle: this.translate.instant('annuelle') });
    return items;
  }
  public rappelTypes() {
    const items = [];
    items.push({
      code: -1,
      libelle: this.translate.instant('.veuillez.selectionner.'),
    });
    items.push({ code: 1, libelle: this.translate.instant('repondeur') });
    items.push({ code: 2, libelle: this.translate.instant('occupe') });
    items.push({ code: 3, libelle: this.translate.instant('message') });
    items.push({ code: 4, libelle: this.translate.instant('a.rappeler') });
    items.push({ code: 5, libelle: this.translate.instant('droit.rappeler') });
    items.push({ code: 6, libelle: this.translate.instant('a.relancer') });
    return items;
  }

  public statutsConge() {
    const items = [];
    items.push({ code: 'P', libelle: this.translate.instant('sc.planifiee') });
    items.push({ code: 'S', libelle: this.translate.instant('sc.soumise') });
    items.push({ code: 'V', libelle: this.translate.instant('sc.acceptee') });
    items.push({ code: 'R', libelle: this.translate.instant('sc.rejetee') });
    items.push({ code: 'A', libelle: this.translate.instant('sc.annulee') });
    return items;
  }

  public domainesModels() {
    const items = [];
    items.push({ code: 'CL', libelle: this.translate.instant('dom.clients') });
    items.push({
      code: 'AG',
      libelle: this.translate.instant('dom.collaborateurs'),
    });
    items.push({ code: 'GC', libelle: this.translate.instant('dom.conges') });
    items.push({ code: 'MI', libelle: this.translate.instant('dom.missions') });
    return items;
  }
  public typePlaning() {
    const items = [];
    items.push({ code: 'C', libelle: this.translate.instant('pl.conge') });
    items.push({ code: 'A', libelle: this.translate.instant('pl.abscence') });
    return items;
  }

  public mois() {
    const items = [];
    items.push({ code: 0, libelle: this.translate.instant('mois.jan') });
    items.push({ code: 1, libelle: this.translate.instant('mois.fev') });
    items.push({ code: 2, libelle: this.translate.instant('mois.mar') });
    items.push({ code: 3, libelle: this.translate.instant('mois.avr') });
    items.push({ code: 4, libelle: this.translate.instant('mois.mai') });
    items.push({ code: 5, libelle: this.translate.instant('mois.juin') });
    items.push({ code: 6, libelle: this.translate.instant('mois.juil') });
    items.push({ code: 7, libelle: this.translate.instant('mois.aout') });
    items.push({ code: 8, libelle: this.translate.instant('mois.sep') });
    items.push({ code: 9, libelle: this.translate.instant('mois.oct') });
    items.push({ code: 10, libelle: this.translate.instant('mois.nov') });
    items.push({ code: 11, libelle: this.translate.instant('mois.dec') });
    return items;
  }

  public statutActifInactif() {
    const items = [];
    items.push({ code: '1', libelle: this.translate.instant('actif') });
    items.push({ code: '0', libelle: this.translate.instant('inactif') });
    return items;
  }

  public tri() {
    const items = [];
    items.push({
      code: 'ASC',
      libelle: this.translate.instant('tri.croissant'),
    });
    items.push({
      code: 'DESC',
      libelle: this.translate.instant('tri.decroissant'),
    });
    return items;
  }

  public findLogsActions() {
    const items = [];
    items.push({ code: 'I', libelle: this.translate.instant('logs.create') });
    items.push({ code: 'U', libelle: this.translate.instant('logs.update') });
    items.push({ code: 'D', libelle: this.translate.instant('logs.delete') });
    return items;
  }
  public getCodes(n: string) {
    const url = encodeURI(this.apiUrl + '/pub_codes/byNature/' + n);
    return this.httpClient
      .get<any>(url, this.baseOption)
      .pipe(catchError(this.handleError));
  }
  protected handleError(error) {
    return throwError(error);
  }
}
