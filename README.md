# 🌟 Introduction

Welcome to the MERN project! Here you will find a guide to understand the client side of our application, its structure, and how it communicates with the backend. If you are looking for specific details about the backend, refer to the `backend/README.md` file.

---

## 📂 Client Structure

### 📡 **axios.js**

This file defines an instance of the `axios` package, which we use to make HTTP requests to the backend. In this file, the server's base address (or `baseURL`) is established. Currently, it's pointing to a server hosted on Vercel. If you want to target a different backend, modify the `baseURL` value in this file.

### 🛂 **auth.js**

This file contains functions related to authentication:

- **registerRequest**: To register a new user.
- **loginRequest**: Authenticate a user.
- **logoutRequest**: Log a user out.
- **verifyTokenRequest**: Verify if the user's token is valid.

### 📋 **tasks.js**

In this file, you'll find functions related to task management:

- **getTasksRequest**: Fetch all tasks for a user.
- **getTaskRequest**: Fetch details of a specific task using its ID.
- **createTaskRequest**: Create a new task.
- **updateTaskRequest**: Update an existing task.
- **deleteTaskRequest**: Delete a task using its ID.

These functions use the `axios` instance defined in `axios.js` to communicate with the backend.

---

## 📚 **Understanding the Route and Context Structure of the Application**

### 1. **Contexts**

Before understanding how routes work, it's vital to grasp the concept of Contexts in React.

#### a. **AuthContext.jsx**

- Provides a way to share values such as user authentication and related functions among components without having to explicitly pass props through each level of the component tree.
- The primary functions are: `signup`, `signin`, `logout`, and the automatic verification of authentication when loading the app using tokens.
- It uses hooks (`useState`, `useEffect`) to manage and persist authentication state and other related states.

#### b. **TasksContext.jsx**

- Similar to `AuthContext`, but focused on task management.
- It offers functions like `createTask`, `getTasks`, `deleteTask`, `getTask`, and `updateTask`.

### 2. **Protected Routes**

The `ProtectedRoute` file is crucial for managing access to specific routes that require the user to be authenticated.

- If the application is loading (`loading` is `true`), it displays a loading screen.
- If the user is not authenticated and the application has finished loading, it redirects the user to the login page.
- If the user is authenticated, it simply displays the requested content (`Outlet`).

### 3. **Main Route Structure**

The `App` file is the backbone of your application. This is where the main structure is defined and how pages are displayed.

#### a. **Context Providers**

The entire application is wrapped in the `AuthProvider` and `TaskProvider` providers, meaning any child component can easily access the functions and states defined in these contexts.

#### b. **BrowserRouter**

- It is the main component that allows navigation between pages in your application.

#### c. **Routes**

- Public routes are those any user can access, like the main page, login, and registration.
- Private routes require authentication and are wrapped in `ProtectedRoute`.

#### d. **Navbar**

- The navigation bar is a component displayed on all pages and likely contains links to navigate between different parts of the application.

With these elements, your application ensures that only authenticated users can access certain parts of it and provides an organized structure for managing authentication and logic related to tasks.

---

## 📚 **Component Analysis**

In this section, we will analyze each of the project's components to see what they do and what their roles are.

## 1. Navbar.jsx

    This component represents the site's navigation bar.

### Imported components and libraries:

- **React**: Main library.
- **Link**: React Router component for navigation.
- **useAuth**: A custom hook that provides information related to authentication.
- **Button** and **ButtonGroup**: BlueprintJS components for rendering buttons and button groups.

### Component functionality:

- **Authentication**: Several values from the authentication context (`isAuthenticated`, `user`, and `logout`) are extracted. These values determine whether the user is authenticated and the presentation of the navbar.
- **Conditionals**: There's conditional logic that displays different options depending on whether the user is authenticated. If authenticated, it displays options to add tasks, view notifications, and log out. If not, it offers options to log in or sign up.
- **Style**: Several CSS classes are used for styling, presumably from Tailwind CSS (like `flex`, `justify-between`, etc.) and from BlueprintJS (like `bp5-navbar`, `bp5-dark`, etc.).

## 2. TaskCard.jsx

    This component represents an individual task card.

### Imported components and libraries:

- Various **BlueprintJS** components like Alert, Button, Card, etc.
- **useEffect** and **useState**: React hooks for handling side effects and local state.
- **useTasks**: A custom hook that provides functions related to tasks.
- **Link**: React Router component for navigation.

### Component functionality:

- **Task management**: Functions from the task context (`deleteTask`) are extracted.
- **Local state**: There are several local states to handle the opening of alerts and toasts.
- **Alerts**: There are alerts (modals) to confirm task deletion and editing. When the user confirms an action, the corresponding functions (`deleteTaskHandle` or `editTaskHandle`) are invoked.
- **Toasts**: These are small notifications that appear to inform the user about an action (like deleting or editing a task). They are used along with the BlueprintJS Toaster component.
- **Presentation**: The task is displayed on a card with its title, date, and description. It also provides buttons to edit and delete the task.

## Relationship between the components:

- **Navbar.jsx** :
  - It is in a fixed position at the top of the application, allowing the user to navigate and access different sections at any time.
- **TaskCard.jsx** :
  - It's used within a list or grid that displays all the user's tasks. Each `TaskCard` instance represents a unique task.

Both components interact with different contexts (`AuthContext` and `TasksContext`), indicating that the application uses the context pattern to manage and share global states like user authentication and the task list.

---

## 📚 **Application Structure**

The main pages of the application are found in the following files:

- **`HomePage.jsx`**
- **`LoginPage.jsx`**
- **`RegisterPage.jsx`**
- **`TasksPage.jsx`**
- **`TaskFormPage.jsx`**
- **`ProfilePage.jsx`**

### 1. _HomePage (HomePage.jsx)_

- **Purpose:** Main or start page of the application.
- **Relationship with other pages:** Serves as the entry point for the application.
- **Components:** Uses Colors from @blueprintjs/core for background styling.
- **API:** Doesn't make calls to any API.

### 2. _LoginPage (LoginPage.jsx)_

- **Purpose:** Page for logging in.
- **Relationship with other pages:** Once a user successfully logs in, they are redirected to the tasks page (TasksPage).
- **Components:** Button, Card, Elevation: These @blueprintjs/core components help style the page.
- **API:** Uses the AuthContext to make calls to the signin function, which potentially calls an authentication API.

### 3. _RegisterPage (RegisterPage.jsx)_

- **Purpose:** Page for registration.
- **Relationship with other pages:** After a user successfully registers, they are redirected to the tasks page (TasksPage).
- **Components:** Button, Card, Elevation: Styling components.
- **API:** Uses the AuthContext to register the user via the signup function.

### 4. _TasksPage (TasksPage.jsx)_

- **Purpose:** Displays the user's tasks.
- **Relationship with other pages:** This is the page redirected to after a user logs in or registers successfully.
- **Components:** TaskCard: Represents each task in the list.
- **API:** Upon loading, it calls the getTasks function from the TasksContext to fetch the list of tasks.

### 5. _TaskFormPage (TaskFormPage.jsx)_

- **Purpose:** Page to create or edit tasks.
- **Relationship with other pages:** After a user successfully registers, they are redirected to the tasks page (TasksPage).
- **Components:** Button, Card, Elevation, DateInput: Components for styling and providing functionality to the form.
- **API:** Uses TasksContext for createTask or updateTask depending on whether creating a new task or editing an existing one.

### 6. _ProfilePage (ProfilePage.jsx)_

- **Purpose:** This page might display user profile information. Currently, it only displays "ProfilePage" with a specific background.
- **Relationship with other pages:** Typically, a profile page would have links to edit the profile or change the password, but those functionalities aren't displayed in the provided code.
- **Components:** Doesn't use additional components. Mainly uses Colors from @blueprintjs/core for styling.
- **API:** Doesn't make calls to any API based on the provided code.

---

## 💼 **Execution and Build**

### 🚀 **Local Execution**

1. **Setup the Backend**: Before starting, ensure the `axios.js` file is pointing to the correct backend. If you're running the backend on your local machine, adjust the `baseURL` in `axios.js` to the appropriate local address. If you choose to host the backend somewhere else, simply update the address accordingly.

2. **Dependency Installation**: If you haven't done it yet, install the project dependencies by running the following command:

   ```bash
   npm install
   ```

````

3. **Run the Client**: Once everything is set up, you can run the client locally using:

 ```bash
 npm run dev
````

This will start the client, and you can access it through your browser at [http://localhost:5173](http://localhost:5173) (or whichever port is indicated in the console).

---

## 🏗 **Build**

To build the application for a production environment, run:

```bash
npm run build

```

This command will prepare the application to be deployed on a server or hosting platform. Ensure you correctly configure any environment variables or settings required for production deployment.

## 🔧 **Additional Configurations**

### Linting

If you wish to check the quality and format of the code, you can run the linter with the following command:

```bash
npm run lint
```

### Preview

After building the application, if you want to preview how it would look in production, use:

```bash
npm run preview
```

---

## 🤝 **Contribution**

You can fork or make a pull request if you wish. For major changes, please open an issue first to discuss the changes you'd like to make.

---

## 📄 **License**

Feel free to use this code and modify it as you please, just don't forget to acknowledge the credits of its respective author mentioned below.

[MIT](https://opensource.org/licenses/MIT)

---

## 🌟 **Credits**

This application is based on a video tutorial by **fazt**. All credits for the original content and tutorial belong to him. Visit his channel for more content and subscribe.

🎥 [Watch the tutorial on YouTube](https://youtu.be/NmkY4JgS21A)
