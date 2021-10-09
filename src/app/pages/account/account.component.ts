import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

import { MatSnackBar } from '@angular/material/snack-bar';
import { ImageCroppedEvent, LoadedImage, base64ToFile } from 'ngx-image-cropper';
import { Subscription } from 'rxjs';

import { MentorProfile, MentorService } from 'src/app/core';
import { SigninService } from 'src/app/auth/signin/signin.service';
import { AdditionalMentorData, isAvatar } from './components/account-mentor/account-mentor.component';
import mockAvatar from './../../core/mock/avatar';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit, OnDestroy {
  currentRole: string = 'mentor';
  isMentorForm: boolean = false; // !!!!!!!!!!!!!!!!!!!!!!!! mast be false default
  isAccountActivated!: boolean;
  isImage: boolean = false;
  selectedFile!: File;
  mentorSubscription!: Subscription;
  mentor?: MentorProfile;
  textFieldUpload: string = 'Upload you photo here (<4 MB)';
  imageChangedEvent: any = '';
  croppedImage: any = 'https://awss3mentor4you.s3.eu-west-3.amazonaws.com/avatars/standartUserAvatar.png';
  fileC: any;
  myFile!: File;
  newName: any = "";
  imgType: any = '';
  isBtnDisabled: boolean = true;

  constructor(
    private http: HttpClient, 
    private _snackBar: MatSnackBar,
    private mentorService: MentorService,
    private auth: SigninService
  ) {}
  
  // get isAuth() {
  //   return this.auth.isAuth();
  // }

  ngOnInit(): void {
    this.mentorSubscription = this.mentorService.getMentorDTO().subscribe(
      (mentor: MentorProfile) => {
        // console.log('m', mentor);
        // this.insertBase64Image(mentor.avatar);

        this.mentor = mentor;
        this.isAccountActivated = mentor.isAccountActivated;
      }
    );

    isAvatar.subscribe(res => {
      // this.imageChangedEvent = res ? mockAvatar : '';
      // this.croppedImage = event.base64;
      this.croppedImage = res ? mockAvatar : this.croppedImage;
      console.log('avatar ---------', this.croppedImage)
      // this.fileC = base64ToFile(this.croppedImage);
      // this.myFile = new File([this.fileC], this.newName, {lastModified:  Date.now(), type:  this.imgType});

      // insertBase64Image(img: string): void {
      //   if (document.querySelector('.thumb')) {
      //     document.querySelector('.thumb')?.remove();
      //   }
        
      //   const span = document.createElement('span');
      //   span.innerHTML = ['<img class="thumb" src="', img, '" />'].join('');
      //   document.getElementById('output')?.insertBefore(span, null);
      // }

      // this.insertBase64Image(mockAvatar);
    })
  }

  // insertBase64Image(img: string): void {
  //   if (document.querySelector('.thumb')) {
  //     document.querySelector('.thumb')?.remove();
  //   }

  //   const span = document.createElement('span');
  //   span.innerHTML = ['<img class="thumb" title="', '" src="', img, '" />'].join('');
  //   document.getElementById('output')?.insertBefore(span, null);
  // }

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

  toggleRole(button: HTMLElement): void {
    if (button.innerText === 'Move to Mentor Account') {
      this.currentRole = 'mentor';
      button.innerText = 'Move to Mentee Account';
    } else {
      this.currentRole = 'mentee';
      button.innerText = 'Move to Mentor Account';
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
    this.imageChangedEvent = event;
    this.selectedFile = this.imageChangedEvent;
    this.isImage = true;
    
  }

  // renderImage(img: Blob): void {
  //   const reader = new FileReader();

  //   reader.onload = ((theFile) => (e: any) => {
  //     this.insertBase64Image(e.target.result);
  //   })(img);

  //   reader.readAsDataURL(img);
  // }

  // insertBase64Image(img: string): void {
  //   if (document.querySelector('.thumb')) {
  //     document.querySelector('.thumb')?.remove();
  //   }
    
  //   const span = document.createElement('span');
  //   span.innerHTML = ['<img class="thumb" src="', img, '" />'].join('');
  //   document.getElementById('output')?.insertBefore(span, null);
   
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.fileC = base64ToFile(this.croppedImage);
    // console.log('fileC ---------', this.fileC)
    this.myFile = new File([this.fileC], this.newName, {lastModified:  Date.now(), type:  this.imgType});
    // console.log('------myFile-------', this.myFile);
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
    console.log('responce', res);
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

  ngOnDestroy(): void {
    this.mentorSubscription.unsubscribe();
  }
}
