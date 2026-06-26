import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ContenidoService } from '../../nucleo/servicios/contenido.service';

@Component({
  selector: 'app-about-comp',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-comp.html',
  styleUrl: './about-comp.scss',
})
export class AboutComp {
  private contenidoService = inject(ContenidoService);

  contenido = this.contenidoService.obtenerSobreMi();
}