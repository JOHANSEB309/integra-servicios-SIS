import { Component } from '@angular/core';
import { SeleccionCategoriaService } from '../seleccion-categoria.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
   selector: "app-pagina-principal",
   templateUrl: "./pagina-principal.component.html",
   styleUrl: "./pagina-principal.component.css",
})
export class PaginaPrincipalComponent {
   mensajeError: string;
   responseCode: number;
   hayError: boolean = false;
   datoTraducido: string;

  constructor(private seleccionCategoria: SeleccionCategoriaService, private http:HttpClient, private router:Router, private adminServicio:AdminService){
      
  }

   scrollTo(section: string) {
      document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
   }

  perfil(){
    if(this.adminServicio.hayUsuarioLogeado){
      this.router.navigate(['/gestion-usuario'])
    }else{
      this.router.navigate(['/login'])
    }
  }
  guardarSeleccion(dato : string){
      let selec;
      if(dato == 'DZA'){
        this.datoTraducido = 'Salas de Danza'
      }else if(dato == 'AUD'){
        this.datoTraducido = 'Auditorio'
        selec ='Auditorio'
      }else if(dato == 'LAQ'){
        this.datoTraducido = 'Laboratorios de Quimica'
      }else if(dato == 'LAF'){
        this.datoTraducido = 'Laboratorio'
      }else if(dato == 'LAI'){
        this.datoTraducido = 'Laboratorios de Informatica'
      }else if(dato == 'Cancha'){
        this.datoTraducido = 'Canchas de Futbol'
      }else if(dato == 'LIB'){
        this.datoTraducido = 'Libros'
      }else if(dato == 'PCS'){
        this.datoTraducido = 'Computadoras'
      }else if(dato == 'TAB'){
        this.datoTraducido = 'Tablets'
      }
      this.seleccionCategoria.changeMessage(this.datoTraducido);

      // Enviamos la categoría al backend
      this.http
         .get(
            `https://backend-integraservicios.onrender.com/consultarRecursos?tipo=${this.datoTraducido}`
         )
         .subscribe({
            next: (res) => {
               console.log("Recursos obtenidos:", res);
               this.router.navigate(["/recursos-categoria"], {
                  queryParams: { tipo: this.datoTraducido },
               });
            },
            error: (err) => {
               console.error("Error al obtener recursos:", err);
               this.mostrarError("Error al enviar la categoría seleccionada");
            },
         });
   }

   mostrarError(mensaje: string) {
      this.hayError = true;
      this.mensajeError = mensaje;
   }
}
