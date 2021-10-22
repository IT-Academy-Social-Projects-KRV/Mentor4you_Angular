import { Component, OnInit, Input } from '@angular/core';
import { ModeratorService } from '../../../moderator.service';

import { User } from '../../../user.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-black-list-item',
  templateUrl: './black-list-item.component.html',
  styleUrls: ['./black-list-item.component.scss']
})
export class BlackListItemComponent implements OnInit {
  @Input() bannedUser!: User;

  constructor(private moderatorService: ModeratorService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onUnBanUser(id:number, last_name:string, first_name:string) {    
    this.moderatorService.unbanUser(id).subscribe(() => {
      this.bannedUser.ban = false;
      this.toastr.success('has been unbanned!!', `${last_name} ${first_name}`);
    });    
  }
}
