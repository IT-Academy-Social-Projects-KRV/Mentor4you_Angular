import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [HomeComponent, CarouselComponent],
  imports: [HomeRoutingModule, IvyCarouselModule, CommonModule],
})
export class HomeModule {}
