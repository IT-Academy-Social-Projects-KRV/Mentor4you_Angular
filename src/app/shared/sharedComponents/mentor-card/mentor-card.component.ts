import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mentor } from 'src/app/core/interfaces';

@Component({
  selector: 'app-mentor-card',
  templateUrl: './mentor-card.component.html',
  styleUrls: ['./mentor-card.component.scss']
})
export class MentorCardComponent implements OnInit {
  @Input() mentor?: Mentor
  stars: Array<number> | undefined;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.stars = [...Array(this.mentor?.rating).keys()].map(i => i + 1);
  }

  goTo(path: string): void {
    this.router.navigateByUrl(path);
  }
}
