import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { EscuelaComp } from './escuela/escuela-comp';
import { TiendaComp } from './tienda/tienda-comp';
import { TerapiaComp } from './terapia/terapia-comp';
import { ConsultasComp } from './consultas/consultas-comp';
import { InteraccionesService } from '../../nucleo/servicios/interacciones.service';

type TabServicio = 'escuela' | 'tienda' | 'terapias' | 'consultas';
type EstadoEnvio = 'inicial' | 'enviando' | 'enviado' | 'error';

interface ConsultaServicio {
  nombre: string;
  email: string;
  mensaje: string;
  interes: TabServicio;
}

@Component({
  selector: 'app-servicios-comp',
  standalone: true,
  imports: [
    EscuelaComp,
    TiendaComp,
    TerapiaComp,
    ConsultasComp,
    FormsModule,
  ],
  templateUrl: './servicios-comp.html',
  styleUrl: './servicios-comp.scss',
})
export class ServiciosComp {
  private interaccionesService = inject(InteraccionesService);

  tabActiva = signal<TabServicio>('escuela');
  estadoEnvio = signal<EstadoEnvio>('inicial');

  datosContacto: ConsultaServicio = {
    nombre: '',
    email: '',
    mensaje: '',
    interes: 'escuela',
  };

  private nombresTabs: Record<TabServicio, string> = {
    escuela: 'Escuela de Salud',
    consultas: 'Consultas Online',
    terapias: 'Terapias',
    tienda: 'Boticario',
  };

  cambiarTab(tab: TabServicio): void {
    this.tabActiva.set(tab);
    this.datosContacto.interes = tab;
    this.estadoEnvio.set('inicial');
  }

  enviarConsulta(formulario: NgForm): void {
    if (formulario.invalid) {
      formulario.control.markAllAsTouched();
      this.estadoEnvio.set('error');
      return;
    }

    this.estadoEnvio.set('enviando');

    const consulta: ConsultaServicio = {
      ...this.datosContacto,
      interes: this.tabActiva(),
    };

    this.interaccionesService.guardarMensaje({
      nombre: consulta.nombre,
      email: consulta.email,
      motivo: `Solicitud sobre ${this.obtenerNombreTab(consulta.interes)}`,
      mensaje: consulta.mensaje,
    });

    this.estadoEnvio.set('enviado');

    formulario.resetForm({
      nombre: '',
      email: '',
      mensaje: '',
      interes: this.tabActiva(),
    });

    this.datosContacto = {
      nombre: '',
      email: '',
      mensaje: '',
      interes: this.tabActiva(),
    };
  }

  obtenerNombreTab(tab: TabServicio = this.tabActiva()): string {
    return this.nombresTabs[tab];
  }
}