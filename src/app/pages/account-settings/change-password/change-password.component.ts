import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SigninService } from 'src/app/auth/signin/signin.service';
import { ChangePasswordService } from '../change-password.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['../account-settings.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private serviceToken: SigninService,
    private change: ChangePasswordService
  ) {}
  inputGroup!: FormGroup;

  isDisabled: boolean = false;
  isMatch: boolean = false;
  isChangeTrue: boolean = false;
  isChangeFalse: boolean = false;
  isEnter: boolean = false;
  isShort: boolean = false;

  valuePass: any = '';
  valueOldPass: any = '';

  danger: boolean = false;
  warning: boolean = false;
  success: boolean = false;

  ngOnInit(): void {
    this.inputGroup = new FormGroup({
      password: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
    });

    this.inputGroup
      .get('password')
      ?.valueChanges.subscribe((value) => (this.valueOldPass = value));
    this.inputGroup
      .get('newPassword')
      ?.valueChanges.subscribe((value) => (this.valuePass = value));
  }

  isValidPass(event: any = null): void {
    const value = event.target.value;
    const regEXP =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#\$&*~]).{8,}$/;
    const strong = regEXP.test(value);
    //Medium Pattern
    // ^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#\$&*~]).{8,}$
    const regEXP_medium = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    const medium = regEXP_medium.test(value);

    if (medium) {
      this.warning = true;
      this.danger = false;
      this.success = false;
      if (strong) {
        this.warning = false;
        this.danger = false;
        this.success = true;
      }
    } else {
      this.danger = true;
      this.success = false;
      this.warning = false;
    }
  }

  isSimplePass(): boolean {
    if (
      this.inputGroup.get('newPassword')?.value ==
        this.inputGroup.get('confirmPassword')?.value &&
      this.inputGroup.get('newPassword')?.value != '' &&
      this.inputGroup.get('confirmPassword')?.value != ''
    ) {
      if (this.inputGroup.get('newPassword')?.status == 'VALID') {
        this.isMatch = false;
        this.isShort = false;
        return true;
      } else {
        this.isShort = true;
        this.isMatch = true;
        return false;
      }
    } else if (
      this.inputGroup.get('newPassword')?.value == '' &&
      this.inputGroup.get('newPassword')?.value == '' &&
      this.inputGroup.get('newPassword')?.value.trim() == '' &&
      this.inputGroup.get('confirmPassword')?.value.trim() == ''
    ) {
      this.isMatch = true;
      return false;
    } else {
      this.isMatch = true;
      return false;
    }
  }

  isPass(): boolean {
    if (this.inputGroup.get('password')?.value != '') {
      this.isEnter = false;
      return true;
    } else {
      this.isEnter = true;
      return false;
    }
  }

  // allChecked():boolean{
  //   if(this.isPass())
  //   {
  //     if(this.isSimplePass()){
  //       return true
  //     }else {
  //       return false
  //     }
  //   }
  //   else {
  //     return false
  //   }
  // }

  // putPassword:object={
  //     'oldPassword':this.valueOldPass,
  //     'newPassword':this.valuePass
  // }

  onSubmit() {
    const putPassword: object = {
      oldPassword: this.valueOldPass,
      newPassword: this.valuePass,
    };

    this.isDisabled = true;
    // let headers;
    if (this.isPass()) {
      // headers = new HttpHeaders()
      //   .set("Authorization", this.serviceToken.getToken()
      //   )
      this.change
        .changePassword(putPassword)
        .subscribe((response) => console.log(response));
      this.isChangeTrue = true;
      this.isChangeFalse = false;
      this.isDisabled = false;
      console.log(this.serviceToken.getToken());
    } else {
      this.isChangeTrue = false;
      this.isChangeFalse = true;
      this.isDisabled = false;
    }
  }
}
