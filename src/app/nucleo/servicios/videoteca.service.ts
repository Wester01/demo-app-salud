import { Injectable } from '@angular/core';

export type CategoriaVideo =
  | 'IRIDOLOGÍA'
  | 'FITOTERAPIA'
  | 'TERAPIAS'
  | 'BIENESTAR';

export interface Video {
  id: number;
  titulo: string;
  autor: string;
  youtubeId: string;
  miniatura: string;
  duracion: string;
  categoria: CategoriaVideo;
  publicado: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  private readonly listaVideos: Video[] = [
    {
      id: 1,
      titulo: 'Iridología como herramienta complementaria',
      autor: 'Equipo Life & Iris',
      youtubeId: 'um8jFNUNZ2Y',
      miniatura: 'https://img.youtube.com/vi/um8jFNUNZ2Y/maxresdefault.jpg',
      duracion: '12:45',
      categoria: 'IRIDOLOGÍA',
      publicado: true,
    },
    {
      id: 2,
      titulo: 'Fitoterapia y uso responsable de plantas',
      autor: 'Equipo Life & Iris',
      youtubeId: 'ywWXIdPVMPk',
      miniatura: 'https://img.youtube.com/vi/ywWXIdPVMPk/maxresdefault.jpg',
      duracion: '08:20',
      categoria: 'FITOTERAPIA',
      publicado: true,
    },
    {
      id: 3,
      titulo: 'Conciencia corporal y relajación cotidiana',
      autor: 'Equipo Life & Iris',
      youtubeId: 'CKyav629FA8',
      miniatura: 'https://img.youtube.com/vi/CKyav629FA8/maxresdefault.jpg',
      duracion: '15:10',
      categoria: 'TERAPIAS',
      publicado: true,
    },
  ];

  listarVideos(): Video[] {
    return this.listaVideos.filter(video => video.publicado);
  }

  buscarPorId(id: number): Video | undefined {
    return this.listaVideos.find(video => video.id === id && video.publicado);
  }

  listarCategorias(): CategoriaVideo[] {
    return Array.from(
      new Set(this.listaVideos.map(video => video.categoria)),
    );
  }
}