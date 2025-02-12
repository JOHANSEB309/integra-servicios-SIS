import { Component } from "@angular/core";
import { SeleccionCategoriaService } from "../seleccion-categoria.service";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

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

   constructor(
      private seleccionCategoria: SeleccionCategoriaService,
      private http: HttpClient,
      private router: Router
   ) {}

   scrollTo(section: string) {
      document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
   }

   guardarSeleccion(dato: string) {
      let selec: string;

      // Mapeamos los códigos a nombres de categorías
      const categorias: Record<string, string> = {
         DZA: "Sala de Danza",
         AUD: "Auditorio",
         LAQ: "Laboratorio de Química",
         LAF: "Laboratorio de Física",
         LAI: "Laboratorio de Informática",
         FUT: "Cancha Deportiva",
         LIB: "Libros",
         PCS: "Computadoras",
         TAB: "Tablets",
      };

      this.datoTraducido = categorias[dato] || "Categoría Desconocida";
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
