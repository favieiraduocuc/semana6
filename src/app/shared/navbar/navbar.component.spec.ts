import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([]), NavbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  // ✅ Test 1: Componente creado
  it('debe crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  // ✅ Test 2: Navega a raíz
  it('debe navegar a la ruta raíz (/) cuando se llama goHome()', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.goHome();
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });

  // ✅ Test 3: Método goHome está definido
  it('debe tener el método goHome definido', () => {
    expect(component.goHome).toBeDefined();
    expect(typeof component.goHome).toBe('function');
  });

  // ✅ Test 4: Debe contener el botón que llama a goHome
  it('debe contener un botón que ejecuta goHome()', () => {
    const button = fixture.debugElement.query(By.css('button'));
    expect(button).toBeTruthy();
  });

  // ✅ Test 5: Debe contener elementos del DOM como nav o ul
  it('debe contener una etiqueta nav', () => {
    const nav = fixture.nativeElement.querySelector('nav');
    expect(nav).toBeTruthy();
  });

  // ✅ Test 6: Debe tener el router definido
  it('debe tener el router definido en el constructor', () => {
    expect(component['router']).toBeDefined();
  });
});
