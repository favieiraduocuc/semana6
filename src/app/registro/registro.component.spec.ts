import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroComponent } from './registro.component';

describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('formulario debe ser válido si se ingresan datos correctos', () => {
    const fechaValida = new Date();
    fechaValida.setFullYear(fechaValida.getFullYear() - 20);
    const fechaStr = fechaValida.toISOString().split('T')[0];

    component.registroForm.setValue({
      nombre: 'Juan Pérez',
      usuario: 'juan123',
      correo: 'juan@example.com',
      clave: 'abc123!',
      clave2: 'abc123!',
      fecha: fechaStr,
      direccion: 'Mi casa',
      robot: true
    });

    component.registroForm.markAllAsTouched();
    fixture.detectChanges();

    expect(component.registroForm.valid).toBeTrue();
  });

  it('debe marcar error si las claves no coinciden', () => {
    component.registroForm.setValue({
      nombre: 'Ana',
      usuario: 'ana123',
      correo: 'ana@mail.com',
      clave: 'abc123!',
      clave2: 'diferente123!',
      fecha: '1990-01-01',
      direccion: '',
      robot: true
    });

    fixture.detectChanges();

    const error = component.registroForm.errors;
    expect(error?.['clavesNoCoinciden']).toBeTrue();
  });

  it('debe marcar error si correo no tiene formato válido', () => {
    component.registroForm.get('correo')?.setValue('correo-no-valido');
    component.registroForm.get('correo')?.markAsTouched();

    fixture.detectChanges();

    const errors = component.f['correo'].errors;
    expect(errors).toBeTruthy();
    expect(errors?.['email'] || errors?.['pattern']).toBeTrue();
  });

  it('formulario debe ser inválido al inicio', () => {
    expect(component.registroForm.valid).toBeFalse();
  });

  it('debe marcar error si el nombre contiene caracteres inválidos', () => {
    component.registroForm.get('nombre')?.setValue('Juan123@');
    component.registroForm.get('nombre')?.markAsTouched();

    fixture.detectChanges();

    const errors = component.f['nombre'].errors;
    expect(errors).toBeTruthy();
    expect(errors?.['pattern']).toBeTruthy(); // ✅ Cambiado de toBeTrue() a toBeTruthy()
  });

});
