import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  deletUserDataUrl = 'http://localhost:8080/api/users/delete';
  deleteAvatarUrl = 'http://localhost:8080/api/users/deleteAvatar';
  uploadAvatarUrl = 'http://localhost:8080/api/users/uploadAvatar';
  sendMsgUrl = 'http://localhost:8080/api/emailToModerator/sendEmailToModer';

  constructor(private http: HttpClient) { }

  
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