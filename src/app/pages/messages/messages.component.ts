import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Chat } from 'src/app/core/services/chat.service';
import { WebSocketService } from "./web-socket.service";
import { SigninService } from "../../auth/signin/signin.service";

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
  userBeck: userChat[] = []
  link!: string
  tokenId?: any
  lastSms!: any
  lastTime!: any
  closeNotif!:any
  addClass:any = false
  constructor(
    private router: Router,
    public chat: Chat,
    public routerNavigate: ActivatedRoute,
    private socketService: WebSocketService,
    private http: SigninService,
  ) {

  }

  ngOnInit(): void {
    this.socketService.closeNotification$.subscribe(e => { this.closeNotif = e })
    this.socketService.checkArray$.subscribe(e=>this.addClass=e)
    this.http.token$.subscribe(token => {
      this.tokenId = this.http.parseJwt(token as string)
    })

    this.routerNavigate.queryParams.subscribe(
      (e) => {
        if (e.id) {
          this.link = e.id;
          this.chat.createChat(e.id).subscribe(userInfo => {
            this.userBeck = userInfo;
            this.chat.getAllChats().subscribe(allDialog => {
              this.chats = allDialog;
              
            })
          })
        } else {
          this.chat.getAllChats().subscribe(allDialog => {
            this.chats = allDialog;
            console.log(this.chats)
          })
        }
      }
    )

    this.socketService.connect(this.tokenId.id);
  }
  checkDialog(elem: any) {

    if (this.closeNotif){
      this.socketService.checkMessage$.next(false)
    }
      this.router.navigate([`/messages/${elem}`]);
  }
}
