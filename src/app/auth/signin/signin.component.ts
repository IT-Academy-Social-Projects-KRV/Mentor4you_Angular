import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { SigninService } from "./signin.service";
import { NotificationModalService } from 'src/app/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signInGroup!: FormGroup;

  constructor(
    private router: Router,
    private notificationModalService: NotificationModalService,
    private auth: SigninService,
    private fb: FormBuilder
  ) {}

  emailValue!: string;
  passwordValue!: string;
  errorData: boolean = false;

  isValid: boolean = false;
  isInvalid: boolean = false;
  isValidPass: boolean = false;
  isInvalidPass: boolean = false;

  ngOnInit(): void {

    this.signInGroup = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(8)]],
      signed: [''],
    })

    this.signInGroup
      .get('email')?.valueChanges
      .subscribe(value => this.emailValue = value );

    this.signInGroup
      .get('password')?.valueChanges
      .subscribe(value => this.passwordValue = value);
  }

  isInvalidField(field: string): boolean {
    return this.signInGroup.controls[field].invalid && this.signInGroup.controls[field].touched;
  }

  submitForm(): void {
    let login = this.auth.authRedirect(this.emailValue, this.passwordValue);

    login.subscribe((response) => {
      this.auth.getRole();
      switch (localStorage.getItem('role')) {
        case "MENTOR": 
          this.notificationModalService.getMenteesRequests();
          break;
        case "MENTEE": 
          this.notificationModalService.getMenteesResponces();
          break;
      }
      const userRole = localStorage.getItem('role');

      const caseAdmin = userRole === "ADMIN" && response;
      const caseModerator = userRole === "MODERATOR" && response;
      const caseUsers = userRole === "MENTOR" || userRole === "MENTEE" && response;
      
      if (caseModerator) {
        this.router.navigate(['/moderator']);
        this.errorData = false;
        this.auth.setTokenO(response.token);
      } else if (caseAdmin) {
        this.router.navigate(['/administrator']);
        this.errorData = false;
        this.auth.setTokenO(response.token);
      } else if (caseUsers) {
        this.router.navigate(['/'])
        this.errorData = false;
        this.auth.setTokenO(response.token);
      }
    }, 
    error => {
      if (error) {
        this.errorData = true;
        this.isValidPass = false;
      }
    })}
  };
