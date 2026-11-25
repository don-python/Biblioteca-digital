<div align="center">

# 📚 Biblioteca Digital
### Prototipo Release — Evaluación 4 (Desarrollo de Proyectos TI · SCRUM)

Prototipo web interactivo en **HTML5, CSS3 y JavaScript modular** conectado a **Firebase** (*Authentication* y *Cloud Firestore*), desarrollado para la **Evaluación 4: Entrega Final de Producto y Cierre de Proyecto Ágil**.

</div>

---

## 🧭 Arquitectura del Repositorio

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
│   │   └── admin.js              # Gestión de usuarios, restablecimiento y reportes
│   └── 📁 pages/
│       ├── estudiante.html       # Vista del Estudiante
│       ├── bibliotecario.html    # Vista del Bibliotecario
│       └── administrador.html    # Vista del Administrador
├── 📄 .gitignore                 # Archivos ignorados (.DS_Store, .env, temporales, etc.)
├── 📄 index.html                 # Punto de entrada: Login diferenciado + restablecer clave
└── 📄 README.md                  # Documentación principal, roles y enlace a GitHub Pages
