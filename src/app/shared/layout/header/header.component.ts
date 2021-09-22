import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationModalService } from '../../../core/services/notification-modal.service';
import { SigninService } from 'src/app/auth/signin/signin.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  //TODO should be implement in the next task
  public isNewMessage: boolean = true;
  public isNewNotification: boolean = true;

  public showSettingsMenu: boolean = false;


  @ViewChild('toggleButton') toggleButton!: ElementRef;
  @ViewChild('menu') menu!: ElementRef;

  constructor(
    private renderer: Renderer2,
    private router: Router,
    private NotificationModalService: NotificationModalService,
    private auth:SigninService
  ) { }

    public isAuth = this.auth.isAuth();
  ngOnInit(): void {
    this.closeMenu();
    this.isAuth = this.auth.isAuth();
  }
  open() {
    this.NotificationModalService.open();
  }

  logout()
  {
    this.auth.logout()
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
