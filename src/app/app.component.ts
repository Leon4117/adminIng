import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginService } from './services/auth/login.service';
import { AuthenticationService } from './services/auth/authentication.service';
declare var feather: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'admin';

  response: any = {};

  constructor() { }

  ngOnInit(): void {
    feather.replace();
  }
}
