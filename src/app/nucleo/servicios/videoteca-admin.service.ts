import { Injectable, signal } from '@angular/core';
import {
  CategoriaVideoAdmin,
  VideoAdmin,
} from '../dominio/video-admin.model';

const CLAVE_VIDEOS = 'life-iris-videos-admin';

@Injectable({
  providedIn: 'root',
})
export class VideotecaAdminService {
  private videosEstado = signal<VideoAdmin[]>(
    this.cargarDesdeStorage(CLAVE_VIDEOS, this.crearVideosIniciales()),
  );

  readonly videos = this.videosEstado.asReadonly();

  obtenerCategorias(): CategoriaVideoAdmin[] {
    return ['Iridología', 'Fitoterapia', 'Terapias', 'Bienestar'];
  }

  obtenerPorId(id: number): VideoAdmin | undefined {
    return this.videosEstado().find(video => video.id === id);
  }

  guardarVideo(video: Omit<VideoAdmin, 'id'> & { id?: number | null }): VideoAdmin {
    const id = video.id ?? this.generarId();

    const videoGuardado: VideoAdmin = {
      ...video,
      id,
    };

    this.videosEstado.update(videos => {
      const existe = videos.some(item => item.id === id);

      return existe
        ? videos.map(item => (item.id === id ? videoGuardado : item))
        : [videoGuardado, ...videos];
    });

    this.persistir();

    return videoGuardado;
  }

  eliminarVideo(id: number): void {
    this.videosEstado.update(videos => videos.filter(video => video.id !== id));
    this.persistir();
  }

  extraerYoutubeId(url: string): string | null {
    const texto = url.trim();

    if (!texto) return null;

    const patrones = [
      /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
      /youtu\.be\/([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
    ];

    for (const patron of patrones) {
      const coincidencia = texto.match(patron);

      if (coincidencia?.[1]) {
        return coincidencia[1];
      }
    }

    return /^[a-zA-Z0-9_-]{11}$/.test(texto) ? texto : null;
  }

  crearMiniaturaYoutube(youtubeId: string): string {
    return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
  }

  private crearVideosIniciales(): VideoAdmin[] {
    return [
      {
        id: 1,
        titulo: 'Iridología como herramienta complementaria',
        categoria: 'Iridología',
        duracion: '15:40',
        vistas: 450,
        thumb: 'https://images.unsplash.com/photo-1576091160550-2173bdb999ef?auto=format&fit=crop&w=500&q=80',
        origen: 'youtube',
      },
      {
        id: 2,
        titulo: 'Fitoterapia y uso responsable de plantas',
        categoria: 'Fitoterapia',
        duracion: '22:15',
        vistas: 320,
        thumb: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=500&q=80',
        origen: 'youtube',
      },
      {
        id: 3,
        titulo: 'Conciencia corporal y relajación cotidiana',
        categoria: 'Terapias',
        duracion: '12:05',
        vistas: 128,
        thumb: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=500&q=80',
        origen: 'youtube',
      },
    ];
  }

  private generarId(): number {
    const ids = this.videosEstado().map(video => video.id);
    return ids.length ? Math.max(...ids) + 1 : 1;
  }

  private cargarDesdeStorage(clave: string, valorInicial: VideoAdmin[]): VideoAdmin[] {
    if (!this.tieneStorage()) return valorInicial;

    try {
      const datos = globalThis.localStorage.getItem(clave);
      return datos ? JSON.parse(datos) as VideoAdmin[] : valorInicial;
    } catch {
      return valorInicial;
    }
  }

  private persistir(): void {
    if (!this.tieneStorage()) return;

    globalThis.localStorage.setItem(
      CLAVE_VIDEOS,
      JSON.stringify(this.videosEstado()),
    );
  }

  private tieneStorage(): boolean {
    return typeof globalThis.localStorage !== 'undefined';
  }
}