import { Component } from '@angular/core';
import { SeleccionCategoriaService } from '../seleccion-categoria.service';
import { AdminService } from '../admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { categoriaSeleccionadaResponse } from '../modelos/responses';

@Component({
   selector: "app-recursos-categoria",
   templateUrl: "./recursos-categoria.component.html",
   styleUrl: "./recursos-categoria.component.css",
})
export class RecursosCategoriaComponent {
   listaRecursos: Array<any>;
   message: string = "";
   formulario: FormGroup;
   hayError: boolean = false;
   mensajeError: string;

   constructor(
      private http: HttpClient,
      private fb: FormBuilder,
      private router: Router,
      private adminServicio: AdminService,
      private seleccionCategoria: SeleccionCategoriaService
   ) {}

   ngOnInit(): void {
      if (!this.adminServicio.hayUsuarioLogeado) {
         this.router.navigate(["/login"]);
         return;
      }

      this.seleccionCategoria.currentMessage.subscribe((message) => {
         this.message = message;
         console.log("Categoría seleccionada:", this.message);
         this.obtenerRecursosPorCategoria();
      });

      this.crearFormulario();
   }

   obtenerRecursosPorCategoria() {
      const url = `http://127.0.0.1:8000/consultarRecursos?tipo_recurso=${encodeURIComponent(
         this.message
      )}`;

      this.http.get<{ data: any[] }>(url).subscribe({
         next: (res) => {
            this.listaRecursos = res.data;
            console.log("Recursos obtenidos:", this.listaRecursos);
         },
         error: (error) => {
            console.error("Error al obtener recursos:", error);
            this.listaRecursos = [];
         },
      });
   }

   scrollTo(section: string) {
      document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
   }

   reservar(idRecurso: number) {
      const idUsuario = this.adminServicio.obtenerIdUsuario();

      if (!idUsuario) {
         this.mostrarError("Debes iniciar sesión para reservar un recurso.");
         return;
      }

      const datosFormulario = {
         id_usuario: idUsuario,
         id_recurso: idRecurso,
         fecha_reserva: this.formulario.value.fechaReserva,
         hora_reserva: this.formulario.value.inicioReserva + ":00", // ✅ Se agrega ":00" para formato válido
         estado: "Vigente", // ✅ Se asegura que se envíe un estado válido
      };

      console.log("Datos enviados para reserva:", datosFormulario);

      this.http
         .post("http://127.0.0.1:8000/agregarReserva", datosFormulario)
         .subscribe({
            next: (res) => this.mostrarError("Reserva realizada con éxito!"),
            error: (err) => {
               // Extraer el mensaje de error del backend
               let mensajeError = "Error desconocido al reservar";
               if (err.error && err.error.detail) {
                  // Si el backend devuelve un mensaje de error personalizado en 'detail'
                  mensajeError = `Error: ${err.error.detail}`;
               } else if (err.status) {
                  // Si el backend devuelve un código de estado HTTP pero sin mensaje específico
                  mensajeError = `Error HTTP ${err.status}: ${err.statusText}`;
               }

               // Mostrar el mensaje de error actualizado
               this.mostrarError(mensajeError);
            },
         });
   }

   mostrarError(mensaje: string) {
      this.hayError = true;
      this.mensajeError = mensaje;
      this.openAlertDialog();
   }

   crearFormulario() {
      this.formulario = this.fb.group({
         fechaReserva: ["", Validators.required],
         inicioReserva: ["", Validators.required],
         finReserva: ["", Validators.required],
      });
   }

   openAlertDialog(): void {
      window.alert(this.mensajeError);
   }
}
