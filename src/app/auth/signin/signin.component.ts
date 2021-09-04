import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CookieService} from "ngx-cookie-service"
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit{
  fullGroup!:FormGroup;
  constructor(private http:HttpClient,private cookie:CookieService) {

  }

  isValid:boolean=false;
  isInvalid:boolean=false;

  isValidPass:boolean=false;
  isInvalidPass:boolean=false;

  ngOnInit(): void {
    this.fullGroup= new FormGroup({
      email:new FormControl('',[Validators.email,Validators.required]),
      password:new FormControl('',[Validators.minLength(8),Validators.required]),
      signed:new FormControl(''),
    })
    this.getCookie()
  }



  isValidMail():boolean{
    if(this.fullGroup.get('email')?.status=='VALID')
    {
      this.isValid=true
      this.isInvalid=false
     return true
    }
    else if(this.fullGroup.get('email')?.status=='INVALID' && this.fullGroup.get('email')?.touched)
    {
      this.isInvalid=true
      this.isValid=false
      return false
    }
    else{
      return false
    }
  };

  isValidPassword():boolean{
    if(this.fullGroup.get('password')?.status=='VALID')
    {
      this.isValidPass=true
      this.isInvalidPass=false
      return true
    }
    else if(this.fullGroup.get('password')?.status=='INVALID'&& this.fullGroup.get('password')?.touched)
    {
      this.isValidPass=false
      this.isInvalidPass=true
      return false
    }
    else{
      return false
    }
  }
  isTrueFrom():boolean
  {
    this.isValidMail()
    this.isValidPassword()
    if(this.isValidMail() && this.isValidPassword())
    {
      return true
      console.log(this.fullGroup.value)
    }
    else{
      return false
    }
  }

getCookie() {
  this.cookie.get('mail')
  this.cookie.get('password')
  if(this.cookie.get('mail')!='')
  {
    this.fullGroup.get('email')?.setValue(this.cookie.get('mail'))
  }

  if(this.cookie.get('password')!='')
  {
    this.fullGroup.get('password')?.setValue(this.cookie.get('password'))
  }
  console.log(this.cookie.get('mail'))
  console.log(this.cookie.get('password'))
}

submitFrom(){
    console.log(this.fullGroup.value)
  let mailValue = this.fullGroup.get('email')?.value
  let passValue = this.fullGroup.get('password')?.value
    console.log(this.fullGroup.get('signed')?.value)
    if(this.fullGroup.get('signed')?.value)
    {
      this.cookie.set('mail',mailValue)
      this.cookie.set('password',passValue)
      console.log(mailValue)
      console.log(passValue)

    }
}

}
