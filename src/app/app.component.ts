import { Component, OnInit, DoCheck} from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {SigninService} from "./auth/signin/signin.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, DoCheck{
  title = 'mentor4you';
  hiddenFooter: boolean = true;
  hiddenHeader: boolean = true;
  constructor(private auth: SigninService, private router: Router) {
  }
  ngOnInit() {
    const potencialToken=localStorage.getItem('token');
    if(potencialToken!==null)
    {
      this.auth.setToken(potencialToken);
      this.auth.setTokenO(potencialToken);
    }
    this.onHiddenFooter();

   
  }
  onHiddenFooter() {
    if (this.router.url == '/auth/signup' || this.router.url == '/error-page/404' || this.router.url == '/auth/login' ) {
      this.hiddenFooter = false;
    } else {
      this.hiddenFooter = true
    }
  }

  ngDoCheck() {
    this.onHiddenFooter();
   
  }
  
  
}
