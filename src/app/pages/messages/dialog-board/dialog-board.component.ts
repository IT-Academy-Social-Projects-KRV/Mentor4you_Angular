import { Component, OnInit} from '@angular/core';
import { NgModel } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Chat } from 'src/app/core/services/chat.service';
import { WebSocketService } from "../web-socket.service";

@Component({
	selector: 'dialog-board',
	templateUrl: './dialog-board.component.html',
	styleUrls: ['./dialog-board.component.scss']
})

export class DialogBoardComponent implements OnInit{
	sendid: string = "";
	recivid: string = "";
	chatMessage: string = '';
	messageObj!: any;
	messageObjClone!: any;
	date!: any;
	subGlobal: any[] = [];
	globalMessage!: any;
	dialogID!:any;
	closeNotif!:any;
	constructor(
		private routerNavigate: ActivatedRoute,
		private chat: Chat,
		private socketService: WebSocketService
	) {

	}
	ngOnInit() {
		this.routerNavigate.params.subscribe(e => {
			this.socketService.newMessages.length = 0;
			this.socketService.closeNotification$.subscribe(e=>this.closeNotif=e)
			this.dialogID = e.id;
			[this.sendid, this.recivid] = e.id.split('_');
			this.subGlobal.length = 0
			this.socketService.checkMsg(this.sendid, this.recivid).subscribe((data: any) => {
				this.socketService.newMessages.push(...data);
				this.socketService.newMessages.sort((a, b) => Date.parse(a.timestamp) - Date.parse(b.timestamp));
				this.socketService.Sms$.next(this.socketService.newMessages)
				this.socketService.Sms$.subscribe(e => {
					this.globalMessage = e
				})
			})
			this.socketService.checkMsg(this.recivid, this.sendid).subscribe((data: any) => {
				this.socketService.newMessages.push(...data);
				this.socketService.newMessages.sort((a, b) => Date.parse(a.timestamp) - Date.parse(b.timestamp));
				this.socketService.Sms$.next(this.socketService.newMessages)
				this.socketService.Sms$.subscribe(e => {
					this.globalMessage = e
				})
			})
		})

		this.socketService.newMessages.sort((a, b) => a.timestamp - b.timestamp);
		this.globalMessage = this.socketService.newMessages;
	}
	sendChatMessage() {
		if (this.chatMessage.trim()) {
			this.socketService.lastSms$.next(this.chatMessage)
			this.socketService.sendMsg(this.chatMessage, this.sendid, this.recivid)
			this.chatMessage = ''
		}

	}

	closeNotification() {
      if(this.closeNotif == this.dialogID){
			this.socketService.checkMessage$.next(false)
		}
	}
}


