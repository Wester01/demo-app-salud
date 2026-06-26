import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContenidoService } from '../../nucleo/servicios/contenido.service';
import { InteraccionesService } from '../../nucleo/servicios/interacciones.service';

@Component({
  selector: 'app-conexion-comp',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './conexion-comp.html',
  styleUrl: './conexion-comp.scss',
})
export class ConexionComp {
  private contenidoService = inject(ContenidoService);
  private interaccionesService = inject(InteraccionesService);
  mensajeNewsletter = '';

  contenido = this.contenidoService.obtenerConexion();
  emailNewsletter = '';
  suscrito = signal(false);

  suscribirNewsletter(): void {
    const email = this.emailNewsletter.trim();

    if (!this.esEmailValido(email)) {
      this.mensajeNewsletter = 'Introduce un email válido.';
      return;
    }

    const resultado = this.interaccionesService.registrarSuscripcion(email);

    this.suscrito.set(true);
    this.emailNewsletter = '';

    this.mensajeNewsletter = resultado.nueva
      ? 'Suscripción registrada correctamente.'
      : 'Este email ya estaba registrado en la demo.';
  }

  private esEmailValido(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}