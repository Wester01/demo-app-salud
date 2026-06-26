import { Component } from '@angular/core';

@Component({
  selector: 'app-consultas-comp',
  standalone: true,
  imports: [],
  templateUrl: './consultas-comp.html',
  styleUrl: './consultas-comp.scss',
})
export class ConsultasComp {
  pasosMetodo = [
    {
      titulo: 'Cuerpo (Alimentación)',
      desc: 'Qué alimentos nos benefician según nuestra constitución y condición actual.',
      icon: 'fa-leaf'
    },
    {
      titulo: 'Emoción-Mente',
      desc: 'Cómo influyen nuestras emociones en lo que comemos y viceversa.',
      icon: 'fa-brain'
    }
  ];

  abrirCuestionario() {
    window.open('TU_LINK_DE_GOOGLE_FORMS_O_SIMILAR', '_blank');
  }
}
