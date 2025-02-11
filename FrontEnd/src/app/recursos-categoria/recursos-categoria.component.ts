import { Component } from '@angular/core';
import { SeleccionCategoriaService } from '../seleccion-categoria.service';
import { AdminService } from '../admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { categoriaSeleccionadaResponse } from '../modelos/responses';

@Component({
  selector: 'app-recursos-categoria',
  templateUrl: './recursos-categoria.component.html',
  styleUrl: './recursos-categoria.component.css'
})
export class RecursosCategoriaComponent {
  
  listaRecursos : Array<any>
  message: string = ''
  formulario: FormGroup;
  hayError: boolean = false;
  mensajeError:string;

  constructor(private http : HttpClient,private  fb:FormBuilder, private router:Router, private adminServicio:AdminService, private seleccionCategoria:SeleccionCategoriaService){

  }
  
  ngOnInit(): void {
    if(this.adminServicio.hayUsuarioLogeado){
      this.router.navigate(['/recursos-categoria'])
    }else{
      this.router.navigate(['/login'])
    }
    this.seleccionCategoria.currentMessage.subscribe(message => this.message = message);
    this.http.get<categoriaSeleccionadaResponse>("https://backend-integraservicios.onrender.com/consultarRecursos/").subscribe(
      {
        next:(res)=>{
          console.log("Respuesta completa:", res);
          this.listaRecursos = res.data
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
  
  scrollTo(section: string) {
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
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
