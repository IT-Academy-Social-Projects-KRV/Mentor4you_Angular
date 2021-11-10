import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Mentee} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class NotificationModalService {
  public mentees$ = new BehaviorSubject<[] | null>(null);
  public mentors$ = new BehaviorSubject<[] | null>(null);
  public isNewNotification$ = new BehaviorSubject<boolean>(false);

  private display: BehaviorSubject<string> = new BehaviorSubject('close');
  private sendRequestDataUrl = 'http://localhost:8080/api/Cooperation';
  private getMenteesRequestDataUrl = 'http://localhost:8080/api/Cooperation/mentorCooperation';
  private approveIgnoreRequestDataUrl = 'http://localhost:8080/api/Cooperation/approve';
  private getReplyRequestDataUrl = 'http://localhost:8080/api/Cooperation/menteeCooperation';
  private deleteNotificationRequestDataUrl = 'http://localhost:8080/api/Cooperation/responseMentee';



  constructor(private http: HttpClient) { }

  watch(): Observable<string> {
    return this.display.asObservable();
  }

  open() {
    this.display.next('open');
  }

  close() {
    this.display.next('close');
  }

  sendRequest(id: number): Observable<any> {
    return this.http.post(`${this.sendRequestDataUrl}/${id}`, {});
  }

  getMenteesRequest(): Observable<any> {
    return this.http.get(this.getMenteesRequestDataUrl, {});
  }

  approveIgnoreRequest(id: number, status: boolean): Observable<any> {
    return this.http.put(`${this.approveIgnoreRequestDataUrl}/${id}`, {status});
  }

  getMenteesResponce(): Observable<any> {
    return this.http.get(this.getReplyRequestDataUrl, {});
  }

  deleteNotificationRequest(id: number): Observable<any> {
    return this.http.put(`${this.deleteNotificationRequestDataUrl}/${id}`, {});
  }

  getMenteesRequests(){
    this.getMenteesRequest()
    .subscribe((res) => {      
      if (res.length>0){
        this.mentees$.next(res);
        this.isNewNotification$.next(true);
      } else{
        this.mentees$.next(null);
        this.isNewNotification$.next(false);
      }
    })
  }

  getMenteesResponces(){
    this.getMenteesResponce()
    .subscribe((res) => {
      if (res.length>0){
        this.mentors$.next(res);
        this.isNewNotification$.next(true);
      }else{
        this.mentors$.next(null);
        this.isNewNotification$.next(false);
      }
    })
  }
}
