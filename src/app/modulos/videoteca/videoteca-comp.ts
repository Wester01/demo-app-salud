import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { VideoService } from '../../nucleo/servicios/videoteca.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-videoteca-comp',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './videoteca-comp.html',
  styleUrl: './videoteca-comp.scss',
})
export class VideotecaComp {
  public listaVideos: any[] = [];
  public videoSeleccionado: SafeResourceUrl | null = null;
  public mostrarModal: boolean = false;

  constructor(
    private videoService: VideoService,
    private sanitizer: DomSanitizer // Necesario para que Angular confíe en la URL de YouTube
  ) { }


  ngOnInit(): void {
    this.listaVideos = this.videoService.listarVideos();
  }

  /**
   * Abre el reproductor incrustando el ID de YouTube de forma segura
   */
  abrirReproductor(youtubeId: string) {
    const urlBase = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`;
    
    // El Sanitizer evita el error de "unsafe URL" al inyectar el iframe
    this.videoSeleccionado = this.sanitizer.bypassSecurityTrustResourceUrl(urlBase);
    this.mostrarModal = true;
    
    // Bloquear el scroll de la página de fondo
    document.body.style.overflow = 'hidden';
  }

  /**
   * Cierra el modal y limpia el vídeo
   */
  cerrarReproductor() {
    this.mostrarModal = false;
    this.videoSeleccionado = null;
    
    // Devolver el scroll a la página
    document.body.style.overflow = 'auto';
  }

}
