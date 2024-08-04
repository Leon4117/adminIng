import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive,Router } from '@angular/router';
declare var feather: any;

@Component({
  selector: 'admin-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  url: string;
  imagePath: string = "../../../assets/images/logo/logo-bentho.png"
  constructor(router: Router){
    this.url = router.url;
    this.url = this.url.replace('/','')
  }

  ngOnInit(){
    document.getElementById(this.url)?.classList.add("active")
    feather.replace();
  }
}
