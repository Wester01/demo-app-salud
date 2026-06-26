import { Injectable, inject } from '@angular/core';
import { EntradaBlog } from '../dominio/blog.model';
import { CronicaAdmin } from '../dominio/cronica-admin.model';
import { CronicasAdminService } from './cronicas-admin.service';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private cronicasAdminService = inject(CronicasAdminService);

  listarPublicadas(): EntradaBlog[] {
    return this.cronicasAdminService
      .obtenerPublicaciones()
      .map(cronica => this.mapearEntradaBlog(cronica))
      .sort((a, b) => b.fechaPublicacion.localeCompare(a.fechaPublicacion));
  }

  obtenerRecientes(limite = 3): EntradaBlog[] {
    return this.listarPublicadas().slice(0, limite);
  }

  buscarPorSlug(slug: string): EntradaBlog | undefined {
    return this.listarPublicadas().find(entrada => entrada.slug === slug);
  }

  listarCategorias(): string[] {
    const categorias = this.listarPublicadas().map(articulo => articulo.categoria);
    return ['TODAS', ...Array.from(new Set(categorias))];
  }

  private mapearEntradaBlog(cronica: CronicaAdmin): EntradaBlog {
    const fechaPublicacion = this.obtenerFechaPublicacion(cronica.fechaActualizacion);

    return {
      id: cronica.id ?? 0,
      titulo: cronica.titulo,
      slug: this.crearSlug(cronica.titulo),
      resumen: this.crearResumen(cronica.contenido),
      contenido: this.crearParrafos(cronica.contenido),
      categoria: cronica.categoria,
      imagen: cronica.imagenPortada || 'tarjetas/bienestar-holistico.png',
      fecha: this.formatearFecha(fechaPublicacion),
      fechaPublicacion,
      visitas: '0',
      autor: 'Equipo Life & Iris',
      publicada: true,
      etiquetas: cronica.tags.map(tag => tag.replace('#', '').toLowerCase()),
    };
  }

  private crearResumen(contenido: string): string {
    const limpio = contenido.trim();

    if (limpio.length <= 150) return limpio;

    return `${limpio.slice(0, 150)}...`;
  }

  private crearParrafos(contenido: string): string[] {
    return contenido
      .split(/\n{2,}/)
      .map(parrafo => parrafo.trim())
      .filter(Boolean);
  }

  private crearSlug(titulo: string): string {
    return titulo
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/ñ/g, 'n')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
  }

  private obtenerFechaPublicacion(fecha: string | null): string {
    return fecha ? fecha.slice(0, 10) : new Date().toISOString().slice(0, 10);
  }

  private formatearFecha(fechaIso: string): string {
    const meses = [
      'ENE',
      'FEB',
      'MAR',
      'ABR',
      'MAY',
      'JUN',
      'JUL',
      'AGO',
      'SEP',
      'OCT',
      'NOV',
      'DIC',
    ];

    const [anio, mes, dia] = fechaIso.split('-').map(Number);

    return `${String(dia).padStart(2, '0')} ${meses[mes - 1]} ${anio}`;
  }
}