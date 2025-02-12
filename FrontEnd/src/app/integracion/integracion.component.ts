import { Component } from '@angular/core';
import { AdminService } from '../admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { categoriaSeleccionadaResponse } from '../modelos/responses';

@Component({
  selector: 'app-integracion',
  templateUrl: './integracion.component.html',
  styleUrl: './integracion.component.css'
})
export class IntegracionComponent {
  
  listaRecursos : Array<any>
  message: string = ''
  formulario: FormGroup;
  hayError: boolean = false;
  mensajeError:string;

  constructor(private http : HttpClient,private  fb:FormBuilder, private router:Router, private adminServicio:AdminService){

  }
  
  ngOnInit(): void {
    
    this.router.navigate(['/integracion'])
    
      
    this.http.get<categoriaSeleccionadaResponse>("https://backend-integraservicios.onrender.com/api/recursosDisponibles").subscribe(
      {
        next:(res)=>{
          console.log("Respuesta completa:", res);
          this.listaRecursos = res.recursos_disponibles
          console.log(this.listaRecursos)

          if (Array.isArray(res.data)) {
            this.listaRecursos = res.data;
            console.log("Si es un array")
          } else {
            console.error("La respuesta no es un array:", res.data);
          }
          
        },
        error: (error) => {
          console.log(error)
        }
      })
      this.crearFormulario();
  }

  reservar(dato:string){
    const datosFormulario = {
      idRecurso: dato,
      fechaReserva:this.formulario.value.fechaReserva,
      inicioReserva: this.formulario.value.inicioReserva,
      finReserva: this.formulario.value.finReserva
    }
    this.hayError = false
    console.log(datosFormulario)
    this.http.post("https://backend-integraservicios.onrender.com//agregarReserva",datosFormulario).subscribe(
      {
        next: res => this.mostrarError("Envio exitoso!!!!"),
        error: err => this.mostrarError("Error al reservar")
      })
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
