import { HttpClient } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../interfaces/user';
import { Users } from '../interfaces/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  usersUrl = 'http://localhost:8080/api/users';
  banUsersUrl = 'http://localhost:8080/api/users/getAllBannedUser';


  constructor(private http: HttpClient) {}
  banUser(id:number):Observable<any>{
    return this.http.put('http://localhost:8080/api/users/changeBanToUser',{id:id, banStatus:true});
  }
  
  unBanUser(id:number):Observable<any>{
    return this.http.put('http://localhost:8080/api/users/changeBanToUser',{id:id, banStatus:false});
  }

  getBanUsers(): Observable<Users[]> {
    
    return this.http.get<Users[]>(this.banUsersUrl);

  }

  
  getUsers(): Observable<Users[]> {
    
    return this.http.get<Users[]>(this.usersUrl);

  }
   addCategory(categ:string): Observable<any> {
     return this.http.post('http://localhost:8080/api/admin/addCategory',{categ:categ});
  }

     
  }
