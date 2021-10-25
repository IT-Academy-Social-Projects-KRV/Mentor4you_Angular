import { Component, OnInit } from '@angular/core';
import { Categories } from 'src/app/core/interfaces/categories';
import { MentorTopService } from '../../mentor/components/mentor-top/mentor-top.service';
import { UsersService } from 'src/app/core/services/users.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories?: Categories [];
  newCateg: string = '';
  added:string [] = [];
  

  constructor(private category:MentorTopService, private addCategor:UsersService) { }



  getCategories() {
    this.category.getSelects().subscribe(res=>{
      this.categories = res.categoriesList
      console.log(this.categories);
    })
  }

  addString(){
    this.added.push(this.newCateg);
    console.log(this.added);
  }


  addCategory () {  
    this.addString(); 
    this.addCategor.addCategory(this.added).subscribe(()=>{
    })
window.location.reload()
;
    
  }

  ngOnInit(): void {
    this.getCategories()
  }

}
