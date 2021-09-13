import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Category } from '../chips-input/chips-input.component';

@Component({
  selector: 'app-account-mentor',
  templateUrl: './account-mentor.component.html',
  styleUrls: ['./account-mentor.component.scss']
})
export class AccountMentorComponent implements OnInit {
	@Input() mentorData?: {};
	
  isAccountActivated?: boolean;
	gettedCategories: Category[] = [];
  mentorForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.mentorForm = this.fb.group({
      'isAccountActivated': [false],
      'fullName': ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z]+$/),
        Validators.minLength(3)
      ]],
      'about': ['', [Validators.required, Validators.minLength(5)]],
      'categories': [[], Validators.required],
      'email': ['', [Validators.required, Validators.email]]
    })
  }

  ngOnInit(): void {
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.mentorForm.controls[controlName];
    return control.invalid && control.touched;
	}
	
	onSendCategories(categories: Category[]): void {

	}

  onSubmit(): void {

  }
}
