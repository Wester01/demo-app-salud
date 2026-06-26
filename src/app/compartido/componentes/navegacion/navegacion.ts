import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navegacion',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navegacion.html',
  styleUrls: ['./navegacion.scss']
})
export class Navegacion{

  scrolled = signal(false);

  @HostListener('window:scroll', [])
  onWindowScroll() {
    
    this.scrolled.set(window.scrollY > 50);
  }

  // Signal para gestionar si el menú móvil está abierto
  menuAbierto = signal(false);

  // Funcion para alternar el estado del menu
  alternarMenu(): void {
    this.menuAbierto.update(valor => !valor);
  }

  // Funcion para cerrar el menu al hacer click en un enlace
  cerrarMenu(): void {
    this.menuAbierto.set(false);
  }
}
