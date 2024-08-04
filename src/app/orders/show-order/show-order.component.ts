import { Component } from '@angular/core';
import { NavbarComponent } from '../../layouts/navbar/navbar.component';
import { NavbarTopComponent } from '../../layouts/navbar-top/navbar-top.component';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-show-order',
  standalone: true,
  imports: [
    NavbarComponent,
    NavbarTopComponent
  ],
  templateUrl: './show-order.component.html',
  styleUrl: './show-order.component.css'
})
export class ShowOrderComponent {
  dato:any;
  constructor(private _router: ActivatedRoute, private http: HttpClient, private route: Router){
    this.dato = this._router.snapshot.paramMap.get('id');
    let url = "http://127.0.0.1:8000/orders/" + this.dato;
    this.http.get(url).subscribe(data => {
      this.dato = data;
      console.log(this.dato)
    });
  }

  cancelCreate(){
    this.route.navigateByUrl("/orders")
  }
}
