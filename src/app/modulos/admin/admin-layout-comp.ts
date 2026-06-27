import { Component, inject } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../nucleo/servicios/auth.service';


@Component({
  selector: 'app-admin-layout-comp',
  standalone:true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './admin-layout-comp.html',
  styleUrl: './admin-layout-comp.scss',
})
export class AdminLayoutComp {

  private authService = inject(AuthService);
  private router = inject(Router);

  cerrarSesion(): void {
    this.authService.cerrarSesion();
    void this.router.navigate(['/oraculo/login']);
  }

}
