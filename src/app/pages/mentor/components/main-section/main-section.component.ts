import {Component, ElementRef, OnInit, ViewChild,AfterViewInit} from '@angular/core';

@Component({
  selector: 'app-main-section',
  templateUrl: './main-section.component.html',
  styleUrls: ['./main-section.component.scss']
})
export class MainSectionComponent implements OnInit,AfterViewInit {
  @ViewChild('name')name?:ElementRef
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
    elem.style.marginTop='20px'
  }

  ngOnInit(): void {
    if(this.group)
    {
      this.grp_ment='Yes'
    }
    else {
      this.grp_ment='No'
    }
  }

  ngAfterViewInit() {
    if(this.auth)
    {
      this.button='Message'
    }
    else{
      this.button='Connect'
      this.getCustom(this.name?.nativeElement)
    }

  }



}
