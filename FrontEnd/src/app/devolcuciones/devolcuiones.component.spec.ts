import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarReservasComponent } from './devoluciones.component';

describe('AdministrarReservasComponent', () => {
  let component: AdministrarReservasComponent;
  let fixture: ComponentFixture<AdministrarReservasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdministrarReservasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdministrarReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
