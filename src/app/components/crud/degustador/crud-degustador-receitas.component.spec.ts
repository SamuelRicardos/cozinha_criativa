import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudDegustadorReceitasComponent } from './crud-degustador-receitas.component';

describe('CrudDegustadorReceitasComponent', () => {
  let component: CrudDegustadorReceitasComponent;
  let fixture: ComponentFixture<CrudDegustadorReceitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudDegustadorReceitasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrudDegustadorReceitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

