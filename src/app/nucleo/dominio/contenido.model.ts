export interface ContenidoHero {
  titulo: string;
  subtitulo: string;
  ctaPrincipal: string;
  rutaCtaPrincipal: string;
  ctaSecundario: string;
  rutaCtaSecundario: string;
}

export interface ContenidoSobreMi {
  preTitulo: string;
  nombrePublico: string;
  titulo: string;
  cita: string;
  parrafos: string[];
  formacion: {
    icono: string;
    titulo: string;
    texto: string;
  }[];
  acreditacion: string;
}

export interface ContenidoConexion {
  newsletterTitulo: string;
  newsletterTexto: string;
  newsletterPlaceholder: string;
  newsletterBoton: string;
  redesTitulo: string;
  redesTexto: string;
}

export interface ContenidoContacto {
  etiqueta: string;
  titulo: string;
  subtitulo: string;
  motivos: string[];
  ctaDirectoTitulo: string;
  ctaDirectoTexto: string;
  email: string;
  whatsapp: string;
}