import { Component, NgModule, OnInit } from '@angular/core';
import { Ng2SearchPipeModule } from 'ng2-search-filter/src/ng2-filter.module';
import { map, tap } from 'rxjs/operators';
import { Users } from 'src/app/core/interfaces/users';
import { UsersService } from 'src/app/core/services/users.service';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
  
})
export class UsersComponent implements OnInit {
  
  users?: Users [];
   displayedColumns: string[] = ['id', 'role', 'email', 'first_name', 'last_name', 'ban'];
   searchText:any;
   

  constructor(private userService: UsersService, private bannedUsers:UsersService) {
    
   }
   
   response:any;
   bunUsers(id:number){
    this.bannedUsers.banUser(id).subscribe(res=>{
      this.response = res;
      console.log(this.response)
    })
  }



  ngOnInit(): void {
   
    this.userService.getUsers().subscribe(
    
      users=>{  
        this.users = users}
      
    )
  }
    
}
