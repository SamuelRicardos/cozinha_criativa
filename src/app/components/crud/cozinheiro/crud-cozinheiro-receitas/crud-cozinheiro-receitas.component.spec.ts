import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudCozinheiroReceitasComponent } from './crud-cozinheiro-receitas.component';

describe('CrudCozinheiroReceitasComponent', () => {
  let component: CrudCozinheiroReceitasComponent;
  let fixture: ComponentFixture<CrudCozinheiroReceitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudCozinheiroReceitasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrudCozinheiroReceitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
