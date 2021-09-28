import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { SigninService } from 'src/app/auth/signin/signin.service';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  // mentorData: any = {};
  isAccountActivated!: boolean;
  isImage: boolean = false;
  currentRole: string = ' ';
  textFieldUpload: string = 'Upload you photo here (<2 MB)';
  selectedFile!: File;

  constructor(private http: HttpClient, private _snackBar: MatSnackBar, private auth:SigninService) {}

  get isAuth() {
    return this.auth.isAuth();
  }

  ngOnInit(): void {
    this.isAccountActivated = true;
  }

  setMentorData(mentorData: any): void {
    this.isAccountActivated = mentorData.isAccountActivated;
    this.insertBase64Image(mentorData.avatar);
  }

  toggleAccountActivate(): void {
    this.isAccountActivated = !this.isAccountActivated;
  }

  toggleRole(button: HTMLElement): void {
    if (button.innerText === 'Move to Mentor Account') {
      button.innerText = 'Move to Mentee Account';
      this.currentRole = 'mentor';
    } else {
      button.innerText = 'Move to Mentor Account';
      this.currentRole = 'mentee';
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile.size);

    let ext = this.selectedFile.name.substring(this.selectedFile.name.lastIndexOf('.') + 1).toLowerCase();
    
    let sizeInKB = Math.round(this.selectedFile.size/1024);
    console.log(sizeInKB);
    if (ext != 'png' && ext != 'jpg' && ext != 'jpeg') {
      this.openSnackBar('Please select a photo', 'Got it', 'danger');
      return;
    } 

    if (sizeInKB >= 2048){
      this.openSnackBar('Size of picture should be less than 2MB', 'Got it', 'danger');
      return;
    }


    this.isImage = true;

    this.textFieldUpload =
      this.selectedFile.name.length > 25
        ? this.selectedFile.name.slice(0, 25) + '...'
        : this.selectedFile.name;

    this.renderImage(this.selectedFile);
  }

  renderImage(img: any): void {
    const reader = new FileReader();

    reader.onload = ((theFile) => (e: any) => {
      this.insertBase64Image(e.target.result);
    })(img);

    reader.readAsDataURL(img);
  }

  insertBase64Image(img: string): void {
    if (document.querySelector('.thumb')) {
      document.querySelector('.thumb')?.remove();
    }

    const span = document.createElement('span');
    span.innerHTML = [
      '<img class="thumb" title="',
      '" src="',
      img,
      '" />',
    ].join('');
    document.getElementById('output')?.insertBefore(span, null);
  }

  onUpload(): void {
    const file = this.selectedFile;
    const fd = new FormData();

    if (!file || !file.type.match('image/*')) {
      this.openSnackBar('Please select a photo', 'Got it', 'danger');
      return;
    }

    // --- send to server
    fd.append('image', file, file.name);
    this.http
      .post('api/mentors', fd, {
        // reportProgress: true,
        observe: 'events',
      })
      .subscribe((events) => {
        this.textFieldUpload = 'Your photo uploaded successfully!';
        console.log('Server response: ', events);
      });
  }

  openSnackBar(message: string, action: string, className: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
      panelClass: className,
    });
  }
}