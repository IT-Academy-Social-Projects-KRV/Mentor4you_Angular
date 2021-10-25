import { Component, OnInit } from '@angular/core';
import { ErrorPagesServices } from 'src/app/core/services/error-pages.service';
import { ModeratorService } from '../../moderator.service';
import { User } from '../../user.model';

@Component({
  selector: 'app-moderator-black-list',
  templateUrl: './moderator-black-list.component.html',
  styleUrls: ['./moderator-black-list.component.scss']
})
export class ModeratorBlackListComponent implements OnInit {
  users:User[] | null | undefined;
  filteredBanUsers:User[] | null | undefined;  

  responce:any;
  userNameSearch:string | null | undefined;
  userRoleSearch:string | null | undefined;

  constructor(private moderatorService: ModeratorService, private errorPagesServices: ErrorPagesServices) { }

  ngOnInit(): void {  
    this.moderatorService.fetchAllBanUsers().subscribe( response => {
      this.users = response;      
      this.filteredBanUsers = this.users;      
    },
    
      (error) => {
        this.errorPagesServices.checkError(error)
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
      this.filteredBanUsers = this.filteredBanUsers!.filter(item => item.last_name.toLowerCase().includes(this.userNameSearch!.toLowerCase()));
    }
    if(this.userRoleSearch && this.userRoleSearch !== "All") {
      this.filteredBanUsers = this.filteredBanUsers!.filter(item => item.role.toLowerCase().includes(this.userRoleSearch!.toLowerCase())); 
    }
  }

}
