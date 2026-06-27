import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../../nucleo/servicios/auth.service';

type EstadoLogin = 'inicial' | 'enviando' | 'error';

@Component({
  selector: 'app-login-admin-comp',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-admin-comp.html',
  styleUrl: './login-admin-comp.scss',
})
export class LoginAdminComp {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

  estado = signal<EstadoLogin>('inicial');

  formulario = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  iniciarSesion(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      this.estado.set('error');
      return;
    }

    this.estado.set('enviando');

    this.authService.login(this.formulario.getRawValue()).subscribe({
      next: () => {
        void this.router.navigate(['/oraculo/analytics']);
      },
      error: () => {
        this.estado.set('error');
      },
    });
  }
}