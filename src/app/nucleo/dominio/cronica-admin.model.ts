export type EstadoCronica = 'borrador' | 'publicada';
export type OrigenEdicion = 'nuevo' | 'borrador' | 'publicacion';
export type CategoriaCronica = 'Iridología' | 'Fitoterapia' | 'Terapias' | 'Bienestar';

export interface CronicaAdmin {
  id: number | null;
  titulo: string;
  contenido: string;
  categoria: CategoriaCronica;
  imagenPortada: string;
  tags: string[];
  estado: EstadoCronica;
  origen: OrigenEdicion;
  fechaActualizacion: string | null;
}