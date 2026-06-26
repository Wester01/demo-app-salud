import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogService } from '../../../nucleo/servicios/blog.service';
import { EntradaBlog } from '../../../nucleo/dominio/blog.model';

@Component({
  selector: 'app-articulos-comp',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './articulos-comp.html',
  styleUrl: './articulos-comp.scss',
})
export class ArticulosComp {
  private blogService = inject(BlogService);

  categoriaSeleccionada = 'TODAS';
  categorias = this.blogService.listarCategorias();

  listaArticulos: EntradaBlog[] = this.blogService.listarPublicadas();
  articulosFiltrados: EntradaBlog[] = [...this.listaArticulos];

  filtrar(categoria: string): void {
    this.categoriaSeleccionada = categoria;

    if (categoria === 'TODAS') {
      this.articulosFiltrados = [...this.listaArticulos];
      return;
    }

    this.articulosFiltrados = this.listaArticulos.filter(
      articulo => articulo.categoria === categoria,
    );
  }
}