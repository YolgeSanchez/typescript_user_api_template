# TypeScript Reusable User API Template

Welcome to the TypeScript Reusable User API Template! This project provides a robust foundation for building user management systems in your Node.js applications. Whether you're starting a new project or looking to integrate user authentication into an existing one, this template has got you covered.

## 🌟 Features

- User registration and login
- User authentication with email and password
- User management (CRUD operations)
- Role-based access control (RBAC) (optional)
- Logout feature
- Comprehensive test suite

## 🚀 Quick Start

### Clone the Repository

```
git clone https://github.com/YolgeSanchez/typescript_user_api_template.git
cd typescript_user_api_template
```

### Install Dependencies

```
npm install | npm i
```

### Configure Environment Variables

Create a `.env` file in the root directory and add the following:

```
PORT = <your_preferred_port_number>
DB_URI = "<your_mongodb_connection_string>"
JWT_SECRET = "<your_jwt_secret_key>"
```

### Run the Application

```
npm start
```

The server will be running on the port you specified in your .env file.

### Run Tests

The project includes tests to ensure that the functionality is working correctly. To run the tests:

```
npm test src/tests/users.test.ts && npm test src/tests/auth.test.ts
```

## 📚 Usage

This template provides a solid foundation for user management in your API. You can build upon this base to create your specific product features, tasks, or any other functionality your project requires.

### Role-Based vs. Non-Role-Based Models

By default, this template includes role-based access control (RBAC). However, if you prefer a simpler model without roles, you can easily switch to the non-role-based version:

```
git checkout v1.0-not-role-based-api-model
```

In case that you want to return to the role-based access control (RBAC) you can easily return to it with:

```
git checkout v2.0-role-based-access-control-model
```

Alternatively, if you want to start with the non-role-based model from the beginning:

```
git clone -b v1.0-not-role-based-api-model https://github.com/YolgeSanchez/typescript_user_api_template.git
```

## 💻 Getting Started for Development

1. Follow the Quick Start guide to set up the project.
2. Make sure you have Node.js (version 18 or later) and npm installed.
3. For development, you can use the following command to run the server with hot-reloading:

```
npm run dev
```

4. To build the project for production:

```
npm run build
```

## 🗂️ Project structure

This project follows a modular structure, which helps in organizing code for scalability and maintainability. The modular approach allows us to separate different concerns of the application, like user management, authentication, utilities, and middleware, into specific folders. Here's an overview of the structure:

```
├── src/
│   ├── config/              # Database configurations
│   ├── middlewares/         # Custom middleware for authentication, validation, etc.
│   ├── modules/
│   │   ├── auth/            # Authentication logic (login, registration)
│   │   └── users/           # User management (CRUD operations, roles)
│   ├── tests/               # Test cases for the API
│   ├── types/               # TypeScript type definitions
│   └── utils/               # Utility functions (e.g., encryption, admin initialization)
│   ├── app.ts               # Main app configuration and middleware setup
│   └── server.ts            # Server entry point, starts the application
│
├── .env                     # Environment variables for development
├── .env.example             # Sample environment file for setup
├── jest.config.ts           # Jest testing configuration
├── tsconfig.json            # TypeScript configuration
├── package.json             # NPM dependencies and scripts
└── .gitignore               # Ignored files for Git
```

### Why Modular?

The modular structure keeps the code organized, making it easier to scale and maintain. Each feature (like users or authentication) is in its own folder, allowing for quick updates or changes without affecting the rest of the app. It also promotes reusability—common functions and middleware can be shared across the project, avoiding duplication. Overall, this structure makes the project cleaner and more efficient to work with as it grows.

## 🌐 API Endpoints

Here's a brief overview of the main API endpoints:

[ only in role model ]

- POST /api/auth/register: Register a new user
- POST /api/auth/login: Authenticate a user
- GET /api/users: Get all users (requires authentication) [ admin & user ]
- GET /api/users/:id: Get a specific user (requires authentication) [ admin & user ]
- POST /api/users/ Create a new user (requires authenticatino) [ admin only ]
- PUT /api/users/:id: Update a user (requires authentication) [ admin only ]
- DELETE /api/users/:id: Delete a user (requires authentication) [ admin only ]

## 🛠️ Technologies Used

- Node.js
- TypeScript
- Express.js
- MongoDB
- Mongoose
- ZOD (for data validation)
- JSON Web Tokens (JWT)
- Jest and Supertest (for testing)

## Customization

Feel free to modify and extend this template to fit your specific needs. The modular structure allows for easy additions and modifications.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check [issues page](https://github.com/YolgeSanchez/typescript_user_api_template/issues).

## 📝 License

This project is [MIT](https://opensource.org/licenses/MIT) licensed.

---

Happy coding! If you find this template useful, please consider giving it a star on GitHub. For any questions or support, please open an issue on the GitHub repository.
