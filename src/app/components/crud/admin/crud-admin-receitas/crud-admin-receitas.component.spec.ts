import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudAdminReceitasComponent } from './crud-admin-receitas.component';

describe('CrudAdminReceitasComponent', () => {
  let component: CrudAdminReceitasComponent;
  let fixture: ComponentFixture<CrudAdminReceitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudAdminReceitasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrudAdminReceitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
