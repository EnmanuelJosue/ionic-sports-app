import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginAndRegisterService {
  private apiUrl = environment.apiLoginPrueba;
  constructor(
    private http: HttpClient
  ) { }

  loginUser(body){
    return this.http.post<any>(`${this.apiUrl}login/auth`, body);
  }

  registerUser(body){
    return this.http.post<any>(`${this.apiUrl}login/register`, body);
  }
}
