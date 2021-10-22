import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-mentor-reviews',
  templateUrl: './mentor-reviews.component.html',
  styleUrls: ['./mentor-reviews.component.scss']
})

export class MentorReviewsComponent implements OnInit {
  flag : any = false;

btnClick(){
    this.flag = true;
}

  constructor() { }

  ngOnInit(): void {
  }

}
