import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { MentorCard, MentorProfile } from '../interfaces';
import mockAvatar from './../mock/avatar';
import { isAvatar } from 'src/app/pages/account/components/account-mentor/account-mentor.component';

@Injectable({
  providedIn: 'root'
})
export class MentorService {
  mentorBaseUrl = 'http://localhost:8080/api/mentors';
  isTempAvatar = false;

  // temporary data
  tempAvatar = mockAvatar;
  // tempAvatar_2 = 'https://i.pravatar.cc/120';
  tempAvatar_2 = 'https://awss3mentor4you.s3.eu-west-3.amazonaws.com/avatars/standartUserAvatar.png';
  currentAvatar = this.tempAvatar_2;
  tempCategories = ['HTML', 'CSS'];

  constructor(
    private http: HttpClient,
  ) { 
    isAvatar.subscribe((res) => this.isTempAvatar = res);
  }

  getAllMentors(): Observable<MentorCard[]> {
    return this.http
      .get<any>(this.mentorBaseUrl)
      .pipe(map(mentors => {
        return mentors
          .filter((m: any) => m.accounts.user.first_name !== null)
          .map((mentor: any) => {
            const user = mentor.accounts.user;

            if (this.isTempAvatar) {
              this.currentAvatar = (user.id === 7) ? this.tempAvatar : this.tempAvatar_2;
            }

            return {
              id: user.id,
              fullName: user.first_name + ' ' + user.last_name,
              avatar: this.currentAvatar,                          // expecting a change in structure of the data
              // avatar: user.avatar,                           
              categoriesList: mentor.mentors_to_categories,
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
          avatar: this.tempAvatar,      // expecting a change in structure of the data
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

        // console.log('mDTO - server', mentorDTO);

        this.currentAvatar = this.isTempAvatar ? this.tempAvatar : this.tempAvatar_2;

        const mentor = mentorDTO.accountInfo;
        const socialMap = mentorDTO.accountInfo.socialMap;

        return {
          id: mentor.id,
          email: mentor.email,
          firstName: mentor.firstName,
          lastName: mentor.lastName,
          avatar: this.currentAvatar,         // expecting a change in structure of the data
          // avatar: mentor.avatar,
          phoneNumFirst: socialMap.PhoneNumFirst,
          categoriesList: mentorDTO.categoriesList,
          rate: 0,
          currency: '',
          telegram: socialMap.Telegram,
          skype: socialMap.Skype,
          linkedIn: socialMap.LinkedIn,
          gitHub: socialMap.GitHub,
          certificates: mentorDTO.certificates,
          place: mentor.place || 'Remote',
          groupServ: mentorDTO.groupServ,
          languages: mentorDTO.languages,
          description: mentorDTO.description,
          isAccountActivated: mentorDTO.showable_status,
          cities: mentorDTO.cities,
          rating: mentorDTO.rating,
          online: mentorDTO.online,
          offlineOut: mentorDTO.offlineOut,
          offlineIn: mentorDTO.offlineIn
        }
      }))
  }

  updateMentor(mentor: any): Observable<any> {
    const updatedMentor = this.transformData(mentor);

    return this.http.put<any>(this.mentorBaseUrl + '/UpdateMentor/', updatedMentor);
  }

  transformData(mentor: any): Object {

    // console.log('mentor - to Server', mentor);

    mentor.categoriesList.map((category: any) => {
      category.rate = mentor.rate;
      category.currency = mentor.currency;
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
      groupServ: mentor.groupServ,
      rating: mentor.rating || 0,
      educations: [],
      certificates: mentor.certificates,
      categoriesList: mentor.categoriesList,
      languages: mentor.languages,
      cities: mentor.cities,
      online: mentor.online,
      offlineOut: mentor.offlineOut,
      offlineIn: mentor.online && mentor.offlineOut,
    }
  }
}
