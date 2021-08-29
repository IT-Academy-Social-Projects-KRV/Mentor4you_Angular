import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationModalService } from '../../../../core/services/notification-modal.service';

@Component({
  selector: 'app-notification-modal',
  templateUrl: './notification-modal.component.html',
  styleUrls: ['./notification-modal.component.scss']
})
export class NotificationModalComponent implements OnInit {
  //TODO should be implement in the next task
  public isNewNotification: boolean = true;
  public MentorRole:boolean = true;
  // public MenteeRole:boolean = false;

  display$: Observable<string> | undefined;

  constructor(
      private modalService: NotificationModalService
  ) {}

  ngOnInit() {
    this.display$ = this.modalService.watch();
  }

  close() {
    this.modalService.close();
  }

}
