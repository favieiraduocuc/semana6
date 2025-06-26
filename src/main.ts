import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './app/home/home.component';
import { LoginClienteComponent } from './app/auth/login-cliente/login-cliente.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginClienteComponent },

  // ✅ Ruta cliente
  {
    path: 'cliente',
    loadComponent: () =>
      import('./app/cliente/cliente.component').then(m => m.ClienteComponent)
  },

  // ✅ Ruta empleado (AGREGADA)
  {
    path: 'empleado',
    loadComponent: () =>
      import('./app/empleado/empleado.component').then(m => m.EmpleadoComponent)
  },

  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./app/auth/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent)
  },
  {
    path: 'seguimiento',
    loadComponent: () =>
      import('./app/seguimiento/seguimiento.component').then(m => m.SeguimientoComponent)
  },
  {
    path: 'cotizador',
    loadComponent: () =>
      import('./app/cotizador/cotizador.component').then(m => m.CotizadorComponent)
  },
  {
    path: 'contacto',
    loadComponent: () =>
      import('./app/contacto/contacto.component').then(m => m.ContactoComponent)
  },
  {
    path: 'registro',
    loadComponent: () =>
      import('./app/registro/registro.component').then(m => m.RegistroComponent)
  }
];

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      FormsModule,
      RouterModule.forRoot(routes)
    )
  ]
});
