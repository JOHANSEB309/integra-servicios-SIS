import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { PrestamoService } from '../prestamo.service';
import { reservaActivaResponse } from '../modelos/responses';

@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.component.html',
  styleUrl: './prestamos.component.css'
})

export class PrestamosComponent {

  listaHistorialReserva : Array<any>
  hayError: boolean = false;
  mensajeError:string;

  constructor(private http : HttpClient,private  fb:FormBuilder, private router:Router, private adminServicio:AdminService, private PrestamoService: PrestamoService){

  }
  
  ngOnInit(): void {

    if(this.adminServicio.hayUsuarioLogeado){
      this.obtenerReservasActivas();
    }else{
      this.router.navigate(['/login'])
    }
  }

  obtenerReservasActivas(){
    this.http.get<reservaActivaResponse>("http://127.0.0.1:8000/listaReservaActiva").subscribe(
      {
        next:(res)=>{
          this.listaHistorialReserva = res.data
          console.log(this.listaHistorialReserva)
        },
        error: (error) => {
          console.log(error)
        }
      })
  }

  mostrarError(mensaje:string){
    this.hayError = true
    this.mensajeError = mensaje
    this.openAlertDialog();
  }

  scrollTo(section: string) {
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  }

  openAlertDialog(): void {
    window.alert(this.mensajeError);
  }
}
