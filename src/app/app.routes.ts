import { Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';
import { ProductsComponent } from './products/products.component';
import { AppComponent } from './app.component';
import { ShowComponent } from './product/show/show.component';
import { EditComponent } from './product/edit/edit.component';
import { ImportComponent } from './product/import/import.component';
import { OrderIndexComponent } from './orders/order-index/order-index.component';
import { CreateComponent } from './product/create/create.component';
import { ShowOrderComponent } from './orders/show-order/show-order.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [loginGuard] },
  { path: 'admin', component: IndexComponent, canActivate: [authGuard] },
  { path: 'products', component: ProductsComponent, canActivate:[authGuard] },
  { path: 'products/:id', component: ShowComponent, canActivate: [authGuard] },
  { path: 'products/edit/:id', component: EditComponent, canActivate: [authGuard] },
  { path: 'import', component: ImportComponent, canActivate: [authGuard] },
  { path: 'orders', component: OrderIndexComponent, canActivate: [authGuard] },
  { path: 'orders/:id', component: ShowOrderComponent, canActivate: [authGuard] },
  { path: 'create', component: CreateComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'admin' }
];
