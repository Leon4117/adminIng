import { Component } from '@angular/core';
import { NavbarComponent } from '../layouts/navbar/navbar.component';
import { NavbarTopComponent } from '../layouts/navbar-top/navbar-top.component';
import { FooterAdminComponent } from '../layouts/footer-admin/footer-admin.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [NavbarComponent,NavbarTopComponent,FooterAdminComponent,HttpClientModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {
  constructor(private http: HttpClient){

  }

  revisalogin(){
    this.http.get('http://127.0.0.1:8000/user/revisa').subscribe((res:any) => {
      console.log(res)
    })
  }
}
