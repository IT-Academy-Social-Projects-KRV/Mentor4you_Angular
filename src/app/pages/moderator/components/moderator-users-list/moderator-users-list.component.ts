import { Component, OnInit } from '@angular/core';
import { 
  animate, 
  keyframes, 
  state, 
  style, 
  transition, 
  trigger 
} from '@angular/animations';

import { User } from '../../user.model';
import { ModeratorService } from '../../moderator.service';
import { ErrorPagesServices } from 'src/app/core/services/error-pages.service';


@Component({
  selector: 'app-moderator-users-list',
  templateUrl: './moderator-users-list.component.html',
  styleUrls: ['./moderator-users-list.component.scss']
})
export class ModeratorUsersListComponent implements OnInit {
  users:User[] | null | undefined;
  filteredUsers:User[] | null | undefined;
  selectedUser!: User;

  responce:any;
  userNameSearch:string | null | undefined;
  userRoleSearch:string | null | undefined;
  
  constructor(private moderatorService: ModeratorService, private errorPagesServices: ErrorPagesServices) { }

  ngOnInit(): void {
    this.moderatorService.fetchAllUsers().subscribe( response => {
      this.users = response;      
      this.filteredUsers = this.users;      
    },
      (error) => {
        this.errorPagesServices.checkError(error)
      });
    this.moderatorService.userSelected
      .subscribe(
        (user:User) => {
          this.selectedUser = user;
        },
        (error) => {
          this.errorPagesServices.checkError(error)
        }
      )  
  }

  
  searchUser(filterValue:string) {    
    this.userNameSearch = filterValue;    
    this.filterUsers();
  }

  onRoleSelectChange(event:any) {   
    this.userRoleSearch = event.target.value;
    this.filterUsers();
  }

  filterUsers() {
    this.filteredUsers = this.users;    
    if(this.userNameSearch && this.userNameSearch !== "") {
      this.filteredUsers = this.filteredUsers!.filter(item => item.last_name.toLowerCase().includes(this.userNameSearch!.toLowerCase()));
    }
    if(this.userRoleSearch && this.userRoleSearch !== "All") {
      this.filteredUsers = this.filteredUsers!.filter(item => item.role.toLowerCase().includes(this.userRoleSearch!.toLowerCase())); 
    }
  }
}
