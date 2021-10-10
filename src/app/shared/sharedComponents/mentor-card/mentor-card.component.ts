import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MentorCard } from 'src/app/core/interfaces';

@Component({
  selector: 'app-mentor-card',
  templateUrl: './mentor-card.component.html',
  styleUrls: ['./mentor-card.component.scss']
})
export class MentorCardComponent implements OnInit {
  @Input() mentor!: MentorCard
  stars: Array<number> | undefined;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.stars = [...Array(this.mentor?.rating).keys()].map(i => i + 1);
    this.stars = [...Array(this.mentor?.rating).fill(0)].map(i => i + 1);
  }

  goTo(path: string): void {
    this.router.navigate([path, this.mentor.id]);
  }
}
