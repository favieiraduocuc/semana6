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

@Component({
  selector: 'app-empleado',
  standalone: true,
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class EmpleadoComponent {
  mensaje: string = '';
  registroForm: FormGroup;

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

  validarClaves(group: AbstractControl): ValidationErrors | null {
    const clave = group.get('clave')?.value;
    const clave2 = group.get('clave2')?.value;
    return clave === clave2 ? null : { clavesNoCoinciden: true };
  }

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

  get f() {
    return this.registroForm.controls;
  }

  registrarUsuario() {
    this.mensaje = '';

    if (this.registroForm.invalid) {
      this.mensaje = 'Todos los campos requeridos deben estar completos y válidos.';
      this.registroForm.markAllAsTouched();
      return;
    }

    this.mensaje = '¡Registro de empleado exitoso!';
    console.log(this.registroForm.value);
  }
}
