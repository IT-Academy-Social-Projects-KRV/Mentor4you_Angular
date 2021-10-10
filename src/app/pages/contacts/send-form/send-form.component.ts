import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-send-form',
  templateUrl: './send-form.component.html',
  styleUrls: ['./send-form.component.scss']
})
export class SendFormComponent implements OnInit {
  
  sendingEmailForm: FormGroup;

  constructor(private http: HttpClient, private formBuilder: FormBuilder){
    this.sendingEmailForm = formBuilder.group({
      fullNameControl: ['', Validators.required],
      emailControl: ['', [Validators.required, Validators.email]],
      subjectControl:['', [Validators.required, Validators.minLength(5)]],
      messageControl: ['', [Validators.required, Validators.minLength(20)]],
    }); 
  }  


  ngOnInit() { }

  sendData(){
    console.log(this.sendingEmailForm.value.messageControl);
    const reqBody = {
      "emailAdrId": 1,
      "emailAdres": this.sendingEmailForm.value.emailControl,
      "name": this.sendingEmailForm.value.fullNameControl,
      "subject": this.sendingEmailForm.value.subjectControl,
      "message": this.sendingEmailForm.value.messageControl
    }
    console.log(reqBody);
    this.http.post("http://localhost:8080/api/emailToModerator/sendEmailToModer", reqBody).subscribe(response => console.log(response))
  }


}
