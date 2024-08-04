import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private API_LARAVEL = "https://lightyellow-gaur-319608.hostingersite.com:8000/admin";

  constructor(private http: HttpClient, private auth: AuthenticationService) { }

  public getUser(): Observable<any>{
    return this.http.get(this.API_LARAVEL);
  }

  getAuth(){
    return this.auth.checkUser();
  }
}
