import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Chat } from 'src/app/core/services/chat.service';
import {WebSocketService} from "./web-socket.service";
import {SigninService} from "../../auth/signin/signin.service";

interface userChat {
  avatar: string,
  id: string,
  name: string,
  recipientId: string,
  senderId: string,
}

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})

export class MessagesComponent implements OnInit {
  chats: any = []
  userBeck: userChat[]=[]
  link!:string
  tokenId?:any
  lastSms!:any
  lastTime!:any
  constructor(
    private router:Router,
    public chat:Chat,
    public routerNavigate:ActivatedRoute,
    private socketService:WebSocketService,
    private http:SigninService,
    ) {

     }

  ngOnInit(): void {
    this.lastSms = this.socketService.newMessages[this.socketService.newMessages.length-1]
  

    this.http.token$.subscribe(token=>{
      this.tokenId = this.http.parseJwt(token)
    })
    this.routerNavigate.params.subscribe((e)=>this.link=e.id)
      this.chat.getAllChats().subscribe(allDialog=>{this.chats = allDialog;})
    this.routerNavigate.params.subscribe(
      (e)=>this.chat.createChat(e.id).subscribe(userInfo=>{
        this.userBeck = userInfo;
        this.chat.getAllChats().subscribe(allDialog=>{
          this.chats = allDialog;

        })
      })
    )
    this.socketService.connect(this.tokenId.id);
    this.socketService.lastSms$.subscribe(e => this.lastSms=e)
  }
  checkDialog(elem:any){
    this.router.navigate([`/messages/${this.link}/${elem}`]);

  }





}
