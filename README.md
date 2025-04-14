# Control de Jornada Laboral

Este proyecto es una aplicación para el control de jornada laboral que incluye un frontend desarrollado en **React** y un backend construido con **Express**. Utiliza **MongoDB** y **PostgreSQL** como bases de datos y está configurado para funcionar con **Docker** para facilitar la gestión de las bases de datos.

## Características

- **Frontend**:
  - Desarrollado con **React**.
  - Gestión de estado y autenticación mediante **Context API**.
  - Diseño responsivo para una experiencia de usuario óptima en dispositivos móviles y de escritorio.
  - Uso de **React Toastify** para notificaciones.

- **Backend**:
  - Construido con **Express**.
  - Autenticación de usuarios con **JWT (JSON Web Tokens)**.
  - Gestión de usuarios y registros de tiempo.
  - Conexión a dos bases de datos:
    - **PostgreSQL**: Para datos estructurados como usuarios y registros.
    - **MongoDB**: Para datos no estructurados o históricos.

- **Bases de Datos**:
  - **PostgreSQL**: Configurado con un archivo SQL de inicialización para crear tablas automáticamente.
  - **MongoDB**: Configurado para almacenar datos no relacionales.

- **Docker**:
  - Contenedores para **PostgreSQL** y **MongoDB**.
  - Configuración mediante `docker-compose` para facilitar el despliegue.

- **Otros**:
  - Uso de **TypeScript** en el backend para un desarrollo más robusto.
  - Configuración de variables de entorno mediante `.env`.
  - Scripts de inicialización para bases de datos.

## Requisitos Previos

- **Node.js** (v16 o superior)
- **Docker** y **Docker Compose**
- **npm** o **yarn**

## Screenshots

![image](https://github.com/user-attachments/assets/ae9f59ac-4d96-4b58-bd65-40e1ed3bc713)


## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/control-jornada.git
   cd control-jornada
