import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { map, tap } from 'rxjs/operators';
import { AuthSignupServices } from 'src/app/core/services/auth-signup.services';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { signupUserDate } from '../../core/services/auth-signup.services'
// import { ErrorPageServices } from 'src/app/core/services/errorPage.services';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [AuthSignupServices]
})
export class SignupComponent implements OnInit, OnDestroy {
  btnDisabled: boolean = false;
  signUpGroup!: FormGroup;
  showTooltip: boolean = false;
  showSpiner: boolean = false;
  tooltipMessage: string = '';
  constructor(
    private fb: FormBuilder,
    private authSignupServices: AuthSignupServices,
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }


  ngOnInit(): void {
    this.signUpGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: this.fb.control('', [Validators.required, Validators.minLength(8), this.passwordValidator]),
      checkRole: this.fb.control('mentee', [Validators.required]),
      rules: this.fb.control(false, Validators.requiredTrue),
    })
    // this.snackBar.open('successful');
    // this.signUpGroup.valueChanges.subscribe(e => console.log(this.signUpGroup.get('password')?.valid))
  }

  passwordValidator(control: FormControl): { [key: string]: any } | null {
    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g.test(control.value)) {
      return { 'passError': { value: control.value } }
    } else {
      return null
    }

  }

  submitSignUpGroup() {
    this.showSpiner = true;
    this.authSignupServices.signupUser({
      email: this.signUpGroup.get('email')?.value,
      password: this.signUpGroup.get('password')?.value,
      role: this.signUpGroup.get('checkRole')?.value
    })

      .subscribe((e) => {
        setTimeout(():any=>{
        this.showSpiner = false;
        this.signUpGroup.reset();
        this.signUpGroup.get('checkRole')?.setValue('mentee');
          if (e.message = "User created"){
             this.snackBar.open('successful');
           setTimeout(()=>this.router.navigate(['/auth/login']),2000)
          }
        // 
        },500)
    
      },
        ({ error }) => {
          if (error.message){
            setTimeout(():any=>{
            this.showTooltip = true;
            this.tooltipMessage = error.message.replace(/=/g, ":");
            this.showSpiner = false;
            },500)
  
          }
         
        });
  }
  navigateToTerms(e:any){
    e.preventDefault();
    this.router.navigate(['/terms/']);
    console.log('wertyuiolkjnbvnm,')
  }
  ngOnDestroy(){
    this.snackBar.dismiss()
  }
}

