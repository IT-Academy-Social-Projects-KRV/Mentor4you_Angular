import {Component, OnInit} from '@angular/core';
import {SigninService} from "./auth/signin/signin.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private auth:SigninService) {
  }
  ngOnInit() {
    const potencialToken=localStorage.getItem('token')
    if(potencialToken!==null)
    {
      this.auth.setToken(potencialToken)
    }
  }

  title = 'mentor4you';
}
