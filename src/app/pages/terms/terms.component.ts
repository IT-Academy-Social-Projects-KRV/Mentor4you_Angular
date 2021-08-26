import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  onNavigate(){
    const url = 'https://www.privacypolicies.com/terms-conditions-generator/';
    window.open(url, '_blank');
}

}
