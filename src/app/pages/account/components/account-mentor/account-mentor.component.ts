import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';

import { Subject, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MentorService, UserService } from 'src/app/core';
import { categoriesList, certificateList, certificatesData, cityList, currencyList, languagesList } from './data';
import { ErrorPagesServices } from 'src/app/core/services/error-pages.service';


export interface AdditionalMentorData {
  avatar: string;
}

export const isAvatar: Subject<boolean> = new Subject();

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

  categories = categoriesList;
  currency = currencyList;
  certificates = certificateList;
  languages = languagesList;
  cities = cityList;

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
    private mentorService: MentorService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private errorPagesServices: ErrorPagesServices

  ) {}

  ngOnInit(): void {
    this.btnTouched = false;
    this.groupWork = false;
    this.mentorForm = this.fb.group({
      localAvatar: [''],
      avatar: [''],
      isAccountActivated: [false],
      firstName: ['', Validators.required],
      lastName: [''],
      description: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumFirst: ['', [Validators.required, Validators.pattern('^[+][0-9]+$')]],
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
    const controls = this.mentorForm.controls;

    this.userService.avatar$
      .pipe(first())
      .subscribe(avatar => {
        controls['localAvatar'].setValue(avatar);
      })

    Object.keys(controls).forEach(controlName => {
      controls[controlName].setValue(this.mentor[controlName]);
    })

    const groupServ = this.mentor['groupServ'];

    switch (true) {
      case groupServ === 'MIX':
        controls['personal'].setValue(true);
        controls['group'].setValue(true);
        break;

      case groupServ === 'YES':
        controls['personal'].setValue(false);
        controls['group'].setValue(true);
        break;

      default:
        controls['personal'].setValue(true);
        controls['group'].setValue(false);
    }
  }

  setCertificates(certificates: any) {
    const newSertificateList = certificatesData.filter(certificate => {
      if (certificates.value.includes(certificate.name)) {
        return true;
      }

      return false;
    });

    certificates.setValue(newSertificateList);
  }

  setGroupService(controls: { [key: string]: any }) {
    const isMix = controls['group'].value && controls['personal'].value;
    const isGroup = controls['group'].value ? true : false;
    const isGroupSevice = isMix ? 'MIX' : isGroup ? 'YES' : 'NO';

    controls['groupServ'].setValue(isGroupSevice);
  }

  onSubmit(): void {
    const controls = this.mentorForm.controls;
    const certificates = controls['certificates'];

    this.setCertificates(certificates);
    this.setGroupService(controls);

    const isOnline = controls['online'].value === true;
    const isOfflineOut = controls['offlineOut'].value === true;
    const isGroup = controls['group'].value === true;
    const isPersonal = controls['personal'].value === true;

    if (this.mentorForm.valid && (isOnline || isOfflineOut) && (isGroup || isPersonal)) {

      this.mentorSubscription = this.mentorService
        .updateMentor(this.mentorForm.value)
        .subscribe(
          () => { 
            this.snackBar.open('Your data has been successfully saved!', '', {
              duration: 5000,
              verticalPosition: 'top',
              panelClass: 'danger'
            });
          // this.router.navigate(['/'])
          },
          (error) => {
            this.errorPagesServices.checkError(error)
          });

      this.btnTouched = true;
    }
  }

  invalidCheck(controlName: string): string {
    const controls = this.mentorForm.controls;

    if (controls[controlName].invalid && (controls[controlName].touched || this.btnTouched === true)) {
      return 'invalidForm';
    } else {
      return '';
    };
  }

  checkBox(checkBox1: any, checkBox2: any) {
    const controls = this.mentorForm.controls;

    if (controls[checkBox1].value === false && controls[checkBox2].value === false) {
      return 'invalid-checkbox';
    } else {
      return '';
    };
  }

  onShowProfile(event: Event): void {
    event.preventDefault();
    const certificates = this.mentorForm.controls['certificates'];

    this.setCertificates(certificates);
    this.setGroupService(this.mentorForm.controls);

    this.closeForm.emit();
    this.viewMentorData.emit(this.mentorForm.value);
  }

  ngOnDestroy(): void {
    this.mentorSubscription?.unsubscribe();
  }
}
