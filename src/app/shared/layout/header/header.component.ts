import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationModalService } from '../../../core/services/notification-modal.service';
import { SigninService } from 'src/app/auth/signin/signin.service';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';
import { MenteeService, MentorService, UserService } from 'src/app/core';
import { first } from 'rxjs/operators';
import avatar from 'src/app/core/mock/avatar';
import mockAvatar from 'src/app/core/mock/mockAvatar';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public isNewMessage: boolean = false;
  public showSettingsMenu: boolean = false;
  public showBurgerMenu: boolean = false;
  public wached = false;
  // public avatar: any;
  public token: any;
  public response: any;
  // public avatar: string | null = null;
  public mockAvatar = mockAvatar;
  public avatar = this.mockAvatar;

  @ViewChild('toggleButton') toggleButton!: ElementRef;
  @ViewChild('menu') menu!: ElementRef;

  constructor(
    public notificationModalService: NotificationModalService,
    private renderer: Renderer2,
    private router: Router,
    private NotificationModalService: NotificationModalService,
    private auth: SigninService,
    private http: HttpClient,
    private translate: TranslateService,
    private mentorService: MentorService,
    private menteeService: MenteeService,
    private userService: UserService
  ) {}

  get isAuth() {
    return this.auth.isAuth();
  }

  ngOnInit(): void {
    this.closeMenu();
    if (this.isAuth) {
      this.auth.getRole();
      switch (localStorage.getItem('role')){
        case "MENTOR": 
          this.notificationModalService.getMenteesRequests();
          this.mentorService
            .getMentorDTO()
            .pipe(first())
            .subscribe(mentor => this.avatar = mentor.avatar || this.mockAvatar);
          break;

        case "MENTEE": 
          this.notificationModalService.getMenteesResponces();
          this.menteeService
            .getData()
            .pipe(first())
            .subscribe(mentee => this.avatar = mentee.avatar || this.mockAvatar);
          break;
      }
    }
    
    // if (this.isAuth){
    //   // let avatarCheck = localStorage.getItem('avatar');
    //   console.log('mockAvatar', this.mockAvatar);
    //   let avatarCheck = this.avatar;
    //     if(avatarCheck == 'null'){
    //       this.avatar = this.mockAvatar;
    //       // this.avatar = 'https://awss3mentor4you.s3.eu-west-3.amazonaws.com/avatars/standartUserAvatar.png';
    //     } else {
    //       this.avatar = this.avatar;
    //       // this.avatar = localStorage.getItem('avatar');
    //     }
    // }

    this.onHideBurger();

    this.userService.avatar$.subscribe(avatar => {
      this.avatar = avatar;
    });
  }

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
