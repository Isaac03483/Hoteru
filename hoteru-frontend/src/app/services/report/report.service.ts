import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private readonly URL: string = 'http://localhost:8000/api';

  constructor(private httpClient: HttpClient) { }

  findTodayTasks() : Observable<any> {
    const today = new Date().toISOString();
    return this.httpClient.get(`${this.URL}/reports/today-tasks/${today}`);
  }


  earnings(init: string, end: string) : Observable<any> {
    return this.httpClient.get(`${this.URL}/reports/earnings/${init}/${end}`);
  }

  bestRoomTypes() : Observable<any> {
    return this.httpClient.get(`${this.URL}/reports/best-room-types`);
  }

  bestClients() : Observable<any> {
    return this.httpClient.get(`${this.URL}/reports/best-clients`);
  }

}
