# Microlab Workspace Frontend

This is the FrontEnd part of the Microlab Workspace. It's built with React and TypeScript. It allows users to manage information about sample collections, sample reports with clients, and other options.

## Getting Started 🚀

These instructions will allow you to obtain a copy of the project and then run it on your local machine, for development and testing purposes.

### Prerequisites 📋

What things you need to install the software and how to install them.

- Node.js version 20.11.0. You can download it from [Node.js official](https://nodejs.org/).
- npm (comes with Node.js).
- GNU Make. You can donwload it from [GNU Make Official](https://www.gnu.org/software/make/)
- json-server. To run the mock server we need to install this library. You can see more details here: https://www.npmjs.com/package/json-server

### Installation 🔧

A step-by-step series of examples that tell you how to get a development environment running.


1. Clone the repository:
```bash
git clone https://github.com/sbateca/mk-lab.git
```
2. Install the dependencies:
```bash
npm install
```
3. set environment variables:
Before starting the application, you need to set up the following environment variables in your `.env` file:
```bash
VITE_BACKEND_URL="http://localhost:4000"
```
If you do not have a `.env` file, create one in the root directory of the project.

Ensure the variable names match those in the src/config/EnvManager.ts file for consistency.


4. Run the mock server:
```bash
make start-server
```
5. Run the project:
```bash
npm run dev
```
this will start the project in development mode. Open [ localhost:5173]( http://localhost:5173/) to view it in the browser.


Once you have started the application, you can log in using the following credentials:
```
Username: admin
```

## Running the tests ⚙️

To run the tests, use the following command:
  
  ```bash
  npm run test
  ```

## Running the linter ⚙️

To run the linter, use the following command:
  
  ```bash
  npm run lint
  ```
## Project Structure 📁

This project follows the Atomic Design pattern for frontend, meaning we organize our components into atoms, molecules, organisms, templates, and pages to promote reusability and maintainability.

```
src/
├── adapters
├── assets
├── components
│   ├── atoms
│   │   ├── Button
│   │   ├── LisItemButton
│   │   ├── Spinner
│   │   ├── TableCell
│   │   ├── TextField
│   │   └── Typography
│   ├── molecules
│   │   ├── AutoComplete
│   │   ├── Header
│   │   ├── Menu
│   │   ├── SnackBarContainer
│   │   ├── TableActionButtons
│   │   ├── TableCell
│   │   ├── TableHead
│   │   ├── TableRow
│   │   └── UserMenu
│   ├── organisms
│   │   ├── Content
│   │   ├── LoginForm
│   │   ├── ReportsContent
│   │   ├── ReportsDetail
│   │   ├── SampleDetail
│   │   ├── SamplesContent
│   │   ├── SideSection
│   │   └── Table
│   ├── pages
│   │   ├── AdminPage
│   │   └── Login
│   └── Templates
│       ├── login
│       └── main
├── config
├── context
│   ├── Menu
│   ├── Services
│   ├── SideSection
│   └── SnackBar
│
├── model
├── services
└── utils
    ├── constants
    └── hooks
  
```

### Guidelines 

- **Atoms**: These are the smallest building blocks of our application. They are the basic HTML elements like buttons, inputs, and labels. They are reusable and can be used across different components.

- **Molecules**: These are a combination of atoms. They are more complex than atoms and are usually used to create a specific part of a UI.

- **Organisms**: These are a combination of molecules and atoms. They are more complex than molecules and are usually used to create a section of a UI.

- **Templates**: These are a combination of organisms, molecules, and atoms. They are used to create a complete page layout.

- **Pages**: These are the final step in the Atomic Design pattern. They are a combination of templates, organisms, molecules, and atoms. They are used to create a complete page.

- **Assets**: This folder contains all the images, icons, and other assets used in the application.

- **Utils**: This folder contains all the utility functions.

- **Context**: This folder contains all the context providers.

## Code Style 🎨

- **Components**: The components are written as a normal function and has the export default at the end of the file. The internal functions, hooks, services and utils uses the arrow functions style and use the export in its declaration part.

- **Imports**: The imports are grouped in the following order: React, third-party libraries, local imports, and styles.


- **Naming**: The name of functions that handle events must be prefixed with handle. For example, handleOnClick.

## Built with 🛠️

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
- [TypeScript](https://www.typescriptlang.org/) - A typed superset of JavaScript that compiles to plain JavaScript.
- [Jest](https://jestjs.io/) - A delightful JavaScript Testing Framework with a focus on simplicity.
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) - A library for testing React components.
- [ESLint](https://eslint.org/) - A pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript.
