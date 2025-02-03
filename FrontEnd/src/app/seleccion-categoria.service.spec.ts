import { TestBed } from '@angular/core/testing';

import { SeleccionCategoriaService } from './seleccion-categoria.service';

describe('SeleccionCategoriaService', () => {
  let service: SeleccionCategoriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeleccionCategoriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
