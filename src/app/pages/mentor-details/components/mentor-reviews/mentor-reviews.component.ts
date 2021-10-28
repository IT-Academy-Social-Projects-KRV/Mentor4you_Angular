import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-mentor-reviews',
  templateUrl: './mentor-reviews.component.html',
  styleUrls: ['./mentor-reviews.component.scss']
})

export class MentorReviewsComponent implements OnInit {
  flag : any = false;
  reply: string = '';
  replyArr: string [] = [];

 sendReply() {
   this.replyArr.push(this.reply);
   this.flag = false;
 }
 delReply() {
  this.replyArr.shift();
 }


btnClick(){
    this.flag = !this.flag;

}

  constructor() { }

  ngOnInit(): void {
  }

}
