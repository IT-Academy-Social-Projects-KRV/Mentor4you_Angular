import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Injectable,OnInit } from '@angular/core';

export interface UserMessageReview {
	message: string,
	rating: number
}
@Injectable({
	providedIn: 'root'
})

export class AddReviewServices implements OnInit {
	constructor(
		private http: HttpClient
	) { }
	ngOnInit() {}
	addReviewOnServer(idUser: number, reviewMessage: UserMessageReview): Observable<any> {
		return this.http.post(`http://localhost:8080/api/review/addReview/${idUser}`,reviewMessage)
	}
	checkCooperationFromReview(idUser: number): Observable<any> {
		return this.http.get(`http://localhost:8080/api/Cooperation/showInformation/${idUser}`)
	}
}