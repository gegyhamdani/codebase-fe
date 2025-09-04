# Codebase Frontend

A modern, opinionated frontend starter built with **Next.js 15**, **React 19**, and **TypeScript**. It provides a scalable foundation featuring authentication, data fetching, table utilities, form handling, validation, consistent styling primitives, and DX-focused tooling so you can build product features faster with confidence.

## Prerequisites

- Node.js 20.x or later
- npm or yarn package manager
- A modern web browser (preferably Chrome or any Chromium-based browser such as Arc, Brave, or etc.)
- Supported operating systems: Windows (including WSL), Linux, and macOS
- Latest VSCode

## Quick Start

1. Clone the repository:

```bash
git clone <repository-url> codebase-frontend
cd codebase-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start development server:

```bash
npm run dev
```

Visit `http://localhost:3000` to view your application.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build the project with type checking
- `npm run start` - Start production build
- `npm run lint` - Run ESLint checks

## Core Technologies

### Main Runtime & Framework

- **React 19** – Modern UI library with concurrent features
- **Next.js 15** – App Router, Server Components, API routes, image & font optimization

### Data & State

- **@tanstack/react-query 5** – Async state, caching, background refetching
- **@tanstack/react-table 8** – Headless, extensible table utilities

### Forms & Validation

- **react-hook-form 7** – Performant form state management
- **@hookform/resolvers** + **Zod** – Schema validation and type inference

### Auth & Security

- **next-auth** – Authentication/session management

### Networking

- **Axios** – Configurable HTTP client (see `src/libs/axios-instance.ts`)
- **qs** – Safe query string serialization / parsing

### UI & Styling

- **Tailwind CSS 3** – Utility-first styling
- **tailwind-merge** & **class-variance-authority** – Class composition & variant patterns
- **Radix UI primitives (@radix-ui/react-*)** – Accessible UI building blocks
- **lucide-react** – Icon set
- **react-toastify** – Toast notifications

### Utilities & DX

- **react-use** – Reusable hooks
- **TypeScript 5** – Static typing
- **ESLint 8** + **Prettier** – Linting & formatting

> The versions above reflect those declared in `package.json` at the time of this README update.

### ESLint & Prettier Configuration

This project uses **ESLint 8** (see `package.json`) and **Prettier** for code quality and formatting. VS Code settings (if present) should integrate both automatically.

**Required VS Code Extensions:**

- ESLint
- Prettier - Code formatter

**Setup Instructions:**

1. Install the required extensions listed above
2. The project's `.vscode/settings.json` contains all necessary configurations
3. For ESLint 9 compatibility, ensure you don't have conflicting user settings:

- Open Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`)
- Select "Preferences: Open User Settings (JSON)"
- Remove or comment out any `eslint.options.extensions` setting:

```jsonc
{
  // Remove this if it exists
  // "eslint.options": {
  //   "extensions": [".js", ".jsx", ".ts", ".tsx"]
  // }
}
```

The workspace settings will automatically configure ESLint and Prettier to work together seamlessly. If lint errors differ from CI, ensure your local ESLint version matches the one in `package.json`.

## Development Guidelines

For detailed development guidelines, please refer to:

- [Development Guidelines](./docs/DEVELOPMENT-GUIDELINES.md)

## Environment Variables

This project uses environment variables for configuration. For detailed environment configuration and best practices, please refer to:

- [Environment Variables Guidelines](./docs/ENVIRONMENT-VARIABLES.md)

## Contributing

Please read our [Contributing Guidelines](./docs/CONTRIBUTING.md) for details on our branch naming convention and commit message format.

Key points for contribution:

- Branch naming: `type/subject` (e.g., `feat/add-login-page`)
- Commit messages: `type: subject` (e.g., `feat: implement login form`)
- Always create branch from `develop`

---

For questions or support, please reach out to the development team. Happy coding! 🚀.
