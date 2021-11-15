import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { SigninService } from 'src/app/auth/signin/signin.service';
import { NotificationModalService } from '../../../../core/services/notification-modal.service';

@Component({
  selector: 'app-notification-modal',
  templateUrl: './notification-modal.component.html',
  styleUrls: ['./notification-modal.component.scss']
})
export class NotificationModalComponent implements OnInit {
  public isNewNotification$: Subject<boolean> = new Subject(); 
  
  public mentees$ = new BehaviorSubject<[] | null>(null);
  public mentors$ = new BehaviorSubject<[] | null>(null);
  display$: Observable<string> | undefined;

  constructor(
      public modalService: NotificationModalService,
      public auth: SigninService,
      private router: Router
  ) {}

  ngOnInit() {
    this.display$ = this.modalService.watch();
    this.mentees$ = this.modalService.mentees$;
    this.isNewNotification$ = this.modalService.isNewNotification$;
    this.mentors$ = this.modalService.mentors$;    
  }

  close() {
    this.modalService.close();
  }

  approveIgnoreRequest(data: any): void{
    this.modalService.approveIgnoreRequest(data.id, data.status)
    .subscribe(() => {
      this.modalService.getMenteesRequests();
    })
  }

  deleteNotificationRequest(data: any): void{
    this.modalService.deleteNotificationRequest(data.id)
    .subscribe(() => {
      this.modalService.getMenteesResponces();
    })
  }

  moderatorNavigate(id:number) {
    this.router.navigate([`/mentor-details/`, id]);
    this.modalService.close();
  }

}
