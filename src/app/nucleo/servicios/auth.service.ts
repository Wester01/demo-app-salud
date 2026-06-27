import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';

import { API_URL } from '../config/api.config';
import {
  LoginDto,
  LoginRespuesta,
  PerfilRespuesta,
  UsuarioSesion,
} from '../dominio/auth.model';

const CLAVE_TOKEN = 'life-iris-token-admin';
const CLAVE_USUARIO = 'life-iris-usuario-admin';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  private usuarioActual = signal<UsuarioSesion | null>(
    this.leerUsuarioGuardado(),
  );

  usuario = this.usuarioActual.asReadonly();

  autenticado = computed(() => Boolean(this.obtenerToken()));

  login(datos: LoginDto): Observable<UsuarioSesion> {
    return this.http
      .post<LoginRespuesta>(`${API_URL}/auth/login`, datos)
      .pipe(
        tap((respuesta) => {
          this.guardarSesion(respuesta.token, respuesta.usuario);
        }),
        map((respuesta) => respuesta.usuario),
      );
  }

  cargarPerfil(): Observable<UsuarioSesion> {
    return this.http.get<PerfilRespuesta>(`${API_URL}/auth/perfil`).pipe(
      tap((respuesta) => {
        this.usuarioActual.set(respuesta.usuario);
        localStorage.setItem(CLAVE_USUARIO, JSON.stringify(respuesta.usuario));
      }),
      map((respuesta) => respuesta.usuario),
      catchError((error) => {
        this.cerrarSesion();
        return throwError(() => error);
      }),
    );
  }

  obtenerToken(): string | null {
    return localStorage.getItem(CLAVE_TOKEN);
  }

  cerrarSesion(): void {
    localStorage.removeItem(CLAVE_TOKEN);
    localStorage.removeItem(CLAVE_USUARIO);
    this.usuarioActual.set(null);
  }

  private guardarSesion(token: string, usuario: UsuarioSesion): void {
    localStorage.setItem(CLAVE_TOKEN, token);
    localStorage.setItem(CLAVE_USUARIO, JSON.stringify(usuario));
    this.usuarioActual.set(usuario);
  }

  private leerUsuarioGuardado(): UsuarioSesion | null {
    const usuario = localStorage.getItem(CLAVE_USUARIO);

    if (!usuario) {
      return null;
    }

    try {
      return JSON.parse(usuario) as UsuarioSesion;
    } catch {
      localStorage.removeItem(CLAVE_USUARIO);
      return null;
    }
  }
}