import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmpleadoComponent } from './empleado.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('EmpleadoComponent', () => {
  let component: EmpleadoComponent;
  let fixture: ComponentFixture<EmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpleadoComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 1 }), // simula Observable de parámetros de ruta
            snapshot: { paramMap: { get: () => '1' } } // simula acceso directo con snapshot
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // detecta cambios del ciclo de vida
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
