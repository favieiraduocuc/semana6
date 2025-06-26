import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LoginClienteComponent } from '../../auth/login-cliente/login-cliente.component';
import { LoginEmpleadoComponent } from '../../auth/login-empleado/login-empleado.component';

/**
 * @description Componente de barra de navegación principal.
 * Contiene enlaces y modales de inicio de sesión para clientes y empleados.
 */
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LoginClienteComponent,
    LoginEmpleadoComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  /**
   * @param router Servicio de navegación para redirigir al home
   */
  constructor(private router: Router) {}

  /**
   * Navega a la página de inicio
   * 
   * @returns void
   */
  goHome(): void {
    this.router.navigate(['/']);
  }
}
