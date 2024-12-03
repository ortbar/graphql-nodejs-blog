# **GraphQL API Básica**

Esta API básica, desarrollada con GraphQL y Node.js, proporciona una forma eficiente y flexible de gestionar **usuarios**, **publicaciones** y **comentarios**. Implementa funcionalidades esenciales para registrar usuarios, autenticar, crear contenido y consultar relaciones entre entidades.

---

## **Características**

1. **Gestión de Usuarios**
   - Registro y autenticación mediante **JSON Web Tokens (JWT)**.
   - Consultas para listar usuarios o consultar detalles de un usuario específico.

2. **Gestión de Publicaciones**
   - CRUD completo: Crear, leer, actualizar y eliminar publicaciones.
   - Consultas para obtener una lista de publicaciones o detalles individuales.
   - Relaciones entre publicaciones y sus autores.

3. **Gestión de Comentarios**
   - CRUD completo: Crear, leer, actualizar y eliminar comentarios.
   - Consultas para listar comentarios asociados a publicaciones o usuarios.
   - Resolución de relaciones entre comentarios, publicaciones y autores.

4. **Relaciones Dinámicas**
   - Resolución automática de relaciones entre entidades (usuarios, publicaciones y comentarios) gracias a GraphQL.

---

## **Tecnologías Utilizadas**

- **Node.js**: Plataforma de desarrollo backend.
- **GraphQL**: Lenguaje de consulta para APIs.
- **Express.js**: Framework para manejar rutas y middlewares.
- **MongoDB**: Base de datos NoSQL para persistencia de datos.
- **Mongoose**: ODM para modelar datos en MongoDB.
- **jsonwebtoken**: Generación y verificación de JWT para autenticación.

---

## **Requisitos Previos**

1. Tener instalado:
   - Node.js v14 o superior.
   - MongoDB en ejecución (local o remoto).


