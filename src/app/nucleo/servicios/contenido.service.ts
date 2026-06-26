import { Injectable } from '@angular/core';
import {
  contactoContenido,
  conexionContenido,
  heroContenido,
  sobreMiContenido,
} from '../../infraestructura/adaptadores/contenido-estatico';
import {
  ContenidoContacto,
  ContenidoConexion,
  ContenidoHero,
  ContenidoSobreMi,
} from '../dominio/contenido.model';

@Injectable({ providedIn: 'root' })
export class ContenidoService {
  obtenerHero(): ContenidoHero {
    return heroContenido;
  }

  obtenerSobreMi(): ContenidoSobreMi {
    return sobreMiContenido;
  }

  obtenerConexion(): ContenidoConexion {
    return conexionContenido;
  }

  obtenerContacto(): ContenidoContacto {
    return contactoContenido;
  }
}