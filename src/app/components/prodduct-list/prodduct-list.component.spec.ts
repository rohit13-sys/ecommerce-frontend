import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdductListComponent } from './prodduct-list.component';

describe('ProdductListComponent', () => {
  let component: ProdductListComponent;
  let fixture: ComponentFixture<ProdductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdductListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
