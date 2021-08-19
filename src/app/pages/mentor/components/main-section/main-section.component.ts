import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-section',
  templateUrl: './main-section.component.html',
  styleUrls: ['./main-section.component.scss']
})
export class MainSectionComponent implements OnInit {

  constructor() { }
  public Category:Array<string> = [
    ' JavaScript',
    ' React',
    ' Angular',
    ' Python ',
  ];

  button:string='Message'
  place:string=' Remote'
  rate:string=' 200$'
  group:boolean=true
  auth:boolean=true
  public Languages:Array<string> = [
    ' Ukrainian',
    ' Russian',
    ' English',
    ' Germany ',
  ];
  grp_ment: string | undefined

  getCustom(elem:HTMLElement){
    console.log(elem.textContent)
    elem.style.color='white'
  }

  ngOnInit(): void {
    if(this.group)
    {
      this.grp_ment='Yes'
    }
    else {
      this.grp_ment='No'
    }

    if(this.auth)
    {
      this.button='Message'
    }
    else{
      this.button='Connect'

    }
  }



}
