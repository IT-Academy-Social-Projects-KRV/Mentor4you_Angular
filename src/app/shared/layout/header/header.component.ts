import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { first, tap } from 'rxjs/operators';
import { WebSocketService } from './../../../pages/messages/web-socket.service';
import { NotificationModalService } from '../../../core/services/notification-modal.service';
import { SigninService } from 'src/app/auth/signin/signin.service';
import { MenteeService, MentorService, UserService } from 'src/app/core';

import mockAvatar from 'src/app/core/mock/mockAvatar';
import { ModeratorService } from 'src/app/pages/moderator/moderator.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isNewMessage: boolean = false;
  showSettingsMenu: boolean = false;
  showBurgerMenu: boolean = false;
  wached: boolean = false;
  token!: string;
  response:any;
  userData!: any;

  standartUserAvatar = 'https://awss3mentor4you.s3.eu-west-3.amazonaws.com/avatars/standartUserAvatar.png';
  avatar = mockAvatar;
  checkNewMessage: boolean = false;


  @ViewChild('toggleButton') toggleButton!: ElementRef;
  @ViewChild('menu') menu!: ElementRef; //87

  constructor(
    public notificationModalService: NotificationModalService,
    private renderer: Renderer2,
    private router: Router,
    private auth: SigninService,
    private mentorService: MentorService,
    private menteeService: MenteeService,
    private userService: UserService,
    public webSocketService:WebSocketService,
    private moderatorService: ModeratorService
  ) { }

  get isAuth() {
    return this.auth.isAuth();
  }

  ngOnInit(): void {    
    this.closeMenu();    
    if (this.isAuth) {
      switch (localStorage.getItem('role')){
        case "MENTOR": 
          this.notificationModalService.getMenteesRequests();
          this.mentorService
            .getMentorDTO()
            .pipe(first())      
            .subscribe(mentor => {
              this.avatar = mentor.avatar === this.standartUserAvatar ?  this.avatar : mentor.avatar;
              this.userData = mentor;
            });
          break;

        case "MENTEE": 
          this.notificationModalService.getMenteesResponces();
          this.menteeService
            .getData()
            .pipe(first())
            .subscribe(mentee => {
              this.avatar = mentee.avatar === this.standartUserAvatar ?  this.avatar : mentee.avatar;
              this.userData = mentee;
            });
          break;

        case "MODERATOR":           
          this.moderatorService
            .getModerator()
            .pipe(first())
            .subscribe(moderator => {
              this.avatar = moderator.avatar === this.standartUserAvatar ?  this.avatar : moderator.avatar;                
              this.userData = moderator;
            });
          break;

        case "ADMIN":           
          this.moderatorService
            .getModerator()
            .pipe(first())
            .subscribe(admin => {
              this.avatar = admin.avatar === this.standartUserAvatar ?  this.avatar : admin.avatar;                
              this.userData = admin;
            });
          break;
      }
    }    

    this.onHideBurger();

    this.userService.avatar$.subscribe(avatar => {
      this.avatar = avatar;
    });

    this.webSocketService.checkMessage$.subscribe(e=>this.checkNewMessage = e)
  }

  // isAuth() {
  //   return this.auth.isAuth();
  // }

  open() {
    this.notificationModalService.open();
    this.wached = true;
  }

  logout()
  {
    this.auth.logout()
    this.notificationModalService.mentors$.next([]);
    this.notificationModalService.mentees$.next([]);
    this.notificationModalService.isNewNotification$.next(false);
    this.router.navigate(['/']);
  }

  closeMenu(): void {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (e.target !== this.toggleButton?.nativeElement && e.target !== this.menu?.nativeElement) {
        this.showSettingsMenu = false;
      }
    });
  }

  showSettings() {
    this.showSettingsMenu = !this.showSettingsMenu;
  }

  showMenu() {
    this.showBurgerMenu = !this.showBurgerMenu;
  }

  goTo(path: string): void {
    this.router.navigateByUrl(path);
  }

  onHideBurger(): boolean{
    if(
      this.router.url == '/moderator/users' || 
      this.router.url == '/moderator/black-list' ||
      this.router.url == '/moderator/edit'){
      return false
    }
    else {
      return true
    }
  }
}
