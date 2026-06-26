export type TabVideo = 'youtube' | 'file';

export type CategoriaVideoAdmin =
  | 'Iridología'
  | 'Fitoterapia'
  | 'Terapias'
  | 'Bienestar';

export interface VideoAdmin {
  id: number;
  titulo: string;
  categoria: CategoriaVideoAdmin;
  duracion: string;
  vistas: number;
  thumb: string;
  youtubeId?: string;
  origen: TabVideo;
}