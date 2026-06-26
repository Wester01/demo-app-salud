import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TarjetaComp } from '../../compartido/componentes/tarjetas/tarjeta-comp';
import { SobreMiComp } from './sobre-mi-comp';
import { ConexionComp } from './conexion-comp';
import { RouterModule } from '@angular/router';
import { ContenidoService } from '../../nucleo/servicios/contenido.service';
import { TarjetasInicioService } from '../../nucleo/servicios/tarjetas-inicio.service';

@Component({
  selector: 'app-inicio-comp',
  standalone: true,
  imports: [CommonModule, TarjetaComp, SobreMiComp, ConexionComp, RouterModule],
  templateUrl: './inicio-comp.html',
  styleUrl: './inicio-comp.scss',
})
export class InicioComp {

  private contenidoService = inject(ContenidoService);
  private tarjetasInicioService = inject(TarjetasInicioService);
  
  hero = this.contenidoService.obtenerHero();
  tarjetasInicio = this.tarjetasInicioService.obtenerTarjetas();

}
