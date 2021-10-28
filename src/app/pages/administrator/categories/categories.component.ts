import { Component, OnInit } from '@angular/core';
import { Categories } from 'src/app/core/interfaces/categories';
import { MentorTopService } from '../../mentor/components/mentor-top/mentor-top.service';
import { UsersService } from 'src/app/core/services/users.service';
import { switchMap } from 'rxjs/operators';
import { BehaviorSubject, Observable  } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  users$!:Observable<Array<{name:string}>>;
  categories?: Categories []=[];
  categors?:Observable<Array<{name: string}>>
  newCateg: string = '';
  added:string [] = [];
  name = '';
  refreshPage$ = new BehaviorSubject<boolean>(true);
  

  constructor(private category:MentorTopService, private addCategor:UsersService, private toast: ToastrService) { }



  getCategories() {
    this.category.getSelects().subscribe(res=>{
      this.categories = res.categoriesList;
     
    })
  }

  addString(){
    this.added.push(this.newCateg);
  }


  addCategory () {  
    this.addString(); 
    this.addCategor.addCategory(this.added).subscribe(()=>{
      this.toast.success('New category was added!');
    })
  window.location.reload()
;
    
  }

  ngOnInit() {
     this.getCategories();
    //  this.users$ = this.refreshPage$.pipe(switchMap(() => this.getCategories()));
     
  }

}
