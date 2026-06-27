import { HttpInterceptorFn } from '@angular/common/http';

const CLAVE_TOKEN = 'life-iris-token-admin';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem(CLAVE_TOKEN);

  if (!token) {
    return next(req);
  }

  const peticionConToken = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(peticionConToken);
};