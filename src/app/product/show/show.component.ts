import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NavbarComponent } from '../../layouts/navbar/navbar.component';
import { NavbarTopComponent } from '../../layouts/navbar-top/navbar-top.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-show',
  standalone: true,
  imports: [
    NavbarComponent,
    NavbarTopComponent
  ],
  templateUrl: './show.component.html',
  styleUrl: './show.component.css'
})
export class ShowComponent {
  dato:any;
  constructor(private _router: ActivatedRoute, private http: HttpClient, private route: Router){
    this.dato = this._router.snapshot.paramMap.get('id');
    let url = "http://127.0.0.1:8000/product/" + this.dato;
    this.http.get(url).subscribe(data => {
      this.dato = data;
    });
  }

  cancelCreate(){
    this.route.navigateByUrl("/products")
  }
}
