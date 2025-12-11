#
<div align="center">
<h1> HAMANI </h1>
<br>
<br><br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<h1>SARA SOFÍA DÍAZ RODRÍGUEZ</h1>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<h2></h2>

<h2>BACKEND</h2>

<h2>BUCARAMANGA</h2>

<h2>2025</h2>

</div>

<br>
<br>


# Hanami – Backend API (Node.js + Express + MySQL)

## Tabla de Contenidos
- [Introducción y caso de estudio](#introducción-y-caso-de-estudio)
- [Situación problema](#situación-problema)
- [Arquitectura del proyecto](#arquitectura-del-proyecto)
- [Requisitos previos](#requisitos-previos)
- [Instalación y ejecución](#instalación-y-ejecución)
- [Dependencias principales (package.json)](#dependencias-principales-packagejson)
- [Base de datos MySQL](#base-de-datos-mysql)
- [Endpoints principales](#endpoints-principales)
- [Repositorio Frontend y Figma](#repositorio-frontend-y-figma)
- [Contacto](#contacto)

---

## Introducción y caso de estudio

Este backend forma parte de una aplicación web full stack diseñada para el restaurante **Hanami**, inspirado en la estética y cultura japonesa.  
El objetivo es proporcionar una API robusta que permita gestionar platos, categorías, ingredientes, usuarios y reservas, apoyando una experiencia web moderna, responsiva y alineada con la identidad visual del restaurante.

La API expone endpoints REST que dan soporte a:
- Consulta y gestión del menú (platos, categorías, ingredientes).
- Gestión de usuarios y autenticación con JWT.
- Sistema de reservas con verificación de disponibilidad de mesas.
- Documentación interactiva mediante Swagger UI disponible en `/api-docs`.

---

## Situación problema

Los sitios web de restaurantes cumplen un papel fundamental como punto de contacto digital entre los establecimientos gastronómicos y sus clientes. No solo funcionan como una carta de presentación, sino que también facilitan procesos clave como la consulta del menú, la ubicación, la disponibilidad de mesas y la reserva de manera rápida y autónoma.

Sin embargo, muchos restaurantes enfrentan dificultades al no contar con una plataforma web alineada con su identidad visual, optimizada para la experiencia del usuario o dotada de funciones básicas de interacción.

En el caso de **Hanami**, un restaurante inspirado en la estética y cultura japonesa, actualmente no existe un canal digital que represente de forma coherente su esencia, su gastronomía y su propuesta de valor. Esto genera diferentes problemáticas:

- Limitada visibilidad en medios digitales, dificultando la atracción de nuevos clientes.  
- Ausencia de una imagen profesional que transmita la filosofía del restaurante.  
- Imposibilidad de gestionar reservas en línea, obligando a los usuarios a depender de llamadas o visitas presenciales.  
- Falta de una interfaz estructurada que presente información clave como menú, horarios, historia y datos de contacto.  
- Experiencias poco intuitivas para clientes que buscan información rápida, clara y accesible desde dispositivos móviles.

Frente a esta situación, se plantea el diseño y desarrollo de una **aplicación web full stack** que materialice la identidad del restaurante Hanami y responda a las necesidades de usabilidad actuales.  
Este backend provee la capa de servicios necesaria para:

- Servir datos del menú y su organización por categorías.  
- Gestionar usuarios y roles (cliente / administrador).  
- Registrar, consultar, actualizar y cancelar reservas.  
- Exponer una API documentada y fácilmente testeable desde Swagger UI.

---

## Arquitectura del proyecto

- **Backend**: Node.js + Express.  
- **Base de datos**: MySQL, conectada mediante `mysql2/promise` y un pool de conexiones.  
- **Autenticación**: JWT (JSON Web Tokens) con roles (`customer`, `admin`).  
- **Validación**: Joi para validar cuerpos de las peticiones (usuarios, platos, categorías, ingredientes, reservas).  
- **Documentación**: Swagger UI sirviendo un documento OpenAPI desde `/api-docs`.  

Estructura principal de carpetas (resumen):

- `Config/`  
  - `db.js` – configuración de conexión a MySQL.  
- `Controllers/`  
  - `authController.js`, `dishController.js`, `categoryController.js`, `ingredientController.js`, `reservationController.js`, `userController.js`.  
- `Models/`  
  - Modelos y validaciones de cada entidad (`dishModel.js`, `categoryModel.js`, etc.).  
- `Middlewares/`  
  - `authMiddleware.js` – protección de rutas y verificación de rol admin.  
- `Routes/`  
  - Rutas agrupadas por recurso (`dishRoutes.js`, `reservationRoutes.js`, etc.).  
- `swagger/`  
  - `swaggerAuto.json` – definición OpenAPI consumida por Swagger UI.  
- `app.js` – configuración de Express, middlewares y montaje de rutas.  
- `server.js` – arranque del servidor (app.listen).

---

## Requisitos previos

- Node.js (v18+ recomendado).  
- NPM o Yarn.  
- Servidor MySQL en funcionamiento y una base de datos creada para el proyecto.  
- Archivo `.env` con la configuración necesaria



---

## Instalación y ejecución

1. **Clonar el repositorio del backend**  
git clone https://github.com/Sarasofia1214/Hanami_BackEnd.git


2. **Instalar dependencias**  
npm install


3. **Configurar variables de entorno**  
- Crear un archivo `.env` en la raíz con las claves de base de datos y `JWT_SECRET`.  
- Verificar que MySQL esté corriendo y que exista la base de datos indicada.

4. **Ejecutar migraciones/scripts SQL (si aplica)**  
- Importar el esquema de tablas (users, dishes, categories, ingredients, restaurant_tables, reservations, etc.) en MySQL.  

5. **Levantar el servidor**  
npm run dev


El servidor quedará escuchando en `http://localhost:3000` (o el puerto indicado en `PORT`).

6. **Acceder a la documentación Swagger**  
- Abrir en el navegador:  
  `http://localhost:3000/api-docs`  
- Desde allí puedes probar todos los endpoints con diferentes parámetros y cuerpos.

---

## Dependencias principales (package.json)

Las dependencias clave utilizadas para inicializar y ejecutar el proyecto incluyen:

- **express** – Framework para el servidor HTTP y definición de rutas.  
- **cors** – Manejo de políticas CORS entre frontend y backend.  
- **mysql2** – Conexión a MySQL usando promesas y pool de conexiones.  
- **dotenv** – Carga de variables de entorno desde `.env`.  
- **joi** – Validación de datos de entrada (body, params, etc.).  
- **bcrypt** – Hashing y comparación de contraseñas.  
- **jsonwebtoken** – Generación y verificación de tokens JWT para autenticación.  
- **swagger-ui-express** – Servir la interfaz de Swagger en `/api-docs`.  



## Base de datos MySQL

La implementación de la base de datos se realiza en MySQL, siguiendo un modelo relacional que soporta:

- Tabla `users`:  
  - Campos típicos: `id`, `name`, `email`, `password_hash`, `role`, `created_at`.  
  - Las contraseñas se almacenan siempre hasheadas con bcrypt.  

- Tabla `categories`:  
  - Gestión de categorías de platos (por ejemplo: “Entradas”, “Rolls”, “Postres”).  

- Tabla `dishes`:  
  - Platos del menú, relacionados con `categories` mediante `category_id`.  

- Tablas `ingredients` y `dish_ingredients`:  
  - Modelo para manejar la relación entre platos e ingredientes.  

- Tabla `restaurant_tables`:  
  - Mesas del restaurante, con capacidad y estado (`available`, etc.).  

- Tabla `reservations`:  
  - Reservas realizadas por los usuarios, enlazadas con `users` y `restaurant_tables`, incluyendo `reservation_time`, `number_of_people` y `status` (`pending`, `confirmed`, `cancelled`).

La conexión se realiza mediante `Config/db.js`, usando un pool de conexiones y variables de entorno para credenciales y host.

---

## Endpoints principales

Resumen de los grupos de endpoints expuestos por la API:

- **Auth (`/auth`)**
  - `POST /auth/signup` – Registro de usuario.  
  - `POST /auth/login` – Login y obtención de token JWT.

- **Platos (`/dishes`)**
  - `GET /dishes` – Listar todos los platos.  
  - `GET /dishes/:id` – Obtener un plato por ID.  
  - `POST /dishes` – Crear un nuevo plato.  
  - `PUT /dishes/:id` – Actualizar un plato.  
  - `DELETE /dishes/:id` – Eliminar un plato.

- **Categorías (`/categories`)**
  - `GET /categories` – Listar categorías.  
  - `GET /categories/:id` – Obtener categoría por ID.  
  - `POST /categories` – Crear categoría.  
  - `PUT /categories/:id` – Actualizar categoría.  
  - `DELETE /categories/:id` – Eliminar categoría.

- **Ingredientes (`/ingredients`)**
  - `GET /ingredients` – Listar ingredientes.  
  - `GET /ingredients/:id` – Obtener ingrediente por ID.  
  - `GET /ingredients/dish/:dish_id` – Obtener ingredientes de un plato.  
  - `POST /ingredients` – Crear ingrediente.  
  - `PUT /ingredients/:id` – Actualizar ingrediente.  
  - `DELETE /ingredients/:id` – Eliminar ingrediente.

- **Usuarios (`/users`)**
  - `GET /users` – Listar usuarios.  
  - `GET /users/:id` – Obtener usuario por ID.  
  - `PUT /users/:id` – Actualizar usuario.  
  - `DELETE /users/:id` – Eliminar usuario.

- **Reservas (`/reservations`)**
  - `GET /reservations` – Listar reservas.  
  - `GET /reservations/:id` – Obtener reserva por ID.  
  - `POST /reservations` – Crear reserva (asignación automática de mesa).  
  - `PUT /reservations/:id` – Actualizar reserva.  
  - `DELETE /reservations/:id` – Eliminar reserva.  
  - `PATCH /reservations/:id/cancel` – Cancelar reserva (cambiar estado).  
  - `GET /reservations/availability?datetime=...&people=...` – Consultar mesas disponibles.  
  - `GET /reservations/by-date?date=YYYY-MM-DD` – Listar reservas por fecha.

El detalle de cada endpoint (parámetros, cuerpos esperados, respuestas) puede consultarse y probarse directamente en **Swagger UI** (`/api-docs`).

---

## Repositorio Frontend y Figma

- **Repositorio del Frontend**  
  Hamani – Frontend (React / Vite u otra tecnología indicada en el repo):  
  [https://github.com/Sarasofia1214/Hanami_FrontEnd.git](https://github.com/Sarasofia1214/Hanami_FrontEnd.git)

- **Diseño en Figma**  
  Prototipo de la interfaz y lineamientos visuales:  
  [https://www.figma.com/design/X7lukBJpOmUEMNt1RTnU2l/Restaurant-website-Landing-Page-Design--Community-?node-id=0-1&t=LUZsLYpqZnBuzxjS-1](https://www.figma.com/design/X7lukBJpOmUEMNt1RTnU2l/Restaurant-website-Landing-Page-Design--Community-?node-id=0-1&t=LUZsLYpqZnBuzxjS-1)

---

## Contacto

Si tienes preguntas, sugerencias o encuentras algún problema con la implementación, puedes contactarme a través de:

- GitHub: [Sarasofia1214](https://github.com/Sarasofia1214)
