import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RolUsuario, UsuarioAdmin } from '../../../nucleo/dominio/usuario-admin.model';
import { ComunidadAdminService } from '../../../nucleo/servicios/comunidad-admin.service';

interface FormUsuario {
  id: number;
  nombre: string;
  email: string;
  rol: RolUsuario;
  activo: boolean;
}

@Component({
  selector: 'app-comunidad-comp',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comunidad-comp.html',
  styleUrl: './comunidad-comp.scss',
})
export class ComunidadComp {
  private comunidadService = inject(ComunidadAdminService);

  usuarios = this.comunidadService.usuarios;
  roles = this.comunidadService.obtenerRoles();

  busqueda = signal('');
  mensajeSistema = signal('');
  usuarioEditando = signal<FormUsuario | null>(null);

  usuariosFiltrados = computed(() => {
    const termino = this.busqueda().trim().toLowerCase();

    if (!termino) return this.usuarios();

    return this.usuarios().filter(usuario =>
      usuario.nombre.toLowerCase().includes(termino) ||
      usuario.email.toLowerCase().includes(termino) ||
      usuario.rol.toLowerCase().includes(termino),
    );
  });

  totalUsuarios = computed(() => this.usuarios().length);

  usuariosActivos = computed(() =>
    this.usuarios().filter(usuario => usuario.activo).length,
  );

  usuariosInactivos = computed(() =>
    this.usuarios().filter(usuario => !usuario.activo).length,
  );

  actualizarBusqueda(valor: string): void {
    this.busqueda.set(valor);
  }

  editarUsuario(usuario: UsuarioAdmin): void {
    this.usuarioEditando.set({
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
      activo: usuario.activo,
    });

    this.mensajeSistema.set('');
  }

  cerrarEditor(): void {
    this.usuarioEditando.set(null);
  }

  actualizarCampo<K extends keyof FormUsuario>(campo: K, valor: FormUsuario[K]): void {
    const usuario = this.usuarioEditando();

    if (!usuario) return;

    this.usuarioEditando.set({
      ...usuario,
      [campo]: valor,
    });
  }

  guardarUsuario(): void {
    const formulario = this.usuarioEditando();

    if (!formulario) return;

    if (!formulario.nombre.trim() || !formulario.email.trim()) {
      this.mensajeSistema.set('Nombre y email son obligatorios.');
      return;
    }

    const usuarioOriginal = this.usuarios().find(usuario => usuario.id === formulario.id);

    if (!usuarioOriginal) {
      this.mensajeSistema.set('No se ha encontrado el usuario seleccionado.');
      return;
    }

    this.comunidadService.actualizarUsuario({
      ...usuarioOriginal,
      nombre: formulario.nombre.trim(),
      email: formulario.email.trim(),
      rol: formulario.rol,
      activo: formulario.activo,
    });

    this.usuarioEditando.set(null);
    this.mensajeSistema.set('Usuario actualizado correctamente en modo demo.');
  }

  alternarEstado(usuario: UsuarioAdmin): void {
    const actualizado = this.comunidadService.alternarEstado(usuario.id);

    if (!actualizado) return;

    this.mensajeSistema.set(
      actualizado.activo
        ? `${actualizado.nombre} ha sido activado.`
        : `${actualizado.nombre} ha sido desactivado.`,
    );
  }

  resetPassword(usuario: UsuarioAdmin): void {
    const actualizado = this.comunidadService.registrarResetPassword(usuario.id);

    if (!actualizado) return;

    this.mensajeSistema.set(
      `Reset de contraseña simulado para ${actualizado.email}.`,
    );
  }

  limpiarBusqueda(): void {
    this.busqueda.set('');
  }
}