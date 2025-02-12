import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AdminService } from "../admin.service";
import { LogResponse } from "../modelos/responses";

@Component({
   selector: "app-login",
   templateUrl: "./login.component.html",
   styleUrl: "./login.component.css",
})
export class LoginComponent {
   formularioRegistro: FormGroup;
   formularioLogin: FormGroup;
   hayError: boolean = false;
   mensajeErrorLogin: string;
   mensajeErrorRegistro: string;
   responseCode: number;

   constructor(
      private http: HttpClient,
      private fb: FormBuilder,
      private router: Router,
      private adminServicio: AdminService
   ) {}

   ngOnInit() {
      if (this.adminServicio.hayUsuarioLogeado) {
         this.router.navigate(["/"]);
      }
      this.crearFormularioRegistro();
      this.crearFormularioLogin();
   }

   revisarLogIn() {
      this.hayError = false;
      this.http
         .post<{ codigo: number; message: string; id_usuario: number }>(
            "http://127.0.0.1:8000/validate/",
            this.formularioLogin.value
         )
         .subscribe({
            next: (res) =>
               this.completarLogIn(res.codigo, res.message, res.id_usuario),
            error: (err) =>
               this.completarLogIn(
                  404,
                  "Hubo un error con el servidor, Inténtalo nuevamente",
                  null
               ),
         });
   }

   async completarLogIn(
      code: number,
      message: string,
      idUsuario: number | null
   ) {
      this.responseCode = code;
      this.mensajeErrorLogin = message;
      if (this.responseCode == 404) {
         this.hayError = true;
      } else {
         if (idUsuario) {
            this.adminServicio.logearUsuario(idUsuario); // ✅ Guardamos el ID del usuario logueado
            this.router.navigate(["/"]);
         }
      }
   }

   crearFormularioLogin() {
      this.formularioLogin = this.fb.group({
         correo: [
            "",
            Validators.compose([Validators.required, Validators.email]),
         ],
         contrasena: ["", Validators.required],
      });
   }

  registrarse(){
    const datosFormularioRegistro = {
      nombre:this.formularioRegistro.value.nombre,
      telefono: this.formularioRegistro.value.telefono,
      correoElectronico: this.formularioRegistro.value.correoElectronico,
      contrasena: this.formularioRegistro.value.contrasena
    }
    this.hayError = false
    console.log(datosFormularioRegistro)
    this.http.post("https://backend-integraservicios.onrender.com/registrarUsuario",datosFormularioRegistro).subscribe(
      {
        next: res => this.mostrarError("Envio exitoso!!!!"),
        error: err => this.mostrarError("Error al enviar el formulario")
      })
  }

   mostrarError(mensaje: string) {
      this.hayError = true;
      this.mensajeErrorRegistro = mensaje;
   }

   crearFormularioRegistro() {
      this.formularioRegistro = this.fb.group({
         nombre: ["", Validators.required],
         email: ["", Validators.required],
         telefono: ["", Validators.required],
         contrasena: ["", Validators.required],
      });
   }
}
