import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private readonly URL: string = 'http://localhost:8000/api';

  constructor(private httpClient: HttpClient) { }

  findAll() : Observable<any> {
    return this.httpClient.get(`${this.URL}/employees`);
  }

  save(username: string, name: string, password: string, type: number) : Observable<any> {
    const body = {
      username,
      name,
      password,
      'employee_type_id' : type
    }

    return this.httpClient.post(`${this.URL}/employees`, body);
  }
}
