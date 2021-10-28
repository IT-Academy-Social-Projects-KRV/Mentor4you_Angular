import { Component, OnInit, OnDestroy, ViewChild, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AddReviewServices } from 'src/app/core/services/add-review.service';
interface UserMessageReview {
  message: string,
  rating: number
}
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
  checkCooperation:boolean=false
  @Input() idMentor!: number
  constructor(
    private snackBar: MatSnackBar,
    public dialogMat: MatDialog,
    private addReviewServices: AddReviewServices,
  ) { }

  ngOnInit(): void {
    this.addReviewServices.checkCooperationFromReview(this.idMentor).subscribe(value=>{
      this.checkCooperation = value
    })
    this.formAddReview = new FormGroup({
      textarea: new FormControl('',),
    })
  }
  addFocus() { }

  submit() {

    if (this.formAddReview.get('textarea')?.value?.trim() && this.rating) {
      this.showSpiner = true;
  
      let userMessageReview: UserMessageReview = {
        message: this.formAddReview.get('textarea')?.value,
        rating: this.rating
      }
      this.formAddReview.reset();
      this.rating = 0;
      this.addReviewServices.addReviewOnServer(this.idMentor, userMessageReview).subscribe(
        value => {
          setTimeout(() => {
            this.showSpiner = false;
            this.showSpiner = false;
            this.snackBar.open('Your comment has been successfully added!');
            setTimeout(() => this.snackBar.dismiss(), 4000);
          }, 1500)
        },
        error => {
          setTimeout(() => {
            this.showSpiner = false;
            this.showSpiner = false;
            this.snackBar.open('Something went wrong, try again!');
            setTimeout(() => this.snackBar.dismiss(), 4000);
          }, 1500)

        },
      )
    }
    return false


  }
  btnClick() {
    this.btnCheck = !this.btnCheck;
  }
  enter(i: number) {
    this.hoverState = i;
  }

  leave() {
    this.hoverState = 0;
  }

  updateRating(i: number) {
    this.rating = i;
    console.log(this.rating)

  }

  ngOnDestroy() {
    this.snackBar.dismiss()
  }
}
