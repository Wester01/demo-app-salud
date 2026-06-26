import { ContenidoContacto, ContenidoConexion, ContenidoHero, ContenidoSobreMi } from '../../nucleo/dominio/contenido.model';

export const heroContenido: ContenidoHero = {
  titulo: 'Equilibrio a través de una mirada consciente',
  subtitulo: 'Explora recursos de bienestar natural, formación y acompañamiento integrativo.',
  ctaPrincipal: 'Reservar consulta',
  rutaCtaPrincipal: '/contacto',
  ctaSecundario: 'Ver servicios',
  rutaCtaSecundario: '/servicios',
};

export const sobreMiContenido: ContenidoSobreMi = {
  preTitulo: 'Bienestar integrativo · Educación para la salud',
  nombrePublico: 'Elías Mora',
  titulo: 'Elías Mora: una mirada natural al equilibrio cotidiano',
  cita: 'El bienestar empieza cuando aprendemos a escuchar el cuerpo con calma, criterio y presencia.',
  parrafos: [
    'Life & Iris nace como un espacio de acompañamiento y divulgación centrado en bienestar natural, hábitos conscientes y educación para la salud.',
    'El enfoque combina recursos tradicionales, observación personalizada y herramientas prácticas orientadas al autocuidado.',
    'La propuesta no sustituye la atención médica profesional. Su objetivo es complementar el camino de cada persona desde una perspectiva preventiva, educativa y respetuosa.',
  ],
  formacion: [
    {
      icono: 'fas fa-eye',
      titulo: 'Iridología y observación integrativa',
      texto: 'Estudio del iris como herramienta complementaria de exploración y educación sobre hábitos de bienestar.',
    },
    {
      icono: 'fas fa-leaf',
      titulo: 'Fitoterapia y recursos naturales',
      texto: 'Divulgación sobre plantas, preparados tradicionales y criterios de uso responsable.',
    },
    {
      icono: 'fas fa-hand-sparkles',
      titulo: 'Técnicas manuales y equilibrio corporal',
      texto: 'Acompañamiento desde prácticas suaves orientadas a relajación, conciencia corporal y bienestar general.',
    },
  ],
  acreditacion: 'Perfil ficticio creado para proyecto demostrativo de portfolio.',
};

export const conexionContenido: ContenidoConexion = {
  newsletterTitulo: 'Únete a nuestra comunidad',
  newsletterTexto: 'Recibe recursos mensuales sobre bienestar natural, autocuidado y contenidos del blog.',
  newsletterPlaceholder: 'Tu correo electrónico',
  newsletterBoton: 'Suscribirme',
  redesTitulo: 'Conecta con Life & Iris',
  redesTexto: 'Sigue el proyecto para descubrir nuevas crónicas, recursos y contenidos formativos.',
};

export const contactoContenido: ContenidoContacto = {
  etiqueta: 'Conecta con nosotros',
  titulo: 'Envía tu consulta',
  subtitulo: 'Cuéntanos qué necesitas y te orientaremos hacia el servicio más adecuado.',
  motivos: [
    'Consulta integrativa',
    'Cursos / Escuela',
    'Boticario / Información de productos',
    'Colaboraciones o información general',
  ],
  ctaDirectoTitulo: '¿Prefieres una vía directa?',
  ctaDirectoTexto: 'Cada proceso es distinto. Puedes escribirnos para recibir orientación inicial antes de reservar.',
  email: 'contacto@lifeandiris.demo',
  whatsapp: '34600000000',
};