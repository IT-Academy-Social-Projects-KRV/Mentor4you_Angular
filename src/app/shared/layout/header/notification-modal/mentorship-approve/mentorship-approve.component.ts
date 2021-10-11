import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { MentorCooperation} from 'src/app/core';

@Component({
  selector: 'app-mentorship-approve',
  templateUrl: './mentorship-approve.component.html',
  styleUrls: ['./mentorship-approve.component.scss']
})
export class MentorshipApproveComponent implements OnInit {
  @Input() mentorCooperation?: MentorCooperation;
  @Output() deleteNotificationRequest: EventEmitter<any> = new EventEmitter<{id:number}>();
  constructor() { }

  ngOnInit(): void {
  }

  deleteNotification(id: number): void{
    this.deleteNotificationRequest.emit({id});
  }
}
