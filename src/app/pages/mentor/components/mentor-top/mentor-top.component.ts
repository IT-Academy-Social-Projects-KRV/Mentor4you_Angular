import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {categories, city, languages} from "./Selected_options";
import {MentorsFilter} from "./MentorsFilter";
import {MentorTopService} from "./mentor-top.service";


@Component({
  selector: 'app-mentor-top',
  templateUrl: './mentor-top.component.html',
  styleUrls: ['./mentor-top.component.scss']
})


export class MentorTopComponent implements OnInit {
  categories = categories;
  languages = languages;
  city = city;
  minNum: number = 1;
  maxNum: number = 1000;
  selectedLanguages: any[] = [];
  selectedCategories: any[] = [];
  selectedCity: any[] = [];
  dropList: boolean = true;
  mentorDataFilter: any;


  @ViewChild('showDiv') showDiv!: ElementRef;
  @ViewChild('rangeSlider') rangeSlider!: ElementRef;


  constructor(private mentorService: MentorTopService) {
  }

  ngOnInit(): void {

    this.showSlider();
  }

  AddCategory = ($event: any): void => {
    this.selectedCategories.push($event);
    console.log($event)
    console.log('After add Operation_Categories');
    console.log(this.selectedCategories);
  }

  RemoveCategory = ($event: any): void => {
    console.log($event);
    this.selectedCategories = this.selectedCategories.filter(categories => categories.id !== $event.value.id);
  }

  AddCity = ($event: any): void => {
    this.selectedCity.push($event);
    console.log('After add Operation_City');
    console.log(this.selectedCity);
  }

  RemoveCity = ($event: any): void => {
    console.log($event);
    this.selectedCity = this.selectedCity.filter(cities => cities.id !== $event.value.id);
  }

  AddLanguage = ($event: any): void => {
    this.selectedLanguages.push($event);
    console.log('After add Operation_Language');
    console.log(this.selectedLanguages);
  }

  RemoveLanguage = ($event: any): void => {
    console.log($event);
    this.selectedLanguages = this.selectedLanguages.filter(languages => languages.id !== $event.value.id);
    this.selectedLanguages = [''];
  }


  ChangeMin(event: any) {
    this.minNum = event.target.value;
  }

  ChangeMax(event: any) {
    this.maxNum = event.target.value;
  }

  setRangeSlider() {
    if (this.minNum > this.maxNum) {
      let temp = this.maxNum;
      this.maxNum = this.minNum;
      this.minNum = temp;
    }
  }

  onSubmit() {
    let fields = new MentorsFilter(this.selectedCategories, this.selectedCity, this.selectedLanguages, this.minNum, this.maxNum)
    this.mentorService.postConfig(fields);
    console.log(fields)
  }

  getMentorData() {
    this.mentorService.getMentorData().subscribe((data: any) => this.mentorDataFilter = data);
  }

  showSlider() {
    this.dropList = !this.dropList;
  }
}
