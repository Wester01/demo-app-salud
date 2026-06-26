import { Injectable } from '@angular/core';
import { BlogService } from './blog.service';
import { TarjetaInicio } from '../dominio/tarjeta.model';

@Injectable({ providedIn: 'root' })
export class TarjetasInicioService {
  constructor(private blogService: BlogService) {}

  obtenerTarjetas(): TarjetaInicio[] {
    const entradas = this.blogService.obtenerRecientes(3);

    if (entradas.length > 0) {
      return entradas.map(entrada => ({
        titulo: entrada.titulo,
        descripcion: entrada.resumen,
        imagen: entrada.imagen,
        etiqueta: entrada.categoria,
        ruta: `/blog/leer/${entrada.slug}`,
        tipo: 'blog',
      }));
    }

    return [
      {
        titulo: 'Servicios integrativos',
        descripcion: 'Consulta las áreas de acompañamiento, formación y recursos disponibles.',
        imagen: 'tarjetas/bienestar-holistico.png',
        etiqueta: 'Servicios',
        ruta: '/servicios',
        tipo: 'enlace',
      },
      {
        titulo: 'Crónicas de bienestar',
        descripcion: 'Lee artículos divulgativos sobre autocuidado, hábitos y salud natural.',
        imagen: 'tarjetas/iris-test.png',
        etiqueta: 'Blog',
        ruta: '/blog',
        tipo: 'enlace',
      },
      {
        titulo: 'Contacto y orientación',
        descripcion: 'Escríbenos para resolver dudas o solicitar información personalizada.',
        imagen: 'tarjetas/reflexo-test.png',
        etiqueta: 'Contacto',
        ruta: '/contacto',
        tipo: 'enlace',
      },
    ];
  }
}