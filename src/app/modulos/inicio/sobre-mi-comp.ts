import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ContenidoService } from '../../nucleo/servicios/contenido.service';

@Component({
  selector: 'app-sobre-mi-comp',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sobre-mi-comp.html',
  styleUrl: './sobre-mi-comp.scss',
})
export class SobreMiComp {
  private contenidoService = inject(ContenidoService);

  colaboradoresDemo = [
    {
      nombre: 'Akak demo',
      logo: 'logos/logo-akak.png',
    },
    {
      nombre: 'Alquinaterra demo',
      logo: 'logos/logo-alquinaterra.png',
    },
    {
      nombre: 'Your Advertisement Here',
      logo: 'logos/promo.png',
    },
  ];

  contenido = this.contenidoService.obtenerSobreMi();
}