import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

import { MentorProfile, MentorService } from 'src/app/core';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit, OnDestroy {
  // mentorData: any = {};
  isEditedMentor: boolean = true;
  isAccountActivated: boolean = false;
  isImage: boolean = false;
  currentRole: string = 'mentor';
  textFieldUpload: string = 'Upload you photo here';
  selectedFile!: File;
  subscription!: Subscription;
  mentor: any;
  tempMentorId: number = 9;

  constructor(
    private http: HttpClient, 
    private _snackBar: MatSnackBar,
    private mentorService: MentorService
  ) {}

  ngOnInit(): void {
    this.subscription = this.mentorService.getMentorById(this.tempMentorId).subscribe(
      (mentor: any) => {
        console.log('mentor', mentor);
        this.mentor = mentor;
      }
    );
    this.isAccountActivated = true;
  }

  showEditForm(): void {
    this.isEditedMentor = !this.isEditedMentor;
  }

  toggleEditMentor(): void {
    this.isEditedMentor = !this.isEditedMentor;
    // console.log('this.isEditedMentor', this.isEditedMentor);
  }

  setMentorData(mentorData: any): void {
    // this.isAccountActivated = mentorData.isAccountActivated;
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
      // this.openSnackBar('Please select a photo', 'Got it', 'danger');
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
    this.subscription.unsubscribe();
  }
}
