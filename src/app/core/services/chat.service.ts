import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn:'root'
})
export class Chat{
 constructor(private http:HttpClient){}

 getAllChats():Observable<any>{
	 return this.http.get<any>('http://localhost:8080/chat')
 }
 qwerty1():Observable<any>{
	 return this.http.get<any>('http://localhost:8080/api/mentees/1')
 }
 qwerty():Observable<any>{
	 return this.http.post<any>('http://localhost:8080/chat/user/1',{})
 }

}