import {Component, ElementRef, OnInit, ViewChild, Output, EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'app-main-section',
  templateUrl: './main-section.component.html',
  styleUrls: ['./main-section.component.scss']
})
export class MainSectionComponent implements OnInit {
  @ViewChild('name')name?:ElementRef;
  @Input() mentor: any;
  @Output() editMentor: EventEmitter<any> = new EventEmitter();
  
  button: string = 'Message';
  place: string = ' Remote';
  rate: string = ' 200$';

  group: boolean = true;
  auth: boolean = true;
  grp_ment: string | undefined;

  getCustom(elem:HTMLElement): void {
    elem.style.marginTop = '20px';
  }

  ngOnInit(): void {
    if (this.group) {
      this.grp_ment='Yes'
    } else {
      this.grp_ment='No'
    }
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
