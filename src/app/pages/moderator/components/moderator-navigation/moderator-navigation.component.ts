import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModeratorService } from '../../moderator.service';
import { Moderator } from '../../moderator.model';
import { ErrorPagesServices } from 'src/app/core/services/error-pages.service';
import { SigninService } from 'src/app/auth/signin/signin.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-moderator-navigation',
  templateUrl: './moderator-navigation.component.html',
  styleUrls: ['./moderator-navigation.component.scss']
})
export class ModeratorNavigationComponent implements OnInit, OnDestroy {
  moderator!:Moderator;
  moderatorSubscription!: Subscription;
  moderatorDataSubscription!: Subscription;

  constructor(
    private moderatorService: ModeratorService, 
    private errorPagesServices: ErrorPagesServices,
    private signinService: SigninService,
    private router: Router) { }

  ngOnInit(): void {  
    this.moderatorSubscription = this.moderatorService.getModerator()
      .subscribe(data => {      
        this.moderatorService.moderator.next(data);  
      },
        (error) => {
          this.errorPagesServices.checkError(error)
        });
    this.moderatorDataSubscription = this.moderatorService.moderator
      .subscribe(moderdata => {
        this.moderator = moderdata;
      });
  }

  logout() {
    this.signinService.logout()
    this.router.navigate(['/auth/login']);
  }

  ngOnDestroy(): void {
    this.moderatorSubscription.unsubscribe();
    this.moderatorDataSubscription.unsubscribe();
  }
}
