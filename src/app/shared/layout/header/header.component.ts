import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationModalService } from '../../../core/services/notification-modal.service';
import { SigninService } from 'src/app/auth/signin/signin.service';
import { BehaviorSubject, pipe } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';
import { MenteeService, MentorService, UserService } from 'src/app/core';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public isNewMessage: boolean = false;
  public showSettingsMenu: boolean = false;
  public wached = false;
  public avatar: any;

  @ViewChild('toggleButton') toggleButton!: ElementRef;
  @ViewChild('menu') menu!: ElementRef;

  constructor(
    public notificationModalService: NotificationModalService,
    private renderer: Renderer2,
    private router: Router,
    private NotificationModalService: NotificationModalService,
    private auth: SigninService,
    private http: HttpClient,
    private translate:TranslateService,
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
          this.mentorService.getMentorDTO().pipe(take(1)).subscribe(mentor => {
            this.avatar = mentor.avatar;
          })
          break;
        case "MENTEE": 
          this.notificationModalService.getMenteesResponces();
          this.menteeService.getData().pipe(take(1)).subscribe(mentee => {
            console.log('mentee - header', mentee)
            this.avatar = mentee.avatar;
          })
          break;
      }
    }

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

  goTo(path: string): void {
    this.router.navigateByUrl(path);
  }
}
