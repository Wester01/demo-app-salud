export interface EntradaBlog {
  id: number;
  titulo: string;
  slug: string;
  resumen: string;
  contenido: string[];
  categoria: string;
  imagen: string;
  fecha: string;
  fechaPublicacion: string;
  visitas: string;
  autor: string;
  publicada: boolean;
  etiquetas: string[];
  
}