import {Component,ElementRef, OnInit, ViewChild} from '@angular/core';
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
  mimNum: number = 1;
  maxNum: number = 1000;
  selectedLanguages: any[] = [];
  selectedCategories: any[] = [];
  selectedCity: any[] = [];
  mentorFilter?: MentorsFilter;
  dropList: boolean = true;

  @ViewChild('showDiv') showDiv!: ElementRef;
  @ViewChild('rangeSlider') rangeSlider!: ElementRef;


  constructor(private http: MentorTopService) {
  }

  ngOnInit(): void {
    this.http.getConfig().subscribe((data: any) => this.mentorFilter = new MentorsFilter(data.category, data.city, data.language, data.minValue, data.maxValue));

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
    this.mimNum = event.target.value;
  }

  ChangeMax(event: any) {
    this.maxNum = event.target.value;
  }

  onSubmit() {
    let fields = new MentorsFilter(this.selectedCategories, this.selectedCity, this.selectedLanguages, this.mimNum, this.maxNum)
    this.http.postConfig(fields);
    console.log(fields)
  }

  showSlider() {
    this.dropList = !this.dropList;
  }
}
