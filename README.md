React: Películas (Catálogo de Cine)
Descripción General
Este repositorio contiene la evolución de una aplicación de catálogo de películas completa, construida con React, Material UI y una API REST desarrollada en Django. El proyecto sigue una arquitectura de componentes reutilizables y gestión de estado global.

Introducción a React, Componentes y MUI
Objetivo
Construir el layout de la aplicación "Películas" utilizando Material UI. Se definen los componentes base y la estructura de navegación sin consumo de datos reales.

Requisitos técnicos
Material UI (@mui/material, @emotion/react, @emotion/styled)

Estructura de componentes funcionales

Estructura del proyecto
/src
  /components
    Navigation.jsx
    MoviesList.jsx
  /pages
    MoviesPage.jsx
  /data
    movies_mock.js
  main.jsx
Llamadas a API REST con Axios
Objetivo
Integrar la comunicación con el Backend de Django para cargar las películas de forma dinámica desde la base de datos.

Requisitos técnicos
Axios para peticiones HTTP (GET, POST, PUT, DELETE)

Configuración de la URL base mediante variables de entorno en .env

Nuevas características
Consumo del endpoint /api/movies/ para el catálogo

Sincronización de datos mediante el hook useEffect

Manejo de respuestas de Axios (res.data) y normalización de arrays

Variables de entorno (.env)
Fragmento de código
VITE_API_BASE_URL=http://localhost:8000
VITE_API_MEDIA_URL=${VITE_API_BASE_URL}/media/
Laboratorio 11: Llamadas a API REST con Axios y Gestión de Autorización
Objetivo
Implementar un sistema de seguridad basado en tokens para restringir las acciones de administración (Añadir, Editar y Eliminar) solo a usuarios autenticados.

Requisitos técnicos
Autenticación mediante Django Token Authentication o OAuth

Gestión de tokens en localStorage

Interceptores de Axios para adjuntar automáticamente el header Authorization

Protección de rutas con React Router

Funcionalidades Implementadas
Navegación Condicional: Botones de "Ver Películas" y "Login" visibles por defecto; "Añadir Película" visible solo tras login.

Acciones Protegidas: Los botones de "Editar" y "Eliminar" en cada tarjeta de película solo aparecen para usuarios logueados.

Formulario Profesional: Uso de Grid, TextField y Button de MUI para la creación y edición de películas con subida de imágenes.

ProtectedRoute: Componente de orden superior para evitar el acceso manual a rutas administrativas.

Estructura Actualizada
/src
  /api
    axios.js (Configuración e interceptores)
    movies.api.js (Servicios CRUD)
  /components
    Navigation.jsx
    MoviesList.jsx
    ProtectedRoute.jsx
  /context
    useAuth.jsx (Estado global de sesión)
  /pages
    MoviesPage.jsx
    MoviesFormPage.jsx
    LoginPage.jsx
Instalación del proyecto
Instalar dependencias base:

Bash
npm install
Instalar Material UI e Iconos:

Bash
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
Instalar Axios y Router:

Bash
npm install axios react-router-dom
Ejecutar el servidor de desarrollo:

Bash
npm run dev
