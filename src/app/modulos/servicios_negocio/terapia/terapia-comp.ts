import { Component } from '@angular/core';

@Component({
  selector: 'app-terapia-comp',
  standalone: true,
  imports: [],
  templateUrl: './terapia-comp.html',
  styleUrl: './terapia-comp.scss',
})
export class TerapiaComp {
  terapias = [
    {
      titulo: 'Iridología',
      subtitulo: 'El mapa de tu salud en tu mirada',
      descripcion: 'A través del estudio del iris, podemos conocer el estado de tus órganos y sistemas, detectando desequilibrios antes de que se manifiesten.',
      detalles: ['Estudio constitucional', 'Detección de toxinas', 'Prevención holística'],
      imagen: 'tarjetas/iris-test.png'
    },
    {
      titulo: 'Reflexología Podal',
      subtitulo: 'Equilibrio a través de tus pies',
      descripcion: 'Técnica milenaria que utiliza la presión en puntos específicos de los pies para estimular la autocuración del cuerpo.',
      detalles: ['Relajación profunda', 'Mejora circulatoria', 'Liberación de bloqueos'],
      imagen: 'tarjetas/reflexo-test.png'
    },
    {
      titulo: 'Moxibustión y Ventosas',
      subtitulo: 'Calor y succión sanadora',
      descripcion: 'Técnicas de la Medicina Tradicional China para movilizar la energía (Qi) y eliminar el frío o estancamiento en el cuerpo.',
      detalles: ['Dolores musculares', 'Refuerzo inmune', 'Bienestar térmico'],
      imagen: 'tarjetas/moxiventosa.png'
    }
  ];
}
