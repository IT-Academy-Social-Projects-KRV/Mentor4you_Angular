import { Component, OnInit, ViewChild } from '@angular/core';
import { ModeratorService } from '../../moderator.service';
import { Moderator } from '../../moderator.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-moderator-edit',
  templateUrl: './moderator-edit.component.html',
  styleUrls: ['./moderator-edit.component.scss']
})
export class ModeratorEditComponent implements OnInit {
  moderatorInfo!:Moderator;
  @ViewChild('f') changeForm: NgForm | undefined;
  

  constructor(private moderatorService:ModeratorService) { }

  ngOnInit(): void {
    this.moderatorInfo = this.moderatorService.moderator;    
  }

  onSubmit() {
    if(this.changeForm?.value.moderatorData.firstName.length > 0) {
      this.moderatorInfo.first_name = this.changeForm?.value.moderatorData.firstName;
      this.moderatorService.moderator.first_name = this.changeForm?.value.moderatorData.firstName;
    }
    if(this.changeForm?.value.moderatorData.lastName.length > 0) {
      this.moderatorInfo.last_name = this.changeForm?.value.moderatorData.lastName;
      this.moderatorService.moderator.last_name = this.changeForm?.value.moderatorData.lastName;
    }
    if(this.changeForm?.value.moderatorData.email.length > 0) {
      this.moderatorInfo.email = this.changeForm?.value.moderatorData.email;
      this.moderatorService.moderator.email = this.changeForm?.value.moderatorData.email;
    }
    if(this.changeForm?.value.moderatorData.picture.length > 0) {
      this.moderatorInfo.avatar = this.changeForm?.value.moderatorData.picture;
      this.moderatorService.moderator.avatar = this.changeForm?.value.moderatorData.picture;
    }
    if(this.changeForm?.value.moderatorData.password.length > 0) {
      this.moderatorInfo.password = this.changeForm?.value.moderatorData.password;
      this.moderatorService.moderator.password = this.changeForm?.value.moderatorData.password;
    }
    this.changeForm?.reset();
  }

}
