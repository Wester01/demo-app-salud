export type RolUsuario = 'Miembro' | 'Editor' | 'Administrador demo';

export interface UsuarioAdmin {
  id: number;
  nombre: string;
  email: string;
  rol: RolUsuario;
  activo: boolean;
  ultimoLogin: string;
  fechaAlta: string;
  ultimoResetPassword: string | null;
}