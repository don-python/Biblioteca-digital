<div align="center">

# Biblioteca Digital
### Prototipo Release — Evaluación 4 (Desarrollo de Proyectos TI · SCRUM)

Prototipo web interactivo en **HTML5, CSS3 y JavaScript modular** conectado a **Firebase** (*Authentication* y *Cloud Firestore*), desarrollado para la **Evaluación 4: Entrega Final de Producto y Cierre de Proyecto Ágil**.

</div>

---
## Avances actuales

- Configuración del entorno de desarrollo con Vite.
- Integración del SDK de Firebase.
- Creación del proyecto en Firebase.
- Configuración de autenticación con correo y contraseña.
- Creación de la base de datos Cloud Firestore.
- Configuración inicial de las reglas de seguridad.
- Desarrollo de la primera pantalla de inicio.
- Configuración de Git para el control de versiones.

## Instalación

Clonar el repositorio:

    git clone https://github.com/don-python/Biblioteca-digital.git
    cd Biblioteca-digital
    npm install

Crear un archivo `.env.local` en la raíz del proyecto con las credenciales de Firebase.

## Ejecutar el proyecto

    npm.cmd run dev

## Arquitectura del Repositorio

```text
biblioteca-digital-inacap/
├── 📁 assets/                    # Logos y íconos 
├── 📁 docs/                      # Diagramas UML finales, trazabilidad, Kanban y cierre eva 4
├── 📁 src/
│   ├── 📁 css/
│   │   └── styles.css            # Estilos globales, tarjetas, formularios y diseño adaptable
│   ├── 📁 js/
│   │   ├── firebase-config.js    # Inicialización de Firebase (Authentication + Firestore)
│   │   ├── auth.js               # Login por rol, clave segura, intentos fallidos y reset
│   │   ├── estudiante.js         # Búsqueda, catálogo, préstamos y reservas
│   │   ├── bibliotecario.js      # Validación de préstamos/devoluciones y gestión de libros
│   │   ├── admin.js              # Gestión de usuarios, restablecimiento y reportes
│   │   ├── guards.js             # Proteger páginas según el rol.
│   │   ├── libros.js             # Consultar, crear, editar y eliminar libros.
│   │   ├── prestamos.js          # Gestionar reservas.
│   │   ├── reservas.js           # Gestionar reservas.
│   │   └── validaciones.js       # Validar formularios y datos.
│   └── 📁 pages/
│       ├── estudiante.html       # Vista del Estudiante
│       ├── bibliotecario.html    # Vista del Bibliotecario
│       └── administrador.html    # Vista del Administrador
├── 📄 .gitignore                 # Archivos ignorados (.DS_Store, .env, temporales, etc.)
├── 📄 index.html                 # Punto de entrada: Login diferenciado + restablecer clave
└── 📄 README.md                  # Documentación principal, roles y enlace a GitHub Pages
