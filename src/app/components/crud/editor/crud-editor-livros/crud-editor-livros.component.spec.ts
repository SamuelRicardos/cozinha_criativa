import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudEditorLivrosComponent } from './crud-editor-livros.component';

describe('CrudEditorLivrosComponent', () => {
  let component: CrudEditorLivrosComponent;
  let fixture: ComponentFixture<CrudEditorLivrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudEditorLivrosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrudEditorLivrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
