import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { Subscription } from 'rxjs';

import { AuthSignupServices } from 'src/app/core/services/auth-signup.service';
import { ErrorPagesServices} from './../../core/services/error-pages.service';


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
  signUpSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private authSignupServices: AuthSignupServices,    
    private router: Router,  
    private errorPagesServices: ErrorPagesServices
  ) { }

  ngOnInit(): void {
    this.signUpGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordValidator]],
      checkRole: ['mentee', [Validators.required]],
      rules: [false, Validators.requiredTrue],
    })
  }

  passwordValidator(control: FormControl): { [key: string]: Object } | null {
    const regex = (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/g.test(control.value));

    if (regex) {      
      return { 'passError': { value: control.value } }
    } else {      
      return null;
    }
  }

  submitSignUpGroup() {
    this.showSpiner = true;    
    this.signUpSubscription = this.authSignupServices
    .signupUser({
      email: this.signUpGroup.get('email')!.value,
      password: this.signUpGroup.get('password')!.value,
      role: this.signUpGroup.get('checkRole')!.value
    })
    .subscribe((e) => {
        this.showSpiner = false;
        this.signUpGroup.reset();

        if (e.message === "User created") {              
          this.router.navigate(['/auth/login']); 
        }    
      },
      ({ error }) => {
        if (error.message) {
          this.showTooltip = true;
          this.tooltipMessage = error.message.replace(/=/g, ":");            
          this.showSpiner = false;
        }
          
        this.errorPagesServices.checkError(error);
      });
  }

  ngOnDestroy(): void {
    this.signUpSubscription?.unsubscribe();
  }
}

