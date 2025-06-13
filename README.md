# My Task App

## 1. Descripción del Problema

En el día a día, las personas necesitan una forma sencilla y eficiente de organizar sus actividades y responsabilidades. Sin una herramienta adecuada, es fácil perder de vista las tareas pendientes, olvidar fechas límite importantes y mezclar diferentes tipos de responsabilidades (trabajo, estudio, personal). Esto genera estrés y reduce la productividad. La aplicación "My Task App" busca resolver este problema proporcionando un sistema centralizado y personal para la gestión de tareas.

## 2. Solución Planteada

Se ha desarrollado una aplicación web full-stack que permite a los usuarios gestionar sus propias tareas y organizarlas en categorías personalizadas. La solución utiliza tecnologías modernas para ofrecer una experiencia de usuario fluida y segura:

- **Frontend Reactivo**: Construido con React, permite una interfaz de usuario rápida e interactiva.
- **Backend sin Servidor con Supabase**: Se utiliza Supabase para la autenticación de usuarios y como base de datos PostgreSQL, eliminando la necesidad de gestionar un backend tradicional y agilizando el desarrollo.
- **Seguridad y Privacidad**: Cada usuario solo puede ver y gestionar su propia información. La autenticación segura garantiza que los datos de un usuario no sean accesibles para otros.

## 3. Tecnologías Usadas

- **Frontend**: React, React Router, Vite
- **Backend & Base de Datos**: Supabase (Autenticación y Base de Datos PostgreSQL)
- **Pruebas**: Vitest, React Testing Library
- **Estilo**: CSS plano (personalizable con cualquier librería)

## 4. Cómo Ejecutar el Proyecto

Sigue estos pasos para levantar el proyecto en tu entorno local.

### Prerrequisitos

- Node.js (v18 o superior)
- npm
- Una cuenta de Supabase

### Pasos de Instalación

1.  **Instala las dependencias** del proyecto:
    ```bash
    npm install
    ```

2.  **Configura tus variables de entorno**:
    - Crea un archivo `.env` en la raíz del proyecto.
    - Añade tus credenciales de Supabase (las encuentras en `Project Settings > API` en tu dashboard de Supabase).
    ```
    VITE_SUPABASE_URL="TU_URL_DE_SUPABASE"
    VITE_SUPABASE_ANON_KEY="TU_CLAVE_ANON_DE_SUPABASE"
    ```

3.  **Inicia la aplicación** en modo de desarrollo:
    ```bash
    npm run dev
    ```

### Cómo Ejecutar las Pruebas

Para correr las pruebas unitarias, ejecuta:
```bash
npm test
```

## 5. Patrón de Diseño Aplicado: Módulo y Singleton

Para la gestión de la conexión con Supabase, se implementó una combinación de los patrones **Módulo** y **Singleton**.

-   **Patrón Módulo**: Toda la lógica para interactuar con Supabase (la inicialización del cliente) está encapsulada en un único archivo: `frontend/src/services/supabase.js`. Esto centraliza la configuración de la conexión, haciendo que el código sea más fácil de mantener y desacoplando al resto de la aplicación de los detalles de implementación de la librería de Supabase.

-   **Patrón Singleton**: Dentro de este módulo, se crea una **única instancia** del cliente de Supabase (`const supabase = createClient(...)`) que luego se exporta. Cualquier parte de la aplicación que necesite comunicarse con Supabase importa esta única instancia. Esto es eficiente y seguro, ya que previene la creación de múltiples conexiones a la base de datos y asegura que toda la aplicación comparta el mismo estado de autenticación.

**Justificación**: Esta combinación es ideal para manejar clientes de servicios externos como bases de datos o APIs. Asegura un punto de acceso único y controlado, reduce el consumo de recursos y mantiene el código organizado y escalable.

## 6. Estructura del Proyecto

```
MY_TASK_APP/
├── backend/
│   └──
├── frontend/
│   ├── public/
│   │   └── vite.svg
│   └── src/
│       ├── assets/
│       │   └── react.svg
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── ProtectedRoute.jsx
│       │   ├── TaskForm.jsx
│       │   ├── TaskItem.jsx
│       │   └── TaskList.jsx
│       ├── context/
│       │   └── AuthContext.jsx
│       ├── pages/
│       │   ├── CategoriesPage.jsx
│       │   ├── DashboardPage.jsx
│       │   ├── Layout.jsx
│       │   ├── LoginPage.jsx
│       │   ├── NotFoundPage.jsx
│       │   └── RegisterPage.jsx
│       ├── services/
│       │   └── supabase.js
│       ├── App.css
│       ├── App.jsx
│       ├── index.css
│       └── main.jsx
├── .env
├── .env.example
├── .gitignore
├── README.md
├── package-lock.json
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

## 7. Historias de Usuario

1.  **Como nuevo usuario, quiero registrarme con mi correo y contraseña** para poder acceder a la aplicación y empezar a gestionar mis tareas.
2.  **Como usuario registrado, quiero crear, ver, editar y eliminar categorías** para poder organizar mis tareas de forma lógica (por ejemplo, "Trabajo", "Estudio", "Personal").
3.  **Como usuario registrado, quiero crear una nueva tarea con título, descripción y fecha límite, y asignarla a una categoría,** para poder dar seguimiento a mis pendientes de forma clara y ordenada.

## 8. Lecciones Aprendidas
- Aunque el proyecto no parecía tan grande, entre aprender nuevas herramientas, resolver errores y probar todo, me di cuenta de que es importante dejar tiempo para imprevistos y no subestimar las tareas.
- No dejar todo a último minuto ;> 
- Usar Supabase facilita mucho el backend para prototipos
- Supabase hace que registrarse y loguearse sea sencillo, pero mantener la sesión y mostrar solo los datos del usuario fue más complicado de lo que pensaba. 
- Crear, leer, editar y borrar datos parece simple, pero al hacerlo con autenticación, validaciones y categorías asociadas, terminé aprendiendo muchísimo sobre cómo se conectan todas las partes de una app real.


