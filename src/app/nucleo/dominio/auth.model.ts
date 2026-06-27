export interface LoginDto {
  email: string;
  password: string;
}

export interface UsuarioSesion {
  id: string;
  nombre: string;
  email: string;
  rol: string;
  activo: boolean;
}

export interface LoginRespuesta {
  ok: boolean;
  mensaje: string;
  token: string;
  usuario: UsuarioSesion;
}

export interface PerfilRespuesta {
  ok: boolean;
  usuario: UsuarioSesion;
}