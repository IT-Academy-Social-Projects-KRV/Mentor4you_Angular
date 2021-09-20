import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MentorService } from 'src/app/core';

@Component({
  selector: 'app-mentor-details',
  templateUrl: './mentor-details.component.html',
  styleUrls: ['./mentor-details.component.scss']
})
export class MentorDetailsComponent implements OnInit {
  mentor: any

  constructor(
    private mentorService: MentorService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.mentorService.getMentorById(id).subscribe(
      (mentor: any) => this.mentor = mentor
    )
  }
}
