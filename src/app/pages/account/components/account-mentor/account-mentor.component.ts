import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-account-mentor',
  templateUrl: './account-mentor.component.html',
  styleUrls: ['./account-mentor.component.scss'],
})
export class AccountMentorComponent implements OnInit {
  @Input() mentorData?: {};

  subjList: string[] = [
    'Assembler',
    'JavaScript',
    'C++',
    'TypeScript',
    'Python',
    'Django',
  ];

  langList: string[] = ['Ukrainian', 'English', 'Russian', 'Polish'];
  locList: string[] = ['Kyiv', 'Rivne', 'New York', 'London', 'Lviv'];
  subForm = new FormControl('');
  langForm = new FormControl('');
  locForm = new FormControl('');

  groupWork!: boolean;
  isAccountActivated?: boolean;
  mentorForm!: any;

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.groupWork = true;
    this.mentorForm = this.fb.group({
      isAccountActivated: [false || true],
      fullName: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z]+$/),
          Validators.minLength(3),
        ],
      ],
      about: [''],
      subjects: this.subForm,
      email: [''],
      rate: [''],
      languages: this.langForm,
      linkedIn: [''],
      facebook: [''],
      youtube: [''],
      certificates: [''],
      group: this.groupWork,
      remotely: [false || true],
      offline: [false || true],
      location: this.locForm
    });
  }

  OnGroupWork() {
    this.groupWork = !this.groupWork;
  }

  onSubmit(): void {
    if (this.mentorForm.valid) {
      this.openSnackBar(
        'Your profile was successfully saved',
        'Okey',
        'success'
      );
    } else {
      this.openSnackBar('Please check all required fields', 'Got it', 'danger');
    }
  }
  openSnackBar(message: string, action: string, className: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
      panelClass: className,
    });
  }
}
