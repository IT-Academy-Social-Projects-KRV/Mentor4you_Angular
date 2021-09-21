import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Mentee } from 'src/app/core/interfaces/mentee';
import { NotificationModalService } from '../../../../core/services/notification-modal.service';

@Component({
  selector: 'app-notification-modal',
  templateUrl: './notification-modal.component.html',
  styleUrls: ['./notification-modal.component.scss']
})
export class NotificationModalComponent implements OnInit {
  //TODO should be implement in the next task
  public isNewNotification: boolean = true;
  public mentorRole:boolean = false;
  
  public mentees: Mentee[] = [
    {
      id: 1,
      img: "http://localhost:4200/assets/images/mentor.png",
      name: "John Johnson"
    },
    {
      id: 2,
      img: "http://localhost:4200/assets/images/mentor.png",
      name: "Jack Johnson"
    }
  ]
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
