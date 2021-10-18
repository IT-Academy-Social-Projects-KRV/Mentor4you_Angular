import { HttpClient } from '@angular/common/http';
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


  constructor(private http: HttpClient) { }

  getUsers(): Observable<Users[]> {
    
    return this.http.get<Users[]>(this.usersUrl);

  }
    
          
  }
