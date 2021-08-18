import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mentor } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class MentorService {
  mentorUrl = 'api/mentors';

  constructor(
    private http: HttpClient
  ) { }

  getMentors(): Observable<Mentor[]> {
    return this.http.get<Mentor[]>(this.mentorUrl);
  }
}
