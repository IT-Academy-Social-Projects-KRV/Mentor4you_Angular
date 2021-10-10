import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {MentorTopService} from "./mentor-top.service";
import {SmallMentorCards} from "./SmallMentorCards";

@Component({
  selector: 'app-mentor-top',
  templateUrl: './mentor-top.component.html',
  styleUrls: ['./mentor-top.component.scss']
})

export class MentorTopComponent implements OnInit {

  @Output() public sendMentors: EventEmitter<any> = new EventEmitter();
  @Input()  public response?: SmallMentorCards[];


  public categories: any[] = [];
  public languages: any[] = [];
  public cities: any[] = [];
  public minPrice: number = 1;
  public maxPrice: number = 1000;
  public selectedLanguages: any[] = [];
  public selectedCategories: any[] = [];
  public selectedCities: any[] = [];
  public dropList: boolean = true;
  public star!: any[];

  constructor(private mentorFilter: MentorTopService) {
  }

  AddCategory = ($event: any): void => {
    this.selectedCategories.push($event);
  };

  RemoveCategory = ($event: any): void => {
    this.selectedCategories = this.selectedCategories.filter(categories => categories.id !== $event.value.id);
    this.getMentors();
  };

  AddCity = ($event: any): void => {
    this.selectedCities.push($event);
  };

  RemoveCity = ($event: any): void => {
    this.selectedCities = this.selectedCities.filter(cities => cities.id !== $event.value.id);
    this.getMentors();
  };

  AddLanguage = ($event: any): void => {
    this.selectedLanguages.push($event);
  };

  RemoveLanguage = ($event: any): void => {
    this.selectedLanguages = this.selectedLanguages.filter(languages => languages.id !== $event.value.id);
    this.getMentors();
  };

  ChangeMin(event: any) {
    this.minPrice = event.target.value;
  };

  ChangeMax(event: any) {
    this.maxPrice = event.target.value;
  };

  setRangeSlider() {
    if (this.minPrice > this.maxPrice) {
      let temp = this.maxPrice;
      this.maxPrice = this.minPrice;
      this.minPrice = temp;
    }
  };

  showSlider() {
    this.dropList = !this.dropList;
  };

  getMentors() {
    this.mentorFilter.getMentors(12).subscribe(res => {
      this.response = res;
      this.sendMentors.emit(this.response);
    })
  };

  getFilteredMentors() {
    this.mentorFilter.FilteredMentorData
    (
      this.selectedCategories[0],
      this.selectedLanguages[0],
      this.selectedCities[0],
      this.minPrice,
      this.maxPrice
    ).subscribe(res => {
      this.response = res;
      this.sendMentors.emit(this.response);
    })
  };

  getSelects() {
    this.mentorFilter.getSelects().subscribe(res => {
      this.cities = res.cityList;
      this.languages = res.languagesList;
      this.categories = res.categoriesList;
    })
  };

  ngOnInit(): void {
    // this.getMentors();
    this.showSlider();
    this.getSelects();
  }
}

