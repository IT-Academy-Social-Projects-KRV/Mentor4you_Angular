import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/core';

@Component({
  selector: 'app-send-form',
  templateUrl: './send-form.component.html',
  styleUrls: ['./send-form.component.scss']
})
export class SendFormComponent implements OnInit {
  
  sendingEmailForm: FormGroup;
  isChecked = false; 

  constructor(private http: HttpClient, 
              private formBuilder: FormBuilder, 
              private _snackBar: MatSnackBar,
              private userService: UserService){
    this.sendingEmailForm = formBuilder.group({
      fullNameControl: ['', [Validators.required, Validators.minLength(3)]],
      emailControl: ['', [Validators.required, Validators.email]],
      subjectControl:['', [Validators.required, Validators.minLength(5)]],
      messageControl: ['', [Validators.required, Validators.minLength(20)]],
    }); 
  }  


  ngOnInit() { }

  sendData(){
    const reqBody = {
      "emailAdrId": 1,
      "emailAdres": this.sendingEmailForm.value.emailControl,
      "name": this.sendingEmailForm.value.fullNameControl,
      "subject": this.sendingEmailForm.value.subjectControl,
      "message": this.sendingEmailForm.value.messageControl
    }
    this.userService.sendMsgToModer(reqBody).subscribe(response => console.log(response),
    error => { if (error.status == 200){
        this.openSnackBar('Message send!', 'We will try to answer you in 24 hours', 'success');
      } else {
        this.openSnackBar('Error', 'Try again later', 'danger');
      }
    }
    );

    this.sendingEmailForm.reset();
  }

  openSnackBar(message: string, action: string, className: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
      panelClass: className,
    });
  }

}
