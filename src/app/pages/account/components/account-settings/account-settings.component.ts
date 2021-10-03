import {AfterViewInit, Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SigninService} from "../../../../auth/signin/signin.service";
import {ChangePasswordService} from "./change-password.service";

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss'],
})
export class AccountSettingsComponent implements OnInit {
  switchCase!: number;

  constructor(
    private http:HttpClient,
    private serviceToken:SigninService,
    private change:ChangePasswordService) { }
  inputGroup!:FormGroup

  isDisabled:boolean=false
  isMatch:boolean=false
  isChangeTrue:boolean=false
  isChangeFalse:boolean=false
  isEnter:boolean=false
  isShort:boolean=false

  valuePass:any='';
  valueOldPass:any='';

  danger:boolean=false
  warning:boolean=false
  success:boolean=false

  ngOnInit(): void {
    this.switchCase = 2;
  }

  caseClick(caseName: string): void {
    if (caseName === 'role') {
      this.switchCase = 1;
    }
    if (caseName === 'password') {
      this.switchCase = 2;
    }
    if (caseName === 'language') {
      this.switchCase = 3;
    }
    if (caseName === 'delete') {
      this.switchCase = 4;
    }
  }

  case1(): string {
    if (this.switchCase === 1) {
      return 'selected';
    } else return '';
  }
  case2(): string {
    if (this.switchCase === 2) {
      return 'selected';
    } else return '';
  }
  case3(): string {
    if (this.switchCase === 3) {
      return 'selected';
    } else return '';
  }
  case4(): string {
    if (this.switchCase === 4) {
      return 'selected';
    } else return '';
  }

}
