import { Component, OnInit, Input } from '@angular/core';
import { CELL } from '../../CELL';
import { cell } from '../../cell.interface';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  review: cell[] = CELL;
  constructor() {}

  ngOnInit(): void {}

  getRate(mark: number) {
    if (mark === 5) {
      return '../../../../../assets/images/reviews-slider/rate5.svg';
    }
    if (mark === 4) {
      return '../../../../../assets/images/reviews-slider/rate4.svg';
    }
    if (mark === 3) {
      return '../../../../../assets/images/reviews-slider/rate3.svg';
    }
    if (mark === 2) {
      return '../../../../../assets/images/reviews-slider/rate2.svg';
    }
    if (mark === 1) {
      return '../../../../../assets/images/reviews-slider/rate1.svg';
    }
    else return ''
  }
}
