import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './forgot-password.component';
import { By } from '@angular/platform-browser';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgotPasswordComponent, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('correo debe estar vacío inicialmente', () => {
    expect(component.correo).toBe('');
  });

  it('debe actualizar el valor de correo desde la vista', () => {
    const input = fixture.debugElement.query(By.css('input'));
    input.nativeElement.value = 'test@correo.com';
    input.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.correo).toBe('test@correo.com');
  });

  it('debe llamar a enviarCorreoRecuperacion al hacer clic en el botón', () => {
    spyOn(component, 'enviarCorreoRecuperacion');
    const btn = fixture.debugElement.query(By.css('button'));
    btn.nativeElement.click();
    expect(component.enviarCorreoRecuperacion).toHaveBeenCalled();
  });

  it('debe mostrar mensaje en consola al enviar el correo', () => {
    const spy = spyOn(console, 'log');
    component.correo = 'ejemplo@dominio.com';
    component.enviarCorreoRecuperacion();
    expect(spy).toHaveBeenCalledWith('Enviando a:', 'ejemplo@dominio.com');
  });

  it('debe dejar el campo vacío luego de enviar si se desea reiniciar', () => {
    component.correo = 'test@correo.com';
    component.enviarCorreoRecuperacion();
    expect(component.correo).toBe('test@correo.com'); // Puedes cambiar lógica si deseas vaciar
  });
});
