import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/login/login.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ProductosComponent } from './components/productos/productos.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { FacturacionComponent } from './components/facturacion/facturacion.component';
import { ReportesComponent } from './components/reportes/reportes.component';

const APP_ROUTES: Routes = [
  { path: 'home', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: 'clientes', component: ClientesComponent},
  { path: 'productos', component: ProductosComponent},
  { path: 'facturacion', component: FacturacionComponent},
  { path: 'usuarios', component: UsuarioComponent },
  { path: 'reportes', component: ReportesComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'login' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
