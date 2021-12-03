import { Injectable } from '@angular/core';
import { 
  ActivatedRouteSnapshot, 
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot, 
  UrlTree 
} from '@angular/router';
import { Observable, of } from 'rxjs';

import {SigninService} from "../../auth/signin/signin.service";

@Injectable({
  providedIn: 'root'
})
export class AdministratorGuard implements CanActivate, CanActivateChild {
  constructor(private auth:SigninService, private router:Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): 
      Observable<boolean | UrlTree> 
      | Promise<boolean | UrlTree> 
      | boolean | UrlTree {
        
        const administratorRole = localStorage.getItem('role');
        
        if(this.auth.isAuth() && administratorRole === "ADMIN"){        
          return of(true)
        }
        else{
          this.router.navigate(['/'])
          return of(false)
        }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.canActivate(childRoute,state)
    }
  
}
