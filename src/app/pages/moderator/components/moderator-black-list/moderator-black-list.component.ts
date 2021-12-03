import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ModeratorService } from '../../moderator.service';
import { User } from '../../user.model';

@Component({
  selector: 'app-moderator-black-list',
  templateUrl: './moderator-black-list.component.html',
  styleUrls: ['./moderator-black-list.component.scss']
})
export class ModeratorBlackListComponent implements OnInit, OnDestroy {
  users:User[] | null | undefined;
  filteredBanUsers:User[] | null | undefined;
  fetchAllBanUsersSubscription!: Subscription;  

  responce:any;
  userNameSearch:string | null | undefined;
  userRoleSearch:string | null | undefined;

  constructor(private moderatorService: ModeratorService) { }

  ngOnInit(): void {  
    this.fetchAllBanUsersSubscription = this.moderatorService.fetchAllBanUsers()
      .subscribe(response => {
        this.users = response;      
        this.filteredBanUsers = this.users;      
      });
  }

  searchBanUser(filterValue:string) {    
    this.userNameSearch = filterValue;    
    this.filterUsers();
  }

  onRoleSelectChange(event:any) {   
    this.userRoleSearch = event.target.value;
    this.filterUsers();
  }

  filterUsers() {
    this.filteredBanUsers = this.users;    
    if(this.userNameSearch && this.userNameSearch !== "") {
      this.filteredBanUsers = this.filteredBanUsers!
        .filter(item => item.last_name.toLowerCase()
        .includes(this.userNameSearch!.toLowerCase()));
    }
    if(this.userRoleSearch && this.userRoleSearch !== "All") {
      this.filteredBanUsers = this.filteredBanUsers!
        .filter(item => item.role.toLowerCase()
        .includes(this.userRoleSearch!.toLowerCase())); 
    }
  }

  deleteTemplate(id:number) {
    let userIndex = this.users!.findIndex(user => user.id === id);
    this.users!.splice(userIndex, 1);
    this.filterUsers();
  }

  ngOnDestroy(): void {
    this.fetchAllBanUsersSubscription.unsubscribe();
  }

}
