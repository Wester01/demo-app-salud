import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navegacion } from '../../componentes/navegacion/navegacion';
import { Footer } from '../../componentes/pie/footer';

@Component({
  selector: 'app-layout-publico',
  standalone: true,
  imports: [RouterOutlet, Navegacion, Footer],
  templateUrl: './layout-publico.html',
  styleUrl: './layout-publico.scss',
})
export class LayoutPublicoComp {}