import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  
  private esModoDemo: boolean = true; // <--- EL INTERRUPTOR

  canActivate(): boolean {
    if (this.esModoDemo) {
      return true; // Acceso libre para la presentación
    }
    // Aquí irá la lógica real: return this.authService.isLoggedIn();
    return false;
  }
}