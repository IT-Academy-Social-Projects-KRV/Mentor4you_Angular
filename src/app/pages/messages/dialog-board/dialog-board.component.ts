import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Chat } from 'src/app/core/services/chat.service';
import {WebSocketService} from "../web-socket.service";

@Component({
	selector:'dialog-board',
	templateUrl:'./dialog-board.component.html',
	styleUrls: ['./dialog-board.component.scss']
})

export class DialogBoardComponent implements OnInit{
	sendid:string="";
	recivid:string="";
	chatMessage:string='';
	messageObj!:any;
	messageObjClone!:any;
	date!:any;
	globalMessage!:any;
  constructor(
	  private routerNavigate: ActivatedRoute,
	  private chat: Chat,
    private socketService:WebSocketService
	  ){

  }
	ngOnInit(){
		console.log(this.globalMessage)
		this.routerNavigate.params.subscribe(e =>{
			[this.sendid, this.recivid] = e.id.split('_');
			// this.chat.getMessage(this.sendid, this.recivid).subscribe(console.log)
		} )
		this.socketService.checkMsg(this.sendid, this.recivid).subscribe((response: any) => {
			this.socketService.newMessages.push(...response)

		})
		this.socketService.checkMsg( this.recivid,this.sendid).subscribe((response: any) => {
			this.socketService.newMessages.push(...response)
			this.date=response.timestamp;
         console.log(this.globalMessage)
		})
		
		this.socketService.newMessages.sort((a, b) => a.timestamp - b.timestamp);
		this.globalMessage = this.socketService.newMessages;
		
	}
	sendChatMessage(){
		if (this.chatMessage.trim()){
			this.socketService.lastSms$.next(this.chatMessage)
		
      this.socketService.sendMsg(this.chatMessage,this.sendid,this.recivid)

		}

	}


}
