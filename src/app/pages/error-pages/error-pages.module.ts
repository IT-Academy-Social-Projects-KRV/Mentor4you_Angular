import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { Page401Component } from './page401/page401.component';
import { Page403Component } from './page403/page403.component';
import { Page500Component } from './page500/page500.component';


const routs:Routes = [
	{
		path:'',
		component: PageNotFoundComponent,
	},
	{
		path:'401',
		component: Page401Component,
	},
	{
		path:'403',
		component: Page403Component,
	},
	{
		path:'500',
		component: Page500Component,
	},
]

@NgModule({
	declarations: [PageNotFoundComponent, Page401Component, Page403Component, Page500Component],
	imports:[RouterModule.forChild(routs),CommonModule],
	exports: [PageNotFoundComponent]
})

export class ErrorPagesModule{

}