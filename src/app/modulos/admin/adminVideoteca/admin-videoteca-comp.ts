import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  CategoriaVideoAdmin,
  TabVideo,
  VideoAdmin,
} from '../../../nucleo/dominio/video-admin.model';
import { VideotecaAdminService } from '../../../nucleo/servicios/videoteca-admin.service';

interface FormVideo {
  titulo: string;
  categoria: CategoriaVideoAdmin;
  duracion: string;
  urlYoutube: string;
}

@Component({
  selector: 'app-admin-videoteca-comp',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-videoteca-comp.html',
  styleUrl: './admin-videoteca-comp.scss',
})
export class AdminVideotecaComp {
  private videotecaService = inject(VideotecaAdminService);

  showModal = false;
  activeTab: TabVideo = 'youtube';

  videoEditandoId: number | null = null;
  mensajeError = '';

  categorias = this.videotecaService.obtenerCategorias();

  formulario: FormVideo = this.crearFormularioVacio();

  get catalogoVideos(): VideoAdmin[] {
    return this.videotecaService.videos();
  }

  abrirModal(): void {
    this.videoEditandoId = null;
    this.activeTab = 'youtube';
    this.formulario = this.crearFormularioVacio();
    this.mensajeError = '';
    this.showModal = true;
  }

  cerrarModal(): void {
    this.showModal = false;
    this.videoEditandoId = null;
    this.formulario = this.crearFormularioVacio();
    this.mensajeError = '';
  }

  editarVideo(video: VideoAdmin): void {
    this.videoEditandoId = video.id;
    this.activeTab = video.origen;

    this.formulario = {
      titulo: video.titulo,
      categoria: video.categoria,
      duracion: video.duracion,
      urlYoutube: video.youtubeId ? `https://www.youtube.com/watch?v=${video.youtubeId}` : '',
    };

    this.mensajeError = '';
    this.showModal = true;
  }

  eliminarVideo(id: number): void {
    const confirmado = confirm('¿Eliminar este vídeo de la videoteca demo?');

    if (!confirmado) return;

    this.videotecaService.eliminarVideo(id);
  }

  guardarVideo(): void {
    this.mensajeError = '';

    if (!this.formulario.titulo.trim()) {
      this.mensajeError = 'Introduce un título para la lección.';
      return;
    }

    if (!this.formulario.categoria.trim()) {
      this.mensajeError = 'Selecciona una categoría.';
      return;
    }

    if (this.activeTab === 'file') {
      this.mensajeError = 'La subida de archivo queda reservada para la fase backend.';
      return;
    }

    const youtubeId = this.videotecaService.extraerYoutubeId(this.formulario.urlYoutube);

    if (!youtubeId) {
      this.mensajeError = 'Introduce una URL válida de YouTube.';
      return;
    }

    this.videotecaService.guardarVideo({
      id: this.videoEditandoId,
      titulo: this.formulario.titulo.trim(),
      categoria: this.formulario.categoria,
      duracion: this.formulario.duracion.trim() || '00:00',
      vistas: this.obtenerVistasActuales(),
      thumb: this.videotecaService.crearMiniaturaYoutube(youtubeId),
      youtubeId,
      origen: 'youtube',
    });

    this.cerrarModal();
  }

  cambiarTab(tab: TabVideo): void {
    this.activeTab = tab;
    this.mensajeError = '';
  }

  private crearFormularioVacio(): FormVideo {
    return {
      titulo: '',
      categoria: 'Iridología',
      duracion: '',
      urlYoutube: '',
    };
  }

  private obtenerVistasActuales(): number {
    if (!this.videoEditandoId) return 0;

    return this.videotecaService.obtenerPorId(this.videoEditandoId)?.vistas ?? 0;
  }
}