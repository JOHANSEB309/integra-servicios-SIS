import { Injectable } from "@angular/core";

@Injectable({
   providedIn: "root",
})
export class AdminService {
   hayUsuarioLogeado: boolean = false;
   private idUsuario: number | null = null; // ✅ Guardamos el ID del usuario logueado

   constructor() {}

   logearUsuario(id: number) {
      this.hayUsuarioLogeado = true;
      this.idUsuario = id; // ✅ Guardamos el ID cuando el usuario inicia sesión
      localStorage.setItem("idUsuario", id.toString()); // ✅ Lo almacenamos en `localStorage`
   }

   obtenerIdUsuario(): number | null {
      if (this.idUsuario === null) {
         const idGuardado = localStorage.getItem("idUsuario");
         if (idGuardado) {
            this.idUsuario = parseInt(idGuardado, 10);
         }
      }
      return this.idUsuario;
   }

   cerrarSesion() {
      this.hayUsuarioLogeado = false;
      this.idUsuario = null;
      localStorage.removeItem("idUsuario"); // ✅ Eliminamos el ID del almacenamiento
   }
}
