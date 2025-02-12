import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { historialReservaResponse, reservaActivaResponse } from '../modelos/responses';

@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.component.html',
  styleUrl: './prestamos.component.css'
})
export class PrestamosComponent {

  prestamoForm : FormGroup
  hayError: boolean = false;
  mensajeError:string;

  constructor(private fb: FormBuilder, private prestamoService: Prestamos, private router: Router) {
    this.prestamoForm = this.fb.group({
      id_reserva: ['', Validators.required],
      id_empleado: ['', Validators.required],
      fecha_prestamo: ['', Validators.required],
      hora_prestamo: ['', Validators.required]
    });
  }
  
  ngOnInit(): void {

    if(this.adminServicio.hayUsuarioLogeado){
      this.router.navigate(['/prestamos'])
    }else{
      this.router.navigate(['/login'])
    }

  }

  registrarPrestamo() {
    if (this.prestamoForm.valid) {
      this.prestamoService.registrarPrestamo(this.prestamoForm.value).subscribe({
        next: (res) => {
          alert('Préstamo registrado exitosamente');
          this.router.navigate(['/pagina-principal-empleado']); // Redirigir a otra página si es necesario
        },
        error: (err) => {
          this.hayError = true;
          this.mensajeError = 'Error al registrar el préstamo';
          console.error(err);
        }
      });
    } else {
      this.hayError = true;
      this.mensajeError = 'Por favor, completa todos los campos requeridos';
    }
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
