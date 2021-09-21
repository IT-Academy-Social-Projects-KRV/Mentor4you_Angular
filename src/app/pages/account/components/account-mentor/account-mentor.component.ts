import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';

import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-account-mentor',
  templateUrl: './account-mentor.component.html',
  styleUrls: ['./account-mentor.component.scss'],
})
export class AccountMentorComponent implements OnInit {
  @Input() mentor: any;
  // @Input() isAccountActivated!: boolean;
  // @Input() selectedFile!: File;
  @Output() showProfile: EventEmitter<void> = new EventEmitter();
  @Output() setMentorData: EventEmitter<any> = new EventEmitter();

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
  subForm = new FormControl([]);
  langForm = new FormControl('');
  locForm = new FormControl('');

  groupWork!: boolean;
  mentorForm!: any;

  btnTouched!: boolean;

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.btnTouched = false;
    this.groupWork = false;

    this.mentorForm = this.fb.group({
      // avatar: this.selectedFile,
      avatar: [''],
      // isAccountActivated: this.isAccountActivated,
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      about: ['', Validators.required],
      subjects: this.subForm,
      email: ['', [Validators.required, Validators.email]],
      phoneNumberLink: [''],
      rate: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      languages: this.langForm,
      linkedIn: [''],
      facebook: [''],
      youtube: [''],
      certificates: [''],
      // groupServices: [false],
      groupServices: this.groupWork,
      remotely: [false],
      offline: [false],
      place: this.locForm,
    });

    this.initForm();
  }

  initForm(): void {
    const controls = this.mentorForm.controls;

    console.log(' this.mentor - 1',  this.mentor)

    Object.keys(controls).forEach(controlName => {
      // console.log('this.mentor - 2', this.mentor[controlName])
      controls[controlName].setValue(this.mentor[controlName]);
    })

    const mentorData = {
      avatar: controls['avatar'].value,
      // isAccountActivated: controls['isAccountActivated'].value
    }
    this.setMentorData.emit(mentorData);
  }

  OnGroupWork() {
    this.groupWork = !this.groupWork;
  }

  onSubmit(): void {
    this.btnTouched = !this.btnTouched;
    
    if (
      this.mentorForm.valid &&
      (this.mentorForm.controls['remotely'] === true ||
        this.mentorForm.controls['offline'] === true)
    ) {
      // const formData = new FormData();
      // formData.append('file', this.mentorForm.get('profile').value);
      // this.httpClient.post<any>('', formData).subscribe(
      //   (res: any) => console.log(res),
      //   (err: any) => console.log(err)
      // );
      // console.log(this.mentorForm.controls.value);
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

  invalidCheck(controlName: string): string {
    // console.log('invalid', this.mentorForm.controls[controlName])
    // console.log('invalid', this.mentorForm.controls[controlName].invalid)
    if (
      this.mentorForm.controls[controlName].invalid &&
      this.btnTouched === true
      ) {
      return 'invalidForm';
    } else return '';
  }

  checkBox() {
    if (
      this.mentorForm.controls['remotely'].value === false &&
      this.mentorForm.controls['offline'].value === false &&
      this.btnTouched === true
    ) {
      return 'invalid-checkbox';
    } else return '';
  }

  showProfileMentor(): void {
    this.showProfile.emit();
  }
}
