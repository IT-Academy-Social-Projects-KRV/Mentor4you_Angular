import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, DoCheck, AfterViewInit, OnDestroy } from '@angular/core';
// import { ErrorPageServices } from 'src/app/core/services/errorPage.services';

@Component({
	selector: 'page-not-found',
	templateUrl: './page-not-found.component.html',
	styleUrls: ['./page-not-found.component.scss'],

})

export class PageNotFoundComponent implements OnInit, DoCheck {
	// public errorObject!: {
		status?: any;
		error?: any;
		path?:any;
		a?:any;
	// };

	constructor(
		private router: Router,
		// private errorPageServices: ErrorPageServices,
		private routerParam:ActivatedRoute) {
		 }
	ngOnInit() {
		this.routerParam.queryParams.subscribe(param=>{
			this.status = param.status
			this.error = param.error
			this.path = param.path
		})
	}
		ngDoCheck(){

		}

}
