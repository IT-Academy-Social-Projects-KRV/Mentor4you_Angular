import { Component, OnInit, ViewChild, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-mentor-add-review-section',
  templateUrl: './mentor-add-review-section.component.html',
  styleUrls: ['./mentor-add-review-section.component.scss']
})
export class MentorAddREviewSectionComponent implements OnInit {

  btnCheck: boolean = false;
  formAddReview!: FormGroup;
  stars = [1, 2, 3, 4, 5];
  rating = 0;
  hoverState = 0;
  constructor() { }

  ngOnInit(): void { 
     this.formAddReview = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      textarea: new FormControl('', Validators.required),
    })
  }
  addFocus() { }

  submit() {
    console.log(this.formAddReview.get('email'));
    this.formAddReview.reset();
    this.rating = 0
  }
  btnClick() {
    this.btnCheck = !this.btnCheck;
  }
  enter(i:number) {
    this.hoverState = i;
  }

  leave() {
    this.hoverState = 0;
  }

  updateRating(i:number) {
    this.rating = i;

    console.log(this.rating)
  }
}
