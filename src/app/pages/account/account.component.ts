import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MatSnackBar } from '@angular/material/snack-bar';
import { ImageCroppedEvent, base64ToFile } from 'ngx-image-cropper';
import { Subscription } from 'rxjs';

import { Certificate, MentorProfile, MentorService, UserService } from 'src/app/core';
import { SigninService } from 'src/app/auth/signin/signin.service';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit, OnDestroy {
  isMentorForm: boolean = false;
  isAccountActivated!: boolean;
  isImage: boolean = false;
  selectedFile!: File;
  mentorSubscription!: Subscription;
  mentor?: any;
  textFieldUpload: string = 'Upload you photo here (<4 MB)';
  imageChangedEvent: any = '';
  croppedImage: any = 'https://awss3mentor4you.s3.eu-west-3.amazonaws.com/avatars/standartUserAvatar.png';
  fileC: any;
  myFile!: File;
  newName: any = "";
  imgType: any = '';
  isBtnDisabled: boolean = true;
  public token: any;
  public response: any;
  public avatarSubscription: any;

  constructor(
    public auth: SigninService,
    private http: HttpClient, 
    private _snackBar: MatSnackBar,
    private mentorService: MentorService,
    private userService: UserService
  ) {}
  

  get isAuth() {
    return this.auth.isAuth();
  }

  ngOnInit(): void {
    this.mentorSubscription = this.mentorService.getMentorDTO().subscribe(
      (mentor: MentorProfile) => {
        this.mentor = mentor;
        this.isAccountActivated = mentor.isAccountActivated;
        this.croppedImage = mentor.avatar;
      },
    );
  }

  setMentorData(mentorData: any): void {
    this.isAccountActivated = mentorData.isAccountActivated;
    this.imageCropped(mentorData.avatar);
  }

  viewMentorData(mentorData: any): void {
    this.mentor = mentorData;
  }

  toggleAccountActivate(): void {
    this.isAccountActivated = !this.isAccountActivated;
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
        ? this.selectedFile.name.slice(0, 35) + '...' + '. Now you can save avatar'
        : this.selectedFile.name + '. Now you can save avatar';

    this.newName = this.selectedFile.name;
    this.imgType = this.selectedFile.type;
    this.imageChangedEvent = event;
    this.selectedFile = this.imageChangedEvent;
    this.isImage = true;
    
  }
   
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.fileC = base64ToFile(this.croppedImage);
    this.myFile = new File([this.fileC], this.newName, {lastModified:  Date.now(), type:  this.imgType});
  }

  imgReady() {
    this.isImage = false;
    this.isBtnDisabled = false;
  }
 
  onUpload(): void {
    const file = this.myFile;
    const fd = new FormData();

    if (!file) {
      this.openSnackBar('Please select a photo', 'Got it', 'danger');
      return;
    }

    fd.append('file', file);
   
  this.avatarSubscription = this.userService.uploadAvatar(fd).subscribe(
    res => { console.log('response', res); },
    error => {console.log(error), this.textFieldUpload = 'Something went wrong. Please, try again!'},
    () => {
      this.textFieldUpload = 'Your photo uploaded successfully!';
      this.isBtnDisabled = true; 
    }
  );

  }

  deleteAvatar(){
    this.userService.deleteAvatar().subscribe(response => console.log(response),
    error => { if (error.status == 200){
        this._snackBar.open('Photo deleted! Now you have basic avatar', '', {
          duration: 3000
        });
      } else {
        this._snackBar.open('Error. Try again later', '', {
          duration: 3000
        });
      }
    });
  }

  openSnackBar(message: string, action: string, className: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
      panelClass: className,
    });
  }

  showMentorForm() {
    this.isMentorForm = true;
    this.mentor.certificates = this.mentor.certificates.map((certificate: Certificate) => certificate.name);
    this.mentor.avatar = this.croppedImage;
  }

  ngOnDestroy(): void {
    this.mentorSubscription.unsubscribe();
  }
}
