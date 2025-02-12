import { Component } from '@angular/core';
import { AdminService } from '../admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { categoriaSeleccionadaResponse } from '../modelos/responses';
import { ApiResponseV2 } from '../modelos/responses';

@Component({
  selector: 'app-integracion',
  templateUrl: './integracion.component.html',
  styleUrl: './integracion.component.css'
})
export class IntegracionComponent {
  
  listaRecursos : Array<any>
  nuestra : Array<any>
  message: string = ''
  formulario: FormGroup;
  hayError: boolean = false;
  mensajeError:string;

  constructor(private http : HttpClient,private  fb:FormBuilder, private router:Router, private adminServicio:AdminService){

  }
  
  ngOnInit(): void {
    this.router.navigate(['/integracion']);
  
    // Hacer la primera petición
    this.http.get<ApiResponseV2>("https://progranovaintegraserviciosback-production.up.railway.app/integraservicios/api/external?id=1")
      .subscribe({
        next: (res) => {
          console.log("Respuesta de la primera API:", res);
          this.listaRecursos = res.data.recursos_disponibles;
          console.log("Lista de recursos primera API:", this.listaRecursos);
        },
        error: (error) => {
          console.log("Error en la primera API:", error);
        }
      });
  
    // Hacer la segunda petición
    this.http.get<categoriaSeleccionadaResponse>("https://backend-integraservicios.onrender.com/api/recursosDisponibles")
      .subscribe({
        next: (res) => {
          console.log("Respuesta de la segunda API:", res);
          this.nuestra = res.recursos_disponibles; // Cambiado a 'res.recursos_disponibles'
          console.log("Lista de recursos segunda API:", this.nuestra);
        },
        error: (error) => {
          console.log("Error en la segunda API:", error);
        }
      });
  
    // Crear el formulario una vez
    this.crearFormulario();
  }

  
  scrollTo(section: string) {
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  }

  mostrarError(mensaje:string){
    this.hayError = true
    this.mensajeError = mensaje
    this.openAlertDialog();
  }

  crearFormulario(){
    this.formulario = this.fb.group({
      fechaReserva:['',Validators.required],
      inicioReserva:['',Validators.required],
      finReserva:['',Validators.required]
    })
  }

  openAlertDialog(): void {
    window.alert(this.mensajeError);
  }

}
