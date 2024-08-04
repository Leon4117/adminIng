import { Component } from '@angular/core';
import { NavbarComponent } from '../../layouts/navbar/navbar.component';
import { NavbarTopComponent } from '../../layouts/navbar-top/navbar-top.component';
import { RouterOutlet, Router } from '@angular/router';
import { FooterAdminComponent } from '../../layouts/footer-admin/footer-admin.component';
import { HttpClient } from '@angular/common/http';
declare var $:any;
declare var feather:any;

@Component({
  selector: 'app-order-index',
  standalone: true,
  imports: [
    NavbarComponent,
    NavbarTopComponent,
    FooterAdminComponent,
    RouterOutlet
  ],
  templateUrl: './order-index.component.html',
  styleUrl: './order-index.component.css'
})
export class OrderIndexComponent {
  data: any;

  constructor(private http: HttpClient, private router: Router){
    this.http.get('http://127.0.0.1:8000/orders').subscribe(data => {
      this.data = data;

      const getDateDDMonthYYYY = (e:any) => {
        let date = new Date(e)
        let options = {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }
        let formattedDate = date.toLocaleDateString('es-ES')

        return formattedDate
      }

      let dataTable = $('#productsTable').DataTable({
        pageLength: 20,
        searching: true,
        processing: true,
        serverSide: false,
        lengthMenu: [10, 15, 20, 25],
        data: data,
        language: {
          search: "",
          paginate: {
            first: "Primer",
            previous: "Anterior",
            next: "Siguiente",
            last: "Último"
          }
        },
        columnDefs: [{
          responsivePriority: 1,
          targets: 0
        },
        {
          className: 'text-center',
          searchable: true,
          targets: [0,1,2,3,4,5,6]
        }
        ],
        columns: [{
          data: 'id',
        },
        {
          data: 'customer_name'
        },
        {
          data: 'folio'
        },
        {
          data: 'total'
        },
        {
          data: 'address'
        },
        {
          data: 'created_at',
          render: function(data:any, row:any, type:any, meta:any) {
            var dateDay = getDateDDMonthYYYY(data)
            return dateDay
          }
        },
        {
          data: null,
          defaultContent: '',
          createdCell: function(td:any, cellData:any, rowData:any, row:any, col:any) {
              let botones = `<div class="btn-group">
                      <button type="button" class="btn btn-primary btn-icon show-record" title="Mostrar">
                        <i class="link-icon" data-feather="eye"></i>
                      </button>
                      <button type="button" class="btn btn-success btn-icon delete-record" title="Eliminar">
                        <i class="link-icon" data-feather="check-circle"></i>
                      </button>
                  </div>`;
              $(td).prepend(botones)
          }
        }
      ],
        order: [ [0, 'desc'] ],
        drawCallback: () => {
          feather.replace();

          $('.show-record').on('click', (e:any) => {
            let quote = dataTable.row($(e.currentTarget).closest('tr')).data();
            this.mostrar(quote.id);
          });

          $('.delete-record').on('click', (e:any) => {
            let quote = dataTable.row($(e.currentTarget).closest('tr')).data();
            this.delete(quote.id);
          });
        }
      })
    })
  }

  ngOnInit(){
    feather.replace();
  }

  mostrar(id:any){
    this.router.navigate([`/orders/${id}`]);
  }

  delete(id:any){
    $("#id_site").val(id);
    $("#delete-modal").modal("show");
  }

  submitDeleteModal(){
    let url = "http://127.0.0.1:8000/orders/validate/" + $('#id_site').val()
    this.http.get(url).subscribe(data => {
      console.log(data)
      location.reload()
    })
  }
}
