import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ModeratorService } from '../../moderator.service';
import { Moderator } from '../../moderator.model';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-moderator-edit',
  templateUrl: './moderator-edit.component.html',
  styleUrls: ['./moderator-edit.component.scss']
})
export class ModeratorEditComponent implements OnInit, OnDestroy {
  moderatorInfo!:Moderator;
  @ViewChild('f') changeForm: NgForm | undefined;
  changeModeratorNameSubscription!: Subscription;
  changeModeratorPasswordSubscription!: Subscription;
  moderatorInfoSubscription!: Subscription;
  

  constructor(
    private moderatorService:ModeratorService,
    private toaster: ToastrService) { }

  ngOnInit(): void {
    this.moderatorInfoSubscription = this.moderatorService.moderator
      .subscribe(moderData => {
        this.moderatorInfo = moderData;
      })
  }

  onSubmit() {
    const putNameData = {
      lastName: this.moderatorInfo.lastName,
      firstName: this.moderatorInfo.firstName,
      email: this.moderatorInfo.email
    }

    const putPasswordData = {
      oldPassword: this.changeForm?.value.moderatorData.oldPassword,
      newPassword: this.changeForm?.value.moderatorData.newPassword
    }

    if(this.changeForm?.value.moderatorData.lastName.length > 0) {
      putNameData.lastName = this.changeForm?.value.moderatorData.lastName
    }

    if(this.changeForm?.value.moderatorData.firstName.length > 0) {
      putNameData.firstName = this.changeForm?.value.moderatorData.firstName;
    }

    this.changeModeratorNameSubscription = this.moderatorService
      .changeModeratorName(putNameData).subscribe(() => {
        this.moderatorInfo.lastName = putNameData.lastName;
        this.moderatorInfo.firstName = putNameData.firstName;
        this.moderatorService.moderator.next(this.moderatorInfo);  
        this.toaster.success('Your data has been changed!');
      })

    if(putPasswordData.oldPassword.length > 0 && putPasswordData.newPassword.length > 0) {
      this.changeModeratorPasswordSubscription = this.moderatorService
        .changeModeratorPassword(putPasswordData).subscribe(() => {
          console.log('Password has been changed!');
        })
    }

    this.changeForm?.reset();
  }

  ngOnDestroy(): void {
    this.changeModeratorNameSubscription?.unsubscribe();
    this.changeModeratorPasswordSubscription?.unsubscribe();
    this.moderatorInfoSubscription.unsubscribe();
  }
}
