import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ModeratorService } from '../../../moderator.service';

import { User } from '../../../user.model';
import { ToastrService } from 'ngx-toastr';
import { ErrorPagesServices } from 'src/app/core/services/error-pages.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-black-list-item',
  templateUrl: './black-list-item.component.html',
  styleUrls: ['./black-list-item.component.scss']
})
export class BlackListItemComponent implements OnInit, OnDestroy {
  @Input() bannedUser!: User;
  @Output() deleteTemplateUser = new EventEmitter<number>();
  unbanUserSubscription!: Subscription;

  constructor(
    private moderatorService: ModeratorService, 
    private toastr: ToastrService, 
    private errorPagesServices: ErrorPagesServices
    ) { }

  ngOnInit(): void {
  }

  onUnBanUser(id:number, last_name:string, first_name:string) {    
    this.unbanUserSubscription = this.moderatorService.unbanUser(id)
      .subscribe(() => {
        this.bannedUser.ban = false;
        this.deleteTemplateUser.emit(id);
        this.toastr.success('has been unbanned!!', `${last_name} ${first_name}`);
      },    
        (error) => {
          this.errorPagesServices.checkError(error)
        });
  }

  ngOnDestroy(): void {
    this.unbanUserSubscription?.unsubscribe();
  }
}
