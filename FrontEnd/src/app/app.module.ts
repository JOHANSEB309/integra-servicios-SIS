import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';
import { PaginaPrincipalEmpleadoComponent } from './pagina-principal-empleado/pagina-principal-empleado.component';
import { LoginComponent } from './login/login.component';
import { RecursosCategoriaComponent } from './recursos-categoria/recursos-categoria.component';
import { AdministrarReservasComponent } from './administrar-reservas/administrar-reservas.component';
import { PrestamosComponent } from './prestamos/prestamos.component';
import { DevolucionesComponent } from './devoluciones/devoluciones.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IntegracionComponent } from './integracion/integracion.component';
//import { GestionarUsuarioComponent } from './gestion-usuario/gestion-usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    PaginaPrincipalComponent,
    PaginaPrincipalEmpleadoComponent,
    LoginComponent,
    RecursosCategoriaComponent,
    AdministrarReservasComponent,
    DevolucionesComponent,
    PrestamosComponent,
    IntegracionComponent
    //GestionarUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
