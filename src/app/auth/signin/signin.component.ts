import {Component, OnInit,} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup, Validators,} from "@angular/forms";
import {CookieService} from "ngx-cookie-service"
import {ActivatedRoute, Params, Router} from "@angular/router";
import {SigninService} from "./signin.service";
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit{
  fullGroup!:FormGroup;
  constructor(private http:SigninService,private router:Router) {}

  emailValue!:string
  passwordValue!:string
  errorData:boolean=false

  isValid:boolean=false;
  isInvalid:boolean=false;
  isDisabled:boolean=false

  isValidPass:boolean=false;
  isInvalidPass:boolean=false;

  ngOnInit(): void {
    this.fullGroup= new FormGroup({
      email:new FormControl('',[Validators.email,Validators.required]),
      password:new FormControl('',[Validators.minLength(8),Validators.required]),
      signed:new FormControl(''),
    })

    this.fullGroup.get('email')?.valueChanges.subscribe(value=>this.emailValue=value)
    this.fullGroup.get('password')?.valueChanges.subscribe(value=>this.passwordValue=value)

  }




  isValidMail():boolean{
    if(this.fullGroup.get('email')?.status=='VALID' || this.errorData)
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
    if(this.fullGroup.get('password')?.status=='VALID' || this.errorData)
    {
      this.isValidPass=true
      this.isInvalidPass=false
      return true
    }
    else if(this.fullGroup.get('password')?.status=='INVALID'&& this.fullGroup.get('password')?.touched || this.errorData)
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
    }
    else{
      return false
    }
  }


submitFrom(){
  this.isDisabled=false
  // this.http.postData(this.emailValue,this.passwordValue)
  let login = this.http.authRedirect(this.emailValue,this.passwordValue)

  login.subscribe(response=>{

    if(response)
    {
      this.router.navigate(['/'])
      // console.log(this.http.isAuth())
      this.isDisabled=true
      this.errorData=false
    }

  },error=>{
    if(error)
    {
      this.errorData=true
      this.isValidPass=false
      this.isDisabled=true
    }
  })

  this.isDisabled=true

    }




}
