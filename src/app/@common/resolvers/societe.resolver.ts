import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { ConstanteService } from '../services/constante.service';
import { SocieteService } from '../services/societe.service';

@Injectable({
  providedIn: 'root',
})
export class SocieteResolver implements Resolve<any> {
  data: BehaviorSubject<any>;
  archiList: any[];

  constructor(private service: SocieteService) {
    this.data = new BehaviorSubject({});
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    const values = [this.findArchi()];
    const id = route.paramMap.get('id');

    if (id != null && id != '') {
      console.log(id);
      values.push(this.find(id));
    } else {
      this.data.next(null);
    }

    return new Promise<void>((resolve, reject) => {
      Promise.all(values).then(() => {
        resolve();
      }, reject);
    });
  }

  private find(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.service.find(id).then((response) => {
        if (response != null)
          this.data.next(ConstanteService.getDatas(response));
        resolve(response);
      }, reject);
    });
  }

  private findArchi(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.service.findAllArchitectureDossierForSociete().then((response) => {
        this.archiList = ConstanteService.getDatas(response);
        resolve(response);
      }, reject);
    });
  }
}
