import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private readonly URL: string = 'http://localhost:8000/api';

  constructor(private httpClient: HttpClient) { }

  findByNit(nit: string) : Observable<any> {
    return this.httpClient.get(`${this.URL}/clients/find/${nit}`);
  }
}
