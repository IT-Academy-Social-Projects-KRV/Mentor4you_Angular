import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { NotificationModalService } from 'src/app/core';
import { MentorCard } from 'src/app/core/interfaces';

@Component({
  selector: 'app-mentor-card',
  templateUrl: './mentor-card.component.html',
  styleUrls: ['./mentor-card.component.scss']
})
export class MentorCardComponent implements OnInit {
  @Input() mentor!: MentorCard
  stars: Array<number> | undefined;
  private unSubscribeSubject: Subject<void> = new Subject;

  constructor(
    private router: Router,
    private notificationModalService: NotificationModalService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    // this.stars = [...Array(this.mentor?.rating).keys()].map(i => i + 1);
    this.stars = [...Array(this.mentor?.rating).fill(0)].map(i => i + 1);
  }

  goTo(path: string): void {
    this.router.navigate([path, this.mentor.id]);
  }

  sendRequest(id: number): void{
    this.notificationModalService.sendRequest(id)
    .pipe(
      catchError((error: any) => {
        this.toastr.error('Something went wrong or you have already sent a request');
        return error;
      }),
      takeUntil(this.unSubscribeSubject)
    )
    .subscribe(() => {
      this.toastr.info('Your mentorship request was sent');
    });
  }
}
