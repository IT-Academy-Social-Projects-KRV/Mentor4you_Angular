import { NgModule } from '@angular/core';
import { NotificationModalService } from 'src/app/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { MentorshipApproveComponent } from './mentorship-approve/mentorship-approve.component';
import { MentorshipRequestComponent } from './mentorship-request/mentorship-request.component';
import { NotificationModalComponent } from './notification-modal.component';

@NgModule({
    declarations: [
      NotificationModalComponent,
      MentorshipRequestComponent,
      MentorshipApproveComponent,
    ],
    imports: [
        SharedModule,
      ],
    exports: [NotificationModalComponent],
    providers: [NotificationModalService],
  })
  export class NotificationModalModule { }
  