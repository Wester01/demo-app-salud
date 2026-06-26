import { Injectable, signal } from '@angular/core';
import { entradasBlog } from '../../infraestructura/adaptadores/blog-estatico';
import {
  CategoriaCronica,
  CronicaAdmin,
} from '../dominio/cronica-admin.model';

const CLAVE_BORRADORES = 'life-iris-borradores';
const CLAVE_PUBLICACIONES = 'life-iris-publicaciones';

@Injectable({
  providedIn: 'root',
})
export class CronicasAdminService {
  private readonly categorias: CategoriaCronica[] = [
    'Iridología',
    'Fitoterapia',
    'Terapias',
    'Bienestar',
  ];

  private borradoresEstado = signal<CronicaAdmin[]>(
    this.cargarDesdeStorage(CLAVE_BORRADORES, []),
  );

  private publicacionesEstado = signal<CronicaAdmin[]>(
    this.cargarDesdeStorage(CLAVE_PUBLICACIONES, this.crearPublicacionesIniciales()),
  );

  readonly borradores = this.borradoresEstado.asReadonly();
  readonly publicaciones = this.publicacionesEstado.asReadonly();

  crearCronicaVacia(): CronicaAdmin {
    return {
      id: null,
      titulo: '',
      contenido: '',
      categoria: 'Iridología',
      imagenPortada: '',
      tags: [],
      estado: 'borrador',
      origen: 'nuevo',
      fechaActualizacion: null,
    };
  }

  guardarBorrador(cronica: CronicaAdmin): CronicaAdmin {
    const id = cronica.id ?? this.generarIdGlobal();

    const borrador: CronicaAdmin = {
      ...cronica,
      id,
      estado: 'borrador',
      origen: 'borrador',
      fechaActualizacion: new Date().toISOString(),
    };

    this.borradoresEstado.update(lista => {
      const existe = lista.some(item => item.id === id);
      return existe
        ? lista.map(item => (item.id === id ? borrador : item))
        : [borrador, ...lista];
    });

    this.publicacionesEstado.update(lista => lista.filter(item => item.id !== id));
    this.persistir();

    return borrador;
  }

  guardarPublicacion(cronica: CronicaAdmin): CronicaAdmin {
    const id = cronica.id ?? this.generarIdGlobal();

    const publicacion: CronicaAdmin = {
      ...cronica,
      id,
      estado: 'publicada',
      origen: 'publicacion',
      fechaActualizacion: new Date().toISOString(),
    };

    this.publicacionesEstado.update(lista => {
      const existe = lista.some(item => item.id === id);
      return existe
        ? lista.map(item => (item.id === id ? publicacion : item))
        : [publicacion, ...lista];
    });

    this.borradoresEstado.update(lista => lista.filter(item => item.id !== id));
    this.persistir();

    return publicacion;
  }

  pasarPublicacionABorrador(publicacion: CronicaAdmin): CronicaAdmin {
    const borrador: CronicaAdmin = {
      ...publicacion,
      estado: 'borrador',
      origen: 'borrador',
      fechaActualizacion: new Date().toISOString(),
    };

    this.publicacionesEstado.update(lista =>
      lista.filter(item => item.id !== publicacion.id),
    );

    this.borradoresEstado.update(lista => {
      const existe = lista.some(item => item.id === borrador.id);
      return existe
        ? lista.map(item => (item.id === borrador.id ? borrador : item))
        : [borrador, ...lista];
    });

    this.persistir();

    return borrador;
  }

  eliminarBorrador(id: number): void {
    this.borradoresEstado.update(lista => lista.filter(item => item.id !== id));
    this.persistir();
  }

  eliminarPublicacion(id: number): void {
    this.publicacionesEstado.update(lista => lista.filter(item => item.id !== id));
    this.persistir();
  }

  obtenerPublicaciones(): CronicaAdmin[] {
    return [...this.publicacionesEstado()];
  }

  private crearPublicacionesIniciales(): CronicaAdmin[] {
    return entradasBlog
      .filter(entrada => entrada.publicada)
      .map(entrada => ({
        id: entrada.id,
        titulo: entrada.titulo,
        contenido: entrada.contenido.join('\n\n') || entrada.resumen,
        categoria: this.normalizarCategoria(entrada.categoria),
        imagenPortada: entrada.imagen,
        tags: entrada.etiquetas.map(etiqueta => this.normalizarTag(etiqueta)),
        estado: 'publicada',
        origen: 'publicacion',
        fechaActualizacion: entrada.fechaPublicacion,
      }));
  }

  private cargarDesdeStorage(clave: string, valorInicial: CronicaAdmin[]): CronicaAdmin[] {
    if (!this.tieneStorage()) return valorInicial;

    try {
      const datos = globalThis.localStorage.getItem(clave);
      return datos ? JSON.parse(datos) as CronicaAdmin[] : valorInicial;
    } catch {
      return valorInicial;
    }
  }

  private persistir(): void {
    if (!this.tieneStorage()) return;

    globalThis.localStorage.setItem(
      CLAVE_BORRADORES,
      JSON.stringify(this.borradoresEstado()),
    );

    globalThis.localStorage.setItem(
      CLAVE_PUBLICACIONES,
      JSON.stringify(this.publicacionesEstado()),
    );
  }

  private generarIdGlobal(): number {
    const ids = [
      ...this.borradoresEstado(),
      ...this.publicacionesEstado(),
    ].map(item => item.id ?? 0);

    return ids.length ? Math.max(...ids) + 1 : 1;
  }

  private normalizarCategoria(categoria: string): CategoriaCronica {
    return this.categorias.includes(categoria as CategoriaCronica)
      ? categoria as CategoriaCronica
      : 'Bienestar';
  }

  private normalizarTag(etiqueta: string): string {
    return etiqueta.startsWith('#') ? etiqueta : `#${etiqueta}`;
  }

  private tieneStorage(): boolean {
    return typeof globalThis.localStorage !== 'undefined';
  }
}