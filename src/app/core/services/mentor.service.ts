import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Category, Certificate, MentorCard, MentorProfile } from '../interfaces';
import { 
  categoriesData,
  certificateList as certificates
} from 'src/app/pages/account/components/account-mentor/data';

@Injectable({
  providedIn: 'root'
})
export class MentorService {
  countBestMentors = 5;
  mentorsBestRatingUrl = `http://localhost:8080/api/searchMentor/findMentorsBestRating/${this.countBestMentors}`;
  mentorBaseUrl = 'http://localhost:8080/api/mentors';

  constructor(
    private http: HttpClient,
  ) { }

  getAllMentors(): Observable<MentorCard[]> {
    return this.http
      .get<any>(this.mentorsBestRatingUrl)
      // .get<any>(this.mentorBaseUrl)
      .pipe(map(mentors => {
        console.log('m - all', mentors);
        return mentors
          // .filter((m: any) => m.firstName !== null)
          .map((mentor: any) => {
            // const user = mentor.accounts.user;

            return {
              id: mentor.id,
              fullName: mentor.firstName + ' ' + mentor.lastName,
              avatar: mentor.avatar,                           
              categories: mentor.categories,
              rating: Number(mentor.rating)
            }
            
            // return {
            //   id: user.id,
            //   fullName: user.first_name + ' ' + user.last_name,
            //   avatar: user.avatar,                           
            //   // categories: user.categories || this.tempCategories,  // expecting a change in structure of the data
            //   categoriesList: mentor.mentors_to_categories,           // expecting a change in structure of the data
            //   rating: Number(user.rating) || 5
            // }
        })
      }));
  }

  getMentorById(id: number): Observable<any> {
    return this.http
      .get<any>(this.mentorBaseUrl + `/${id}`)
      .pipe(map((mentorById: any) => {
        const mentor = mentorById.accountInfo;
        const socialMap = mentorById.accountInfo.socialMap;
        const currentRate = mentorById.categoriesList[0];
        const categories = mentorById.categoriesList.map((category: Category) => category.categories.name);

        return {
          id: mentor.id,
          email: mentor.email,
          firstName: mentor.firstName,
          lastName: mentor.lastName,
          // avatar: this.currentAvatar,         // expecting a change in structure of the data
          avatar: mentor.avatar,
          phoneNumFirst: socialMap.PhoneNumFirst,
          categoriesList: categories,
          rate: currentRate.rate,
          currency: currentRate.currency,
          telegram: socialMap.Telegram,
          skype: socialMap.Skype,
          linkedIn: socialMap.LinkedIn,
          gitHub: socialMap.GitHub,
          certificates: mentorById.certificates,
          place: mentor.place || 'Remote',
          groupServ: mentorById.groupServ,
          languages: mentorById.languages,
          description: mentorById.description,
          isAccountActivated: mentorById.showable_status,
          cities: mentorById.cities,
          rating: mentorById.rating,
          online: mentorById.online,
          offlineOut: mentorById.offlineOut,
          offlineIn: mentorById.offlineIn
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
        const currentRate = mentorDTO.categoriesList[0] || 5;
        const categories = mentorDTO.categoriesList.map((category: Category) => category.categories.name);

        return {
          id: mentor.id,
          email: mentor.email,
          firstName: mentor.firstName,
          lastName: mentor.lastName,
          // avatar: this.currentAvatar,         // expecting a change in structure of the data
          avatar: mentor.avatar,
          phoneNumFirst: socialMap.PhoneNumFirst,
          categoriesList: categories,
          rate: currentRate.rate,
          currency: currentRate.currency,
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

    console.log('mentor - to Server', mentor);

    const newCategoryList = categoriesData.filter((category: Category) => {
      if (mentor.categoriesList.includes(category.categories.name)) {
        category.currency = mentor.currency;
        category.rate = mentor.rate;

        return true;
      };

      return false;
    });

    // console.log('category', newCategoryList);

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
      categoriesList: newCategoryList,
      languages: mentor.languages,
      cities: mentor.cities,
      online: mentor.online,
      offlineOut: mentor.offlineOut,
      offlineIn: mentor.online && mentor.offlineOut,
    }
  }
}
