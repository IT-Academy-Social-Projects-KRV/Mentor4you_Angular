import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { MentorCard, MentorProfile } from '../interfaces';
import mockAvatar from './../mock/avatar';
// import { mentors } from '../mock/in-memory-data.service';

@Injectable({
  providedIn: 'root'
})
export class MentorService {
  mentorUrl = 'http://localhost:8080/api/mentors';

  // temp data
  tempAvatar = mockAvatar;
  tempCategories = ['HTML', 'CSS'];
  templanguagesList = ['Ukrainian'];

  constructor(
    private http: HttpClient
  ) { }

  getMentors(): Observable<MentorCard[]> {
    // return of(mentors);
    return this.http
      .get<any>(this.mentorUrl)
      .pipe(map(mentors => {
        return mentors.map((mentor: any) => {
          const user = mentor.accounts.user;

          return {
            id: user.id,
            fullName: user.first_name + ' ' + user.last_name,
            avatar: user.avatar || this.tempAvatar,
            categories: user.categories || this.tempCategories,
            rating: Number(user.rating) || 5
          }
        })
      }));
  }

  getMentorById(id: number): any {
  // getMentorById(id: number): Observable<MentorProfile> {
    return this.http
      .get<any>(this.mentorUrl + `/${id}`)
      .pipe(map((mentor: any) => {
        const user = mentor.accounts.user;

        return {
          id: user.id,
          email: user.email || '',
          firstName: user.first_name,
          lastName: user.last_name,
          avatar: user.avatar || this.tempAvatar,
          phoneNumberLink: user.phoneNumberLink || '',
          categories: user.categories || this.tempCategories,
          place: user.place || 'Remote',
          rate: user.rate || 100, 
          groupServices: mentor.group_services || false,
          languagesList: mentor.accounts.languagesList.length !== 0 || this.templanguagesList,
          about: mentor.description
        }
      }))
  }
}
