import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { chainedInstruction } from '@angular/compiler/src/render3/view/util';


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
}

  RequestResetUser() {
    const email= this.RequestResetForm.value.email;
    this.isInstructionSend = true;
    setTimeout( ()=> {this.router.navigate(['/'])}, 5000)
   
  }
}
