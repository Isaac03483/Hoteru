import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly URL: string = 'http://localhost:8000/api';

  constructor(private httpClient: HttpClient) { }

  findAll() : Observable<any> {
    return this.httpClient.get(`${this.URL}/tasks`)
  }

  save(name: string, typeId: number, description: string) : Observable<any> {
    const body = {
      name,
      'employee_type_id': typeId,
      description
    };
    return this.httpClient.post(`${this.URL}/tasks`, body);
  }

  update(id: number, name: string, description: string) : Observable<any> {
    const body = {
      id,
      name,
      description
    }
    return this.httpClient.put(`${this.URL}/tasks`, body);
  }

  delete(id: number) : Observable<any> {
    return this.httpClient.delete(`${this.URL}/tasks/${id}`);
  }

  findEmployeeTypeTasks(type: any) : Observable<any> {
    return this.httpClient.get(`${this.URL}/tasks/undone/${type}`);
  }

  findEmployeeTasks(id: any) : Observable<any> {
    return this.httpClient.get(`${this.URL}/tasks/my-tasks/${id}`);
  }

  updateTaskState(id: number, employee: number, state: string) : Observable<any> {
    const body = { id, employee, state };

    return this.httpClient.put(`${this.URL}/tasks/employees`, body);
  }
}
