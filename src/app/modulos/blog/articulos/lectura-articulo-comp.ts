import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BlogService } from '../../../nucleo/servicios/blog.service';
import { EntradaBlog } from '../../../nucleo/dominio/blog.model';

@Component({
  selector: 'app-lectura-articulo-comp',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './lectura-articulo-comp.html',
  styleUrl: './lectura-articulo-comp.scss',
})
export class LecturaArticuloComp {
  private route = inject(ActivatedRoute);
  private blogService = inject(BlogService);

  articulo?: EntradaBlog;

  constructor() {
    const slug = this.route.snapshot.paramMap.get('slug');

    if (slug) {
      this.articulo = this.blogService.buscarPorSlug(slug);
    }
  }
}