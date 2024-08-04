import { Component, afterRender } from '@angular/core';
import { NavbarComponent } from '../../layouts/navbar/navbar.component';
import { NavbarTopComponent } from '../../layouts/navbar-top/navbar-top.component';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
declare var $:any;

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    NavbarComponent,
    NavbarTopComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
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
    this.dato = this._router.snapshot.paramMap.get('id');
    let url = "https://lightyellow-gaur-319608.hostingersite.com:8000/product/" + this.dato;
    this.http.get(url).subscribe(data => {
      this.dato = data;
      $('#num').val(this.dato.id)
      $('#name').val(this.dato.name)
      $('#model').val(this.dato.model)
      $('#price').val(this.dato.price)
      $('#characteristic').val(this.dato.characteristic)
      $('#description').val(this.dato.description)
      // $('#availability').val(this.dato.availability)
      $("#availability").val(this.dato.availability).trigger('change');
      //$('#status').val(this.dato.status)
      $("#status").val(this.dato.status).trigger('change');
      $('#qualification').val(this.dato.qualification)
      $('#existence_qty').val(this.dato.existence_qty)

      $("#file-select1").attr("data-default-file", this.dato.img_1);
      $("#file-select2").attr("data-default-file", this.dato.img_2);
      $("#file-select3").attr("data-default-file", this.dato.img_3);
      $("#file-select4").attr("data-default-file", this.dato.img_4);

      $("#form").submit(function(e:any){
        let url = "https://lightyellow-gaur-319608.hostingersite.com:8000/product/"+$('#num').val()

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
            type: "PUT",
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
            window.location.href = '#/products'
        }).fail(function(xhr:any, status:any, error:any) {

        });

        e.preventDefault()
      })
    });
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

  }

}
