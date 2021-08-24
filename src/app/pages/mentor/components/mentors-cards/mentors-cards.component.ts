import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mentors-cards',
  templateUrl: './mentors-cards.component.html',
  styleUrls: ['./mentors-cards.component.scss']
})
export class MentorsCardsComponent implements OnInit {
  mentors:Mentor[] = [
    {id:1, name:"Alex Potakov", picture:"https://randomuser.me/api/portraits/men/5.jpg", rait:5, lessons:["Typescript", "Angular"]},
    {id:2, name:"Ira Frolova", picture:"https://randomuser.me/api/portraits/women/5.jpg", rait:4, lessons:["JavaScript", "React" ]},
    {id:3, name:"Stepan Giga", picture:"https://randomuser.me/api/portraits/men/32.jpg", rait:5, lessons:[".Net", "ASP.Net"]},
    {id:4, name:"Vira Brezneva", picture:"https://randomuser.me/api/portraits/women/7.jpg", rait:4, lessons:["Java", "Angular"]},
    {id:5, name:"Mahmud Ali", picture:"https://randomuser.me/api/portraits/men/3.jpg", rait:3, lessons:["C#", "React"]},
    {id:6, name:"Natali Dobra", picture:"https://randomuser.me/api/portraits/women/27.jpg", rait:5, lessons:["HTML", "CSS"]},
    {id:7, name:"Devid Duhovnii", picture:"https://randomuser.me/api/portraits/men/12.jpg", rait:4, lessons:["Typescript", "Angular"]},
    {id:8, name:"Tania Good", picture:"https://randomuser.me/api/portraits/women/8.jpg", rait:5, lessons:["JavaScript", "React"]},
    {id:9, name:"Alex Potakov", picture:"https://randomuser.me/api/portraits/men/34.jpg", rait:5, lessons:["Typescript", "Angular"]},
    {id:10, name:"Ira Frolova", picture:"https://randomuser.me/api/portraits/women/35.jpg", rait:4, lessons:["JavaScript", "React" ]},
    {id:11, name:"Stepan Giga", picture:"https://randomuser.me/api/portraits/men/35.jpg", rait:5, lessons:[".Net", "ASP.Net"]},
    {id:12, name:"Vira Brezneva", picture:"https://randomuser.me/api/portraits/women/36.jpg", rait:4, lessons:["Java", "Angular"]},
    {id:13, name:"Mahmud Ali", picture:"https://randomuser.me/api/portraits/men/37.jpg", rait:3, lessons:["C#", "React"]},
    {id:14, name:"Natali Dobra", picture:"https://randomuser.me/api/portraits/women/38.jpg", rait:5, lessons:["HTML", "CSS"]},
    {id:15, name:"Devid Duhovnii", picture:"https://randomuser.me/api/portraits/men/39.jpg", rait:4, lessons:["Typescript", "Angular"]},
    {id:16, name:"Tania Good", picture:"https://randomuser.me/api/portraits/women/40.jpg", rait:5, lessons:["JavaScript", "React"]},
    {id:17, name:"Alex Potakov", picture:"https://randomuser.me/api/portraits/men/41.jpg", rait:5, lessons:["Typescript", "Angular"]},
    {id:18, name:"Ira Frolova", picture:"https://randomuser.me/api/portraits/women/42.jpg", rait:4, lessons:["JavaScript", "React" ]},
    {id:19, name:"Stepan Giga", picture:"https://randomuser.me/api/portraits/men/43.jpg", rait:5, lessons:[".Net", "ASP.Net"]},
    {id:20, name:"Vira Brezneva", picture:"https://randomuser.me/api/portraits/women/45.jpg", rait:4, lessons:["Java", "Angular"]},
    {id:21, name:"Mahmud Ali", picture:"https://randomuser.me/api/portraits/men/14.jpg", rait:3, lessons:["C#", "React"]},
    {id:22, name:"Natali Dobra", picture:"https://randomuser.me/api/portraits/women/12.jpg", rait:5, lessons:["HTML", "CSS"]},
    {id:23, name:"Devid Duhovnii", picture:"https://randomuser.me/api/portraits/men/11.jpg", rait:4, lessons:["Typescript", "Angular"]},
    {id:24, name:"Tania Good", picture:"https://randomuser.me/api/portraits/women/9.jpg", rait:5, lessons:["JavaScript", "React"]},
    {id:25, name:"Tania Good", picture:"https://randomuser.me/api/portraits/women/4.jpg", rait:5, lessons:["JavaScript", "React"]},
  ];
  pageOfItems!: Array<any>;

  constructor() { }

  ngOnInit(): void {
  }

  createRait(rait:number):number[]{
    let items: number[] = [];
    for(let i = 0; i < rait; i++){
      items.push(i);
    }
    return items;
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

}

interface Mentor {
  id: number,
  name: string,
  picture: string,
  rait: number,
  [lessons: string]: any;  
}