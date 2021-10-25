import { HttpClient } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { banUser } from '../interfaces/banUser';
import { Categories } from '../interfaces/categories';
import { User } from '../interfaces/user';
import { Users } from '../interfaces/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  [x: string]: any;
  usersUrl = 'http://localhost:8080/api/users';
  banUsersUrl = 'http://localhost:8080/api/users/getAllBannedUser';
  categUrl = 'http://localhost:8080/api/searchMentor';

  constructor(private http: HttpClient) {}
  banUser(id:number):Observable<any>{
    return this.http.put('http://localhost:8080/api/users/changeBanToUser',{id:id, banStatus:true});
  }
  
  unBanUser(id:number):Observable<any>{
    return this.http.put('http://localhost:8080/api/users/changeBanToUser',{id:id, banStatus:false});
  }

  getBanUsers()  {
    
    return this.http.get<banUser[]>(this.banUsersUrl);

  }
  appointModerator(email:string) {
    const Params = `userEmail=${email}`
    return this.http.put<any>('http://localhost:8080/api/admin/appointModerator?' + Params,Params)

  }

  
  getUsers(): Observable<Users[]> {
    
    return this.http.get<Users[]>(this.usersUrl);

  }
  getCategory(): Observable<Categories[]> {
    return this.http.get<Categories[]>(this.categUrl);
  }

   addCategory(categ:string[]) {
     const Params = `newCategoryName=${categ}`
     return this.http.post<Categories[]>('http://localhost:8080/api/admin/addCategory?' + Params,Params)
  }

     
  }
