import { Component, OnInit, Input } from '@angular/core';
import { ModeratorService } from '../../../moderator.service';
import { User } from '../../../user.model';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent implements OnInit {
  @Input() user!:User;
  
  constructor( private moderatorService: ModeratorService ) { }

  ngOnInit(): void {    
  }

  selectUserInfo() {
    this.moderatorService.userSelected.emit(this.user);
    let informationUser = document.getElementById('userInfo');    
    if(!informationUser) return;
    if(informationUser.style.display === "" || informationUser.style.display === "none") {
      informationUser.style.display = "flex";
    } else {
      informationUser.style.display = "none";
    }     
  }
}
