import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {

  constructor(private http:HttpClient) { }
  inputGroup!:FormGroup

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
        newPassword:new FormControl('',[Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$'),Validators.required,Validators.minLength(8)]),
        confirmPassword:new FormControl('',[Validators.required]),
    })
    console.log(this.inputGroup.get('newPassword')?.status)
    this.isValidPass()
  }

  isValidPass(event:any = null):void{
    const value = event.target.value;
    const regEXP = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    const strong=regEXP.test(value)
    console.log(regEXP.test(value));

    if(this.inputGroup.get('newPassword')?.status=='VALID')
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
      else {
        this.warning=true
        this.danger=false
        this.success=false
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

  allChecked():boolean{
    if(this.isPass())
    {
      if(this.isSimplePass()){
        return true
      }else {
        return false
      }
    }
    else {
      return false
    }
  }

  onSubmit(){
        if(this.allChecked())
        {
          if(this.inputGroup.get('password')?.value==this.passwor)
          {
            this.isChangeTrue=true
            this.isChangeFalse=false
          }
          else{
            this.isChangeTrue=false
            this.isChangeFalse=true
          }
        }

  }

}
