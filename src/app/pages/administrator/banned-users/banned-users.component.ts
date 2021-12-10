import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/core/services/users.service';
import { banUser } from 'src/app/core/interfaces/banUser';
import { ToastrService } from 'ngx-toastr';
import { Users } from 'src/app/core/interfaces/users';



@Component({
  selector: 'app-banned-users',
  templateUrl: './banned-users.component.html',
  styleUrls: ['./banned-users.component.scss']
})

export class BannedUsersComponent implements OnInit {
  banUsers!: Users[];
  result:any;

  constructor(
        private userService: UsersService,
        private unBanUsers:UsersService, 
        private toast:ToastrService
      ) {}
  ngOnInit(): void {
        this.userService.getBanUsers().subscribe(
          users=>{  
            this.banUsers = users
          }
        )
      }

  unBunUsers(id:number, first_name:string, last_name:string){
    this.unBanUsers.unBanUser(id).subscribe(res=>{
      this.result = res;
      this.toast.success('has been unbanned!!', `${first_name} ${last_name} `);
    })
}

  deleteUser(id:number) {
    let index = this.banUsers!.findIndex(user => user.id === id);
    console.log(index);
    this.banUsers!.splice(index, 1);
  }
}
