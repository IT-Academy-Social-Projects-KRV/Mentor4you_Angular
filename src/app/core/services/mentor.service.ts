import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Mentor } from '../interfaces';
import { mentors } from '../mock/in-memory-data.service';

@Injectable({
  providedIn: 'root'
})
export class MentorService {
  mentorUrl = 'http://localhost:8080/api/mentors';

  constructor(
    private http: HttpClient
  ) { }

  getMentors(): Observable<Mentor[]> {
    // return of(mentors);
    return this.http.get<Mentor[]>(this.mentorUrl);
  }
}
