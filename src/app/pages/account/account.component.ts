import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

import { MentorProfile, MentorService } from 'src/app/core';
import { SigninService } from 'src/app/auth/signin/signin.service';
import { AdditionalMentorData } from './components/account-mentor/account-mentor.component';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit, OnDestroy {
  isMentorForm: boolean = false;
  isAccountActivated!: boolean;
  isImage: boolean = false;
  currentRole: string = 'mentor';
  textFieldUpload: string = 'Upload your photo here';
  selectedFile!: File;
  mentorSubscription!: Subscription;
  mentor?: MentorProfile;

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
  }

  setMentorData(mentorData: AdditionalMentorData): void {
    this.insertBase64Image(mentorData.avatar);
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

    if (!this.selectedFile.type.match('image/*')) {
      this.openSnackBar('Please select a photo', 'Got it', 'danger');
      return;
    }

    this.isImage = true;

    this.textFieldUpload =
      this.selectedFile.name.length > 25
        ? this.selectedFile.name.slice(0, 25) + '...'
        : this.selectedFile.name;

    this.renderImage(this.selectedFile);
  }

  renderImage(img: Blob): void {
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
    span.innerHTML = ['<img class="thumb" src="', img, '" />'].join('');
    document.getElementById('output')?.insertBefore(span, null);
  }

  onUpload(): void {
    const file = this.selectedFile;
    const fd = new FormData();

    if (!file) {
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

  ngOnDestroy(): void {
    this.mentorSubscription.unsubscribe();
  }
}
