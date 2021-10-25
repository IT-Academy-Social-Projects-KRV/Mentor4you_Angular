import { Component, OnInit, DoCheck} from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {SigninService} from "./auth/signin/signin.service";
import {TranslateService} from "@ngx-translate/core";
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, DoCheck{
  title = 'mentor4you';
  hiddenFooter: boolean = true;
  hideHeader:boolean =true;

  constructor(private auth: SigninService, private router: Router,public translate:TranslateService) {

  }
  ngOnInit() {
    const potencialToken=localStorage.getItem('token');
    if(potencialToken!==null)
    {
      this.auth.setTokenO(potencialToken);
    }
    this.onHiddenFooter();
    this.onHideHeader();

    // localStorage.setItem('role', 'mentor');
  }
  onHiddenFooter() {
    if (this.router.url == '/auth/signup' || this.router.url == '/error-page/404' || this.router.url == '/auth/login' || this.router.url == '/administrator/users' || this.router.url == '/administrator/bannedUsers' || this.router.url == '/administrator/categories' || this.router.url == '/administrator/chats') {
      this.hiddenFooter = false;
    } else {
      this.hiddenFooter = true
    }
  }

  ngDoCheck() {
    this.onHiddenFooter();
    this.onHideHeader();
   
  }
  onHideHeader(): void{
    if(this.router.url == '/administrator' || this.router.url == '/administrator/bannedUsers' || this.router.url == '/administrator/users' || this.router.url == '/administrator/categories' || this.router.url == '/administrator/chats'){
      this.hideHeader = false;
    }
    else {
      this.hideHeader =true;
    }
  }
}