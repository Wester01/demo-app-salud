import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  CategoriaCronica,
  CronicaAdmin,
} from '../../../nucleo/dominio/cronica-admin.model';
import { CronicasAdminService } from '../../../nucleo/servicios/cronicas-admin.service';

type VistaEditor = 'editor' | 'borradores' | 'publicaciones';

@Component({
  selector: 'app-editor-comp',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editor-comp.html',
  styleUrl: './editor-comp.scss',
})
export class EditorComp {
  private cronicasAdminService = inject(CronicasAdminService);

  categorias: CategoriaCronica[] = ['Iridología', 'Fitoterapia', 'Terapias', 'Bienestar'];

  vistaActiva = signal<VistaEditor>('editor');
  mensajeSistema = signal('');
  analizandoSeo = signal(false);

  cronica = signal<CronicaAdmin>(this.cronicasAdminService.crearCronicaVacia());

  borradores = this.cronicasAdminService.borradores;
  publicaciones = this.cronicasAdminService.publicaciones;

  borradoresOrdenados = computed(() =>
    [...this.borradores()].sort((a, b) => this.obtenerTiempo(b) - this.obtenerTiempo(a)),
  );

  publicacionesOrdenadas = computed(() =>
    [...this.publicaciones()].sort((a, b) => this.obtenerTiempo(b) - this.obtenerTiempo(a)),
  );

  puedeGuardar = computed(() => {
    const valor = this.cronica();
    return valor.titulo.trim().length >= 3 && valor.contenido.trim().length >= 20;
  });

  textoBotonGuardar = computed(() =>
    this.cronica().origen === 'publicacion' ? 'Guardar cambios' : 'Guardar borrador',
  );

  textoModoEdicion = computed(() => {
    const actual = this.cronica();

    if (actual.origen === 'nuevo') return 'Creando nueva crónica';
    if (actual.origen === 'borrador') return `Editando borrador: ${actual.titulo || 'Sin título'}`;

    return `Editando publicación: ${actual.titulo || 'Sin título'}`;
  });

  descripcionModoEdicion = computed(() => {
    const actual = this.cronica();

    if (actual.origen === 'nuevo') return 'El contenido todavía no está guardado.';
    if (actual.origen === 'borrador') return 'Los cambios actualizarán el borrador seleccionado.';

    return 'Los cambios actualizarán una publicación existente.';
  });

  cambiarVista(vista: VistaEditor): void {
    this.vistaActiva.set(vista);
    this.mensajeSistema.set('');
  }

  nuevaCronica(): void {
    this.cronica.set(this.cronicasAdminService.crearCronicaVacia());
    this.vistaActiva.set('editor');
    this.mensajeSistema.set('Nuevo documento editorial preparado.');
  }

  actualizarTitulo(titulo: string): void {
    this.cronica.update(cronica => ({ ...cronica, titulo }));
    this.mensajeSistema.set('');
  }

  actualizarContenido(contenido: string): void {
    this.cronica.update(cronica => ({ ...cronica, contenido }));
    this.mensajeSistema.set('');
  }

  actualizarCategoria(categoria: string): void {
    if (!this.esCategoriaValida(categoria)) return;

    this.cronica.update(cronica => ({ ...cronica, categoria }));
    this.mensajeSistema.set('');
  }

  guardarTrabajo(): void {
    if (!this.validarContenido()) return;

    const actualizada = this.cronica().origen === 'publicacion'
      ? this.cronicasAdminService.guardarPublicacion(this.cronica())
      : this.cronicasAdminService.guardarBorrador(this.cronica());

    this.cronica.set(actualizada);

    this.mensajeSistema.set(
      actualizada.origen === 'publicacion'
        ? 'Publicación actualizada correctamente.'
        : 'Borrador guardado correctamente en modo demo.',
    );
  }

  publicarCronica(): void {
    if (!this.validarContenido()) return;

    const publicacion = this.cronicasAdminService.guardarPublicacion(this.cronica());

    this.cronica.set(publicacion);
    this.mensajeSistema.set('Crónica publicada correctamente. Ya está disponible en el blog.');
  }

  editarBorrador(borrador: CronicaAdmin): void {
    this.cronica.set({
      ...borrador,
      origen: 'borrador',
      estado: 'borrador',
      tags: [...borrador.tags],
    });

    this.vistaActiva.set('editor');
    this.mensajeSistema.set('Borrador cargado en el editor.');
  }

  editarPublicacion(publicacion: CronicaAdmin): void {
    this.cronica.set({
      ...publicacion,
      origen: 'publicacion',
      estado: 'publicada',
      tags: [...publicacion.tags],
    });

    this.vistaActiva.set('editor');
    this.mensajeSistema.set('Publicación cargada en el editor.');
  }

  eliminarBorrador(id: number): void {
    const confirmado = confirm('¿Eliminar este borrador de la demo?');

    if (!confirmado) return;

    this.cronicasAdminService.eliminarBorrador(id);

    if (this.cronica().id === id && this.cronica().origen === 'borrador') {
      this.cronica.set(this.cronicasAdminService.crearCronicaVacia());
    }

    this.mensajeSistema.set('Borrador eliminado correctamente.');
  }

  eliminarPublicacion(id: number): void {
    const confirmado = confirm('¿Eliminar esta publicación de la demo?');

    if (!confirmado) return;

    this.cronicasAdminService.eliminarPublicacion(id);

    if (this.cronica().id === id && this.cronica().origen === 'publicacion') {
      this.cronica.set(this.cronicasAdminService.crearCronicaVacia());
    }

    this.mensajeSistema.set('Publicación eliminada correctamente.');
  }

  pasarPublicacionABorrador(publicacion: CronicaAdmin): void {
    const borrador = this.cronicasAdminService.pasarPublicacionABorrador(publicacion);

    this.cronica.set(borrador);
    this.vistaActiva.set('editor');
    this.mensajeSistema.set('La publicación se ha pasado a borrador y está lista para editar.');
  }

  generarTagsSeo(): void {
    const contenido = this.cronica().contenido.trim();

    if (contenido.length < 20) {
      this.mensajeSistema.set('Escribe más contenido antes de generar etiquetas.');
      return;
    }

    this.analizandoSeo.set(true);
    this.mensajeSistema.set('Analizando contenido...');

    window.setTimeout(() => {
      const tags = this.extraerTags(contenido);

      this.cronica.update(cronica => ({
        ...cronica,
        tags,
        fechaActualizacion: new Date().toISOString(),
      }));

      this.analizandoSeo.set(false);
      this.mensajeSistema.set('Etiquetas generadas correctamente en modo demo.');
    }, 600);
  }

  simularImagenPortada(): void {
    this.cronica.update(cronica => ({
      ...cronica,
      imagenPortada: 'tarjetas/bienestar-holistico.png',
    }));

    this.mensajeSistema.set('Imagen de portada asignada en modo demo.');
  }

  obtenerExtracto(texto: string): string {
    const limpio = texto.trim();
    return limpio.length <= 130 ? limpio : `${limpio.slice(0, 130)}...`;
  }

  private validarContenido(): boolean {
    if (!this.puedeGuardar()) {
      this.mensajeSistema.set('Añade un título y al menos 20 caracteres de contenido.');
      return false;
    }

    return true;
  }

  private obtenerTiempo(cronica: CronicaAdmin): number {
    return cronica.fechaActualizacion
      ? new Date(cronica.fechaActualizacion).getTime()
      : 0;
  }

  private esCategoriaValida(categoria: string): categoria is CategoriaCronica {
    return this.categorias.includes(categoria as CategoriaCronica);
  }

  private extraerTags(texto: string): string[] {
    const base = texto
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(palabra => palabra.length > 5);

    const stopwords = new Set([
      'porque',
      'cuando',
      'desde',
      'sobre',
      'entre',
      'tambien',
      'puede',
      'pueden',
      'bienestar',
      'persona',
      'personas',
      'contenido',
    ]);

    const frecuencia = new Map<string, number>();

    for (const palabra of base) {
      if (stopwords.has(palabra)) continue;
      frecuencia.set(palabra, (frecuencia.get(palabra) ?? 0) + 1);
    }

    const tags = Array.from(frecuencia.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([palabra]) => `#${this.capitalizar(palabra)}`);

    return tags.length ? tags : ['#SaludNatural', '#Autocuidado', '#Bienestar'];
  }

  private capitalizar(texto: string): string {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
  }
}