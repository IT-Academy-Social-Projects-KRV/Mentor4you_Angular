import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  deletUserDataUrl = 'http://localhost:8080/api/users/delete';
  avatar$: Subject<any> = new Subject();

  constructor(private http: HttpClient) { }

  setAvatar(avatar: any) {
    this.avatar$.next(avatar);
  }

  deleteUser(): Observable<any> {
    return this.http.delete(this.deletUserDataUrl, {});
  }
}
