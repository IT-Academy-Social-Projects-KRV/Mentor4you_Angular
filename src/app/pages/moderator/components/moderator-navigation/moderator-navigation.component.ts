import { Component, OnInit } from '@angular/core';
import { ModeratorService } from '../../moderator.service';
import { Moderator } from '../../moderator.model';

@Component({
  selector: 'app-moderator-navigation',
  templateUrl: './moderator-navigation.component.html',
  styleUrls: ['./moderator-navigation.component.scss']
})
export class ModeratorNavigationComponent implements OnInit {
  moderator!:Moderator;

  constructor(private moderatorService: ModeratorService) { }

  ngOnInit(): void {
    this.moderator = this.moderatorService.moderator;
  }
}
