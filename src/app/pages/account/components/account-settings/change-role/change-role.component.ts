import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-role',
  templateUrl: './change-role.component.html',
  styleUrls: ['./change-role.component.scss'],
})
export class ChangeRoleComponent implements OnInit {
  currentRole!: string;
  constructor() {}

  ngOnInit(): void {}
}

