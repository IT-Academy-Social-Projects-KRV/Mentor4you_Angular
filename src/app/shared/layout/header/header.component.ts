import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationModalService } from '../../../core/services/notification-modal.service';
import { SigninService } from 'src/app/auth/signin/signin.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  //TODO should be implement in the next task
  public isNewMessage: boolean = false;
  public showSettingsMenu: boolean = false;
  public wached = false;

  @ViewChild('toggleButton') toggleButton!: ElementRef;
  @ViewChild('menu') menu!: ElementRef;

  constructor(
    public notificationModalService: NotificationModalService,
    private renderer: Renderer2,
    private router: Router,
    private auth:SigninService
  ) { }

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
        break;
        case "MENTEE": 
        this.notificationModalService.getMenteesResponces();
        break;
      }
    }
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
