import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from './user.model';
import { Moderator } from './moderator.model';

@Injectable({
  providedIn: 'root'
})
export class ModeratorService {
  userSelected = new EventEmitter<User>();
  users:User[] = [];
  usersInBan:User[] = [];
  moderator:Moderator = {
    id:1,
    email: "Moderator1@gmail.com",
    password: "some string password",
    first_name: "Moder",
    last_name:"Mod", 
    avatar:"https://avatarmaker.net/images/1.png"
  }

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.users.slice();
  }

  getUser(id:number) {
    const user = this.users.find(
      (u) => {
        return u.id === id;
      }
    );  
    return user;
  }

  fetchAllUsers() {
    return this.http.get<User[]>('http://localhost:8080/api/users')
  }

  banUser(id:number){
    return this.http.put('http://localhost:8080/api/users/changeBanToUser',{id:id,banStatus:true})
  };

  unbanUser(id:number){
    return this.http.put('http://localhost:8080/api/users/changeBanToUser',{id:id,banStatus:false})
  };

  fetchAllBanUsers() {
    return this.http.get<User[]>('http://localhost:8080/api/users/getAllBannedUser')
  }
}
