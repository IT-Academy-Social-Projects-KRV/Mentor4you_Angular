import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ModeratorService } from './moderator.service';

@Injectable({
  providedIn: 'root'
})
export class ModeratorResolver implements Resolve<boolean> {

  constructor(private moderatorService: ModeratorService) {}

  resolve(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const moderator = this.moderatorService.moderator;
    if(!moderator) {
      this.moderatorService.getModerator().subscribe(data => {
        this.moderatorService.moderator.next(data)
        console.log(this.moderatorService.moderator);
      })
    }  
    return of(true);
  }
}
