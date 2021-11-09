import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  deletUserDataUrl = 'http://localhost:8080/api/users/delete';
  deleteAvatarUrl = 'http://localhost:8080/api/users/deleteAvatar';
  uploadAvatarUrl = 'http://localhost:8080/api/users/uploadAvatar';
  sendMsgUrl = 'http://localhost:8080/api/emailToModerator/sendEmailToModer';
  avatar$: Subject<string> = new Subject();
  name$: Subject<any> = new Subject();

  constructor(private http: HttpClient) { }

  setName(name: string): void {
    this.name$.next(name);
  }

  setAvatar(avatar: string): void {
    this.avatar$.next(avatar);
  }

  deleteUser(): Observable<any> {
    return this.http.delete(this.deletUserDataUrl, {});
  }

  deleteAvatar(): Observable<any> {
    return this.http.delete(this.deleteAvatarUrl);
  }
  
  uploadAvatar(body: any): Observable<any> {
    return this.http.post(this.uploadAvatarUrl, body);
  }

  sendMsgToModer(body: any): Observable<any> {
    return this.http.post(this.sendMsgUrl, body);
  }
}
