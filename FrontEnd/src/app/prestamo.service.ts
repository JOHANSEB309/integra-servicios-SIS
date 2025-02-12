import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrestamoService {

  hayUsuarioLogeado:boolean = false
  idEmpleado: any;

  constructor() { }

  logearUsuario(){
    this.hayUsuarioLogeado = true
  }
}
