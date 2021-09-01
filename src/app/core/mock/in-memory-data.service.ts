import { Injectable } from '@angular/core';

export const mentors = [
  { id: 11, name: 'Dr Nice', img: 'https://i.pravatar.cc/121', category: ['Java', 'Angular'], rating: 4 },
  { id: 12, name: 'Narco', img: 'https://i.pravatar.cc/122', category: ['JavaScript', 'Angular'], rating: 5 },
  { id: 13, name: 'Bombasto', img: 'https://i.pravatar.cc/123', category: ['HTML', 'CSS'], rating: 3 },
  { id: 14, name: 'Celeritas', img: 'https://i.pravatar.cc/124', category: ['JavaScript', 'Angular'], rating: 2 },
  { id: 15, name: 'Magneta', img: 'https://i.pravatar.cc/125', category: ['Java', 'Angular'], rating: 5 },
  { id: 16, name: 'RubberMan', img: 'https://i.pravatar.cc/126', category: ['JavaScript', 'Angular'], rating: 3 },
  { id: 17, name: 'Dynama', img: 'https://i.pravatar.cc/127', category: ['Java', 'Angular'], rating: 4 },
  { id: 18, name: 'Dr IQ', img: 'https://i.pravatar.cc/128', category: ['HTML', 'CSS'], rating: 3 },
];

@Injectable({
  providedIn: 'root'
})

export class InMemoryDataService {

  createDb() {
    const mentors = [
      { id: 11, name: 'Dr Nice', img: 'https://i.pravatar.cc/121', category: ['Java', 'Angular'], rating: 4 },
      { id: 12, name: 'Narco', img: 'https://i.pravatar.cc/122', category: ['JavaScript', 'Angular'], rating: 5 },
      { id: 13, name: 'Bombasto', img: 'https://i.pravatar.cc/123', category: ['HTML', 'CSS'], rating: 3 },
      { id: 14, name: 'Celeritas', img: 'https://i.pravatar.cc/124', category: ['JavaScript', 'Angular'], rating: 2 },
      { id: 15, name: 'Magneta', img: 'https://i.pravatar.cc/125', category: ['Java', 'Angular'], rating: 5 },
      { id: 16, name: 'RubberMan', img: 'https://i.pravatar.cc/126', category: ['JavaScript', 'Angular'], rating: 3 },
      { id: 17, name: 'Dynama', img: 'https://i.pravatar.cc/127', category: ['Java', 'Angular'], rating: 4 },
      { id: 18, name: 'Dr IQ', img: 'https://i.pravatar.cc/128', category: ['HTML', 'CSS'], rating: 3 },
    ];

    return { mentors };
  }
}
