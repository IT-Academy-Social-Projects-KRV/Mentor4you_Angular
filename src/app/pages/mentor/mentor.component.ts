import {Component, OnInit} from '@angular/core';
import {SmallMentorCards} from "./components/mentor-top/SmallMentorCards";
import {MentorTopService} from "./components/mentor-top/mentor-top.service";

@Component({
  selector: 'app-mentor',
  templateUrl: './mentor.component.html',
  styleUrls: ['./mentor.component.scss']
})
export class MentorComponent implements OnInit {

  public response?: SmallMentorCards[];
  public stars: any[] = [];
  public star!: any[];

  constructor(private mentorFilter: MentorTopService) {
  }

  getMentors() {
    this.mentorFilter.getMentors(12).subscribe(res => {
      this.response = res
      this.stars = res.map((m: any) => {
        return m.rating;
      })
      console.log('stars', this.stars);
      console.log(this.response, 'mentorMain')
    });
    this.star = [...Array(this.stars).keys()].map(i => i + 1);
    console.log(this.star, 'star')
  }

  dataMentors(response: any) {
    this.response = response;
    console.log(this.response, 'mentorFiltered');
  }

  ngOnInit(): void {
    this.getMentors();
  }
}












