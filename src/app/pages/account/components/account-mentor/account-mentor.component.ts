import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

import { Subscription } from 'rxjs';

import { MentorService } from 'src/app/core';


export interface AdditionalMentorData {
  avatar: string;
}

@Component({
  selector: 'app-account-mentor',
  templateUrl: './account-mentor.component.html',
  styleUrls: ['./account-mentor.component.scss'],
})
export class AccountMentorComponent implements OnInit, OnDestroy {
  @Input() mentor: any;
  @Input() isAccountActivated!: boolean;

  @Output() closeForm: EventEmitter<void> = new EventEmitter();
  @Output() setMentorData: EventEmitter<AdditionalMentorData> = new EventEmitter();

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

  btnTouched!: boolean;
  groupWork!: boolean;
  mentorForm!: FormGroup;
  mentorSubscription?: Subscription;

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private mentorService: MentorService
  ) {}

  ngOnInit(): void {
    this.btnTouched = false;
    this.groupWork = false;
    this.mentorForm = this.fb.group({
      // avatar: this.selectedFile,
      avatar: [''],
      isAccountActivated: [false],
      firstName: ['', Validators.required],
      // lastName: ['', Validators.required],
      description: ['', Validators.required],
      categoriesList: [],
      subjects: this.subForm,
      email: ['', [Validators.required, Validators.email]],
      phoneNumFirst: ['', [Validators.required]],
      // phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      rate: ['', [Validators.required]],
      // rate: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
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

    // console.log('mentorForm - data comes into the form',  this.mentor)

    Object.keys(controls).forEach(controlName => {
      controls[controlName].setValue(this.mentor[controlName]);
      // console.log('smentor - 2', controlName, this.mentor[controlName])
    })

    const rate = this.mentor['rate'] + ' ' + this.mentor['currency'];
    controls['rate'].setValue(rate);
    
    const mentorData = {
      avatar: controls['avatar'].value,
    }
    this.setMentorData.emit(mentorData);
  }

  OnGroupWork() {
    this.groupWork = !this.groupWork;
  }

  onSubmit(): void {
    this.btnTouched = true;
    // console.log('mentorForm - data is out from the form', this.mentorForm.value);

    // console.log('mentorForm - valid - 0', this.mentorForm.valid);

    
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
      // console.log('mentorForm', this.mentorForm.controls.value);
      console.log('mentorForm - valid - 1', this.mentorForm.valid);

      this.mentorSubscription = this.mentorService
        .updateMentor(this.mentorForm.value)
        .subscribe();
      
      this.btnTouched = true;
      // this.router.navigate(['/']);
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

  onShowProfile(): void {
    this.closeForm.emit();
  }

  ngOnDestroy(): void {
    this.mentorSubscription?.unsubscribe();
  }
}
