# Backend para Gestión de Tareas con Node

Una aplicación backend con Node.js para gestionar tareas. Los usuarios pueden registrarse, iniciar sesión, cerrar sesión y realizar operaciones CRUD en tareas.

## Arquitectura

- **Controladores**: Responsables de manejar la lógica del negocio y comunicarse con la base de datos.
- **Middlewares**: Manejan la validación de tokens y la validación de datos de las solicitudes.
- **Endpoints**: Definen las rutas de la API a las que los usuarios pueden acceder.
- **Esquemas de Yup**: Aseguran que los datos entrantes cumplan con los criterios definidos.

## Tecnologías Utilizadas

- Node.js
- Express
- MongoDB
- JWT para autenticación
- Zod para validación de datos

## Instalación y Configuración

1. **Clonar el Repositorio**

   ```bash
   git clone https://github.com/davidcastagnetoa/mern-crud-auth-backend.git
   cd mern-crud-auth-backend
   ```

2. **Instalar Dependencias**

   ```bash
   npm install
   ```

3. **Configurar Variables de Entorno**

   - Crea un archivo .env en el directorio raíz de tu proyecto. Consulta el archivo .env_template
   - Ve a la cuenta de mongodb, inicia sesión y crea un proyecto
   - Navega a tu proyecto creado, crea un Nuevo Cluster
   - Define las variables de entorno requeridas:

   ```bash
   MONGODB_URI=mongodb+srv://<your_username>:<your_password>mern-users.nwszua8.mongodb.net
   TOKEN_SECRET=your_jwt_secret_key
   ```

4. **Ejecutar el Servidor**

   ```bash
   npm start
   ```

## Despliegue

Si deseas ejecutarlo en otro servidor, por ejemplo, en vercel, estos son los pasos:

### _Vercel server_

1.  **Instala el CLI de Vercel**

```bash
npm i -g vercel
# yarn global add vercel ---si usas yarn en lugar de npm
```

1.  **Actualiza el CLI de Vercel**

```bash
npm i -g vercel@latest
```

3.  **Desplegar con Vercel** (puedes usar `vercel login`)

```bash
cd mern-crud-auth-backend/backend && vercel deploy --prod # or just "vercel" without "--prod".
```

## Endpoints de la API

### Rutas de Usuario

- `POST /api/register`: Registrar un nuevo usuario.
- `POST /api/login`: Iniciar sesión de un usuario.
- `GET /api/logout`: Cerrar sesión de un usuario.
- `GET /api/profile`: Obtener el perfil del usuario logueado.
- `GET /api/verify`: Verificar el token de un usuario.

### Rutas de Tareas

- `GET /api/tasks`: Obtener todas las tareas del usuario logueado.
- `POST /api/tasks`: Crear una nueva tarea.
- `GET /api/tasks/:id`: Obtener una tarea específica.
- `DELETE /api/tasks/:id`: Eliminar una tarea.
- `PUT /api/tasks/:id`: Actualizar una tarea.

## Contribución

Las solicitudes pull son bienvenidas. Para cambios mayores, por favor abre un issue primero para discutir lo que te gustaría cambiar.

## Créditos

Esta aplicación está basada en el videotutorial creado por [fazt](https://www.faztweb.com/). Todos los créditos del contenido original y del tutorial le pertenecen.

🎥 [Mira el tutorial en YouTube](https://youtu.be/NmkY4JgS21A)
