import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private mentorService: MentorService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.mentorService.getMentors().subscribe(
      (mentors: Mentor[]) => this.mentors = mentors
    )
  }

  goTo(path: string): void {
    this.router.navigateByUrl(path);
  }
}
