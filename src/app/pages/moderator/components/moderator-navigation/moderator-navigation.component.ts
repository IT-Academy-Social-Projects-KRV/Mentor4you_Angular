import { Component, OnInit } from '@angular/core';
import { ModeratorService } from '../../moderator.service';
import { Moderator } from '../../moderator.model';
import { ErrorPagesServices } from 'src/app/core/services/error-pages.service';

@Component({
  selector: 'app-moderator-navigation',
  templateUrl: './moderator-navigation.component.html',
  styleUrls: ['./moderator-navigation.component.scss']
})
export class ModeratorNavigationComponent implements OnInit {
  moderator!:Moderator;

  constructor(private moderatorService: ModeratorService, private errorPagesServices: ErrorPagesServices) { }

  ngOnInit(): void {
    this.moderatorService.getModerator().subscribe(data => {      
      this.moderatorService.moderator = data;  
      this.moderator = this.moderatorService.moderator;
    },
      (error) => {
        this.errorPagesServices.checkError(error)
      })
  }
}
