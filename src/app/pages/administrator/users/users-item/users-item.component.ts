import { Component, OnInit, Input } from '@angular/core';
import { Users } from '../../../../core/interfaces/users';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-users-item',
  templateUrl: './users-item.component.html',
  styleUrls: ['./users-item.component.scss']
})
export class UsersItemComponent implements OnInit {

  @Input() searchText:any;
  @Input() user!: Users;
  email?: any [] = [];
  response:any;

  constructor( 
    private bannedUsers: UsersService, 
    private toAster: ToastrService) {}

  ngOnInit(): void {
    
  }

  bunUsers(user:Users){
    this.bannedUsers.banUser(user.id).subscribe(res=>{
      this.response = res;
      this.user.ban = true;
      this.toAster.warning('has been banned!!', `${user.first_name} ${user.last_name}`);
  })
  }
  getNewModerator () {

  }

}












 


    

