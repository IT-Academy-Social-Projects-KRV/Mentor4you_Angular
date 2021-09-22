import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { chainedInstruction } from '@angular/compiler/src/render3/view/util';
import { HttpClient } from '@angular/common/http';
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';


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
    private http: HttpClient,
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
    console.log(email);
    this.isInstructionSend = true;
    // let requestBody = {
    //   "login": "oksana@gmail.com",
    //   "password": "Wtf12345"
    // };
    //setTimeout( ()=> {this.router.navigate(['/'])}, 5000)
    // this.http.post("http://localhost:8080/system/auth", requestBody).subscribe(response => console.log(response))
    const smth = {
        next: (x: any) => console.log("success"),
        error: (err: any) => console.log(err)
    };
    let requestBody = {
     "login": email,
    };
     this.http.post("http://localhost:8080/password/request", requestBody).subscribe(smth);
  }

}
