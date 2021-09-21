import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';

import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { T } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-account-mentor',
  templateUrl: './account-mentor.component.html',
  styleUrls: ['./account-mentor.component.scss'],
})
export class AccountMentorComponent implements OnInit {
  @Input() isAccountActivated!: boolean;
  @Input() selectedFile!: File;

  btnTouched!: boolean;
  myColor = '#3AB67D';

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
  mentorForm!: any;

  constructor(private fb: FormBuilder, private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.btnTouched = false;
    this.groupWork = false;
    this.mentorForm = this.fb.group({
      avatar: this.selectedFile,
      isAccountActivated: this.isAccountActivated,
      fullName: ['', [Validators.required]],
      about: ['', [Validators.required]],
      subjects: this.subForm,
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      rate: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      languages: this.langForm,
      linkedIn: [''],
      facebook: [''],
      youtube: [''],
      certificates: [''],
      group: this.groupWork,
      remotely: [false],
      offline: [false],
      location: this.locForm,
    });
  }

  OnGroupWork() {
    this.groupWork = !this.groupWork;
  }

  onSubmit(): void {
    this.btnTouched = true;
    if (
      this.mentorForm.valid &&
      (this.mentorForm.controls['remotely'].value === true ||
        this.mentorForm.controls['offline'].value === true)
    ) {
      // const formData = new FormData();
      // formData.append('file', this.mentorForm.get('profile').value);
      // this.httpClient.post<any>('', formData).subscribe(
      //   (res: any) => console.log(res),
      //   (err: any) => console.log(err)
      // );
      // console.log(this.mentorForm.controls.value);
    }
  }

  invalidCheck(controlName: string): string {
    if (
      this.mentorForm.controls[controlName].invalid &&
      (this.mentorForm.controls[controlName].touched ||
        this.btnTouched === true)
    ) {
      return 'invalidForm';
    } else return '';
  }
  checkBox() {
    if (
      this.btnTouched === true &&
      this.mentorForm.controls['remotely'].value === false &&
      this.mentorForm.controls['offline'].value === false
    ) {
      return 'invalid-checkbox';
    } else return '';
  }
  onBtnClick() {
    this.btnTouched = true;
  }
}
