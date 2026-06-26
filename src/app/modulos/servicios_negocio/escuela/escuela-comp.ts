import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-escuela-comp',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './escuela-comp.html',
  styleUrl: './escuela-comp.scss',
})
export class EscuelaComp {
  // Controlamos qué curso está expandido. 0 significa ninguno o el primero.
  cursoAbierto = signal<number | null>(1);

  cursos = [
    {
      id: 1,
      titulo: '1º CURSO: SISTEMA DIGESTIVO',
      lema: 'Las emociones y tu segundo cerebro',
      descripcion: 'Estudio de la anatomía, fisiología, patologías y el efecto emocional en el proceso digestivo.',
      modulos: [
        'Boca y Glándulas Salivales', 'Faringe y Esófago', 'Estómago', 
        'Intestino Delgado', 'Intestino Grueso', 'Hígado y Vesícula', 
        'Páncreas', 'Proceso de Digestión', 'Limpieza Hepática', 'Limpieza Intestinal'
      ]
    },
    {
      id: 2,
      titulo: '2º CURSO: SISTEMA ENDOCRINO',
      lema: 'El equilibrio de tus hormonas',
      descripcion: 'Anatomía, fisiología y patologías del sistema glandular y su gestión emocional.',
      modulos: ['Generalidades y Hormonas', 'Hipófisis', 'Tiroides', 'Suprarrenales', 'Páncreas Endocrino', 'Gónadas']
    },
    {
      id: 3,
      titulo: '3º CURSO: SISTEMA NERVIOSO',
      lema: 'Controla tus nervios, controla tu vida',
      descripcion: 'Anatomía, fisiología y patologías del sistema glandular y su gestión emocional.',
      modulos: ['Generalidades del sistema nervioso', 'Sistema nervioso central', 'Nervios y glanglios nerviosos', 'Pares craneales', 'Sistema nervioso autónomo I (Simpático)', 'Sistema nervioso autónomo II (Parasimpático)']
    },
    {
      id: 4,
      titulo: '4º CURSO: SISTEMA INMUNE',
      lema: 'El equilibrio de tus hormonas',
      descripcion: 'Anatomía, fisiología y patologías del sistema glandular y su gestión emocional.',
      modulos: ['Generalidades del sistema inmune', 'Células que lo conforman', 'Órganos del sistema inmune', 'Tipos de inmunidad', 'Anticuerpos y antigenos', 'La piel como organo defensivo']
    },
    {
      id: 5,
      titulo: '5º CURSO: SISTEMA URINARIO',
      lema: 'El equilibrio de tus hormonas',
      descripcion: 'Anatomía, fisiología y patologías del sistema glandular y su gestión emocional.',
      modulos: ['Los riñones', 'El nefrón como unidad funcional', 'Uréteres, vejiga y uretra', 'Formación y composición de la orina', 'Tensión arterial y riñones', 'Enfermedades comunes del sistema urinario  ']
    }
    
  ];

  toggleCurso(id: number) {
    this.cursoAbierto.set(this.cursoAbierto() === id ? null : id);
  }
}
