import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
// Rutas
import { APP_ROUTING } from './app.routes';

import localeEs from '@angular/common/locales/es';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/Shared/navbar/navbar.component';
import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/login/login.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ProductosComponent } from './components/productos/productos.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { FacturacionComponent } from './components/facturacion/facturacion.component';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { ItemsComponent } from './components/Shared/items/items.component';
import { ReportesComponent } from './components/reportes/reportes.component';

registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    IndexComponent,
    LoginComponent,
    ClientesComponent,
    ProductosComponent,
    UsuarioComponent,
    FacturacionComponent,
    BuscadorComponent,
    ItemsComponent,
    ReportesComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
