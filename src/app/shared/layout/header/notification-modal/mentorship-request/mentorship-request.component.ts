import { Component, Input, OnInit } from '@angular/core';
import { Mentee } from 'src/app/core/interfaces/mentee';

@Component({
  selector: 'app-mentorship-request',
  templateUrl: './mentorship-request.component.html',
  styleUrls: ['./mentorship-request.component.scss']
})
export class MentorshipRequestComponent implements OnInit {
  @Input() mentee?: Mentee
  constructor() { }

  ngOnInit(): void {
  }

}
