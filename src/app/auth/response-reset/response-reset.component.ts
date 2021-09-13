import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.scss']
})
export class ResponseResetComponent implements OnInit {
  ResponseResetForm: FormGroup = new FormGroup({
    newPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$')]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$')]),
  });
  
  isNewPasswordValid: boolean = true;

  IsResetFormValid = false;

  isFormSubmited = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    
  }
  
  validatePassword(event: any){
    if (this.ResponseResetForm.get("newPassword")?.status=="INVALID" && !this.ResponseResetForm.get("newPassword")?.pristine){
    this.isNewPasswordValid = false;
    } else {
      this.isNewPasswordValid = true;
    }
  }
  
  passwordMatchValidator(event: any) {
   
    if (this.ResponseResetForm.get("newPassword")?.status=="VALID" && this.ResponseResetForm.get("confirmPassword")?.status=="VALID"){
    if (this.ResponseResetForm.get('newPassword')?.value === this.ResponseResetForm.get('confirmPassword')?.value){
      this.IsResetFormValid = true;
    } else {
      this.IsResetFormValid = false;
    }
    } else {
      this.IsResetFormValid = false;
    }
 }
  

  ResetPassword() {
    const verifiedPassword = this.ResponseResetForm.value.newPassword;
    console.log(verifiedPassword);
    this.isFormSubmited = true; 
    setTimeout( ()=> {this.router.navigate(['/auth/login'])}, 5000);
    return verifiedPassword;
  }
}
