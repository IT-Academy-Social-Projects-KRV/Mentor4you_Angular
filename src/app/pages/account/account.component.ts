import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  currentRole: string = 'mentor';
  isAccountActivated: boolean = true;
  isAvatar: boolean = false;
  textFieldUpload: string = '';
  selectedFile!: File;

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  toggleAccountActivate(): void {
    this.isAccountActivated = !this.isAccountActivated;
  }

  toggleRole(): void {
    this.currentRole = this.currentRole === 'mentor' ? 'mentee' : 'mentor';
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];

    if (!this.selectedFile.type.match('image/*')) {
      this.openSnackBar('Please select a photo', 'Got it', 'danger');
      return;
    }
    const name = this.selectedFile.name;
    this.textFieldUpload = name.length > 25 ? name.slice(0, 25) + '...' : name;

    this.renderImage(this.selectedFile);

    this.isAvatar = true;
  }

  renderImage(img: File): void {
    const reader = new FileReader();

    reader.onload = ((file) => (e: any) => {
      // this.mentorData['avatar'] = e.target.result;
      this.insertBase64Image(e.target.result);
    })(img);

    reader.readAsDataURL(img);
  }

  insertBase64Image(img: string): void {
    if (document.querySelector('.thumb')) {
      document.querySelector('.thumb')?.remove();
    }

    const span = document.createElement('span');
    span.innerHTML = ['<img class="thumb" src="', img, '" alt="user" />'].join(
      ''
    );
    document.getElementById('output')?.insertBefore(span, null);
  }

  onUpload(): void {
    const file = this.selectedFile;
    const fd = new FormData();

    // --- send to server
    fd.append('image', file, file.name);
    this.http
      .post('api/mentors', fd, {
        // reportProgress: true,
        observe: 'events',
      })
      .subscribe((response) => {
        this.textFieldUpload = 'Your avatar uploaded successfully';
        console.log(response);
      });
  }

  openSnackBar(message: string, action: string, className: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
      panelClass: className,
    });
  }
}
