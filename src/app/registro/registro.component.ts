import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';

/**
 * @description Componente encargado del formulario de registro.
 * Implementa validaciones personalizadas y manejo de formulario reactivo.
 */
@Component({
  selector: 'app-registro',
  standalone: true,
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class RegistroComponent {

  /**
   * Mensaje de feedback mostrado al usuario tras la validación
   */
  mensaje: string = '';

  /**
   * Formulario reactivo que contiene todos los campos del registro
   */
  registroForm: FormGroup;

  /**
   * @param fb FormBuilder para la creación del formulario reactivo
   */
  constructor(private fb: FormBuilder) {
    this.registroForm = this.fb.group({
      nombre: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-ZÁÉÍÓÚáéíóúÑñ ]+$/)
      ]],
      usuario: ['', Validators.required],
      correo: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ]],
      clave: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).+$/)
      ]],
      clave2: ['', Validators.required],
      fecha: ['', [Validators.required, this.validarEdadMinima13]],
      direccion: [''],
      robot: [false, Validators.requiredTrue]
    }, { validators: this.validarClaves });
  }

  /**
   * Valida que las dos contraseñas ingresadas coincidan
   * @param group El formulario reactivo completo
   * @returns Un objeto de error si no coinciden, o null si son válidas
   */
  validarClaves(group: AbstractControl): ValidationErrors | null {
    const clave = group.get('clave')?.value;
    const clave2 = group.get('clave2')?.value;
    return clave === clave2 ? null : { clavesNoCoinciden: true };
  }

  /**
   * Valida que el usuario tenga al menos 13 años de edad
   * @param control Campo de fecha de nacimiento
   * @returns Error si es menor de 13 años, o null si es válido
   */
  validarEdadMinima13(control: AbstractControl): ValidationErrors | null {
    const valor = control.value;
    if (!valor) return null;

    const hoy = new Date();
    const fechaNacimiento = new Date(valor);
    const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = hoy.getMonth() - fechaNacimiento.getMonth();
    const dia = hoy.getDate() - fechaNacimiento.getDate();

    const esMayor = edad > 13 || (edad === 13 && (mes > 0 || (mes === 0 && dia >= 0)));
    return esMayor ? null : { edadMinima: true };
  }

  /**
   * Getter de los controles del formulario para facilitar acceso desde el template
   */
  get f() {
    return this.registroForm.controls;
  }

  /**
   * Ejecuta el registro si el formulario es válido.
   * Muestra mensaje de éxito o de error según validaciones.
   */
  registrarUsuario(): void {
    this.mensaje = '';

    if (this.registroForm.invalid) {
      this.mensaje = 'Todos los campos requeridos deben estar completos y válidos.';
      this.registroForm.markAllAsTouched();
      return;
    }

    this.mensaje = '¡Registro exitoso!';
    console.log(this.registroForm.value);
  }
}
