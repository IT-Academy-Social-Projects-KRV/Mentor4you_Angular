import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

import { Subscription } from 'rxjs';

import { MentorService } from 'src/app/core';
import { categoriesData, certificatesData, citiesData, currencyData, languagesData } from './data';


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
  @Output() viewMentorData: EventEmitter<any> = new EventEmitter();

  categories = categoriesData;
  currency = currencyData;
  languages = languagesData;
  cities = citiesData;
  certificates = certificatesData;

  categoriesForm = new FormControl([]);
  carrencyForm = new FormControl([]);
  languagesForm = new FormControl([]);
  citiesForm = new FormControl([]);
  certificatesForm = new FormControl([]);

  btnTouched!: boolean;
  groupWork!: boolean;
  mentorForm!: FormGroup;
  mentorSubscription?: Subscription;
  rate = 0;

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
      lastName: [''],
      description: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumFirst: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      categoriesList: this.categoriesForm,
      currency: this.carrencyForm,
      rate: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      languages: this.languagesForm,
      telegram: [''],
      skype: [''],
      linkedIn: [''],
      gitHub: [''],
      certificates: this.certificatesForm,
      groupServ: '',
      personal: [false],
      group: [false],
      online: [false],
      offlineOut: [false],
      offlineIn: [false],
      cities: this.citiesForm,
      rating: [0]
    });

    this.initForm();
  }

  initForm(): void {
    this.rate = this.mentor['categoriesList'][0].rate;

    // this.online = this.mentor['online'];
    
    const controls = this.mentorForm.controls;
    
    console.log('mentorForm - data comes into the form',  this.mentor)
    console.log('groupServ',  this.mentor['groupServ'])
    
    Object.keys(controls).forEach(controlName => {
      controls[controlName].setValue(this.mentor[controlName] || '');
      // console.log('mentor', controlName, this.mentor[controlName]);
      // console.log('controls', controlName, controls[controlName].value);
    })
    
    const MAX = this.mentor['groupServ'];
    const YES = this.mentor['groupServ'];
    controls['personal'].setValue(MAX === 'MAX');
    controls['group'].setValue(YES === 'YES');

    // this.rate = controls['categoriesList'].value[0].rate;
    console.log('group',controls['group'].value);
    // console.log('rate - mentor', this.mentor['categoriesList'][0].rate);
    
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
    console.log('mentorForm - data is out from the form', this.mentorForm.value);

    // console.log('mentorForm - valid - 0', this.mentorForm.valid);

    const controls = this.mentorForm.controls;
    const isMix = controls['group'].value && controls['personal'].value;
    const isGroup = controls['group'].value ? true : false;
    const isGroupSevice = isMix ? 'MIX' : isGroup ? 'YES' : 'NO';

    controls['groupServ'].setValue(isGroupSevice);

    // // controls['currency'].setValue(controls['currency'].value[0]);
    // // console.log('currency', );


    this.mentorSubscription = this.mentorService
        .updateMentor(this.mentorForm.value)
        .subscribe();

    
    if (
      this.mentorForm.valid &&
      (this.mentorForm.controls['online'].value === true ||
        !this.mentorForm.controls['offlineOut'].value === true)
    ) {
      // const formData = new FormData();
      // formData.append('file', this.mentorForm.get('profile').value);
      // this.httpClient.post<any>('', formData).subscribe(
      //   (res: any) => console.log(res),
      //   (err: any) => console.log(err)
      // );
      // console.log('mentorForm', this.mentorForm.controls.value);

      // console.log('mentorForm - valid - 1', this.mentorForm.valid);

      // this.mentorSubscription = this.mentorService
      //   .updateMentor(this.mentorForm.value)
      //   .subscribe();
      
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

  // checkBox_2(online: any) {
  //   // console.log('online', online._checked)
  //   console.log('online', online)
  //   if (
  //     this.btnTouched === true &&
  //     this.mentorForm.controls['online'].value === false &&
  //     this.mentorForm.controls['offlineOut'].value === false
  //   ) {
  //     return 'invalid-checkbox';
  //   } else return '';
  // }

  checkBox(box1: any, box2: any) {
    if (this.btnTouched === true && box1._checked === false && box2._checked === false) {
      return 'invalid-checkbox';
    } else return '';
  }

  onShowProfile(): void {
    this.mentor.categoriesList.map((category: any) => {
      category.rate = this.mentor.rate;
      category.currency = this.mentor.currency;
    });

    this.closeForm.emit();
    this.viewMentorData.next(this.mentorForm.value);
    console.log('this.mentorForm.value', this.mentorForm.value);
  }

  ngOnDestroy(): void {
    this.mentorSubscription?.unsubscribe();
  }
}
