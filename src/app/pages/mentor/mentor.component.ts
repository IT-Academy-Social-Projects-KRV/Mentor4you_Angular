import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-mentor',
  templateUrl: './mentor.component.html',
  styleUrls: ['./mentor.component.scss']
})
export class MentorComponent implements OnInit {
  formAddReview: FormGroup  = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    textarea: new FormControl(''),
  })
  constructor() { }

  ngOnInit(): void {
    // this.formAddReview = new FormGroup({
    //    name:new FormControl(''),
    //    email:new FormControl(''),
    // })
  }
 submit(){
   console.log(this.formAddReview.value);
   
   
 }
}
