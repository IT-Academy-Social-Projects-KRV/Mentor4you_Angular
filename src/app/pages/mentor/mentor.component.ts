import { Component, OnInit } from '@angular/core';

import { MentorCard } from 'src/app/core/interfaces';
import { MentorService } from 'src/app/core/services';

@Component({
  selector: 'app-mentor',
  templateUrl: './mentor.component.html',
  styleUrls: ['./mentor.component.scss']
})
export class MentorComponent implements OnInit {
  mentors: MentorCard[] = [];

  constructor(
    private menrotService: MentorService
  ) { }

  ngOnInit(): void {
    this.menrotService.getAllMentors().subscribe(
      mentors => this.mentors = mentors
    )
  }

}
