import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContenidoService } from '../../nucleo/servicios/contenido.service';
import { InteraccionesService } from '../../nucleo/servicios/interacciones.service';

type EstadoEnvio = 'inicial' | 'enviando' | 'enviado' | 'error';

@Component({
  selector: 'app-contacto-comp',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contacto-comp.html',
  styleUrl: './contacto-comp.scss',
})
export class ContactoComp {
  private fb = inject(FormBuilder);
  private contenidoService = inject(ContenidoService);
  private interaccionesService = inject(InteraccionesService);

  contenido = this.contenidoService.obtenerContacto();
  estadoEnvio = signal<EstadoEnvio>('inicial');

  formulario = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    motivo: ['', Validators.required],
    mensaje: ['', [Validators.required, Validators.minLength(10)]],
  });

  enviarMensaje(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.estadoEnvio.set('enviando');

    const mensaje = this.formulario.getRawValue();

    this.interaccionesService.guardarMensaje({
      nombre: mensaje.nombre,
      email: mensaje.email,
      motivo: mensaje.motivo,
      mensaje: mensaje.mensaje,
    });

    this.estadoEnvio.set('enviado');
    this.formulario.reset();
  }

  campoInvalido(campo: keyof typeof this.formulario.controls): boolean {
    const control = this.formulario.controls[campo];
    return control.invalid && (control.dirty || control.touched);
  }

  obtenerUrlWhatsapp(): string {
    return `https://wa.me/${this.contenido.whatsapp}`;
  }

  obtenerUrlEmail(): string {
    return `mailto:${this.contenido.email}`;
  }
}