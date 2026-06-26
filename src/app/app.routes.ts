import { Routes } from '@angular/router';
import { AdminLayoutComp } from './modulos/admin/admin-layout-comp';
import { AnalyticsComp } from './modulos/admin/analytics/analytics-comp';
import { EditorComp } from './modulos/admin/editorContenido/editor-comp';
import { ComunidadComp } from './modulos/admin/comunidad/comunidad-comp';
import { AdminVideotecaComp } from './modulos/admin/adminVideoteca/admin-videoteca-comp';
import { LayoutPublicoComp } from './compartido/layouts/layout-publico/layout-publico';

export const routes: Routes = [
  {
    path: '',
    component: LayoutPublicoComp,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./modulos/inicio/inicio-comp').then(m => m.InicioComp),
        title: 'Life & Iris | Inicio',
      },
      {
        path: 'servicios',
        loadComponent: () =>
          import('./modulos/servicios_negocio/servicios-comp').then(m => m.ServiciosComp),
        title: 'Life & Iris | Servicios',
      },
      {
        path: 'sobre-mi',
        loadComponent: () =>
          import('./modulos/sobre-mi/about-comp').then(m => m.AboutComp),
        title: 'Life & Iris | Sobre el proyecto',
      },
      {
        path: 'contacto',
        loadComponent: () =>
          import('./modulos/contacto/contacto-comp').then(m => m.ContactoComp),
        title: 'Life & Iris | Contacto',
      },
      {
        path: 'blog',
        loadComponent: () =>
          import('./modulos/blog/blog-comp').then(m => m.BlogComp),
        title: 'Life & Iris | Blog',
      },
      {
        path: 'blog/articulos',
        loadComponent: () =>
          import('./modulos/blog/articulos/articulos-comp').then(m => m.ArticulosComp),
        title: 'Life & Iris | Artículos',
      },
      {
        path: 'blog/leer/:slug',
        loadComponent: () =>
          import('./modulos/blog/articulos/lectura-articulo-comp').then(m => m.LecturaArticuloComp),
        title: 'Life & Iris | Lectura',
      },
      {
        path: 'videoteca',
        loadComponent: () =>
          import('./modulos/videoteca/videoteca-comp').then(m => m.VideotecaComp),
        title: 'Life & Iris | Videoteca',
      },
      {
        path: 'blog/videoteca',
        redirectTo: '/videoteca',
        pathMatch: 'full',
      },
    ]
  },
  {
    path: 'oraculo',
    component: AdminLayoutComp,
    children: [
      { path: '', redirectTo: 'analytics', pathMatch: 'full' },
      { path: 'analytics', component: AnalyticsComp },
      { path: 'cronicas', component: EditorComp },
      { path: 'comunidad', component: ComunidadComp },
      { path: 'videoteca', component: AdminVideotecaComp },
    ],
  },

  { path: '**', redirectTo: '' },
];