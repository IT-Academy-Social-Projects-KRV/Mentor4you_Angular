import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Users } from '../../../../core/interfaces/users';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-banned-users-item',
  templateUrl: './banned-users-item.component.html',
  styleUrls: ['./banned-users-item.component.scss']
})
export class BannedUsersItemComponent implements OnInit {

  @Input() user!: Users;
  @Output() deleteUser = new EventEmitter<number>();
  banUsers: any = [];
  result:any;


  constructor (
    private unBanUsers:UsersService, 
    private toast:ToastrService
  ) {

}
ngOnInit(): void {
    
}

unBunUsers(user:Users){
this.unBanUsers.unBanUser(user.id).subscribe(res => {
  this.result = res;
  this.deleteUser.emit(user.id);
  this.toast.success('has been unbanned!!', `${user.first_name} ${user.last_name} `);
})

}
}
