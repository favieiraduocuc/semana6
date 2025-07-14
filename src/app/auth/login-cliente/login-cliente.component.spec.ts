import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { LoginClienteComponent } from './login-cliente.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('LoginClienteComponent (template-driven)', () => {
  let component: LoginClienteComponent;
  let fixture: ComponentFixture<LoginClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule,
        LoginClienteComponent
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
            snapshot: {
              paramMap: {
                get: () => null
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ✅ Test 1
  it('debe crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  // ✅ Test 2
  it('debe mostrar mensaje si los campos están vacíos', () => {
    component.usuario = '';
    component.clave = '';
    component.loginCliente();
    expect(component.mensaje).toContain('Usuario o clave incorrecta');
  });

  // ✅ Test 3
  it('debe navegar a /cliente si las credenciales son correctas', () => {
    const spy = spyOn(component['router'], 'navigate');
    component.usuario = 'cliente';
    component.clave = '1234';
    component.loginCliente();
    expect(component.mensaje).toBe('');
    expect(spy).toHaveBeenCalledWith(['/cliente']);
  });

  // ✅ Test 4
  it('debe redirigir a /forgot-password desde el enlace', () => {
    const spy = spyOn(component['router'], 'navigate');
    const fakeEvent = new Event('click');
    spyOn(fakeEvent, 'preventDefault');
    component.irARecuperar(fakeEvent);
    expect(spy).toHaveBeenCalledWith(['/forgot-password']);
  });

  // ✅ Test 5
  it('no debe redirigir si las credenciales son incorrectas', () => {
    const spy = spyOn(component['router'], 'navigate');
    component.usuario = 'otro';
    component.clave = 'claveIncorrecta';
    component.loginCliente();
    expect(component.mensaje).toContain('Usuario o clave incorrecta');
    expect(spy).not.toHaveBeenCalled();
  });

  // ✅ Test 6
  it('mensaje debe limpiarse después de login exitoso', () => {
    component.usuario = 'cliente';
    component.clave = '1234';
    component.mensaje = 'Error anterior';
    component.loginCliente();
    expect(component.mensaje).toBe('');
  });
});
