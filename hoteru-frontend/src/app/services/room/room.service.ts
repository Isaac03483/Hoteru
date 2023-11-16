import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private readonly URL: string = 'http://localhost:8000/api';

  constructor(private httpClient: HttpClient) { }

  findAll() : Observable<any> {
    return this.httpClient.get(`${this.URL}/rooms`);
  }

  save(roomTypeId: number) : Observable<any> {
    const body = {
      'room_type_id' : roomTypeId
    }
    return this.httpClient.post(`${this.URL}/rooms`, body);
  }
}
