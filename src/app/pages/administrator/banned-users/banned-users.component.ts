import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/core/services/users.service';
import { banUser } from 'src/app/core/interfaces/banUser';



@Component({
  selector: 'app-banned-users',
  templateUrl: './banned-users.component.html',
  styleUrls: ['./banned-users.component.scss']
})
export class BannedUsersComponent implements OnInit {

   

  

  constructor(private userService: UsersService, private unBanUsers:UsersService) {

  }
  banUsers?: banUser [];
  result:any;
  displayedColumns: string[] = ['id', 'role', 'email', 'first_name', 'last_name', 'ban'];

  unBunUsers(id:number){
   this.unBanUsers.unBanUser(id).subscribe(res=>{
     this.result = res;
     console.log(this.result)
   })
 }


  ngOnInit(): void {
    this.userService.getBanUsers().subscribe(
    
      users=>{  
        this.banUsers = users}
      
    )
  }

}
