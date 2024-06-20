import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { ConstanteService } from 'src/app/@common/services/constante.service';
import { RolesService } from './roles.service';

@Injectable({
  providedIn: 'root',
})
export class RolesResolver implements Resolve<any> {
  item: BehaviorSubject<any>;

  constructor(private service: RolesService) {
    this.item = new BehaviorSubject({});
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    const values = [];
    const id = route.paramMap.get('id');
    if (id && Number.isInteger(+id)) {
      values.push(this.find(id));
    } else {
      this.item.next(null);
    }

    return new Promise<void>((resolve, reject) => {
      Promise.all(values).then(() => {
        resolve();
      }, reject);
    });
  }

  private find(id): Promise<any> {
    return new Promise((resolve, reject) => {
      this.service.find(id).subscribe((response) => {
        this.item.next(ConstanteService.getDatas(response));
        resolve(response);
      }, reject);
    });
  }
}
