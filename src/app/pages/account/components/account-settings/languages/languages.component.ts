import {Component, Input, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss']
})
export class LanguagesComponent implements OnInit {

  constructor(private language :TranslateService) { }


  changeLanguage(language:any)
  {
    this.language.setDefaultLang(language)
  }

  ngOnInit(): void {
  }

}
