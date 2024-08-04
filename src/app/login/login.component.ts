import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Form, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { AuthenticationService } from '../services/auth/authentication.service';
import { log } from 'node:console';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule,
    RouterOutlet,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  //dataLogin: Login;
  imagePath: string = "../../../assets/images/logo/logo-bentho.png"
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    pass: new FormControl('', [Validators.required, Validators.minLength(5)])
  });

  constructor(private http: HttpClient, private router: Router, private auth: AuthenticationService){
    //this.dataLogin = new Login();
  }

  get email(){return this.loginForm.get('email')}
  get pass(){return this.loginForm.get('pass')}

  loginUser(){
    if(!this.email?.invalid || !this.pass?.invalid){
      this.http.post('https://lightyellow-gaur-319608.hostingersite.com:8000/user/login',this.loginForm.value).subscribe((res:any)=>{
        console.log(res)
        if(res.result){
          alert('Login success')
          this.auth.logInUser(res.user)
          this.router.navigateByUrl('/admin')
        }else{
          alert(res.message)
        }
      })
    }else{
      this.loginForm.markAllAsTouched()
    }
  }
}
/*
export class Login{
  Email: string;
  Pass: string;

  constructor(){
    this.Email = '';
    this.Pass = '';
  }
}*/
