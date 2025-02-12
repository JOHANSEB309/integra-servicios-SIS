import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';
import { PaginaPrincipalEmpleadoComponent } from './pagina-principal-empleado/pagina-principal-empleado.component';
import { RecursosCategoriaComponent } from './recursos-categoria/recursos-categoria.component';
import { LoginComponent } from './login/login.component';
import { AdministrarReservasComponent } from './administrar-reservas/administrar-reservas.component';
import { PrestamosComponent } from './prestamos/prestamos.component';
import { DevolucionesComponent } from './devoluciones/devoluciones.component';
import { IntegracionComponent } from './integracion/integracion.component';

const routes: Routes = [ 
{path: '',component: PaginaPrincipalComponent},
{path: 'principal-empleado',component: PaginaPrincipalEmpleadoComponent},
{path: 'recursos-categoria',component: RecursosCategoriaComponent},
{path: 'login',component: LoginComponent},
{path: 'administrar-reservas',component: AdministrarReservasComponent},
{path: 'prestamos',component: PrestamosComponent},
{path: 'devoluciones',component: DevolucionesComponent},
{path: 'integracion',component: IntegracionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
