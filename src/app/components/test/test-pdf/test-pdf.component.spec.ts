import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPdfComponent } from './test-pdf.component';

describe('TestPdfComponent', () => {
  let component: TestPdfComponent;
  let fixture: ComponentFixture<TestPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestPdfComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
