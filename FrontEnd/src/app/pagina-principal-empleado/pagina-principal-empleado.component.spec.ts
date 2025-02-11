import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaPrincipalEmpleadoComponent } from './pagina-principal-empleado.component';

describe('PaginaPrincipalEmpleadoComponent', () => {
  let component: PaginaPrincipalEmpleadoComponent;
  let fixture: ComponentFixture<PaginaPrincipalEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginaPrincipalEmpleadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaginaPrincipalEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
