import { Routes } from '@angular/router';
import { LoginClienteComponent } from './auth/login-cliente/login-cliente.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { SeguimientoComponent } from './seguimiento/seguimiento.component';
import { CotizadorComponent } from './cotizador/cotizador.component';
import { ContactoComponent } from './contacto/contacto.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login-cliente', component: LoginClienteComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'seguimiento', component: SeguimientoComponent },
  { path: 'cotizador', component: CotizadorComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'registro', loadComponent: () => import('./registro/registro.component').then(m => m.RegistroComponent) }
];
