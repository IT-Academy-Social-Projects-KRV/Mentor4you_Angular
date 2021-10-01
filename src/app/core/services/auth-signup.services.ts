import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface signupUserDateInput {
	email: string,
	password: string,
	role: string
}
export interface signupUserDateOutput {
	 message?: string 
	}

@Injectable()
export class AuthSignupServices {
	constructor(private http: HttpClient) { }
	signupUser(userDate: signupUserDateInput): Observable<signupUserDateOutput>{
		return this.http.post<signupUserDateInput>('http://localhost:8080/api/registration', userDate).pipe(
			tap(console.log)
		)
	}
}


