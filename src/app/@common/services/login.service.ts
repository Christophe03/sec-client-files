import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';

import { projectOption } from '../../../environments/project-option';

import { LocalStorageService } from './local-storage.service';
import { Users } from '../models/users';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private auth: Auth = inject(Auth);
  account: BehaviorSubject<any>;
  role: BehaviorSubject<any>;
  constructor(public router: Router) {
    this.account = new BehaviorSubject({});
    this.role = new BehaviorSubject({});
  }
  updatedAccount(data: Users) {
    this.account.next(data);
  }
  updatedRole(data: string) {
    this.role.next(data);
  }

  async login(email: string, pwd: string) {
    // console.log(user);
  }

  logout() {
    this.account.next(null);
    this.router.navigate([projectOption.loginLink], {
      skipLocationChange: true,
    });
  }

  protected handleError(error) {
    return throwError(error);
  }
}
