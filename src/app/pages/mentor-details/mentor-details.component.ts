import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MentorService } from 'src/app/core';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mentor-details',
  templateUrl: './mentor-details.component.html',
  styleUrls: ['./mentor-details.component.scss']
})
export class MentorDetailsComponent implements OnInit, OnDestroy {
  mentor: any;
  mentorSubscription!: Subscription;

  constructor(
    private mentorService: MentorService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // this.mentorSubscription = this.mentorService.getMentorById(id).subscribe(
    this.mentorSubscription = this.mentorService.getMentorDTO().subscribe(
      (mentor: any) => this.mentor = mentor
    )
  }

  ngOnDestroy(): void {
    this.mentorSubscription.unsubscribe();
  }
 }
