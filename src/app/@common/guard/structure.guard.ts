import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/pages/login/login.service';
import { projectOption } from 'src/environments/project-option';

@Injectable({
  providedIn: 'root'
})
export class StructureGuard implements CanActivate {
  constructor(private router: Router, private loginService: LoginService) { }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const created = this.loginService.isStructureCreated();
    if (!created) {
      this.router.navigate([projectOption.societeLink]);
    }
    return created;
  }

}
