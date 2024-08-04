import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'console';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private router: Router) { }

  logInUser(user:object){
    try{
      localStorage.setItem('user', JSON.stringify(user))
    }catch(error){
      console.error(error);
    }
  }

  checkUser(){
    try{
      const user = localStorage.getItem('user');
      if(user == null)
        return false;
      else
        return true;
    }catch(error){
      console.error(error);
      return false;
    }
  }

  logOutUser(){
    try{
      localStorage.removeItem('user');
    }catch(error){
      console.error(error);
    }
    this.router.navigateByUrl('/login');
  }
}
