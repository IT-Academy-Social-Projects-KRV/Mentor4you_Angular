import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Category, Certificate, MentorCard, MentorProfile, City } from '../interfaces';
import { 
  categoriesData,
  certificateList as certificates,
  citiesData
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
      .pipe(map(mentors => {
        console.log('m - all', mentors);
        return mentors
          // .filter((m: any) => m.firstName !== null)
          .map((mentor: any) => {
            return {
              id: mentor.id,
              fullName: mentor.firstName + ' ' + mentor.lastName,
              avatar: mentor.avatar,                           
              categories: mentor.categories,
              rating: Number(mentor.rating)
            }
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
          place: mentor.place,
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
        const cities = mentorDTO.cities.map((city: City) => city.name);

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
          place: mentor.place,
          groupServ: mentorDTO.groupServ,
          languages: mentorDTO.languages,
          description: mentorDTO.description,
          isAccountActivated: mentorDTO.showable_status,
          cities: cities,
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

    const newCategories = categoriesData.filter((category: Category) => {
      if (mentor.categoriesList.includes(category.categories.name)) {
        category.currency = mentor.currency;
        category.rate = mentor.rate;

        return true;
      };

      return false;
    });

    const newSities = citiesData.filter(city => mentor.cities.includes(city.name));

    // console.log('category', newCategories);

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
      categoriesList: newCategories,
      languages: mentor.languages,
      cities: newSities,
      online: mentor.online,
      offlineOut: mentor.offlineOut,
      offlineIn: mentor.online && mentor.offlineOut,
    }
  }
}
