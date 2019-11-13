import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderVendorTempPage } from './order-vendor-temp.page';

describe('OrderVendorTempPage', () => {
  let component: OrderVendorTempPage;
  let fixture: ComponentFixture<OrderVendorTempPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderVendorTempPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderVendorTempPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
