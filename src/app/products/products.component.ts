import { Component } from '@angular/core';
import { NavbarComponent } from '../layouts/navbar/navbar.component';
import { NavbarTopComponent } from '../layouts/navbar-top/navbar-top.component';
import { FooterAdminComponent } from '../layouts/footer-admin/footer-admin.component';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
declare var feather: any;
declare var $: any;

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    NavbarComponent,
    NavbarTopComponent,
    FooterAdminComponent,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  data: any;

  constructor(private http: HttpClient, private router: Router){
    this.http.get('http://127.0.0.1:8000/product').subscribe(data => {
      this.data = data;

      setTimeout(() => {
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
            targets: [0,1,2,3,4,5,6,7]
          }
          ],
          columns: [{
            data: 'id',
          },
          {
            data: 'name'
          },
          {
            data: 'price'
          },
          {
            data: 'description'
          },
          {
            data: 'qualification'
          },
          {
            data: 'existence_qty'
          },
          {
            data: 'status'
          },
          {
            data: null,
            defaultContent: '',
            createdCell: function(td:any, cellData:any, rowData:any, row:any, col:any) {
                let botones = `<div class="btn-group">
                        <button type="button" class="btn btn-primary btn-icon show-record" title="Mostrar">
                          <i class="link-icon" data-feather="eye"></i>
                        </button>
                        <button type="button" class="btn btn-warning btn-icon edit-record" title="Editar">
                          <i class="link-icon" data-feather="edit-2"></i>
                        </button>
                        <button type="button" class="btn btn-danger btn-icon delete-record" title="Eliminar">
                          <i class="link-icon" data-feather="trash-2"></i>
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

            $('.edit-record').on('click', (e:any) => {
              let quote = dataTable.row($(e.currentTarget).closest('tr')).data();
              this.editar(quote.id);
            });

            $('.delete-record').on('click', (e:any) => {
              let quote = dataTable.row($(e.currentTarget).closest('tr')).data();
              this.delete(quote.id);
            });
          }
        })
      }, 1);
    })
  }

  ngOnInit(){
    feather.replace();
  }

  mostrar(id:any){
    this.router.navigate([`/products/${id}`]);
  }

  editar(id:any){
    this.router.navigate([`/products/edit/${id}`]);
  }

  delete(id:any){
    $("#id_site").val(id);
    $("#delete-modal").modal("show");
  }

  submitDeleteModal(){
    let url = "http://127.0.0.1:8000/product/" + $('#id_site').val()
    this.http.delete(url).subscribe(data => {
      console.log(data)
      location.reload()
    })
  }
}
