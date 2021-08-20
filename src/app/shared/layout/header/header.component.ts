import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  //TODO should be implement in the next task
  public isAuth: boolean = true;
  public isNewMessage: boolean = false;

  public showSettingsMenu : boolean = false;

  @ViewChild('toggleButton') toggleButton!: ElementRef;
  @ViewChild('menu') menu!: ElementRef;

  constructor(private renderer: Renderer2) {

   }

  ngOnInit(): void {
    this.closeMenu();
  }

  closeMenu(): void{
    this.renderer.listen('window', 'click',(e:Event)=>{
      if(e.target !== this.toggleButton?.nativeElement && e.target!==this.menu?.nativeElement){
          this.showSettingsMenu=false;
      }
  });
  }

  showSettings(){
    this.showSettingsMenu = !this.showSettingsMenu;
  }
}
