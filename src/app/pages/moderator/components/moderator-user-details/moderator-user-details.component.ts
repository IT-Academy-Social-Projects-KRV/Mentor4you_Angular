import { Component, OnInit, Input } from '@angular/core';
import { ModeratorService } from '../../moderator.service';
import { User } from '../../user.model';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-moderator-user-details',
  templateUrl: './moderator-user-details.component.html',
  styleUrls: ['./moderator-user-details.component.scss']
})
export class ModeratorUserDetailsComponent implements OnInit {
  @Input() userInformation!: User;  
  
  constructor(private moderatorService: ModeratorService, private toastr: ToastrService) { }

  ngOnInit(): void {
    
  }

  onUserInformation() {  
    let informationUser = document.getElementById('userInfo');
    if(!informationUser) return;
    informationUser.style.display = "none" ;    
  }

  createStars(rait:number):number[]{
    let items: number[] = [];
    for(let i = 0; i < rait; i++){
      items.push(i);
    }
    return items;
  }

  onUserBanned(id: number, last_name:string, first_name:string) {    
    this.moderatorService.banUser(id).subscribe(() => {
      this.userInformation.ban = true;
      this.toastr.warning('has been banned!!', `${last_name} ${first_name}`);
    });
  }
}
