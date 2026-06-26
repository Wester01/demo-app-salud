import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-layout-comp',
  standalone:true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './admin-layout-comp.html',
  styleUrl: './admin-layout-comp.scss',
})
export class AdminLayoutComp {}
