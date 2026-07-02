# 📚 Book Tracker API

Una API REST diseñada para la gestión de bibliotecas personales, seguimiento de hábitos de lectura y catalogación de libros. Este proyecto nace con el objetivo de ofrecer una solución completa para que los usuarios puedan registrar sus libros, gestionar listas de deseos y documentar sus opiniones literarias.

## 🎯 Enfoque Técnico

El sistema está construido bajo estrictos estándares de ingeniería de software. Se ha implementado utilizando **Arquitectura Hexagonal (Puertos y Adaptadores)** para asegurar una separación clara entre la lógica central del negocio y los detalles de infraestructura (como la base de datos o el framework web). Esto garantiza un código limpio, altamente cohesivo, poco acoplado y fácil de testear.

## ✨ Funcionalidades Principales

* **Gestión de Usuarios:** Registro seguro con encriptación de contraseñas.
* **Catálogo Centralizado:** Almacenamiento de metadatos de libros (integrable con APIs externas como Google Books).
* **Seguimiento de Lectura:** Estados personalizados por usuario (No leído, Leyendo, Leído, Lista de deseos).
* **Sistema de Reseñas:** Capacidad para puntuar (1-5) y añadir comentarios a los libros finalizados.

## 🛠️ Stack Tecnológico

| Tecnología | Rol en el proyecto |
| :--- | :--- |
| **NestJS** | Framework core de la aplicación y gestión de inyección de dependencias. |
| **Node.js** | Entorno de ejecución. |
| **PostgreSQL** | Motor de base de datos relacional primario. |
| **TypeORM** | Mapeo de datos e interacción con la infraestructura de persistencia. |