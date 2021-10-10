import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { MenteeProfile } from '../interfaces';
// import { mentors } from '../mock/in-memory-data.service';

@Injectable({
  providedIn: 'root'
})
export class MenteeService {
  menteeGetDataUrl = 'http://localhost:8080/api/mentees/getMenteeDTO/';
  menteeSendDataUrl = 'http://localhost:8080/api/mentees/updateMenteeByEmail';

  constructor(
    private http: HttpClient
  ) { }

  getData(): Observable<any> {
    return this.http.get<any>(`${this.menteeGetDataUrl}`);
  }

  sendData(mentee: MenteeProfile): Observable<any> {
    return this.http.post(this.menteeSendDataUrl, mentee);
}
}
