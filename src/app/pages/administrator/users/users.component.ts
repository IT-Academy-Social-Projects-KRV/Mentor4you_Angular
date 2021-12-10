import { Component, NgModule, OnInit } from '@angular/core';
import { Users } from 'src/app/core/interfaces/users';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/core/services/users.service';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
  
})
export class UsersComponent implements OnInit {
  searchText!:string;
  users!: Users[];

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {  
        this.users = users;
      }  
    )
  }


    
}
