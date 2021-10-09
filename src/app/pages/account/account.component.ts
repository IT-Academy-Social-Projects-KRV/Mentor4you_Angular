import { HttpClient, HttpHeaders} from '@angular/common/http';
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
  croppedImage: any = 'https://awss3mentor4you.s3.eu-west-3.amazonaws.com/avatars/standartUserAvatar.png';
  fileC: any;
  myFile!: File;
  newName: any = "";
  imgType: any = '';
  isBtnDisabled: boolean = true;
 
    
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
    this.newName = this.selectedFile.name;
    this.imgType = this.selectedFile.type;
    //console.log(this.newName, this.imgType);
    this.selectedFile = this.imageChangedEvent;
    this.imageChangedEvent = event;
    this.isImage = true;
    
  }

   
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.fileC = base64ToFile(this.croppedImage);
    this.myFile = new File([this.fileC], this.newName, {lastModified:  Date.now(), type:  this.imgType});
    //console.log(this.myFile);
  }

  imgReady() {
    this.isImage = false;
    this.isBtnDisabled = false;
  }
 
  onUpload(): void {
    const file = this.myFile;
    //console.log(file);
    const fd = new FormData();

    if (!file) {
      this.openSnackBar('Please select a photo', 'Got it', 'danger');
      return;
    }

    fd.append('file', file);
   
  this.http.post('http://localhost:8080/api/users/uploadAvatar', fd).subscribe(res => {
    console.log(res);
  }, error => {console.log(error), this.textFieldUpload = 'Something went wrong. Please, try again!'},
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