import { Component, OnInit, ViewChild, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  showSpiner: boolean = false;
  constructor(
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void { 
     this.formAddReview = new FormGroup({
      textarea: new FormControl('',),
    })
  }
  addFocus() { }

  submit() {
    
    if (this.formAddReview.get('textarea')?.value.trim()){
      console.log(this.formAddReview.get('email'));
      this.snackBar.open('successful');
      this.showSpiner = true;
      setTimeout(() =>{
        this.showSpiner = false
        this.formAddReview.reset();
        this.rating = 0;
        
      },3000)
      
      
      
    }
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
