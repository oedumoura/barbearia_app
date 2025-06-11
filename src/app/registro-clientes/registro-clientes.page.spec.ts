import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroClientesPage } from './registro-clientes.page';

describe('RegistroClientesPage', () => {
  let component: RegistroClientesPage;
  let fixture: ComponentFixture<RegistroClientesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroClientesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
