import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursosCategoriaComponent } from './recursos-categoria.component';

describe('RecursosCategoriaComponent', () => {
  let component: RecursosCategoriaComponent;
  let fixture: ComponentFixture<RecursosCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecursosCategoriaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecursosCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
