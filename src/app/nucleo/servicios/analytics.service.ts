import { Injectable, inject } from '@angular/core';
import {
  ArticuloInfluyente,
  StatRapida,
} from '../dominio/analytics.model';
import { ComunidadAdminService } from './comunidad-admin.service';
import { CronicasAdminService } from './cronicas-admin.service';
import { VideotecaAdminService } from './videoteca-admin.service';
import { InteraccionesService } from './interacciones.service';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private cronicasService = inject(CronicasAdminService);
  private comunidadService = inject(ComunidadAdminService);
  private videotecaService = inject(VideotecaAdminService);
  private interaccionesService = inject(InteraccionesService);

  get statsRapidas(): StatRapida[] {
    const publicaciones = this.cronicasService.publicaciones();
    const borradores = this.cronicasService.borradores();
    const usuarios = this.comunidadService.usuarios();
    const videos = this.videotecaService.videos();
    const mensajesNoLeidos = this.interaccionesService.obtenerMensajesNoLeidos();
    const suscripcionesActivas = this.interaccionesService.obtenerSuscripcionesActivas();

    const usuariosActivos = usuarios.filter(usuario => usuario.activo).length;

    return [
        {
        label: 'Publicaciones Activas',
        valor: String(publicaciones.length),
        tendencia: '+CMS',
        icono: 'fas fa-newspaper',
        },
        {
        label: 'Borradores',
        valor: String(borradores.length),
        tendencia: 'Edición',
        icono: 'fas fa-folder-open',
        },
        {
        label: 'Vídeos',
        valor: String(videos.length),
        tendencia: 'Videoteca',
        icono: 'fas fa-video',
        },
        {
        label: 'Usuarios Activos',
        valor: `${usuariosActivos}/${usuarios.length}`,
        tendencia: 'Comunidad',
        icono: 'fas fa-users',
        },
        {
        label: 'Mensajes Nuevos',
        valor: String(mensajesNoLeidos),
        tendencia: 'Contacto',
        icono: 'fas fa-envelope',
        },
        {
        label: 'Suscriptores',
        valor: String(suscripcionesActivas),
        tendencia: 'Newsletter',
        icono: 'fas fa-paper-plane',
        },
    ];
    }

  get topArticulos(): ArticuloInfluyente[] {
    return this.cronicasService
      .publicaciones()
      .map(publicacion => ({
        titulo: publicacion.titulo,
        visitas: this.calcularVisitasDemo(publicacion.titulo, publicacion.id ?? 0),
        conversion: this.calcularConversionDemo(publicacion.id ?? 0),
      }))
      .sort((a, b) => b.visitas - a.visitas)
      .slice(0, 5);
  }

  get actividadSemanal(): number[] {
    const publicaciones = this.cronicasService.publicaciones().length;
    const borradores = this.cronicasService.borradores().length;
    const usuariosActivos = this.comunidadService.usuarios().filter(usuario => usuario.activo).length;
    const videos = this.videotecaService.videos().length;
    const mensajes = this.interaccionesService.mensajes().length;
    const suscriptores = this.interaccionesService.obtenerSuscripcionesActivas();

    const base =
        publicaciones * 12 +
        borradores * 5 +
        usuariosActivos * 8 +
        videos * 7 +
        mensajes * 6 +
        suscriptores * 4;

    return [
        35 + (base % 20),
        45 + (publicaciones * 7) % 30,
        40 + (borradores * 9) % 35,
        60 + (usuariosActivos * 6) % 30,
        55 + (videos * 8) % 35,
        48 + ((mensajes + suscriptores) * 6) % 25,
        65 + ((publicaciones + videos + mensajes) * 5) % 25,
    ];
  }

  get interaccionesRecientes() {
    return this.interaccionesService.obtenerInteraccionesRecientes(5);
}

  private calcularVisitasDemo(titulo: string, id: number): number {
    const baseTitulo = titulo
      .split('')
      .reduce((total, letra) => total + letra.charCodeAt(0), 0);

    return 250 + ((baseTitulo + id * 137) % 1400);
  }

  private calcularConversionDemo(id: number): string {
    const conversion = 2.4 + ((id % 5) * 0.7);
    return `${conversion.toFixed(1)}%`;
  }
}