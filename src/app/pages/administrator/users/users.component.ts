import { Component, NgModule, OnInit } from '@angular/core';
import { Ng2SearchPipeModule } from 'ng2-search-filter/src/ng2-filter.module';
import { map, tap } from 'rxjs/operators';
import { Users } from 'src/app/core/interfaces/users';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/core/services/users.service';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
  
})
export class UsersComponent implements OnInit {
  
  users?: Users [];
  email?: any [] = [];

   
   searchText:any;
   


  constructor(private userService: UsersService, private bannedUsers:UsersService, private toAster:ToastrService) {

    
   }
   
   response:any;
   bunUsers(id:number, first_name:string, last_name:string){
    this.bannedUsers.banUser(id).subscribe(res=>{
      this.response = res;
      this.toAster.warning('has been banned!!', `${first_name} ${last_name} `);

    })
  }
  getNewModerator () {
    // this.userService.appointModerator().subscribe(()=>{
    // })
  }






  ngOnInit(): void {
   
    this.userService.getUsers().subscribe(
    
      users=>{  

        this.users = users;
        
      }  
    )
  

  }
    
}
