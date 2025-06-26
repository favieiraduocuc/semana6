import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

declare var bootstrap: any;

/**
 * @description Componente encargado de recuperar contraseña del usuario.
 * Muestra un formulario para ingresar el correo y valida antes de enviar.
 */
@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  /**
   * Dirección de correo ingresada por el usuario
   */
  correo: string = '';

  /**
   * Mensaje de error mostrado en pantalla si hay validaciones fallidas
   */
  mensajeError: string = '';

  /**
   * @param router Inyección del Router para redirigir tras envío exitoso
   */
  constructor(private router: Router) {}

  /**
   * Envía el correo de recuperación si pasa las validaciones.
   * Muestra un toast de confirmación y redirige al home.
   * 
   * @returns void
   */
  enviarCorreoRecuperacion(): void {
    // ✅ Validación: campo vacío
    if (!this.correo.trim()) {
      this.mensajeError = 'El correo no puede estar vacío.';
      return;
    }

    // ✅ Validación: formato de correo
    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.correo);
    if (!correoValido) {
      this.mensajeError = 'El formato del correo no es válido.';
      return;
    }

    // ✅ Si pasa validaciones
    this.mensajeError = '';
    console.log('Enviando a:', this.correo);

    const toastEl = document.getElementById('toastConfirmacion');
    if (toastEl) {
      const toast = new bootstrap.Toast(toastEl);
      toast.show();

      setTimeout(() => {
        toast.hide();
        this.router.navigate(['/']);
      }, 1000);
    }
  }
}
