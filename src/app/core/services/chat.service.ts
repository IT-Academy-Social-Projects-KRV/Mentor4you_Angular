import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface userChat{
	avatar:string,
	id:string,
	name:string,
	recipientId:string,
	senderId:string,
}

@Injectable({
	providedIn:'root'
})
export class Chat{

 constructor(private http:HttpClient){}

 getAllChats():Observable<any>{
	 return this.http.get<any>('http://localhost:8080/chat')
 }
	getMessage(sendid:string, recivid:string):Observable<any>{
	 return this.http.get<any>(`http://localhost:8080/findmessage/${sendid}/${recivid}`)
 }

  createChat(user:any):Observable<any>{
	 return this.http.post<any>(`http://localhost:8080/chat/user/${user}`,{})
 }

}