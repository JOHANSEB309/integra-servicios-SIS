import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  hayUsuarioLogeado:boolean = false
  constructor() { }

  logearUsuario(){
    this.hayUsuarioLogeado = true
  }
}
