import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  RequestResetForm!: FormGroup;
  forbiddenEmails: any;
  errorMessage!: string;
  successMessage!: string;
  IsvalidForm = false;
  

  constructor(
    private authService: AuthService,
    private router: Router,
   ) {

  }


  ngOnInit() {

    this.RequestResetForm = new FormGroup({
      'email': new FormControl(" ", [Validators.required, Validators.email], this.forbiddenEmails),
    });
  }

validateEmail(event: any){
  this.IsvalidForm =  this.RequestResetForm.get("email")?.status=== "VALID";
 console.log( this.RequestResetForm.get("email")?.status);

}

  RequestResetUser() {
    const email= this.RequestResetForm.value.email;
    console.log(email);

    // console.log(form.valid);
    // console.log(this.RequestResetForm.value)

    // if (form.valid) {
    //   this.IsvalidForm = true;
    //   this.authService.requestReset(this.RequestResetForm.value).subscribe(
    //     data => {
    //       this.RequestResetForm.reset();
    //       this.successMessage = "Reset password link send to email sucessfully.";
    //       setTimeout(() => {
    //         this.successMessage = " ";
    //         this.router.navigate(['sign-in']);
    //       }, 3000);
    //     },
    //     err => {

    //       if (err.error.message) {
    //         this.errorMessage = err.error.message;
    //       }
    //     }
    //   );
    // } else {
    //   this.IsvalidForm = false;
    // }
  }
}
