import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tarjeta-comp',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './tarjeta-comp.html',
  styleUrl: './tarjeta-comp.scss',
})
export class TarjetaComp {

  @Input() titulo: string = '';
  @Input() descripcion: string = '';
  @Input() imagen: string = '';
  @Input() etiqueta: string = '';
  @Input() ruta: string = '';

}
