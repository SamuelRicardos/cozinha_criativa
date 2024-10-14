import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudAdminLivrosComponent } from './crud-admin-livros.component';

describe('CrudAdminLivrosComponent', () => {
  let component: CrudAdminLivrosComponent;
  let fixture: ComponentFixture<CrudAdminLivrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudAdminLivrosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrudAdminLivrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
