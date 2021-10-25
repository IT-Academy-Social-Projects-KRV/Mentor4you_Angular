import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn:'root'
})

export class ErrorPagesServices{
	constructor(private router:Router){}
	checkError(error:any){
		console.log(error)
     switch(error.status){
		  case 404: this.router.navigate(['/error-pages/404']);
		  break;
		  case 401: this.router.navigate(['/error-pages/401']);
		  break;
		  case 403: this.router.navigate(['/error-pages/403']);
		  break;
		  case 500: this.router.navigate(['/error-pages/500']);
		  break;
		
	  }
	}
}