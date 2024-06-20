import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { projectOption } from '../../../environments/project-option';
import { LoginService } from '../services/login.service';
@Injectable({
  providedIn: 'root',
})
export class LoggedInGuard {
  constructor(private router: Router, private loginService: LoginService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const loggedIn = this.loginService.isLoggedIn();
    if (!loggedIn) {
      this.router.navigate([projectOption.loginLink]);
    }
    return loggedIn;
  }
}
