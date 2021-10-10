import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SmallMentorCards} from "./SmallMentorCards";

@Injectable({
  providedIn: 'root'
})

export class MentorTopService {

  constructor(private http: HttpClient) {
  }

  staticURL = 'http://localhost:8080/';

  getSelects() {
    return this.http.get<any>(this.staticURL + 'api/searchMentor');
  };

  getMentors(num: number) {
    return this.http.get<SmallMentorCards[]>(this.staticURL + 'api/searchMentor/findMentorsBestRating/' + `${num}`);
  };

  FilteredMentorData
  (
    selectedCategories: string[] = [' '],
    selectedLanguages: string[] = [' '],
    selectedCities: string[] = ['Online'],
    minPrice: number,
    maxPrice: number,
  )
  {
    const queryParams = `/${selectedCities}/${selectedCategories}/${selectedLanguages}/${minPrice}/${maxPrice}`;
    return this.http.get<SmallMentorCards[]>(this.staticURL + 'api/searchMentor/filterGetListSmallMentors' + queryParams);
  };
}
