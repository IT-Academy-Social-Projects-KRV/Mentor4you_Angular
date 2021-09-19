import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-account-mentor',
  templateUrl: './account-mentor.component.html',
  styleUrls: ['./account-mentor.component.scss'],
})
export class AccountMentorComponent implements OnInit {
  @Input() isAccountActivated!: boolean;
  @Input() selectedFile!: File;

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
      avatar: this.selectedFile,
      isAccountActivated: this.isAccountActivated,
      fullName: ['', Validators.required],
      about: ['', Validators.required],
      subjects: this.subForm,
      email: ['', Validators.required, Validators.email],
      rate: ['', Validators.required, Validators.pattern('^[0-9]+$')],
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
    this.btnTouched = !this.btnTouched;
    // console.log(this.langForm.value);
    // console.log(this.mentorForm.controls['avatar'].value);
    // console.log(this.mentorForm.controls['fullName'].value);
    // console.log(this.mentorForm.controls['isAccountActivated'].value);
    // console.log(this.mentorForm.controls['about'].value);
    // console.log(this.mentorForm.controls['subjects'].value);
    // console.log(this.mentorForm.controls['email'].value);
    // console.log(this.mentorForm.controls['rate'].value);
    // console.log(this.mentorForm.controls['languages'].value);
    // console.log(this.mentorForm.controls['linkedIn'].value);
    // console.log(this.mentorForm.controls['facebook'].value);
    // console.log(this.mentorForm.controls['youtube'].value);
    // console.log(this.mentorForm.controls['certificates'].value);
    // console.log(this.mentorForm.controls['group'].value);
    // console.log(this.mentorForm.controls['remotely'].value);
    // console.log(this.mentorForm.controls['offline'].value);
    // console.log(this.mentorForm.controls['location'].value);
    // const file = this.selectedFile;
    // const fd = new FormData();

    // // --- send to server
    // this.mentorForm.controls['avarar'] = fd.append('image', file, file.name);
    // console.log(this.mentorForm.controls['avatar'].value);
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
}
