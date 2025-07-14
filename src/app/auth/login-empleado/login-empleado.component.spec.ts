import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { LoginEmpleadoComponent } from './login-empleado.component';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginEmpleadoComponent (template-driven)', () => {
  let component: LoginEmpleadoComponent;
  let fixture: ComponentFixture<LoginEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule,
        LoginEmpleadoComponent // ✅ Componente standalone correctamente importado
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ✅ Test 1: Componente creado
  it('debe crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  // ✅ Test 2: Campos vacíos
  it('debe mostrar mensaje si los campos están vacíos', () => {
    component.usuario = '';
    component.clave = '';
    component.loginEmpleado();
    expect(component.mensaje).toContain('Usuario o clave incorrecta');
  });

  // ✅ Test 3: Credenciales correctas
  it('debe navegar a /empleado si las credenciales son correctas', () => {
    const spy = spyOn(component['router'], 'navigate');
    component.usuario = 'empleado';
    component.clave = '4321';
    component.loginEmpleado();
    expect(component.mensaje).toBe('');
    expect(spy).toHaveBeenCalledWith(['/empleado']);
  });

  // ✅ Test 4: Redirección a forgot-password
  it('debe redirigir a /forgot-password desde el enlace', () => {
    const spy = spyOn(component['router'], 'navigate');
    const fakeEvent = new Event('click');
    spyOn(fakeEvent, 'preventDefault');
    component.irARecuperar(fakeEvent);
    expect(spy).toHaveBeenCalledWith(['/forgot-password']);
  });

  // ✅ Test 5: Input de usuario presente
  it('debe contener un input para el usuario', () => {
    const inputUsuario = fixture.debugElement.query(By.css('input[name="usuario"]'));
    expect(inputUsuario).toBeTruthy();
  });

  // ✅ Test 6: Botón de login presente
  it('debe contener un botón con texto "Ingresar"', () => {
    const boton = fixture.debugElement.query(By.css('button[type="submit"]'));
    expect(boton.nativeElement.textContent).toContain('Ingresar');
  });
});
