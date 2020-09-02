import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MsalService } from '@azure/msal-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isAuthenticated: boolean;

  constructor(public auth: MsalService, public router: Router) {
  }

  canActivate(): any {
    if (!this.auth.getAccount()) {
        this.router.navigate(['']);
        return false;
    }
    return true;
  }

}
