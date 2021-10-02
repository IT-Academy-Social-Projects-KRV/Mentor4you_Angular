import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { MentorCard } from 'src/app/core/interfaces';
import { MentorService } from 'src/app/core/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  mentors: MentorCard[] = [];
  subscription!: Subscription;

  constructor(
    private mentorService: MentorService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subscription = this.mentorService.getAllMentors().subscribe(
      (mentors: MentorCard[]) => this.mentors = mentors
    )
  }

  goTo(path: string): void {
    this.router.navigateByUrl(path);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
 }
