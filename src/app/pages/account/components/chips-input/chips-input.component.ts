import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';


export interface Category {
  name: string;
}

@Component({
  selector: 'app-chips-input',
  templateUrl: './chips-input.component.html',
  styleUrls: ['./chips-input.component.scss']
})
export class ChipsInputComponent implements OnInit {
  @Input() gettedCategories?: Category[];
  @Output() sendCategories: EventEmitter<Category[]> = new EventEmitter();

  selectable = true;
  removable = true;
  addOnBlur = true;

  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  categories: Category[] = [];

  ngOnInit(): void {
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    
    if (value) {
      this.categories.push({ name: value });
    }

    event.chipInput!.clear();
  }

  remove(category: Category): void {
    this.categories = this.categories.filter(c => c !== category);
  }
}
