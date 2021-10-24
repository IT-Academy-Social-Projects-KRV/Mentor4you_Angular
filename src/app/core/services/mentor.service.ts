import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Category, MentorCard, MentorProfile, City } from '../interfaces';
import { categoriesData, citiesData } from 'src/app/pages/account/components/account-mentor/data';
import mockAvatar from '../mock/mockAvatar';

@Injectable({
  providedIn: 'root'
})
export class MentorService {
  countBestMentors = 5;
  mentorsBestRatingUrl = `http://localhost:8080/api/searchMentor/findMentorsBestRating/${this.countBestMentors}`;
  mentorBaseUrl = 'http://localhost:8080/api/mentors';
  standartUserAvatar = 'https://awss3mentor4you.s3.eu-west-3.amazonaws.com/avatars/standartUserAvatar.png';
  mockAvatar = mockAvatar;

  constructor(
    private http: HttpClient,
  ) { }

  setAvatar(avatar: string) {
    const currentAvatar = avatar === this.standartUserAvatar ? this.mockAvatar : avatar;
    return currentAvatar;
  }

  getAllMentors(): Observable<MentorCard[]> {
    return this.http
      .get<any>(this.mentorsBestRatingUrl)
      .pipe(map(mentors => {
        return mentors
          .filter((m: any) => m.firstName !== null)
          .map((mentor: any) => {
            const avatar = this.setAvatar(mentor.avatar);

            return {
              id: mentor.id,
              fullName: mentor.firstName + ' ' + mentor.lastName,
              avatar: avatar,                           
              categories: mentor.categories,
              rating: Number(mentor.rating)
            }
        })
      }));
  }
  
  getMentorById(id: number): Observable<MentorProfile> {
    return this.http
      .get<any>(this.mentorBaseUrl + `/${id}`)
      .pipe(map((mentorById: any) => {
        return this.transformDataForClient(mentorById)}
      ));
  }

  getMentorDTO(): Observable<MentorProfile> {
    return this.http
      .get<any>(this.mentorBaseUrl + '/getMentorDTO/')
      .pipe(map((mentorDTO: any) => {
        return this.transformDataForClient(mentorDTO)}
      ));
  }

  updateMentor(mentor: MentorProfile): Observable<MentorProfile> {
    const updatedMentor = this.transformDataForServer(mentor);
    return this.http.put<any>(this.mentorBaseUrl + '/UpdateMentor/', updatedMentor);
  }


  // ---------- transformation data for Frontend & Backend --------------

  transformDataForClient(mentor: any) {
    const mentorData = mentor.accountInfo;
    const socialMap = mentor.accountInfo.socialMap;
    const currentRate = mentor.categoriesList[0] || 5;
    const categories = mentor.categoriesList.map((category: Category) => category.categories.name);
    const cities = mentor.cities.map((city: City) => city.name);
    const avatar = this.setAvatar(mentorData.avatar);

    return {
      id: mentorData.id,
      email: mentorData.email,
      firstName: mentorData.firstName,
      lastName: mentorData.lastName,
      avatar: avatar,
      phoneNumFirst: socialMap.PhoneNumFirst,
      categoriesList: categories,
      rate: currentRate.rate,
      currency: currentRate.currency,
      telegram: socialMap.Telegram,
      skype: socialMap.Skype,
      linkedIn: socialMap.LinkedIn,
      gitHub: socialMap.GitHub,
      certificates: mentor.certificates,
      place: mentorData.place,
      groupServ: mentor.groupServ,
      languages: mentor.languages,
      description: mentor.description,
      isAccountActivated: mentor.showable_status,
      cities: cities,
      rating: mentor.rating,
      online: mentor.online,
      offlineOut: mentor.offlineOut,
      offlineIn: mentor.offlineIn
    }
  }

  transformDataForServer(mentor: any): Object {
    const newCategories = categoriesData.filter((category: Category) => {
      if (mentor.categoriesList.includes(category.categories.name)) {
        category.currency = mentor.currency;
        category.rate = mentor.rate;

        return true;
      };

      return false;
    });

    const newSities = citiesData.filter(city => mentor.cities.includes(city.name));

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
