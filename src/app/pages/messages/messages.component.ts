import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Chat } from 'src/app/core/services/chat.service';

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
  constructor(
    private router:Router, 
    public chat:Chat,
    public routerNavigate:ActivatedRoute
    ) {
      
     }

  ngOnInit(): void {
    this.routerNavigate.params.subscribe((e)=>this.link=e.id);
      this.chat.getAllChats().subscribe(allDialog=>{this.chats = allDialog});
    this.routerNavigate.params.subscribe(
      (e)=>this.chat.createChat(e.id).subscribe(userInfo=>{
        this.userBeck = userInfo;
        this.chat.getAllChats().subscribe(allDialog=>{
          this.chats = allDialog;
        
        })
      })
    )
    // this.chat.getAllChats().subscribe(console.log)
  }
  checkDialog(elem:any){
    this.router.navigate([`/messages/${this.link}/${elem}`]);
    
  }
  // qwerty(){
  //  this.chat.qwerty().subscribe(console.log)
  // }


}
