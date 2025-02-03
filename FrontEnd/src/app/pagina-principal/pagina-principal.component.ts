import { Component } from '@angular/core';
import { SeleccionCategoriaService } from '../seleccion-categoria.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrl: './pagina-principal.component.css'
})
export class PaginaPrincipalComponent {

  mensajeError:string;
  responseCode:number;
  hayError:boolean = false;
  datoTraducido: string;

  constructor(private seleccionCategoria: SeleccionCategoriaService, private http:HttpClient, private router:Router){
      
  }

  scrollTo(section: string) {
      document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  }

  guardarSeleccion(dato : string){
      
      if(dato == 'DZA'){
        this.datoTraducido = 'Salas de Danza'
      }else if(dato == 'AUD'){
        this.datoTraducido = 'Auditorios'
      }else if(dato == 'LAQ'){
        this.datoTraducido = 'Laboratorios de Quimica'
      }else if(dato == 'LAF'){
        this.datoTraducido = 'Laboratorios de Fisica'
      }else if(dato == 'LAI'){
        this.datoTraducido = 'Laboratorios de Informatica'
      }else if(dato == 'FUT'){
        this.datoTraducido = 'Canchas de Futbol'
      }else if(dato == 'LIB'){
        this.datoTraducido = 'Libros'
      }else if(dato == 'PCS'){
        this.datoTraducido = 'Computadoras'
      }else if(dato == 'TAB'){
        this.datoTraducido = 'Tablets'
      }
      this.seleccionCategoria.changeMessage(this.datoTraducido);
      const datoSeleccion = { 
        seleccion: dato
      }
      this.http.post("http://127.0.0.1:8000/categoriaSeleccionada",datoSeleccion).subscribe(
      {
        next: res =>{
          this.mostrarError("Envio exitoso!!!!"),
          this.router.navigate(['/recursos-categoria'])
        },
        error: err => this.mostrarError("Error al enviar la categoria seleccionada")
      })

    }

    mostrarError(mensaje:string){
      this.hayError = true
      this.mensajeError = mensaje
    }
}
