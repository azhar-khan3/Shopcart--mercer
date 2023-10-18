import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  currentrole: any;
  respdata: any;
  constructor(private service: AuthService, private route: Router) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.service.isLoggedIn()) {
      this.currentrole = this.service.getRoleByToken(this.service.getUserToken());
      if (this.currentrole == 'Customer') {
        return true;
      } else {
        // window.alert('you are not authorized to access this menu');
        this.route.navigate(['admin']);
        return false;
      }
    } else {
      this.route.navigate(['login']);
      return false;
    }

    
  }





}