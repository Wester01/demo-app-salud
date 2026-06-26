import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  ArticuloInfluyente,
  StatRapida,
} from '../../../nucleo/dominio/analytics.model';
import { AnalyticsService } from '../../../nucleo/servicios/analytics.service';
import { InteraccionReciente } from '../../../nucleo/dominio/interaccion.model';

@Component({
  selector: 'app-analytics-comp',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analytics-comp.html',
  styleUrl: './analytics-comp.scss',
})
export class AnalyticsComp {
  private analyticsService = inject(AnalyticsService);

  get stats(): StatRapida[] {
    return this.analyticsService.statsRapidas;
  }

  get topArticulos(): ArticuloInfluyente[] {
    return this.analyticsService.topArticulos;
  }

  get actividadSemanal(): number[] {
    return this.analyticsService.actividadSemanal;
  }

  get interaccionesRecientes(): InteraccionReciente[] {
    return this.analyticsService.interaccionesRecientes;
  }
}