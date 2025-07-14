import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UsuarioService } from './usuario.service';
import { Usuario } from '../modelo/usuario.model';

describe('UsuarioService', () => {
  let service: UsuarioService;
  let httpMock: HttpTestingController;

  const mockUsuarios: Usuario[] = [
    { nombre: 'Juan', usuario: 'juan123', correo: 'juan@mail.com', clave: '123', fecha: '2025-01-01', direccion: 'Chile' },
    { nombre: 'Ana', usuario: 'ana456', correo: 'ana@mail.com', clave: '456', fecha: '2025-01-02', direccion: 'Chile' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(UsuarioService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch users from JSON', () => {
    service.getUsuarios().subscribe(usuarios => {
      expect(usuarios.length).toBe(2);
      expect(usuarios).toEqual(mockUsuarios);
    });

    const req = httpMock.expectOne('https://raw.githubusercontent.com/favieiraduocuc/lumora-json/main/usuarios.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsuarios);
  });

  it('should handle error if JSON fetch fails', () => {
    service.getUsuarios().subscribe({
      next: () => fail('Debería fallar'),
      error: (error) => {
        expect(error.status).toBe(404);
      }
    });

    const req = httpMock.expectOne('https://raw.githubusercontent.com/favieiraduocuc/lumora-json/main/usuarios.json');
    req.flush('Error 404', { status: 404, statusText: 'Not Found' });
  });

  it('should return empty array if no users', () => {
    service.getUsuarios().subscribe(usuarios => {
      expect(usuarios.length).toBe(0);
    });

    const req = httpMock.expectOne('https://raw.githubusercontent.com/favieiraduocuc/lumora-json/main/usuarios.json');
    req.flush([]);
  });

  it('should make two GET requests when called twice', () => {
    service.getUsuarios().subscribe();
    service.getUsuarios().subscribe();

    const reqs = httpMock.match('https://raw.githubusercontent.com/favieiraduocuc/lumora-json/main/usuarios.json');
    expect(reqs.length).toBe(2);
    reqs.forEach(req => req.flush(mockUsuarios));
  });

  it('should contain required user fields', () => {
    service.getUsuarios().subscribe(usuarios => {
      const user = usuarios[0];
      expect(user.nombre).toBeDefined();
      expect(user.usuario).toBeDefined();
      expect(user.correo).toBeDefined();
    });

    const req = httpMock.expectOne('https://raw.githubusercontent.com/favieiraduocuc/lumora-json/main/usuarios.json');
    req.flush(mockUsuarios);
  });
});
