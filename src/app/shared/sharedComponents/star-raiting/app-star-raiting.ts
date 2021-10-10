import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
import { Component } from '@angular/core';

@Component({
	selector:'app-star-raiting',
	templateUrl:'./app-star-raiting.html',
	styleUrls: ['./app-star-raiting.scss'],
	
})

export class AppStarRaitingComponent{
	starClassName = "star-rating-blank";
	@Input() starId:any;
	@Input() rating:any;

	@Output() leave: EventEmitter<number> = new EventEmitter();
	@Output() enter: EventEmitter<number> = new EventEmitter();
	@Output() bigClick: EventEmitter<number> = new EventEmitter();
	constructor() { }

	ngOnInit() {
		if (this.rating >= this.starId) {
			this.starClassName = "star-rating-filled";
		}
	}

	onenter() {
		this.enter.emit(this.starId);
	}

	onleave() {
		this.leave.emit(this.starId);
	}

	starClicked() {
		this.bigClick.emit(this.starId);
	}
}

