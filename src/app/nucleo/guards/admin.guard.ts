import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';

import { AuthService } from '../servicios/auth.service';

const validarAccesoAdmin = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.obtenerToken();

  if (!token) {
    return router.createUrlTree(['/oraculo/login']);
  }

  if (authService.usuario()) {
    return true;
  }

  return authService.cargarPerfil().pipe(
    map(() => true),
    catchError(() => of(router.createUrlTree(['/oraculo/login']))),
  );
};

export const adminGuard: CanActivateFn = () => validarAccesoAdmin();

export const adminChildGuard: CanActivateChildFn = () => validarAccesoAdmin();