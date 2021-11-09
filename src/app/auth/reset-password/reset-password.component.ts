import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { SigninService } from '../signin/signin.service';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  RequestResetForm!: FormGroup;
  IsvalidForm = false;
  isInstructionSend = false;
  isEmailWrong = false;
  // forbiddenEmails: any;

  constructor(
    private router: Router,
    private auth: SigninService
  ) { }


  ngOnInit(): void {

    this.RequestResetForm = new FormGroup({
      'email': new FormControl(" ", [Validators.required, Validators.email]),
    });
  }

  validateEmail(): void {
    this.IsvalidForm = this.RequestResetForm.get("email")?.status === "VALID";
  }

  RequestResetUser(): void {
    const email = this.RequestResetForm.value.email;

    this.auth.resetPassword(email).subscribe(
      response => console.log(response),
      err => {
        if (err.status == 403) {
          this.isEmailWrong = true;
          setTimeout(() => { this.isEmailWrong = false }, 5000);
          // console.log(err)
        } else {
          // console.log(err);
          setTimeout(() => { this.router.navigate(['/auth/login']) }, 7000);
        }
      },
      () => {
        this.isInstructionSend = true;
        setTimeout(() => { this.router.navigate(['/auth/login']) }, 7000);
      }
    );
  }

}
