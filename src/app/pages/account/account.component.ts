import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent, LoadedImage, base64ToFile } from 'ngx-image-cropper';

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
  currentRole: string = '';
  textFieldUpload: string = 'Upload you photo here (<4 MB)';
  selectedFile!: File;
  imageChangedEvent: any = '';
  croppedImage: any = '../../../assets/images/owl-icon.png';
  fileC: any;
 
    
  constructor(private http: HttpClient, private _snackBar: MatSnackBar, private auth:SigninService) {}

  get isAuth() {
    return this.auth.isAuth();
  }

  ngOnInit(): void {
    this.isAccountActivated = true;
  }

  setMentorData(mentorData: any): void {
    this.isAccountActivated = mentorData.isAccountActivated;
    this.imageCropped(mentorData.avatar);
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
    
    let ext = this.selectedFile.name.substring(this.selectedFile.name.lastIndexOf('.') + 1).toLowerCase();
    
    let sizeInKB = Math.round(this.selectedFile.size/1024);
  
    if (ext != 'png' && ext != 'jpg' && ext != 'jpeg') {
      this.openSnackBar('Please select a photo', 'Got it', 'danger');
      return;
    } 

    if (sizeInKB >= 4096){
      this.openSnackBar('Size of picture should be less than 4MB', 'Got it', 'danger');
      return;
    }

    this.textFieldUpload =
      this.selectedFile.name.length > 35
        ? this.selectedFile.name.slice(0, 35) + '...'
        : this.selectedFile.name; 

    this.selectedFile = this.imageChangedEvent;
    this.imageChangedEvent = event;
    this.isImage = true;
    
    // this.renderImage(this.croppedImage);
    // console.log(this.selectedFile);
  }

   
  imageCropped(event: ImageCroppedEvent) {
   this.croppedImage = event.base64;
    console.log(this.croppedImage);
    this.fileC = base64ToFile(this.croppedImage);
    console.log(this.fileC.type, this.fileC.size/1024);
    return this.fileC;
  }

  imgReady() {
    this.isImage = false;
  }
  // renderImage(img: any): void {
  //   const reader = new FileReader();

  //   reader.onload = ((theFile) => (e: any) => {
  //     this.imageCropped(img);
  //   })(img);

  //   reader.readAsDataURL(img);
  //  // console.log(img);
  // }

  onUpload(): void {
    const file = this.fileC;
    console.log(file);
    const fd = new FormData();

    if (!file) {
      this.openSnackBar('Please select a photo', 'Got it', 'danger');
      return;
    }

    // --- send to server
    fd.append('image', file, file.name);
    this.http
      .post('http://localhost:8080/api/users/uploadAvatar', fd, {
        observe: 'events',
      })
      .subscribe((events) => {
        console.log('Server response: ', events);
      }, 
      error => console.log(error),
      () => this.textFieldUpload = 'Your photo uploaded successfully!'
      );
  }

  openSnackBar(message: string, action: string, className: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
      panelClass: className,
    });
  }
}