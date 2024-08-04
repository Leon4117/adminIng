import { Component } from '@angular/core';
import { NavbarComponent } from '../../layouts/navbar/navbar.component';
import { NavbarTopComponent } from '../../layouts/navbar-top/navbar-top.component';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
declare var $:any;

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    NavbarComponent,
    NavbarTopComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  dato: any;
  formData = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    model: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    price: new FormControl('', [Validators.required, Validators.maxLength(6)]),
    characteristic: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    availability: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    status: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    qualification: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    existence_qty: new FormControl('', [Validators.required, Validators.maxLength(5)]),
  })

  constructor(private _router: ActivatedRoute, private http: HttpClient, private route: Router){

  }

  ngOnInit(){
    let form = $('#form');

    const isNullOrEmpty = (str:any) => {
      return str === null || str === "" || str === undefined
    }

    const changeInvalid = (obj:any) => {
      $(obj).removeClass("ng-valid");
      $(obj).addClass("ng-invalid");
      return 0
    }

    const changeValid = (obj:any) => {
      $(obj).removeClass("ng-invalid");
      $(obj).addClass("ng-valid");
      return 1
    }

    const isNumber = (num:any) => {
      var number = parseFloat(num);
      return isNaN(number) || number <= 0
    }

    function validaForm(){
      let cont = 0;
      cont += isNullOrEmpty($('#name').val()) ? changeInvalid('#name') : changeValid('#name');
      cont += isNullOrEmpty($('#model').val()) ? changeInvalid('#model') : changeValid('#model');
      cont += isNumber($('#price').val()) ? changeInvalid('#price') : changeValid('#price');
      cont += isNullOrEmpty($('#characteristic').val()) ? changeInvalid('#characteristic') : changeValid('#characteristic');
      cont += isNullOrEmpty($('#description').val()) ? changeInvalid('#description') : changeValid('#description');
      cont += isNullOrEmpty($('#availability').val()) ? changeInvalid('#availability') : changeValid('#availability');
      cont += isNullOrEmpty($('#status').val()) ? changeInvalid('#status') : changeValid('#status');
      cont += isNullOrEmpty($('#qualification').val()) ? changeInvalid('#qualification') : changeValid('#qualification');
      cont += isNumber($('#existence_qty').val()) ? changeInvalid('#existence_qty') : changeValid('#existence_qty');

      if(cont == 9)
        return true;
      else
        return false;
    }

    form.children('#wizard').steps({
      headerTag: 'h2',
      bodyTag: 'section',
      enableCancelButton: true,
      transitionEffect: 'slideLeft',
      labels: {
          finish: 'Guardar',
          next: 'Siguiente',
          cancel: 'Cancelar',
          previous: 'Anterior'
      },
      onCanceled: function (event:any) {
          window.location.href = "#/products";
      },
      onStepChanging: function (event:any, currentIndex:any, newIndex:any) {
          if (newIndex > currentIndex) {
              return validaForm();
          }

          return true;
      },
      onFinishing: function (event:any, currentIndex:any) {
          return validaForm();
      },
      onFinished: function (event:any, currentIndex:any) {
        form.submit();
      }
    });

    $('.select2').select2({
      width: '100%',
      language: {
          noResults: function (params:any) {
              return 'Sin resultados';
          }
      }
    });

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

    $("#form").submit(function(e:any){
      e.preventDefault();
      let url = "https://lightyellow-gaur-319608.hostingersite.com:8000/product"
      console.log(url)
      let formData = {
        name: $('#name').val(),
        model: $('#model').val(),
        price: $('#price').val(),
        characteristic: $('#characteristic').val(),
        description: $('#description').val(),
        availability: $('#availability').val(),
        status: $('#status').val(),
        qualification: $('#qualification').val(),
        existence_qty: $('#existence_qty').val(),
        // img_1: $('#file-select1').val(),
        // img_2: $('#file-select2').val(),
        // img_3: $('#file-select3').val(),
        // img_4: $('#file-select4').val()
      }

      $.ajax({
          type: "POST",
          url: url,
          data: formData,
          dataType: "json",
          encode: true,
      }).done(function(data:any) {
          // const Toast = Swal.mixin({
          //     toast: true,
          //     position: 'top-end',
          //     showConfirmButton: false,
          //     timer: 3000
          // });
          // Toast.fire({
          //     icon: 'success',
          //     title: 'El estatus ha sido cambiado con éxito!',
          // })
          // obj.id = formData.status+"-"+id
          console.log(data)
          window.location.href = '#/products'
      }).fail(function(xhr:any, status:any, error:any) {
          // const Toast = Swal.mixin({
          //     toast: true,
          //     position: 'top-end',
          //     showConfirmButton: false,
          //     timer: 3000
          // });
          // Toast.fire({
          //     icon: 'error',
          //     title: `Estatus inválido`,
          // });
      });

      e.preventDefault()
    });

  }

  edita(){
    console.log("?")
  }
}
