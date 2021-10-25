import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenteeService } from 'src/app/core/services/mentee.service';
import { MenteeProfile } from 'src/app/core/interfaces/mentee';
import { ErrorPagesServices } from 'src/app/core/services/error-pages.service';

@Component({
  selector: 'app-account-mentee',
  templateUrl: './account-mentee.component.html',
  styleUrls: ['./account-mentee.component.scss']
})
export class AccountMenteeComponent implements OnInit, OnDestroy {
  public editingState: boolean = false;

  menteeForm: FormGroup;

  public userMentee: MenteeProfile = {
    firstName: "",
    lastName: "",
    email: "",
    socialMap: {
      PhoneNumFirst: "",
      Telegram: "",
      Skype: "",
      LinkedIn: "",
      GitHub: ""
    }
  }
  constructor(private fb: FormBuilder, private menteeService: MenteeService, private errorPagesServices: ErrorPagesServices) {
    this.menteeForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(10)]],
      phone: ['', [Validators.required]],
      skype: [''],
      telegram: [''],
      linkedin: [''],
      github: ['']
      });
  }

  ngOnInit(): void {
    this.getData();
  }

  onSubmit(form: FormGroup) {
    this.editingState = false;
    if(this.menteeForm.valid){
      this.menteeService.sendData(this.userMentee)
      .subscribe((res) => {
      },
        (error) => {
          this.errorPagesServices.checkError(error)
        })
    }
  }

  ngOnDestroy(){

  }

  getData(){
    this.menteeService.getData()
    .subscribe((res)=> {
      this.userMentee = res;
    },
      (error) => {
        this.errorPagesServices.checkError(error)
      })
  }

}
