import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';
import { PaginaPrincipalEmpleadoComponent } from './pagina-principal-empleado/pagina-principal-empleado.component';
import { RecursosCategoriaComponent } from './recursos-categoria/recursos-categoria.component';
import { LoginComponent } from './login/login.component';
import { AdministrarReservasComponent } from './administrar-reservas/administrar-reservas.component';

const routes: Routes = [ 
{path: '',component: PaginaPrincipalComponent},
{path: 'principal-empleado',component: PaginaPrincipalEmpleadoComponent},
{path: 'recursos-categoria',component: RecursosCategoriaComponent},
{path: 'login',component: LoginComponent},
{path: 'administrar-reservas',component: AdministrarReservasComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
