import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { chainedInstruction } from '@angular/compiler/src/render3/view/util';
import { HttpClient } from '@angular/common/http';
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';
import { SigninService } from '../signin/signin.service';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  RequestResetForm!: FormGroup;
  forbiddenEmails: any;

  IsvalidForm = false;

  isInstructionSend = false;
  isEmailWrong = false;


  constructor(
    private router: Router,
    private http: HttpClient,
    private auth: SigninService
  ) {

  }


  ngOnInit() {

    this.RequestResetForm = new FormGroup({
      'email': new FormControl(" ", [Validators.required, Validators.email], this.forbiddenEmails),
    });
  }

  validateEmail(event: any) {
    this.IsvalidForm = this.RequestResetForm.get("email")?.status === "VALID";
  }

  RequestResetUser() {
    const email = this.RequestResetForm.value.email;
    this.auth.resetPassword(email).subscribe(
      response => console.log(response),
      err => {
        if (err.status == 403) {
          this.isEmailWrong = true;
          setTimeout(() => { this.isEmailWrong = false }, 5000);
          console.log(err)
        } else {
          console.log(err);
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
