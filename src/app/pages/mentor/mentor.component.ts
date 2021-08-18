import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  
  selector: 'app-mentor',
  templateUrl: './mentor.component.html',
  styleUrls: ['./mentor.component.scss']
})
export class MentorComponent implements OnInit{
  btnCheck:boolean = false;
  formAddReview: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required,Validators.email]),
    textarea: new FormControl('', Validators.required),
  })
  currentRate = 0
  
  rating = 0;
  starCount = 5;
  ratingArr: boolean[] = []; // true = solid star; false = empty star

  snackBarDuration = 1000;
  response = [
    'You broke my heart!',
    'Really?',
    'We will do better next time.',
    'Glad you like it!',
    'Thank you so much!'
  ]

  constructor(
    private snackBar: MatSnackBar,

  ) {
    // default to no rating, i.e. all empty stars
    this.ratingArr = Array(this.starCount).fill(false);

  }
  returnStar(i: number) {
    if (this.rating >= i + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }
  onClick(i: number) {
    this.rating = i + 1;
    console.log('rating '+this.rating);
    console.log('starCount '+this.starCount);
    console.log('ratingArr '+this.ratingArr);
    
    // this.snackBar.open(this.response[i], '', {
    //   duration: this.snackBarDuration,
    //   panelClass: ['snack-bar']
    // });
  }
 ngOnInit(): void {}
   addFocus(){ }

 submit() {
  //  console.log(this.formAddReview.get('email')?.invalid);

  }
  btnClick(){
    this.btnCheck = !this.btnCheck;
  }

}
