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
  lastSms$ = new BehaviorSubject<any>('helo')
  constructor(private http:HttpClient) {
  }
  connect(myId: string) {
    const socket = new SockJS(this.webSocketEndPoint + '/chat');
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, (frame:any) => {
      console.log('connected to: ' + frame);
      this.stompClient.subscribe(this.topic + myId, (response:any) => {
        const data = JSON.parse(response.body);
        console.log(data);
        this.newMessages.push(data);
        this.lastSms$.next(data.message)
        console.log("Map: ", this.newMessages)
        // this.onMessageReceived(JSON.parse(response.body).content);
      });
    });
  }

  disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log('Disconnected');
  }

  sendMsg(text:string, from:string,recipientId:string) {
    this.newMessages.push({ 
      chatId: from + '_' + recipientId,
      message: text,
      recipientId: recipientId,
      recipientName: recipientId,
      senderId: from,
      senderName: from,
      timestamp: new Date().toString(),
    });
    console.log("Map: ", this.newMessages)
    console.log('calling logout api via web socket');
    this.stompClient.send('/app/chat/' + recipientId, {}, JSON.stringify({
      chatId: from+'_'+recipientId,
      senderId: from,
      recipientId: recipientId,
      senderName: from,
      recipientName: recipientId,
      message: text
    }));
  
  }

  checkMsg(sendId:any,reId:any):Observable<any>
  {
    return  this.http.get("http://localhost:8080/findmessage/"+sendId+'/'+reId)
  }

}
