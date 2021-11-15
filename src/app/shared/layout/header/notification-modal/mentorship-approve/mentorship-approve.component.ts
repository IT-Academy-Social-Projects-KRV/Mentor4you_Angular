import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

import { Subject } from 'rxjs';
import { MentorCooperation} from 'src/app/core';

@Component({
  selector: 'app-mentorship-approve',
  templateUrl: './mentorship-approve.component.html',
  styleUrls: ['./mentorship-approve.component.scss']
})
export class MentorshipApproveComponent implements OnInit {
  @Input() mentorCooperation?: MentorCooperation;
  @Output() deleteNotificationRequest: EventEmitter<any> = new EventEmitter<{id:number}>();
  @Output() moderatorDetails: Subject<number> = new Subject();
  constructor() { }

  ngOnInit(): void {
    
  }

  deleteNotification(id: number): void{
    this.deleteNotificationRequest.emit({id});
  }

  goToMentor(id:number) {    
    this.moderatorDetails.next(id);
  }
}
