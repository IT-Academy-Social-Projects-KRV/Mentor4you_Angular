import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NotificationModalService } from 'src/app/core';
import { Mentee } from 'src/app/core/interfaces/mentee';


@Component({
  selector: 'app-mentorship-request',
  templateUrl: './mentorship-request.component.html',
  styleUrls: ['./mentorship-request.component.scss']
})
export class MentorshipRequestComponent implements OnInit {
  @Input() mentee?: Mentee;
  @Output() approveIgnoreRequest: EventEmitter<any> = new EventEmitter<{id:number, status:boolean}>();

  constructor(
    private modalService: NotificationModalService,
  ) { }

  ngOnInit(): void {
  }

  approveIgnore(id: number, status: boolean): void{
    this.approveIgnoreRequest.emit({id, status});
  }
}
