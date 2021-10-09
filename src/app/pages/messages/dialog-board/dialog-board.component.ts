import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Chat } from 'src/app/core/services/chat.service';

@Component({
	selector:'dialog-board',
	templateUrl:'./dialog-board.component.html',
	styleUrls: ['./dialog-board.component.scss']
})

export class DialogBoardComponent implements OnInit{
	sendid:string="";
	recivid:string=""; 
	chatMessage:string='';
  constructor(
	  private routerNavigate: ActivatedRoute,
	  private chat: Chat,
	  ){

  }
	ngOnInit(){
	
		console.log(this.chatMessage);
		this.routerNavigate.params.subscribe(e =>{
			[this.sendid, this.recivid] = e.id.split('_');
			console.log(this.sendid)
			this.chat.getMessage(this.sendid, this.recivid).subscribe(console.log)
		} )	
	}
	sendChatMessage(){
		if (this.chatMessage.trim()){
			console.log(this.chatMessage)
		}
		return false
	}
}