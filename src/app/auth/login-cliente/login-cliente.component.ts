import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

declare var bootstrap: any;

/**
 * @description Componente de login para el usuario tipo cliente.
 * Valida credenciales básicas y permite acceso a la sección de cliente.
 */
@Component({
  selector: 'app-login-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login-cliente.component.html',
  styleUrls: ['./login-cliente.component.css']
})
export class LoginClienteComponent {

  /**
   * Nombre de usuario ingresado por el cliente
   */
  usuario: string = '';

  /**
   * Clave o contraseña ingresada por el cliente
   */
  clave: string = '';

  /**
   * Mensaje de error en caso de credenciales inválidas
   */
  mensaje: string = '';

  /**
   * @param router Inyección del Router para navegar a otras páginas
   */
  constructor(private router: Router) {}

  /**
   * Valida las credenciales del cliente.
   * Si son correctas, cierra el modal y navega al panel del cliente.
   * Si son incorrectas, muestra mensaje de error.
   * 
   * @returns void
   */
  loginCliente(): void {
    if (this.usuario === 'cliente' && this.clave === '1234') {
      this.mensaje = '';

      const modalElement = document.getElementById('loginClienteModal');
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      modalInstance?.hide();

      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) backdrop.remove();

      this.router.navigate(['/cliente']);
    } else {
      this.mensaje = 'Usuario o clave incorrecta.';
    }
  }

  /**
   * Redirige a la página de recuperación de contraseña y cierra el modal de login.
   * 
   * @param event Evento del clic en el enlace
   * @returns void
   */
  irARecuperar(event: Event): void {
    event.preventDefault();

    const modalElement = document.getElementById('loginClienteModal');
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance?.hide();

    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) backdrop.remove();

    this.router.navigate(['/forgot-password']);
  }
}
