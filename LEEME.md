# 🌟 Introducción

¡Bienvenido al proyecto MERN! Aquí encontrarás una guía para entender el cliente de nuestra aplicación, su estructura y cómo se comunica con el backend. Si estás buscando detalles específicos sobre el backend, consulta el archivo `backend/README.md`.

---

## 📂 Estructura del Cliente

### 📡 **axios.js**

Este archivo define una instancia del paquete `axios`, que usamos para hacer solicitudes HTTP al backend. En este archivo, se establece la dirección base del servidor (o `baseURL`). Actualmente, está apuntando a un servidor alojado en Vercel. Si quieres apuntar a un backend diferente, modifica el valor de `baseURL` en este archivo.

### 🛂 **auth.js**

Este archivo contiene funciones relacionadas con la autenticación:

- **registerRequest**: Para registrar a un usuario nuevo.
- **loginRequest**: Autenticar a un usuario.
- **logoutRequest**: Cerrar la sesión de un usuario.
- **verifyTokenRequest**: Verificar si el token del usuario es válido.

### 📋 **tasks.js**

En este archivo, encontrarás funciones relacionadas con la gestión de tareas:

- **getTasksRequest**: Obtiene todas las tareas de un usuario.
- **getTaskRequest**: Obtiene detalles de una tarea específica usando su ID.
- **createTaskRequest**: Crea una nueva tarea.
- **updateTaskRequest**: Actualiza una tarea existente.
- **deleteTaskRequest**: Elimina una tarea usando su ID.

Estas funciones utilizan la instancia de `axios` definida en `axios.js` para comunicarse con el backend.

---

## 📚 **Entendiendo la Estructura de Rutas y Contextos de la Aplicación**

### 1. **Contextos**

Antes de entender cómo funcionan las rutas, es fundamental comprender el concepto de Contextos en React.

#### a. **AuthContext.jsx**

- Proporciona una forma de compartir valores como la autenticación del usuario y funciones relacionadas entre componentes sin tener que pasar explícitamente props a través de cada nivel del árbol de componentes.
- Las funciones principales son: `signup`, `signin`, `logout` y la verificación automática de la autenticación al cargar la aplicación mediante el uso de tokens.
- Hace uso de hooks (`useState`, `useEffect`) para gestionar y persistir el estado de autenticación y otros estados relacionados.

#### b. **TasksContext.jsx**

- Similar a `AuthContext`, pero centrado en la gestión de tareas.
- Ofrece funciones como `createTask`, `getTasks`, `deleteTask`, `getTask` y `updateTask`.

### 2. **Rutas Protegidas**

El archivo `ProtectedRoute` es crucial para gestionar el acceso a rutas específicas que requieren que el usuario esté autenticado.

- Si la aplicación está cargando (`loading` es `true`), muestra una pantalla de carga.
- Si el usuario no está autenticado y la aplicación ha terminado de cargar, redirige al usuario a la página de inicio de sesión.
- Si el usuario está autenticado, simplemente muestra el contenido solicitado (`Outlet`).

### 3. **Estructura Principal de Rutas**

El archivo `App` es la columna vertebral de tu aplicación. Aquí es donde se define la estructura principal y cómo se muestran las páginas.

#### a. **Proveedor de Contextos**

Toda la aplicación está envuelta en los proveedores `AuthProvider` y `TaskProvider`, lo que significa que cualquier componente hijo puede acceder fácilmente a las funciones y estados definidos en estos contextos.

#### b. **BrowserRouter**

- Es el componente principal que permite la navegación entre páginas en tu aplicación.

#### c. **Rutas**

- Las rutas públicas son aquellas a las que cualquier usuario puede acceder, como la página principal, inicio de sesión y registro.
- Las rutas privadas requieren autenticación y están envueltas en `ProtectedRoute`.

#### d. **Navbar**

- La barra de navegación es un componente que se muestra en todas las páginas y probablemente contenga enlaces para navegar entre diferentes partes de la aplicación.

Con estos elementos, tu aplicación garantiza que sólo los usuarios autenticados puedan acceder a ciertas partes de ella, y proporciona una estructura organizada para gestionar la autenticación y la lógica relacionada con las tareas.

---

## 📚 **Analisis de los componentes**

En esta sección vamos a analizar cada uno de los componentes del proyecto para ver qué hacen y cuáles son

## 1. Navbar.jsx

    Este componente representa la barra de navegación del sitio.

### Componentes y bibliotecas importadas:

- **React**: Librería principal.
- **Link**: Componente de React Router para la navegación.
- **useAuth**: Un hook personalizado que provee información relacionada con la autenticación.
- **Button** y **ButtonGroup**: Componentes de BlueprintJS para la representación de botones y grupos de botones.

### Funcionalidad del componente:

- **Autenticación**: Se extraen varios valores del contexto de autenticación (`isAuthenticated`, `user`, y `logout`). Estos valores determinan si el usuario está autenticado y la presentación de la navbar.
- **Condicionales**: Hay una lógica condicional que muestra diferentes opciones según si el usuario está autenticado o no. Si está autenticado, muestra opciones para añadir tareas, ver notificaciones y cerrar sesión. Si no lo está, ofrece opciones para iniciar sesión o registrarse.
- **Estilo**: Se utilizan varias clases CSS para estilo, presumiblemente provenientes de Tailwind CSS (como `flex`, `justify-between`, etc.) y de BlueprintJS (como `bp5-navbar`, `bp5-dark`, etc.).

## 2. TaskCard.jsx

    Este componente representa una tarjeta individual de una tarea.

### Componentes y bibliotecas importadas:

- Diversos componentes de **BlueprintJS** como Alert, Button, Card, etc.
- **useEffect** y **useState**: Hooks de React para manejar efectos secundarios y estado local.
- **useTasks**: Un hook personalizado que provee funciones relacionadas con las tareas.
- **Link**: Componente de React Router para la navegación.

### Funcionalidad del componente:

- **Manejo de tareas**: Se extraen funciones del contexto de tareas (`deleteTask`).
- **Estado local**: Hay varios estados locales para manejar la apertura de alertas y toasts.
- **Alertas**: Hay alertas (modales) para confirmar la eliminación y edición de tareas. Cuando el usuario confirma una acción, se invocan las funciones correspondientes (`deleteTaskHandle` o `editTaskHandle`).
- **Toasts**: Son pequeñas notificaciones que aparecen para informar al usuario sobre una acción (como eliminar o editar una tarea). Se utilizan junto con el componente Toaster de BlueprintJS.
- **Presentación**: La tarea se muestra en una tarjeta con su título, fecha y descripción. También ofrece botones para editar y eliminar la tarea.

## Relación entre los componentes:

- **Navbar.jsx** :
  - Se encuentra en una posición fija en la parte superior de la aplicación, permitiendo al usuario navegar y acceder a diferentes secciones en cualquier momento.
- **TaskCard.jsx** :
  - Se utiliza dentro de una lista o cuadrícula que muestra todas las tareas del usuario. Cada instancia de `TaskCard` representa una tarea única.

Ambos componentes interactúan con diferentes contextos (`AuthContext` y `TasksContext`), lo que indica que la aplicación utiliza el patrón de contexto para manejar y compartir estados globales como la autenticación del usuario y la lista de tareas.

---

## 📚 **Estructura de la aplicación**

Las páginas principales de la aplicación se encuentran en los siguientes archivos:

- **`HomePage.jsx`**
- **`LoginPage.jsx`**
- **`RegisterPage.jsx`**
- **`TasksPage.jsx`**
- **`TaskFormPage.jsx`**
- **`ProfilePage.jsx`**

### 1. _HomePage (HomePage.jsx)_

- **Función:** Página principal o de inicio de la aplicación.
- **Relación con otras páginas:** Sirve como punto de entrada para la aplicación
- **Componentes:** Utiliza Colors de @blueprintjs/core para darle un fondo.
- **API:** No realiza llamadas a ninguna API.
-

### 2. _LoginPage (LoginPage.jsx)_

- **Función:** Página para iniciar sesión.
- **Relación con otras páginas:** Una vez que un usuario inicia sesión con éxito, se redirige a la página de tareas (TasksPage).
- **Componentes:** Button, Card, Elevation: Estos componentes de @blueprintjs/core ayudan a estilizar la página.
- **API:** Utiliza el contexto AuthContext para hacer llamadas a la función signin, que posiblemente hace una llamada a la API de autenticación.

### 3. _RegisterPage (RegisterPage.jsx)_

- **Función:** Página para registrarse.
- **Relación con otras páginas:** Una vez que un usuario se registra con éxito, se redirige a la página de tareas (TasksPage).
- **Componentes:** Button, Card, Elevation: Componentes de estilo.
- **API:** Usa el contexto AuthContext para realizar el registro del usuario a través de la función signup.

### 4. _TasksPage (TasksPage.jsx)_

- **Función:** Muestra las tareas del usuario.
- **Relación con otras páginas:** Esta página es a la que se redirige después de que un usuario inicia sesión o se registra con éxito.
- **Componentes:** TaskCard: Representa cada tarea en la lista.
- **API:** Al cargar, hace una llamada a la función getTasks del contexto TasksContext para obtener la lista de tareas.
-

### 5. _TaskFormPage (TaskFormPage.jsx)_

- **Función:** Página para crear o editar tareas.
- **Relación con otras páginas:** Una vez que un usuario se registra con éxito, se redirige a la página de tareas (TasksPage).
- **Componentes:** Button, Card, Elevation, DateInput: Componentes para estilizar y proporcionar funcionalidad al formulario.
- **API:** Usa TasksContext para createTask o updateTask dependiendo de si está creando una nueva tarea o editando una existente.

### 6. _ProfilePage (ProfilePage.jsx)_

- **Función:** Esta página puede mostrar información del perfil del usuario. Actualmente, solo muestra "ProfilePage" con un fondo específico.
- **Relación con otras páginas:** Generalmente, una página de perfil tendría enlaces para editar el perfil o cambiar la contraseña, pero en el código proporcionado no se muestran esas funcionalidades.
- **Componentes:** No utiliza componentes adicionales. Principalmente utiliza Colors de @blueprintjs/core para el estilo.
- **API:** No realiza llamadas a ninguna API basada en el código proporcionado.

---

## 💼 **Ejecución y Construcción**

### 🚀 **Ejecución Local**

1. **Configurar el Backend**: Antes de comenzar, asegúrate de que el archivo `axios.js` esté apuntando al backend correcto. Si estás ejecutando el backend en tu máquina local, ajusta el `baseURL` en `axios.js` a la dirección local adecuada. Si decidieras alojar el backend en un lugar diferente, simplemente actualiza la dirección correspondientemente.

2. **Instalación de Dependencias**: Si aún no lo has hecho, instala las dependencias del proyecto ejecutando el siguiente comando:

   ```bash
   npm install
   ```

3. **Ejecutar el Cliente**: Una vez que hayas configurado todo, puedes ejecutar el cliente localmente utilizando:

   ```bash
   npm run dev
   ```

   Esto iniciará el cliente, y podrás acceder a él a través de tu navegador en [http://localhost:5173](http://localhost:5173) (o el puerto que se indique en la consola).

---

## 🏗 **Construcción**

Para construir la aplicación para un ambiente de producción, ejecuta:

```bash
npm run build
```

Este comando preparará la aplicación para ser desplegada en un servidor o plataforma de hosting. Asegúrate de configurar correctamente cualquier variable de entorno o configuración necesaria para el despliegue en producción.

## 🔧 **Configuraciones Adicionales**

### Linting

Si deseas verificar la calidad y formato del código, puedes ejecutar el linter con el siguiente comando:

```bash
npm run lint
```

### Vista Previa

Tras construir la aplicación, si quieres tener una vista previa de cómo se vería en producción, utiliza:

```bash
npm run preview
```

---

## 🤝 **Contribución**

Puedes realizar un fork o pull request si deseas. para cambios importantes, por favor abre un issue primero para discutir los cambios que te gustaría hacer

---

## 📄 **Licencia**

Sientete libre de usar este código y modificarlo como gustes, solo no olvides de reconocer los creditos de su respectivo author que menciono más abajo

[MIT](https://opensource.org/licenses/MIT)

---

## 🌟 **Créditos**

Esta aplicación está basada en un videotutorial de **fazt**. Todos los creditos del contenido original y del tutorial le pertenecen, visita su canal para más contenido y suscribete

🎥 [Watch the tutorial on YouTube](https://youtu.be/NmkY4JgS21A)
