import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SigninService } from 'src/app/auth/signin/signin.service';
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
    private router: Router,
    private signinService: SigninService
  ) { }

  ngOnInit(): void {
    this.mentorService.getMentors().subscribe(
      (mentors: Mentor[]) => this.mentors = mentors
      );
    this.signinService.token$.subscribe(value =>{
    })
    console.log(this.signinService.isExpToken(this.signinService.token$.value))
  }

  goTo(path: string): void {
    this.router.navigateByUrl(path);
  }
}
