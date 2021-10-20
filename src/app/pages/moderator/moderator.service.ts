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
  moderator!:Moderator;

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

  getModerator() {
    return this.http.get<Moderator>('http://localhost:8080/api/moderator/getModeratorDTO/')
  }

  changeModeratorName(data:{lastName:string, firstName:string, email:string}){
    return this.http.put("http://localhost:8080/api/moderator/updateModerator/",data)
  }

  changeModeratorPassword(data:{oldPassword:string, newPassword:string}){
    return this.http.put("http://localhost:8080/api/users/changePassword",data)
  }
}
