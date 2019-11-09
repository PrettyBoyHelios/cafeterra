import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderVendorPage } from './order-vendor.page';

describe('OrderVendorPage', () => {
  let component: OrderVendorPage;
  let fixture: ComponentFixture<OrderVendorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderVendorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderVendorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
