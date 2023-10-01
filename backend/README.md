# Node Task Management Backend

A Node.js backend application for managing tasks. Users can register, log in, log out, and perform CRUD operations on tasks.

## Architecture

- **Controllers**: Responsible for handling business logic and communicating with the database.
- **Middlewares**: Handle token validation and request data validation.
- **Endpoints**: Define the API routes users can access.
- **Yup Schemas**: Ensure incoming data meets defined criteria.

## Technologies Used

- Node.js
- Express
- MongoDB
- JWT for authentication
- Zod for data validation

## Installation & Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/davidcastagnetoa/mern-crud-auth-backend.git
   cd mern-crud-auth-backend
   ```

2. **Install Dependencies**

   ```bash
   npm install

   ```

3. **Set Up Environment Variables**

   - Create a `.env` file in the root directory of your project. Check .env_template file
   - Go to mongodb account, login and create a project
   - Navigate to your created project, create New Cluster
   - Define the required environment variables:

   ```bash
   MONGODB_URI=mongodb+srv://<your_username>:<your_password>mern-users.nwszua8.mongodb.net
   TOKEN_SECRET=your_jwt_secret_key
   ```

4. **Running the Server**

   ```bash
   npm start
   ```

## Deploying

If you wish to run it in another server for example in vercel. this is the steps:

## Vercel server

1. **Install vercel CLI**

```bash
npm i -g vercel
# yarn global add vercel ---if using yarn instead of npm
```

2. **Updating Vercel CLI**

```bash
npm i -g vercel@latest
```

3. **Deploy with Vercel** (you can use `vercel login`)

```bash
cd mern-crud-auth-backend/backend && vercel deploy --prod # or just "vercel" without "--prod".
```

## API Endpoints

### User Routes

- `POST /api/register`: Register a new user.
- `POST /api/login`: Log in a user.
- `GET /api/logout`: Log out a user.
- `GET /api/profile`: Get the profile of the logged-in user.
- `GET /api/verify`: Verify a user's token.

### Task Routes

- `GET /api/tasks`: Get all tasks for the logged-in user.
- `POST /api/tasks`: Create a new task.
- `GET /api/tasks/:id`: Get a specific task.
- `DELETE /api/tasks/:id`: Delete a task.
- `PUT /api/tasks/:id`: Update a task.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Credits

This application is based on the video tutorial created by [fazt](https://www.faztweb.com/). All credits for the original content and tutorial go to him.

🎥 [Watch the tutorial on YouTube](https://youtu.be/NmkY4JgS21A)
