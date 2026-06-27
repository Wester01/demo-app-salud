# Documentación global · Life & Iris

## 1. Resumen del proyecto

**Life & Iris** es una aplicación web full stack desarrollada como caso real de portfolio. El proyecto combina un portal público premium para una marca de bienestar integrativo con un panel privado de administración llamado **Oráculo Admin**.

El objetivo principal fue construir una experiencia visual cuidada, responsive y profesional, añadiendo una integración backend real para proteger el panel administrativo mediante autenticación JWT.

---

## 2. Enlaces principales

| Recurso              | URL                                               |
| -------------------- | ------------------------------------------------- |
| Demo frontend        | https://life-iris-demo.netlify.app/               |
| API backend          | https://demo-app-salud-api.onrender.com/api/salud |
| Repositorio frontend | https://github.com/Wester01/demo-app-salud        |
| Repositorio backend  | https://github.com/Wester01/demo-app-salud-api    |
| Portfolio            | https://wester-dev.es                             |

---

## 3. Contexto

El proyecto nace como una web para una marca real del sector bienestar. La parte pública está orientada a presentar el proyecto, sus servicios, contenido educativo, contacto y recursos audiovisuales.

Además, se desarrolló un panel administrativo privado para simular la gestión interna de contenidos, comunidad, vídeos, métricas e interacciones.

La marca Life & Iris y sus elementos visuales se utilizan con autorización del cliente para exposición como caso de portfolio. Se han eliminado o sustituido elementos personales sensibles, como rostro real, referencias privadas o datos no adecuados para una demo pública.

---

## 4. Objetivos técnicos

* Crear una SPA moderna con Angular.
* Separar portal público y panel privado.
* Implementar rutas públicas y privadas.
* Proteger el panel administrativo con login real.
* Conectar frontend Angular con backend Node/Express.
* Persistir usuario administrador en PostgreSQL.
* Desplegar frontend, backend y base de datos en servicios cloud.
* Mantener una demo segura sin exponer datos reales.
* Documentar decisiones técnicas y limitaciones conscientes.

---

## 5. Arquitectura general

```txt
Usuario
  │
  ▼
Frontend Angular
Netlify
https://life-iris-demo.netlify.app
  │
  │ Login / Perfil
  ▼
Backend Node + Express
Render
https://demo-app-salud-api.onrender.com
  │
  │ Prisma ORM
  ▼
PostgreSQL
Neon
```

---

## 6. Stack utilizado

### Frontend

| Tecnología     | Uso                          |
| -------------- | ---------------------------- |
| Angular        | Framework principal          |
| TypeScript     | Tipado estático              |
| SCSS           | Estilos por componente       |
| Angular Router | Rutas públicas y privadas    |
| HttpClient     | Comunicación con backend     |
| Signals        | Estado reactivo              |
| Reactive Forms | Login administrativo         |
| FormsModule    | Formularios públicos         |
| LocalStorage   | Persistencia demo controlada |
| Netlify        | Despliegue frontend          |

### Backend

| Tecnología | Uso                            |
| ---------- | ------------------------------ |
| Node.js    | Runtime                        |
| Express    | API REST                       |
| TypeScript | Tipado estático                |
| Prisma 7   | ORM                            |
| PostgreSQL | Base de datos                  |
| Neon       | Hosting PostgreSQL             |
| Render     | Despliegue backend             |
| JWT        | Autenticación                  |
| bcrypt     | Hash de contraseña             |
| Zod        | Validación                     |
| Helmet     | Cabeceras básicas de seguridad |
| CORS       | Control de orígenes            |
| Morgan     | Logging HTTP                   |

---

## 7. Estructura del frontend

```txt
src/
├─ app/
│  ├─ compartido/
│  │  ├─ componentes/
│  │  └─ layouts/
│  ├─ modulos/
│  │  ├─ admin/
│  │  ├─ blog/
│  │  ├─ contacto/
│  │  ├─ inicio/
│  │  ├─ servicios_negocio/
│  │  ├─ sobre-mi/
│  │  └─ videoteca/
│  ├─ nucleo/
│  │  ├─ config/
│  │  ├─ guards/
│  │  ├─ interceptores/
│  │  ├─ modelos/
│  │  └─ servicios/
│  ├─ app.config.ts
│  └─ app.routes.ts
```

---

## 8. Estructura del backend

```txt
src/
├─ compartido/
│  └─ middlewares/
│     └─ verificar-token.ts
├─ config/
│  ├─ entorno.ts
│  └─ prisma.ts
├─ generated/
│  └─ prisma/
├─ modulos/
│  └─ auth/
│     ├─ auth.controller.ts
│     ├─ auth.routes.ts
│     ├─ auth.schemas.ts
│     └─ auth.service.ts
├─ scripts/
│  └─ crear-admin.ts
├─ app.ts
└─ servidor.ts

prisma/
├─ migrations/
└─ schema.prisma
```

---

## 9. Portal público

El portal público está compuesto por:

```txt
/                     Inicio
/servicios            Servicios y formulario de consulta
/sobre-mi             Historia / presentación
/contacto             Contacto
/blog                 Blog principal
/blog/articulos       Listado de artículos
/blog/leer/:slug      Lectura individual
/videoteca            Videoteca pública
```

Características principales:

* Diseño responsive completo.
* Estética premium, visual y coherente con la marca.
* Navegación pública independiente.
* Formularios funcionales en modo demo.
* Blog y videoteca navegables.
* Secciones optimizadas para móvil, tablet y escritorio.
* Rutas SPA compatibles con Netlify.

---

## 10. Panel Oráculo Admin

El panel privado está ubicado en:

```txt
/oraculo
```

Módulos incluidos:

```txt
/oraculo/analytics     Dashboard de métricas
/oraculo/cronicas      Editor de crónicas
/oraculo/comunidad     Gestión de comunidad
/oraculo/videoteca     Gestión de vídeos
```

Funcionalidades:

* Login real.
* Logout.
* Protección de rutas mediante guard.
* Sidebar administrativo.
* Dashboard con métricas.
* Editor de contenidos.
* Gestión de vídeos.
* Gestión de comunidad.
* Interacciones recientes.
* Persistencia demo mediante LocalStorage.

---

## 11. Autenticación

El acceso al panel administrativo está protegido con un flujo real de autenticación.

```txt
Usuario accede a /oraculo
  │
  ▼
Guard comprueba token
  │
  ├─ No hay token → redirección a /oraculo/login
  │
  └─ Hay token → GET /api/auth/perfil
                    │
                    ├─ Perfil válido → acceso al panel
                    └─ Perfil inválido → logout y redirección
```

Flujo de login:

```txt
Formulario Angular
  │
  ▼
POST /api/auth/login
  │
  ▼
Backend valida credenciales
  │
  ▼
Backend devuelve JWT + usuario
  │
  ▼
Angular guarda sesión
  │
  ▼
Acceso a /oraculo/analytics
```

Endpoints usados:

```txt
POST /api/auth/login
GET  /api/auth/perfil
```

---

## 12. Qué es real y qué es demo

El proyecto está planteado como una demo full stack segura. No todos los módulos administrativos se conectan todavía a backend real porque el objetivo inicial era proteger el panel y demostrar integración frontend/backend sin exponer datos reales.

### Implementado con backend real

* Login administrativo.
* JWT.
* Validación de perfil.
* Middleware de protección en backend.
* Guard privado en Angular.
* Usuario administrador persistido en PostgreSQL.
* API desplegada en Render.
* Base de datos desplegada en Neon.

### Simulado en frontend

* Crónicas.
* Vídeos.
* Comunidad.
* Métricas administrativas.
* Interacciones recientes.
* Estados de edición.

La persistencia local se realiza mediante `localStorage` de forma intencionada para mantener una demo interactiva y segura.

---

## 13. Base de datos

La base de datos utiliza PostgreSQL desplegado en Neon.

Modelo inicial:

```prisma
model Usuario {
  id              String     @id @default(uuid())
  nombre          String
  email           String     @unique
  passwordHash    String
  rol             RolUsuario @default(ADMIN)
  activo          Boolean    @default(true)
  creadoEn        DateTime   @default(now())
  actualizadoEn   DateTime   @updatedAt

  @@map("usuarios")
}

enum RolUsuario {
  ADMIN
  EDITOR
}
```

Uso actual:

* Persistir usuario administrador.
* Validar credenciales.
* Recuperar perfil autenticado.

---

## 14. Despliegue

### Frontend

Servicio:

```txt
Netlify
```

Configuración:

```txt
Build command: npm run build
Publish directory: dist/app-salud-holistica/browser
```

Archivo:

```txt
netlify.toml
```

Incluye redirect SPA:

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

Esto permite refrescar rutas internas como:

```txt
/oraculo
/blog/articulos
/videoteca
```

### Backend

Servicio:

```txt
Render
```

Configuración:

```txt
Runtime: Node
Build Command: npm install && npm run build
Start Command: npm start
```

### Base de datos

Servicio:

```txt
Neon PostgreSQL
```

Variables usadas:

```txt
DATABASE_URL
DIRECT_URL
```

---

## 15. Seguridad

Medidas aplicadas:

* `.env` ignorado por Git.
* `.env.example` sin secretos reales.
* Auditoría con Gitleaks sin leaks detectados.
* JWT para sesión administrativa.
* Contraseña almacenada como hash con bcrypt.
* CORS limitado a orígenes permitidos.
* Helmet en backend.
* Panel admin separado del portal público.
* No se publican credenciales en frontend.
* No se exponen datos reales del cliente.
* Marca usada con autorización.

Resultado auditoría local:

```txt
Frontend: no leaks found
Backend: no leaks found
```

---

## 16. Decisiones técnicas destacadas

### Separación entre público y privado

El proyecto separa claramente el sitio público del panel administrativo. Esto permite que los usuarios accedan libremente al contenido, servicios y contacto, mientras que la administración queda protegida.

### Backend enfocado a autenticación

Se decidió implementar backend real para la parte crítica del proyecto: el acceso al panel privado. Los CRUD internos permanecen en modo demo para mantener el alcance controlado.

### LocalStorage como demo controlada

El uso de `localStorage` en módulos administrativos permite demostrar flujos de edición, publicación, borrado y métricas sin depender de datos sensibles ni alargar innecesariamente la primera versión.

### Prisma 7

El backend utiliza Prisma 7 con cliente generado y configuración separada. Esto obliga a trabajar con una estructura moderna y alineada con la versión actual del ORM.

### Render en vez de Koyeb

Inicialmente se valoró Koyeb, pero se descartó por requerimientos de tarjeta/plan no adecuados para una demo de coste inicial cero. Render ofreció un flujo más claro y suficiente para el objetivo del proyecto.

### Netlify en vez de Vercel

Se eligió Netlify para probar un proveedor distinto a Vercel y comparar experiencia de despliegue. El resultado fue satisfactorio y las rutas SPA funcionan correctamente mediante `netlify.toml`.

---

## 17. Limitaciones conscientes

* Los módulos CRUD del panel no están conectados todavía a la API.
* No hay subida real de imágenes.
* No hay sistema de recuperación de contraseña.
* No hay refresh tokens.
* No hay tests automatizados.
* El backend gratuito en Render puede tener cold start.
* La documentación Swagger/OpenAPI queda como mejora futura.

Estas limitaciones son decisiones conscientes para cerrar una primera versión sólida y presentable.

---

## 18. Roadmap

Posibles mejoras futuras:

```txt
- CRUD real de crónicas.
- CRUD real de videoteca.
- Persistencia real de comunidad.
- Persistencia real de mensajes/contacto.
- Upload de imágenes.
- Roles avanzados.
- Refresh tokens.
- Recuperación de contraseña.
- Swagger/OpenAPI.
- Tests unitarios y de integración.
- CI/CD.
- Rate limiting.
- Logging estructurado.
```

---

## 19. Aprendizajes del proyecto

Este proyecto permitió trabajar y reforzar:

* Arquitectura modular en Angular.
* Separación de layouts públicos y privados.
* Responsive avanzado.
* Manejo de estado con Signals.
* Integración Angular + API REST.
* Autenticación JWT.
* Guards e interceptores.
* Prisma 7.
* PostgreSQL con Neon.
* Despliegue en Netlify y Render.
* CORS en entorno real.
* Auditoría básica de secretos.
* Documentación técnica orientada a portfolio.

---

## 20. Conclusión

Life & Iris es una demo full stack funcional, desplegada y documentada, que combina una experiencia frontend visualmente cuidada con una integración backend real para autenticación administrativa.

El proyecto demuestra capacidad para construir, desplegar y documentar una aplicación moderna, separando correctamente portal público, panel privado, API, base de datos y despliegue cloud.

---

## Autor

Desarrollado por **Wester Dev**

* Portfolio: https://wester-dev.es
* GitHub: https://github.com/Wester01
