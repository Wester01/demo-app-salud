export type TipoTarjeta = 'blog' | 'enlace' | 'servicio';

export interface TarjetaInicio {
  titulo: string;
  descripcion: string;
  imagen: string;
  etiqueta: string;
  ruta: string;
  tipo: TipoTarjeta;
}