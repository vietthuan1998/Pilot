import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBrandComponent } from './delete-brand.component';

describe('DeleteBrandComponent', () => {
  let component: DeleteBrandComponent;
  let fixture: ComponentFixture<DeleteBrandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteBrandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
