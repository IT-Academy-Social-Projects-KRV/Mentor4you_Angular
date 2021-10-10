import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SigninService } from 'src/app/auth/signin/signin.service';

@Component({
  selector: 'app-mentor-details',
  templateUrl: './mentor-details.component.html',
  styleUrls: ['./mentor-details.component.scss']
})
export class MentorDetailsComponent implements OnInit {
  constructor(
    routerParam: ActivatedRoute,
    public isAuth: SigninService) { }

  ngOnInit(): void {
    console.log(this.isAuth.isAuth())
  }

}
