# Code Verification Server

This project is a Node.js server application built with Express, TypeScript, and various middleware for enhanced security, logging, and error handling. The server includes a verification service to validate codes and is structured with a focus on modularity, scalability, and clean code practices.

## Table of Contents

- [Code Verification Server](#code-verification-server)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Project Structure](#project-structure)
  - [Scripts](#scripts)
    - [Key Points for Scripts:](#key-points-for-scripts)
  - [Environment Variables](#environment-variables)
  - [Logging](#logging)
  - [Testing](#testing)
  - [Packages Used](#packages-used)

## Installation

To install and set up the project, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add necessary environment variables (see [Environment Variables](#environment-variables)).

## Usage

To start the development server, run:

```bash
npm run dev
```

## Project Structure

The project structure is organized as follows:

```
├── src
│   ├── app.ts                    # Express app configuration
│   ├── server.ts                 # Server entry point
│   ├── config                    # Configuration files
│   ├── controllers               # Route controllers
│   ├── middleware                # Custom middleware functions
│   ├── routes                    # API routes
│   ├── services                  # Business logic and services
│   ├── types                     # TypeScript type definitions
│   └── utils                     # Utility and helper functions
├── __test__                      # Test files
│   ├── integration               # Integration tests
│   └── unit                      # Unit tests
├── .vscode                       # VSCode settings
├── node_modules                  # NPM packages
├── logs                          # Log files (generated)
├── .eslintrc.js                  # ESLint configuration
├── jest.config.js                # Jest configuration
├── package.json                  # Project metadata and scripts
├── tsconfig.json                 # TypeScript configuration
└── .prettierrc                   # Prettier configuration
```

## Scripts

- `npm run dev`: Starts the development server using Nodemon and TSX.
- `npm test`: Runs the test suite using Jest.
- `npm run prepare`: Prepares Husky hooks for Git to run automatically during commits or pushes. This helps in enforcing code formatting and linting.

### Key Points for Scripts:

1. **Start the Development Server:**

   ```bash
   npm run dev
   ```

   - Uses `nodemon` to automatically restart the server on file changes and `tsx` to run the TypeScript server (`src/server.ts`).

2. **Run Tests:**

   ```bash
   npm run test
   ```

   - Runs the tests using Jest with the `NODE_ENV=test` environment. It is used to execute both unit and integration tests.

3. **Prepare Husky:**
   ```bash
   npm run prepare
   ```
   - This script prepares the Husky hooks for Git hooks to run automatically during commits or pushes. Husky will enforce code formatting and linting.

## Environment Variables

The following environment variables are used in the project:

- `PORT`: The port on which the server runs (default: 8000).
- `NODE_ENV`: The environment mode (e.g., development, production).
- `LOG_HTTP`: Boolean to log HTTP requests.

## Logging

Logging is handled using Winston, with logs stored in both console and file formats based on the environment.

## Testing

Tests are written using Jest and Supertest for both unit and integration testing. Run them with:

```bash
npm test
```

## Packages Used

The following packages are used in this project:

- `express`: For building the server and API.
- `helmet`: For security headers.
- `morgan`: For logging HTTP requests.
- `cors`: For enabling cross-origin requests.
- `dotenv`: For managing environment variables.
- `typescript`: For using TypeScript.
- `ts-node`: For running TypeScript with Node.js.
- `tsconfig-paths`: For configuring TypeScript paths.
- `winston`: For logging.
- `supertest`: For integration testing.
- `jest`: For unit testing.
- `eslint`: For code linting.
- `prettier`: For code formatting.
