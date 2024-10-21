import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudEditorReceitasComponent } from './crud-editor-receitas.component';

describe('CrudEditorReceitasComponent', () => {
  let component: CrudEditorReceitasComponent;
  let fixture: ComponentFixture<CrudEditorReceitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudEditorReceitasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrudEditorReceitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
