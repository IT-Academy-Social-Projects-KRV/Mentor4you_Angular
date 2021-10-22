import { Component, OnInit, ViewChild } from '@angular/core';
import { ModeratorService } from '../../moderator.service';
import { Moderator } from '../../moderator.model';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-moderator-edit',
  templateUrl: './moderator-edit.component.html',
  styleUrls: ['./moderator-edit.component.scss']
})
export class ModeratorEditComponent implements OnInit {
  moderatorInfo!:Moderator;
  @ViewChild('f') changeForm: NgForm | undefined;
  

  constructor(
    private moderatorService:ModeratorService,
    private toaster: ToastrService) { }

  ngOnInit(): void {
    this.moderatorInfo = this.moderatorService.moderator;    
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

    this.moderatorService.changeModeratorName(putNameData).subscribe(() => {
      this.moderatorService.moderator.lastName = putNameData.lastName;
      this.moderatorService.moderator.firstName = putNameData.firstName;
      this.toaster.success('Your data has been changed!');
    })

    if(putPasswordData.oldPassword.length > 0 && putPasswordData.newPassword.length > 0) {
      this.moderatorService.changeModeratorPassword(putPasswordData).subscribe(() => {
        console.log('Password has been changed!');
      })
    }


    this.changeForm?.reset();
  }

}
