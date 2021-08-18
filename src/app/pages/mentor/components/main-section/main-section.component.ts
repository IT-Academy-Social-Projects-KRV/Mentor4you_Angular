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
  place:string=' Remote'
  rate:string=' 200$'
  group:boolean=true
  public Languages:Array<string> = [
    ' Ukrainian',
    ' Russian',
    ' English',
    ' Germany ',
  ];
  grp_ment: string | undefined

  ngOnInit(): void {
    if(this.group)
    {
      this.grp_ment='Yes'
    }
    else {
      this.grp_ment='No'
    }


  }

}
