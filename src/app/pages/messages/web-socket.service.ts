import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import {MessagesComponent} from "./messages.component";
import {Stomp} from "@stomp/stompjs";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  webSocketEndPoint = 'http://localhost:8080';
  topic = '/topic/messages/';
  stompClient: any;
  newMessages = new Array;
  firstStep = new Array;
  lastSms$ = new BehaviorSubject<any>('')
  Sms$ = new BehaviorSubject<any>(this.newMessages)
  checkMessage$ = new BehaviorSubject<boolean>(false)
  closeNotification$ = new BehaviorSubject<any>('')
  checkArray$ = new BehaviorSubject<any>('')
  constructor(private http:HttpClient) {
  }
  connect(myId: string) {
    const socket = new SockJS(this.webSocketEndPoint + '/chat');
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, (frame:any) => {
      this.stompClient.subscribe(this.topic + myId, (response:any) => {
        this.checkMessage$.next(true)
        const data = JSON.parse(response.body);
        this.checkMsg(data.senderId, data.recipientId).subscribe((response: any) => {
          this.newMessages.push(response[response.length - 1]);
          this.newMessages.sort((a, b) => Date.parse(a.timestamp) - Date.parse(b.timestamp))
          this.Sms$.next(this.newMessages)
          this.closeNotification$.next(`${data.recipientId}_${data.senderId}`)
          this.closeNotification$.subscribe(e=>{
            this.checkArray$.next(e)
          })
        })
      });
    });
  }

  disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
  }

  sendMsg(text: string, senderId:string,recipientId:string) {
    this.stompClient.send('/app/chat/' + recipientId, {}, JSON.stringify({
      chatId: senderId+'_'+recipientId,
      senderId: senderId,
      recipientId: recipientId,
      senderName: senderId,
      recipientName: recipientId,
      message: text
    }));
      this.checkMsg(senderId, recipientId).subscribe((response: any) => {
        this.newMessages.push(response[response.length - 1]);
        this.newMessages.sort((a,b)=>Date.parse(a)-Date.parse(b))
        console.log('change-prod---', this.newMessages)
        this.Sms$.next(this.newMessages)
        this.Sms$.subscribe(e => console.log('Sms$.subscribe',e))
  }) 
  }

  checkMsg(sendId:any,reId:any):Observable<any>
  {
    return  this.http.get("http://localhost:8080/findmessage/"+sendId+'/'+reId)
  }
	
}
