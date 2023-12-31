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

  getEmployee(id: any) : Observable<any> {
    return this.httpClient.get(`${this.URL}/employees/${id}`);
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

  delete(id: number) : Observable<any> {
    return this.httpClient.delete(`${this.URL}/employees/${id}`);
  }

  update(id: number, name: string, password: string, type: number) : Observable<any> {
    const body = {
      id,
      name,
      password,
      type
    }

    return this.httpClient.put(`${this.URL}/employees`, body);
  }
}
