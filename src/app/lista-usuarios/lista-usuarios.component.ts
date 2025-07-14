import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ Importar FormsModule
import { UsuarioService } from '../servicios/usuario.service';
import { Usuario } from '../modelo/usuario.model';

@Component({
  selector: 'app-lista-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule], // ✅ Agregado aquí también
  templateUrl: './lista-usuarios.component.html'
})
export class ListaUsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];

  nuevoUsuario: Usuario = {
    nombre: '',
    usuario: '',
    correo: '',
    clave: '',
    fecha: '',
    direccion: ''
  };

  modoEdicion = false;
  indexEditando = -1;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioService.getUsuarios().subscribe(
      data => {
        this.usuarios = data;
      },
      error => {
        console.error('Error cargando usuarios:', error);
      }
    );
  }

  eliminarUsuario(index: number): void {
    this.usuarios.splice(index, 1);
  }

  editarUsuario(index: number): void {
    this.modoEdicion = true;
    this.indexEditando = index;
    this.nuevoUsuario = { ...this.usuarios[index] };
  }

  guardarEdicion(): void {
    if (this.indexEditando !== -1) {
      this.usuarios[this.indexEditando] = { ...this.nuevoUsuario };
      this.cancelarEdicion();
    }
  }

  cancelarEdicion(): void {
    this.modoEdicion = false;
    this.indexEditando = -1;
    this.nuevoUsuario = {
      nombre: '',
      usuario: '',
      correo: '',
      clave: '',
      fecha: '',
      direccion: ''
    };
  }

  agregarUsuario(): void {
    const nuevo = { ...this.nuevoUsuario };

    if (!nuevo.nombre || !nuevo.usuario || !nuevo.correo || !nuevo.clave) {
      alert('Por favor, completa los campos obligatorios.');
      return;
    }

    this.usuarios.push(nuevo);

    this.nuevoUsuario = {
      nombre: '',
      usuario: '',
      correo: '',
      clave: '',
      fecha: '',
      direccion: ''
    };
  }
}
