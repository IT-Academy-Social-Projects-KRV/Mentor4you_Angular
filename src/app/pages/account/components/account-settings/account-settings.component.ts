import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {

  constructor(private http:HttpClient) { }
  inputGroup!:FormGroup

  isDisabled:boolean=false
  ismatch:boolean=false
  isChangeTrue:boolean=false
  isChangeFalse:boolean=false
  isEnter:boolean=false
  isShort:boolean=false

  passwor:string="123123"

  danger:boolean=false
  warning:boolean=false
  success:boolean=false

  ngOnInit(): void {
    this.inputGroup=new FormGroup({
        password:new FormControl('',[Validators.required]),
        newPassword:new FormControl('',[Validators.required,Validators.minLength(8)]),
        confirmPassword:new FormControl('',[Validators.required]),
    })

  }

  isValidPass(event:any = null):void{
    const value = event.target.value;
    const regEXP = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#\$&*~]).{8,}$/;
    const strong=regEXP.test(value)
    //Medium Pattern
    // ^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#\$&*~]).{8,}$
    const regEXP_medium = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    const medium=regEXP_medium.test(value)

    if(medium)
    {
      this.warning=true
      this.danger=false
      this.success=false
      if(strong)
      {
        this.warning=false
        this.danger=false
        this.success=true
      }
    }
    else{
      this.danger=true
      this.success=false
      this.warning=false
    }
  }

  isSimplePass():boolean{
    if(this.inputGroup.get('newPassword')?.value==this.inputGroup.get('confirmPassword')?.value && this.inputGroup.get('newPassword')?.value!='' && this.inputGroup.get('confirmPassword')?.value!='')
    {
      if(this.inputGroup.get('newPassword')?.status=='VALID')
      {
        this.ismatch = false
        this.isShort=false
        return true
      }
      else{
        this.isShort=true
        this.ismatch = true
        return false
        }
    }
    else if(this.inputGroup.get('newPassword')?.value=='' && this.inputGroup.get('newPassword')?.value=='' && this.inputGroup.get('newPassword')?.value.trim()=='' && this.inputGroup.get('confirmPassword')?.value.trim()==''){
      this.ismatch=true
      return false
    }
    else {
      this.ismatch=true
      return false
    }
  }

  isPass():boolean{
    if(this.inputGroup.get('password')?.value!=''){
      this.isEnter=false
      return true
    }
    else {
      this.isEnter=true
      return false
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
putPassword:object={
    'password':"Illia1957"
}



  onSubmit(){
        this.isDisabled=true
    let headers;
    if (this.isPass()) {
      headers = new HttpHeaders()
        .set("Authorization", "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJpbGxpYS5kZW1jaGlzaGluQGdtYWlsLmNvbSIsInJvbGUiOiJNRU5UT1IiLCJleHAiOjE2MzI0NDE2MDB9.NrERxNfhX0kR2sYBLMkzz8jPY5uenQPE1nZOovhoqCst_HsZnt1dXnpTBwkBldK-L9WtdNoWFBHk4ZZOVgDKIw"
        )
      this.http.put("http://localhost:8080/api/users/changePassword", this.putPassword, {headers}).subscribe(value=>console.log(value))
      this.isChangeTrue = true
      this.isChangeFalse = false
      this.isDisabled = false

    } else {
      this.isChangeTrue = false
      this.isChangeFalse = true
      this.isDisabled = false
    }

        }



}
