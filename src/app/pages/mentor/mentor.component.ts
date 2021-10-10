import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { MentorCard } from 'src/app/core/interfaces';
import { MentorService } from 'src/app/core/services';

@Component({
  selector: 'app-mentor',
  templateUrl: './mentor.component.html',
  styleUrls: ['./mentor.component.scss']
})
export class MentorComponent implements OnInit, OnDestroy {
  mentors: MentorCard[] = [];
  subscribtion!: Subscription;

  constructor(
    private menrotService: MentorService
  ) { }

  ngOnInit(): void {
    this.subscribtion = this.menrotService.getAllMentors().subscribe(
      mentors => {
        this.mentors = mentors
      }
    )
  }

  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }
}
