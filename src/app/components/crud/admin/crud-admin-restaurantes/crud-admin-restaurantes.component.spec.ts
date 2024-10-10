import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudAdminRestaurantesComponent } from './crud-admin-restaurantes.component';

describe('CrudAdminRestaurantesComponent', () => {
  let component: CrudAdminRestaurantesComponent;
  let fixture: ComponentFixture<CrudAdminRestaurantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudAdminRestaurantesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrudAdminRestaurantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
