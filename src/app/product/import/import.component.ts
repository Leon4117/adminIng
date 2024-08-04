import { Component } from '@angular/core';
import { NavbarComponent } from '../../layouts/navbar/navbar.component';
import { NavbarTopComponent } from '../../layouts/navbar-top/navbar-top.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
declare var $:any;

@Component({
  selector: 'app-import',
  standalone: true,
  imports: [
    NavbarComponent,
    NavbarTopComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './import.component.html',
  styleUrl: './import.component.css'
})
export class ImportComponent {
  constructor(private http: HttpClient){}

  ngOnInit(){
    $('.dropify').dropify({
      messages: {
      'default': 'Arrastra y suelta un archivo aquí o haz clic',
      'replace': 'Arrastra y suelta o haz clic para reemplazar',
      'remove': 'Eliminar',
      'error': 'Vaya, algo malo sucedió.'
      },
      error: {
      'fileSize': 'El tamaño del archivo es demasiado grande (2MB MAX).',
      'fileExtension': 'El archivo no está permitido (solo PDF).'
      }

    });
  }
}
