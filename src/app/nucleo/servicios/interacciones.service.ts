import { Injectable, signal } from '@angular/core';
import {
  InteraccionReciente,
  MensajeContactoAdmin,
  SuscripcionNewsletterAdmin,
} from '../dominio/interaccion.model';

const CLAVE_MENSAJES = 'life-iris-mensajes-contacto';
const CLAVE_SUSCRIPCIONES = 'life-iris-suscripciones-newsletter';

interface DatosMensajeContacto {
  nombre: string;
  email: string;
  motivo: string;
  mensaje: string;
}

export interface ResultadoSuscripcion {
  suscripcion: SuscripcionNewsletterAdmin;
  nueva: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class InteraccionesService {
  private mensajesEstado = signal<MensajeContactoAdmin[]>(
    this.cargarDesdeStorage(CLAVE_MENSAJES, this.crearMensajesIniciales()),
  );

  private suscripcionesEstado = signal<SuscripcionNewsletterAdmin[]>(
    this.cargarDesdeStorage(CLAVE_SUSCRIPCIONES, this.crearSuscripcionesIniciales()),
  );

  readonly mensajes = this.mensajesEstado.asReadonly();
  readonly suscripciones = this.suscripcionesEstado.asReadonly();

  guardarMensaje(datos: DatosMensajeContacto): MensajeContactoAdmin {
    const mensaje: MensajeContactoAdmin = {
      id: this.generarIdMensajes(),
      nombre: datos.nombre.trim(),
      email: datos.email.trim(),
      motivo: datos.motivo.trim(),
      mensaje: datos.mensaje.trim(),
      fecha: new Date().toISOString(),
      leido: false,
    };

    this.mensajesEstado.update(mensajes => [mensaje, ...mensajes]);
    this.persistirMensajes();

    return mensaje;
  }

  registrarSuscripcion(email: string): ResultadoSuscripcion {
    const emailNormalizado = email.trim().toLowerCase();

    const existente = this.suscripcionesEstado().find(
      suscripcion => suscripcion.email.toLowerCase() === emailNormalizado,
    );

    if (existente) {
      if (!existente.activa) {
        const reactivada: SuscripcionNewsletterAdmin = {
          ...existente,
          activa: true,
          fecha: new Date().toISOString(),
        };

        this.suscripcionesEstado.update(suscripciones =>
          suscripciones.map(suscripcion =>
            suscripcion.id === existente.id ? reactivada : suscripcion,
          ),
        );

        this.persistirSuscripciones();

        return {
          suscripcion: reactivada,
          nueva: false,
        };
      }

      return {
        suscripcion: existente,
        nueva: false,
      };
    }

    const suscripcion: SuscripcionNewsletterAdmin = {
      id: this.generarIdSuscripciones(),
      email: emailNormalizado,
      fecha: new Date().toISOString(),
      activa: true,
    };

    this.suscripcionesEstado.update(suscripciones => [suscripcion, ...suscripciones]);
    this.persistirSuscripciones();

    return {
      suscripcion,
      nueva: true,
    };
  }

  obtenerMensajesNoLeidos(): number {
    return this.mensajesEstado().filter(mensaje => !mensaje.leido).length;
  }

  obtenerSuscripcionesActivas(): number {
    return this.suscripcionesEstado().filter(suscripcion => suscripcion.activa).length;
  }

  obtenerInteraccionesRecientes(limite = 5): InteraccionReciente[] {
    const mensajes: InteraccionReciente[] = this.mensajesEstado().map(mensaje => ({
      id: mensaje.id,
      tipo: 'contacto',
      titulo: `Mensaje de ${mensaje.nombre}`,
      detalle: mensaje.motivo,
      fecha: mensaje.fecha,
      icono: 'fas fa-envelope',
    }));

    const suscripciones: InteraccionReciente[] = this.suscripcionesEstado()
      .filter(suscripcion => suscripcion.activa)
      .map(suscripcion => ({
        id: suscripcion.id,
        tipo: 'newsletter',
        titulo: 'Nueva suscripción',
        detalle: suscripcion.email,
        fecha: suscripcion.fecha,
        icono: 'fas fa-paper-plane',
      }));

    return [...mensajes, ...suscripciones]
      .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
      .slice(0, limite);
  }

  private crearMensajesIniciales(): MensajeContactoAdmin[] {
    return [
      {
        id: 1,
        nombre: 'Cliente Demo',
        email: 'cliente.demo@lifeandiris.local',
        motivo: 'Información sobre servicios',
        mensaje: 'Me gustaría recibir información sobre los recursos disponibles en Life & Iris.',
        fecha: new Date().toISOString(),
        leido: false,
      },
    ];
  }

  private crearSuscripcionesIniciales(): SuscripcionNewsletterAdmin[] {
    return [
      {
        id: 1,
        email: 'suscriptor.demo@lifeandiris.local',
        fecha: new Date().toISOString(),
        activa: true,
      },
    ];
  }

  private generarIdMensajes(): number {
    const ids = this.mensajesEstado().map(mensaje => mensaje.id);
    return ids.length ? Math.max(...ids) + 1 : 1;
  }

  private generarIdSuscripciones(): number {
    const ids = this.suscripcionesEstado().map(suscripcion => suscripcion.id);
    return ids.length ? Math.max(...ids) + 1 : 1;
  }

  private cargarDesdeStorage<T>(clave: string, valorInicial: T[]): T[] {
    if (!this.tieneStorage()) return valorInicial;

    try {
      const datos = globalThis.localStorage.getItem(clave);
      return datos ? JSON.parse(datos) as T[] : valorInicial;
    } catch {
      return valorInicial;
    }
  }

  private persistirMensajes(): void {
    if (!this.tieneStorage()) return;

    globalThis.localStorage.setItem(
      CLAVE_MENSAJES,
      JSON.stringify(this.mensajesEstado()),
    );
  }

  private persistirSuscripciones(): void {
    if (!this.tieneStorage()) return;

    globalThis.localStorage.setItem(
      CLAVE_SUSCRIPCIONES,
      JSON.stringify(this.suscripcionesEstado()),
    );
  }

  private tieneStorage(): boolean {
    return typeof globalThis.localStorage !== 'undefined';
  }
}