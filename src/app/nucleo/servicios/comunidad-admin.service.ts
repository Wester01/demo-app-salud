import { Injectable, signal } from '@angular/core';
import { RolUsuario, UsuarioAdmin } from '../dominio/usuario-admin.model';

const CLAVE_USUARIOS = 'life-iris-usuarios-comunidad';

@Injectable({
  providedIn: 'root',
})
export class ComunidadAdminService {
  private usuariosEstado = signal<UsuarioAdmin[]>(
    this.cargarDesdeStorage(CLAVE_USUARIOS, this.crearUsuariosIniciales()),
  );

  readonly usuarios = this.usuariosEstado.asReadonly();

  actualizarUsuario(usuarioActualizado: UsuarioAdmin): void {
    this.usuariosEstado.update(usuarios =>
      usuarios.map(usuario =>
        usuario.id === usuarioActualizado.id ? usuarioActualizado : usuario,
      ),
    );

    this.persistir();
  }

  alternarEstado(id: number): UsuarioAdmin | null {
    let usuarioActualizado: UsuarioAdmin | null = null;

    this.usuariosEstado.update(usuarios =>
      usuarios.map(usuario => {
        if (usuario.id !== id) return usuario;

        usuarioActualizado = {
          ...usuario,
          activo: !usuario.activo,
        };

        return usuarioActualizado;
      }),
    );

    this.persistir();

    return usuarioActualizado;
  }

  registrarResetPassword(id: number): UsuarioAdmin | null {
    let usuarioActualizado: UsuarioAdmin | null = null;

    this.usuariosEstado.update(usuarios =>
      usuarios.map(usuario => {
        if (usuario.id !== id) return usuario;

        usuarioActualizado = {
          ...usuario,
          ultimoResetPassword: new Date().toISOString(),
        };

        return usuarioActualizado;
      }),
    );

    this.persistir();

    return usuarioActualizado;
  }

  obtenerRoles(): RolUsuario[] {
    return ['Miembro', 'Editor', 'Administrador demo'];
  }

  private crearUsuariosIniciales(): UsuarioAdmin[] {
    return [
      {
        id: 1,
        nombre: 'Laura Méndez',
        email: 'laura.demo@lifeandiris.local',
        rol: 'Miembro',
        activo: true,
        ultimoLogin: 'Hoy, 09:42',
        fechaAlta: '2026-06-01',
        ultimoResetPassword: null,
      },
      {
        id: 2,
        nombre: 'Daniel Rivas',
        email: 'daniel.demo@lifeandiris.local',
        rol: 'Editor',
        activo: true,
        ultimoLogin: 'Ayer, 18:10',
        fechaAlta: '2026-06-03',
        ultimoResetPassword: null,
      },
      {
        id: 3,
        nombre: 'Marta Soler',
        email: 'marta.demo@lifeandiris.local',
        rol: 'Miembro',
        activo: false,
        ultimoLogin: 'Hace 12 días',
        fechaAlta: '2026-05-18',
        ultimoResetPassword: null,
      },
    ];
  }

  private cargarDesdeStorage(clave: string, valorInicial: UsuarioAdmin[]): UsuarioAdmin[] {
    if (!this.tieneStorage()) return valorInicial;

    try {
      const datos = globalThis.localStorage.getItem(clave);
      return datos ? JSON.parse(datos) as UsuarioAdmin[] : valorInicial;
    } catch {
      return valorInicial;
    }
  }

  private persistir(): void {
    if (!this.tieneStorage()) return;

    globalThis.localStorage.setItem(
      CLAVE_USUARIOS,
      JSON.stringify(this.usuariosEstado()),
    );
  }

  private tieneStorage(): boolean {
    return typeof globalThis.localStorage !== 'undefined';
  }
}