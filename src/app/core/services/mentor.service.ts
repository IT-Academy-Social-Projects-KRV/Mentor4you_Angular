import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { MentorCard, MentorProfile } from '../interfaces';
import mockAvatar from './../mock/avatar';

@Injectable({
  providedIn: 'root'
})
export class MentorService {
  mentorBaseUrl = 'http://localhost:8080/api/mentors';

  // temporary data
  tempAvatar = mockAvatar;
  tempAvatar_2 = 'https://i.pravatar.cc/120';
  tempCategories = ['HTML', 'CSS'];
  // templanguagesList = ['Ukrainian'];

  constructor(
    private http: HttpClient
  ) { }

  getAllMentors(): Observable<MentorCard[]> {
    return this.http
      .get<any>(this.mentorBaseUrl)
      .pipe(map(mentors => {
        // console.log('m', mentors);
        return mentors
          .filter((m: any) => m.accounts.user.first_name !== null)
          .map((mentor: any) => {
            const user = mentor.accounts.user;

            return {
              id: user.id,
              fullName: user.first_name + ' ' + user.last_name,
              avatar: this.tempAvatar_2,                          // expecting a change in structure of the data
              // avatar: user.avatar,                           
              categories: user.categories || this.tempCategories, // expecting a change in structure of the data
              rating: Number(user.rating) || 5
            }
        })
      }));
  }

  getMentorById(id: number): Observable<any> {
    return this.http
      .get<any>(this.mentorBaseUrl + `/${id}`)
      .pipe(map((mentorById: any) => {

        // console.log('m - server', mentorById);

        const mentor = mentorById.accountInfo;
        const socialMap = mentorById.accountInfo.socialMap;

        return {
          id: mentor.id,
          email: mentor.email,
          firstName: mentor.firstName,
          lastName: mentor.lastName,
          avatar: this.tempAvatar_2,      // expecting a change in structure of the data
          // avatar: mentor.avatar,
          phoneNumFirst: socialMap.PhoneNumFirst || '',
          categoriesList: mentorById.categoriesList,
          certificats: mentor.certificats,
          place: mentor.place || 'Remote',
          groupServ: mentor.group_services || false,
          languages: mentorById.languages,
          description: mentorById.description,
        }
      }))
  }

  getMentorDTO(): Observable<any> {
    return this.http
      .get<any>(this.mentorBaseUrl + '/getMentorDTO/')
      .pipe(map((mentorDTO: any) => {

        console.log('mDTO - server', mentorDTO);

        const mentor = mentorDTO.accountInfo;
        const socialMap = mentorDTO.accountInfo.socialMap;

        return {
          id: mentor.id,
          email: mentor.email,
          firstName: mentor.firstName,
          lastName: mentor.lastName,
          // avatar: this.tempAvatar_2,         // expecting a change in structure of the data
          avatar: mentor.avatar,
          phoneNumFirst: socialMap.PhoneNumFirst,
          categoriesList: mentorDTO.categoriesList,
          rate: 0,
          currency: '',
          telegram: socialMap.Telegram,
          skype: socialMap.Skype,
          linkedIn: socialMap.LinkedIn,
          gitHub: socialMap.GitHub,
          certificats: mentor.certificats,
          place: mentor.place || 'Remote',
          groupServ: mentor.group_services || false,
          languages: mentorDTO.languages,
          description: mentorDTO.description,
          isAccountActivated: mentorDTO.showable_status,
          cities: mentorDTO.cities,
          rating: mentor.rating,
          online: mentor.online,
          offlineOut: mentor.offlineOut,
          offlineIn: mentor.offlineIn
        }
      }))
  }

  updateMentor(mentor: any): Observable<any> {
    const updatedMentor = this.transformData(mentor);

    return this.http.put<any>(this.mentorBaseUrl + '/UpdateMentor/', updatedMentor);
  }

  transformData(mentor: any): Object {

    console.log('mentor - to Server', mentor);

    mentor.categoriesList.map((category: any) => {
      category.rate = mentor.rate
      category.currency = mentor.currency
    });

    return {
      accountInfo: {
        firstName: mentor.firstName,
        lastName: mentor.lastName,
        email: mentor.email,
        avatar: mentor.avatar,
        socialMap: {
          LinkedIn: mentor.linkedIn,
          Telegram: mentor.telegram,
          Skype: mentor.skype,
          GitHub: mentor.gitHub,
          PhoneNumFirst: mentor.phoneNumFirst
        }
      },
      description: mentor.description,
      showable_status: mentor.isAccountActivated || true,
      groupServ: null,
      // groupServ: mentor.groupServ || null,
      rating: mentor.rating,
      educations: [],
      certificates: [
        // {
        //   name: null,
        //   description: null,
        //   link: null
        // }
      ],
      categoriesList: mentor.categoriesList,
      languages: mentor.languages,
      cities: mentor.cities,
      online: true,
      offlineOut: true,
      offlineIn: (mentor.online && mentor.offlineOut) || false,
    }
  }
}
