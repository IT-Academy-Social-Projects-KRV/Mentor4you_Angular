import { Component, OnInit, OnDestroy, ViewChild, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog'; 
@Component({
  selector: 'app-mentor-add-review-section',
  templateUrl: './mentor-add-review-section.component.html',
  styleUrls: ['./mentor-add-review-section.component.scss']
})
export class MentorAddREviewSectionComponent implements OnInit, OnDestroy {

  btnCheck: boolean = false;
  formAddReview!: FormGroup;
  stars = [1, 2, 3, 4, 5];
  rating = 0;
  hoverState = 0;
  showSpiner: boolean = false;
  constructor(
    private snackBar: MatSnackBar,
    public dialogMat: MatDialog
  ) { }

  ngOnInit(): void { 
     this.formAddReview = new FormGroup({
      textarea: new FormControl('',),
    })
  }
  addFocus() { }

  submit() {
    
    if (this.formAddReview.get('textarea')?.value.trim()){
      this.showSpiner = true;
      setTimeout(() =>{
        this.showSpiner = false
        this.formAddReview.reset();
        this.snackBar.open('Your comment has been successfully added! ');
        this.rating = 0;
        setTimeout(() => this.snackBar.dismiss(),4000)
      },3000)
      }
      return false
      
    
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

  }

  ngOnDestroy() {
    this.snackBar.dismiss()
  }
}
