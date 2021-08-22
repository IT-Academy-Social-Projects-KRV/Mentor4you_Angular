import { Component, OnInit } from '@angular/core';
import { Mentor } from 'src/app/core/interfaces';
import { MentorService } from 'src/app/core/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  mentors: Mentor[] = [];

  constructor(
    private mentorService: MentorService
  ) { }

  ngOnInit(): void {
    this.mentorService.getMentors().subscribe(
      mentors => this.mentors = mentors
    )
  }

}
