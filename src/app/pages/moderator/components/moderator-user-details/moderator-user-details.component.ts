import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ModeratorService } from '../../moderator.service';
import { User } from '../../user.model';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-moderator-user-details',
  templateUrl: './moderator-user-details.component.html',
  styleUrls: ['./moderator-user-details.component.scss']
})
export class ModeratorUserDetailsComponent implements OnInit, OnDestroy {
  @Input() userInformation!: User;
  displayDetails!:boolean;
  displayDetailsSubscription!: Subscription;
  bannUserSubscription!: Subscription;
  
  constructor(
    private moderatorService: ModeratorService, 
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.displayDetailsSubscription = this.moderatorService.userSelectedDisplay
      .subscribe(display => {
        this.displayDetails = display;
      })
  }

  onUserInformation() {  
    this.moderatorService.userSelectedDisplay.next(false);
  }

  onUserBanned(id: number, last_name:string, first_name:string) {    
    this.bannUserSubscription = this.moderatorService.banUser(id).subscribe(() => {
      this.userInformation.ban = true;
      this.toastr.warning('has been banned!!', `${last_name} ${first_name}`);
    });
  }

  ngOnDestroy(): void {
    this.displayDetailsSubscription.unsubscribe();
    this.bannUserSubscription?.unsubscribe();
  }
}
