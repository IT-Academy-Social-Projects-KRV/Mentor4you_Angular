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
}
