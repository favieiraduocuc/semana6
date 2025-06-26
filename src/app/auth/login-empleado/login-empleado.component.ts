import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

declare var bootstrap: any;

/**
 * @description Componente de login para usuarios tipo empleado.
 * Permite validar credenciales y redirigir al panel correspondiente.
 */
@Component({
  selector: 'app-login-empleado',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login-empleado.component.html',
  styleUrls: ['./login-empleado.component.css']
})
export class LoginEmpleadoComponent {

  /**
   * Nombre de usuario ingresado por el empleado
   */
  usuario: string = '';

  /**
   * Clave o contraseña ingresada por el empleado
   */
  clave: string = '';

  /**
   * Mensaje de error mostrado si las credenciales no son válidas
   */
  mensaje: string = '';

  /**
   * @param router Inyección del Router para navegación
   */
  constructor(private router: Router) {}

  /**
   * Valida las credenciales del empleado.
   * Si son correctas, cierra el modal y navega al panel del empleado.
   * Si son incorrectas, muestra mensaje de error.
   * 
   * @returns void
   */
  loginEmpleado(): void {
    if (this.usuario === 'empleado' && this.clave === '4321') {
      this.mensaje = '';

      const modalElement = document.getElementById('loginEmpleadoModal');
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      modalInstance?.hide();

      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) backdrop.remove();

      this.router.navigate(['/empleado']);
    } else {
      this.mensaje = 'Usuario o clave incorrecta.';
    }
  }

  /**
   * Redirige a la página de recuperación de contraseña desde el login.
   * Cierra el modal antes de redirigir.
   * 
   * @param event Evento de clic en el enlace
   * @returns void
   */
  irARecuperar(event: Event): void {
    event.preventDefault();

    const modalElement = document.getElementById('loginEmpleadoModal');
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance?.hide();

    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) backdrop.remove();

    this.router.navigate(['/forgot-password']);
  }
}
