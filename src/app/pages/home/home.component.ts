import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { MentorCard } from 'src/app/core/interfaces';
import { SigninService } from 'src/app/auth/signin/signin.service';
// import { Mentor } from 'src/app/core/interfaces';
import { MentorService } from 'src/app/core/services';
import { ErrorPagesServices } from 'src/app/core/services/error-pages.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  mentors: MentorCard[] = [];
  subscriptionMentors!: Subscription;

  constructor(
    private mentorService: MentorService,
    private router: Router,
    private signinService: SigninService,
    private errorPagesServices: ErrorPagesServices
  ) { }

  ngOnInit(): void {
    this.subscriptionMentors = this.mentorService.getAllMentors().subscribe(
      (mentors: MentorCard[]) => this.mentors = mentors,
      (error) => {
        this.errorPagesServices.checkError(error)
      }
    )
  }

  goTo(path: string): void {
    this.router.navigateByUrl(path);
  }

  ngOnDestroy(): void {
    this.subscriptionMentors.unsubscribe();
  }
 }
