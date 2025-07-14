import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // ✅
import { FormsModule } from '@angular/forms';
import { ListaUsuariosComponent } from './lista-usuarios.component';

describe('ListaUsuariosComponent', () => {
  let component: ListaUsuariosComponent;
  let fixture: ComponentFixture<ListaUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ListaUsuariosComponent,
        HttpClientTestingModule, // ✅
        FormsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListaUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a new user', () => {
    component.nuevoUsuario = {
      nombre: 'Juan',
      usuario: 'juan123',
      correo: 'juan@mail.com',
      clave: '1234',
      fecha: '2025-01-01',
      direccion: 'Santiago'
    };

    component.agregarUsuario();

    expect(component.usuarios.length).toBe(1);
    expect(component.usuarios[0].nombre).toBe('Juan');
  });

  it('should not add user if required fields are missing', () => {
    component.nuevoUsuario = {
      nombre: '',
      usuario: '',
      correo: '',
      clave: '',
      fecha: '',
      direccion: ''
    };

    spyOn(window, 'alert');
    component.agregarUsuario();

    expect(window.alert).toHaveBeenCalledWith('Por favor, completa los campos obligatorios.');
    expect(component.usuarios.length).toBe(0);
  });

  it('should delete a user', () => {
    component.usuarios = [{
      nombre: 'Ana',
      usuario: 'ana123',
      correo: 'ana@mail.com',
      clave: '1234',
      fecha: '2025-01-01',
      direccion: 'Valparaíso'
    }];

    component.eliminarUsuario(0);
    expect(component.usuarios.length).toBe(0);
  });

  it('should edit a user', () => {
    component.usuarios = [{
      nombre: 'Luis',
      usuario: 'luis123',
      correo: 'luis@mail.com',
      clave: '1234',
      fecha: '2025-01-01',
      direccion: 'Rancagua'
    }];

    component.editarUsuario(0);
    component.nuevoUsuario.nombre = 'Luis Editado';
    component.guardarEdicion();

    expect(component.usuarios[0].nombre).toBe('Luis Editado');
  });

  it('should cancel editing and reset the form', () => {
    component.modoEdicion = true;
    component.indexEditando = 0;
    component.nuevoUsuario.nombre = 'Temporal';

    component.cancelarEdicion();

    expect(component.modoEdicion).toBeFalse();
    expect(component.indexEditando).toBe(-1);
    expect(component.nuevoUsuario.nombre).toBe('');
  });
});
