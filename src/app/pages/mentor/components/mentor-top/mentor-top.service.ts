import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MentorsFilter} from "./MentorsFilter";

@Injectable({
  providedIn: 'root'
})
export class MentorTopService implements OnInit{

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {

  }

  postConfig(mentor: MentorsFilter) {
    this.http.post('', mentor)
  }

  getMentorData(){
    return this.http.get('')
  }
}
