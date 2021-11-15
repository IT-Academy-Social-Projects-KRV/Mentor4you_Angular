import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';

import { Mentee } from 'src/app/core/interfaces/mentee';


@Component({
  selector: 'app-mentorship-request',
  templateUrl: './mentorship-request.component.html',
  styleUrls: ['./mentorship-request.component.scss']
})
export class MentorshipRequestComponent implements OnInit {
  @Input() mentee?: Mentee;
  @Output() approveIgnoreRequest: Subject<{id:number, status:boolean}> = new Subject();

  constructor() { }

  ngOnInit(): void {
  }

  approveIgnore(id: number, status: boolean): void{
    this.approveIgnoreRequest.next({id, status});
  }
}
