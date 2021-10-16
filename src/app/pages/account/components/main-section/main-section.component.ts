import {Component, ElementRef, OnInit, ViewChild,AfterViewInit, Output, EventEmitter, Input} from '@angular/core';
import { MentorProfile } from 'src/app/core';

@Component({
  selector: 'app-main-section',
  templateUrl: './main-section.component.html',
  styleUrls: ['./main-section.component.scss']
})
// export class MainSectionComponent implements OnInit,AfterViewInit {
export class MainSectionComponent implements OnInit {
  @ViewChild('name')name?:ElementRef;
  @Input() mentor: any;
  @Output() editMentor: EventEmitter<any> = new EventEmitter();
  
  description: string = 
    'More than 15 years of commercial development and creation of IT products.I participate in pre-sale activities and design architectures. From time to time I write code in JavaScript, Python, Go, Java. I also conduct interviews and help with a career guide (individual development plan) for Middle, Senior, Tech Lead / Team Lead';
  name_surname: string = 'John Konnor';

  public Category : Array<string> = [
    ' JavaScript',
    ' React',
    ' Angular',
    ' Python ',
  ];
  button: string = 'Message';
  place: string = ' Remote';
  rate: string = ' 200$';

  group: boolean = true;
  auth: boolean = true;

  public Languages:Array<string> = [
    ' Ukrainian',
    ' Russian',
    ' English',
    ' Germany ',
  ];

  grp_ment: string | undefined;

  getCustom(elem:HTMLElement): void {
    // console.log(elem.textContent);
    elem.style.marginTop = '20px';
  }

  ngOnInit(): void {
    if (this.group) {
      this.grp_ment='Yes'
    } else {
      this.grp_ment='No'
    }

    // console.log('mentor-main', this.mentor);
  }

  ngAfterViewInit(): void {
    if (this.auth) {
      this.button='Message'
    } else {
      this.button='Connect'
      this.getCustom(this.name?.nativeElement)
    }

  }

  toggleEditMentor(): void {
    this.editMentor.emit();
  }
}
