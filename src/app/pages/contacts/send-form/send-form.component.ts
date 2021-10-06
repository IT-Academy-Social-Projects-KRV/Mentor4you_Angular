import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-send-form',
  templateUrl: './send-form.component.html',
  styleUrls: ['./send-form.component.scss']
})
export class SendFormComponent implements OnInit {
  selectedFile!: File;
  arrImg: any = [];

  constructor(private http: HttpClient){}  

 onFileSelected (event: any){
    this.selectedFile = <File>event.target.files[0];
  
 }
 onUpload() {
   const fd = new FormData();
   
   fd.append('file', this.selectedFile);
   
   const httpHeaders = new HttpHeaders({
        Authorization: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJva3NhbmEuYUBnbWFpbC5jb20iLCJpYXQiOjE2MzM1MjAzNzEsImV4cCI6MTYzNDEyNTE3MX0.n2Ni2BWW9M7vhms5BjpxdDtabb4VO_uKtld10x9vwt_S8CWfzMh4C8YFWBxCmsEJNzDnoETmH2d7pvFEu9bC0g"
      });
  this.http.post('http://localhost:8080/api/users/uploadAvatar', fd, {headers: httpHeaders}).subscribe(res => {
    console.log(res);
  });
 }

  // formM: FormGroup;
  // API = 'http://localhost:8080/api/users/uploadAvatar';

  // constructor(
  //   public fb: FormBuilder,
  //   private http: HttpClient
  // ) {
  //   this.formM = this.fb.group({
  //     img: [null]
  //   })
  // }

  ngOnInit() { }

  // upload(event: any) {
  //   const file = event.target.files[0];
  //   this.formM.patchValue({
  //     img: file
  //   });
  //   this.formM.get('img')?.updateValueAndValidity()
  // }

  // submit() {
  //   var formData: any = new FormData();
  //   console.log( this.formM.get('img')?.value)
  //   formData.append("file", this.formM.get('img')?.value);

  //   const httpHeaders = new HttpHeaders({
  //     Authorization: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZGFtY2h1ay5va3NhbmFAZ21haWwuY29tIiwiaWF0IjoxNjMzNDM0MDM2LCJleHAiOjE2MzQwMzg4MzZ9.HkcSVz8cLMBqfbis40W3B5Frb29uwF8_zFCHHSeZ9mDpbOvqpPGZPIMwP4rd8Ac8zjvphNlczsSPQx78FT2Ckw",
  //     "Content-Type" : 'multipart/form-data'
  //   });

  //   this.http.post(this.API, formData, {headers: httpHeaders}).subscribe(
  //     (response) => console.log(response),
  //     (error) => console.log(error)
  //   )
  // }

}
