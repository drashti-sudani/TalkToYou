import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  get(s:string):Observable<any>{
    let head = new HttpHeaders();
  head.append('Access-Control-Allow-Headers', 'Content-Type');
  head.append('Access-Control-Allow-Methods', 'GET,POST');
  head.append('Access-Control-Allow-Origin', '*');
    return this.http.post<any>("http://localhost:8080/sendMail",{"recipient":s });
  }
}
