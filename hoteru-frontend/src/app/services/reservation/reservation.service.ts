import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private readonly URL: string = 'http://localhost:8000/api';

  constructor(private httpClient: HttpClient) { }

  findAll() : Observable<any> {
    return this.httpClient.get(`${this.URL}/reservations`);
  }

  save(nit: string, name: string, roomId: number, initDate: string, endDate: string) : Observable<any> {
    const body = {
      nit,
      name,
      'room_id': roomId,
      'init_date': initDate,
      'end_date': endDate
    }
    return this.httpClient.post(`${this.URL}/reservations`, body);
  }

  todayReservation() : Observable<any> {
    return this.httpClient.get(`${this.URL}/reservations/today`);
  }
}
