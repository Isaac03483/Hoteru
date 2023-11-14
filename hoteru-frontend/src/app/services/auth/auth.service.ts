import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly URL: string = 'http://localhost:8000/api';

  constructor(private httpClient: HttpClient) { }

  validate(username: string, password: string) : Observable<any> {
    return this.httpClient.get(`${this.URL}/auth/${username}/${password}`);
  }
}
