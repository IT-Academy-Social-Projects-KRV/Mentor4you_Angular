import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorPagesServices } from 'src/app/core/services/error-pages.service';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.scss']
})
export class DeleteAccountComponent implements OnInit {
  private unSubscribeSubject: Subject<void> = new Subject;

  constructor(
    private http:HttpClient,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private errorPagesServices: ErrorPagesServices
    ) { }

  ngOnInit(): void {
  }

  deleteUser(){
    this.userService.deleteUser()
    .pipe(takeUntil(this.unSubscribeSubject))
    .subscribe(() => {
      this.router.navigateByUrl("/");
      localStorage.clear();
      this.toastr.info('Your account is deleted');
    },
      (error) => {
        this.errorPagesServices.checkError(error)
      })
  }
}
