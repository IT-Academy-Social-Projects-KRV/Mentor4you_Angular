import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Category } from '../chips-input/chips-input.component';

@Component({
  selector: 'app-account-mentor',
  templateUrl: './account-mentor.component.html',
  styleUrls: ['./account-mentor.component.scss'],
})
export class AccountMentorComponent implements OnInit {
  @Input() mentorData?: {};
  subjList: string[] = [
    'Assembler ',
    'JavaScript',
    'C++',
    'TypeScript',
    'Python',
    'Django',
  ];
  subForm = new FormControl('');

  isAccountActivated?: boolean;
  mentorForm!: any;

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.mentorForm = this.fb.group({
      isAccountActivated: [false],
      fullName: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z]+$/),
          Validators.minLength(3),
        ],
      ],
      about: ['', [Validators.required, Validators.minLength(5)]],
      subjects: this.subForm,
      email: ['', [Validators.required, Validators.email]],
      rate: ['', [Validators.required, Validators.pattern('^[0-9]')]],
    });
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.mentorForm.controls[controlName];
    return control.invalid && control.touched;
  }
  onSubmit(): void {
    if (this.mentorForm.invalid) {
      this.openSnackBar('Please check all required fields', 'Got it', 'danger');
    } else {
      this.openSnackBar('Please check all required fields', 'Got it', 'success');
    }
  }
  openSnackBar(message: string, action: string, className: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
      panelClass: className,
    });
  }
}
