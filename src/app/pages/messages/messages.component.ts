import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Chat } from 'src/app/core/services/chat.service';
import { T } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  chats: any = []
  constructor(private router:Router, public chat:Chat) { }

  ngOnInit(): void {
    this.chat.getAllChats().subscribe(console.log)
  }
  checkDialog(elem:any){
    this.router.navigate([`./messages/${elem}`])
  }
  qwerty(){
   this.chat.qwerty().subscribe(console.log)
  }
  qwerty1(){
   this.chat.qwerty1().subscribe(console.log)
  }
}
