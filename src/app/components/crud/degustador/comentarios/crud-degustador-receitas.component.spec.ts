import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudDegustadorComentariosComponent } from './crud-degustador-receitas.component';

describe('CrudDegustadorReceitasComponent', () => {
  let component: CrudDegustadorComentariosComponent;
  let fixture: ComponentFixture<CrudDegustadorComentariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudDegustadorComentariosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrudDegustadorComentariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

