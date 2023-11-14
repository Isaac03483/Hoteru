import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmployeeTypeService {

  private readonly URL: string = 'http://localhost:8000/api';

  constructor(private httpClient: HttpClient) { }

  findAll() : Observable<any> {
    return this.httpClient.get(`${this.URL}/employee-types`);
  }

  save(type: string) : Observable<any> {
    const body = { type };
    return this.httpClient.post(`${this.URL}/employee-types`, body );
  }
}
