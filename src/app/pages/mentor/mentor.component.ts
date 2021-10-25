import {Component, OnInit} from '@angular/core';
import {SmallMentorCards} from "./components/mentor-top/SmallMentorCards";
import {MentorTopService} from "./components/mentor-top/mentor-top.service";
import { ToastrService } from 'ngx-toastr';
import { NotificationModalService } from 'src/app/core';
import { catchError, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { SigninService } from 'src/app/auth/signin/signin.service';
import { ErrorPagesServices } from 'src/app/core/services/error-pages.service';

@Component({
  selector: 'app-mentor',
  templateUrl: './mentor.component.html',
  styleUrls: ['./mentor.component.scss']
})
export class MentorComponent implements OnInit {
  private unSubscribeSubject: Subject<void> = new Subject;

  public response?: SmallMentorCards[];
  public stars!: any[];

  constructor(
    public signinService: SigninService,
    private notificationModalService: NotificationModalService,
    private toastr: ToastrService,
    private mentorFilter: MentorTopService,
    private errorPagesServices: ErrorPagesServices
    ) {
  }

  getMentors() {
    this.mentorFilter.getMentors(12).subscribe(res => {
      this.response = res;
    },
      (error) => {
        this.errorPagesServices.checkError(error)
      });
  }

  dataMentors(response: any) {
    this.response = response;
    console.log(this.response, 'mentorFiltered');
  }

  ngOnInit(): void {
    this.getMentors();
    console.log("88", this.signinService.isMentee);
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












