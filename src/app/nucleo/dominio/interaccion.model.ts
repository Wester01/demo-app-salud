export type TipoInteraccion = 'contacto' | 'newsletter';

export interface MensajeContactoAdmin {
  id: number;
  nombre: string;
  email: string;
  motivo: string;
  mensaje: string;
  fecha: string;
  leido: boolean;
}

export interface SuscripcionNewsletterAdmin {
  id: number;
  email: string;
  fecha: string;
  activa: boolean;
}

export interface InteraccionReciente {
  id: number;
  tipo: TipoInteraccion;
  titulo: string;
  detalle: string;
  fecha: string;
  icono: string;
}