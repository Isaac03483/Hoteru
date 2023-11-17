import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RoomTypeService {

  private readonly URL: string = 'http://localhost:8000/api';

  constructor(private httpClient: HttpClient) { }

  findAll() : Observable<any> {
    return this.httpClient.get(`${this.URL}/room-types`)
  }

  save(type: string, costPerDay: number) : Observable<any> {
    const body = { type, 'cost_per_day':costPerDay };
    return this.httpClient.post(`${this.URL}/room-types`, body);
  }

  delete(id: number) : Observable<any> {
    return this.httpClient.delete(`${this.URL}/room-types/${id}`)
  }
}
