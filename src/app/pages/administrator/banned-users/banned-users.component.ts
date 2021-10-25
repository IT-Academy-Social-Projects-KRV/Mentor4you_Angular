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

   

     constructor(private userService: UsersService, private unBanUsers:UsersService
      ) {
    
  }

  banUsers: any = [];
  result:any;
   unBunUsers(id:number){
    this.unBanUsers.unBanUser(id).subscribe(res=>{
      this.result = res;
    })
  }


  ngOnInit(): void {
    this.userService.getBanUsers().subscribe(
    
       users=>{  
         this.banUsers = users
        }
      
    )
  }

}
