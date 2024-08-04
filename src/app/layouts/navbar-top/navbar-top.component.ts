import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/auth/authentication.service';

@Component({
  selector: 'admin-navbar-top',
  standalone: true,
  imports: [],
  templateUrl: './navbar-top.component.html',
  styleUrl: './navbar-top.component.css'
})
export class NavbarTopComponent {
  constructor(private auth: AuthenticationService){}

  logOut(){
    this.auth.logOutUser();
  }
}
