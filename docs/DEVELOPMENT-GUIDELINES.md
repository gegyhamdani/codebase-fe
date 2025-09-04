# Development Guidelines

## Table of Contents

- [ESLint & Prettier Configuration](#eslint-&-prettier-configuration)
- [Project Structure](#project-structure)
- [File Naming Conventions](#file-naming-conventions)
- [Folder Naming Conventions](#folder-naming-conventions)
- [Component Organization](#component-organization)
- [Code Style Guidelines](#code-style-guidelines)
- [TypeScript Guidelines](#typescript-guidelines)
- [Environment Variables & Config Best Practices](#environment-variables--config-best-practices)

## ESLint & Prettier Configuration

### ESLint

ESLint rules are defined in `.eslintrc.js`. Avoid disabling rules unless absolutely necessary. When disabling rules, add a comment explaining why:

```typescript
// Disabled eslint because <reason>
// eslint-disable-next-line rule-name
```

### Prettier

Prettier configuration is defined in `.prettierrc.json`. This project uses Prettier for consistent code formatting across the codebase.

## Project Structure

| Folder                  | Purpose                                                    |
| ----------------------- | ---------------------------------------------------------- |
| /public                 | Static assets (images, videos, fonts, etc.)                |
| /src/app                | Next.js App Router pages, layouts, and route handlers      |
| /src/components/commons | Shared components used across multiple pages               |
| /src/components/layouts | Layout components (header, footer, etc.)                   |
| /src/components/ui      | Base UI components (buttons, inputs, etc.)                 |
| /src/constants          | Shared constant values                                     |
| /src/context            | React Context providers and their related logic            |
| /src/hooks              | Reusable custom React hooks                                |
| /src/libs               | External library configurations and instances              |
| /src/services           | API service definitions and implementations                |
| /src/types              | TypeScript type definitions and interfaces                 |
| /src/utils              | Utility functions and helpers                              |
| /src/views              | Page-specific view components with their logic and styling |

### Key directory purposes of Libs and Utils

#### **/src/libs**

Contains configurations and instances of external libraries. This directory is for code that interfaces with or configures third-party packages.

Example:

```typescript
// filepath: /src/libs/query-client.ts
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5
    }
  }
})
```

#### **/src/utils**

Contains pure utility functions, browser API wrappers, and environment helpers. These are standalone functions that don't depend on external libraries.

Example:

```typescript
// filepath: /src/utils/storage.ts
const setLocalStorage = <T>(key: string, value: T): void => {
  if (typeof window === 'undefined') return

  localStorage.setItem(key, JSON.stringify(value))
}
```

## File Naming Conventions

- React Components: **PascalCase** (e.g., `Button.tsx`)
- Media Files: **kebab-case** (e.g., `hero-image.png`)
- Utility Files: **kebab-case** (e.g., `format-date.ts`)
- Component Support Files: Match component name (e.g., `Button.helpers.ts`)
- Context Files: **camelCase** (e.g., `userContext.tsx`)
- Hook Files: **camelCase** starting with "use" (e.g., `useLocalStorage.ts`)
- Other Files: **kebab-case** (e.g., `api-client.ts`, `form-validation.ts`)

### File Extension Guidelines

- Use `.tsx` for files that render JSX/React components
- Use `.ts` for files that don't render anything (utilities, types, constants, etc.)

## Folder Naming Conventions

All folders should use **kebab-case** naming convention:

- Component folders: **kebab-case** (e.g., `user-profile/`, `navigation-menu/`)
- Feature folders: **kebab-case** (e.g., `auth-flow/`, `data-visualization/`)
- Utility folders: **kebab-case** (e.g., `date-utils/`, `form-helpers/`)
- All other folders: **kebab-case** (e.g., `api-services/`, `test-utils/`)

### Examples

```
src/
├── components/
│   ├── ui/
│   │   ├── button/              # kebab-case folder
│   │   │   ├── Button.tsx       # PascalCase component
│   │   │   ├── Button.helpers.ts
│   │   │   └── index.tsx
│   │   └── table/               # kebab-case folder
│   │       ├── Table.tsx        # PascalCase component
│   │       └── index.tsx
├── context/
│   └── userContext.tsx      # camelCase context file
├── hooks/
│   └── useAuth.ts           # camelCase hook file
└── utils/
    └── format-date.ts       # kebab-case utility file
```

## Component Organization

### Support Files

In a component, we can add supporting files that help the component manage its logic.

1. **(componentname).constants.ts**<br/>
   For declaring constants that are only used by one component. Always try to create constant variables for strings/numbers to avoid `hardcode` or `magic numbers`. If a constant variable is only used in one component, store it in this file, but if the constant is used across multiple components, it can be stored in the `src/constants/` folder.

2. **(componentname).helpers.ts**<br/>
   For declaring functions/logic that are only used by one component. Always split the logic from a component, and use this helpers file for declaring functions/logic that are heavy and will be used by the component.

3. **use(componentname).tsx**<br/>
   For creating custom hooks that are only used by one component. Custom hooks are used to separate the logic from the component (fetching, listeners, data updates/manipulation, etc.).

4. **(componentname).schemas.ts**<br/>
   For defining Zod schemas that are specific to one component. These schemas are used for data validation, form validation, or API response validation within the component.

5. **(componentname).types.d.ts**<br/>
   For defining TypeScript types that are specific to one component. These types can be derived from Zod schemas using `z.infer<typeof schema>` or created independently. If types are shared across multiple components, they should be placed in the `src/types/` folder.

### Component Export Structure

Each component should have its own directory with an `index.tsx` file that re-exports the component. This pattern provides cleaner imports and better module organization.

The `index.tsx` file should contain:

```typescript
export { default } from './Button'
```

and in the component

```typescript
import Button from './Button'

export default Button
```

This allows for cleaner imports:

```typescript
// ✅ Good
import Input from '@/components/ui/Button'

// ❌ Avoid
import Input from '@/components/ui/Button/Button'
```

### Directory Structure

```
src/views/dashboard/
├── Dashboard.tsx               # Main component
├── Dashboard.constants.ts      # Component constants
├── Dashboard.helpers.ts        # Helper functions
├── useDashboard.tsx            # Component-specific hook
├── Dashboard.schemas.ts        # Defining Zod schemas
├── Dashboard.types.d.ts        # Defining TypeScript types
└── index.tsx                   # Re-export file
```

### Child Components

When a component has child components that are **only used by that parent component**, create a subfolder with a descriptive prefix and purpose.

#### Naming Convention for Child Components

- Folder: Use **kebab-case** with parent component prefix (e.g., `dashboard-table/`, `user-profile-avatar/`)
- Component: Use **PascalCase** matching the folder name (e.g., `DashboardTable.tsx`, `UserProfileAvatar.tsx`)

#### Examples

```
src/views/dashboard/
├── Dashboard.tsx                    # Main component
├── dashboard-table/                 # Child component folder
│   ├── DashboardTable.tsx           # Child component
│   ├── DashboardTable.helpers.ts    # Optional support files
│   └── index.tsx                    # Re-export file
├── dashboard-sidebar/               # Another child component
│   ├── DashboardSidebar.tsx
│   └── index.tsx
└── index.tsx                        # Main component re-export
```

#### When to Use Different Locations

- **Child components used by one parent only**: Keep in parent's directory with prefix
- **Components used across multiple pages/features**: Move to `/src/components/commons/`
- **Reusable UI components**: Move to `/src/components/ui/`

## Code Style Guidelines

- Variables (except constants) are written in **camelCase**.<br/>
- Constant variables are written in **SCREAMING_SNAKE_CASE**.<br/>
- Functions/Methods are declared using **camelCase**.<br/>
- Components, contexts or something related to react function component are declared using **PascalCase**.<br/>
- Custom hooks are declared using **camelCase** and should start with `use`.<br/>
- Boolean variables should start with `is`, `has`, or `should` (e.g., `isLoading`).
- Use **arrow functions** (`const fn = () => {}`) for function declaration (pure functions, helpers, event handlers, callbacks, etc).

## TypeScript Guidelines

**Prefer `type` over `interface`** unless extending other interfaces for several reasons:

1. Flexibility: type offers greater flexibility for defining various types beyond just object shapes, including function signatures, union types, and more. This versatility makes it suitable for handling the diverse typing needs within a React application.

2. Props and State: While both type and interface can be used for props and state, type is often preferred due to its conciseness and ability to express more complex prop type relationships (e.g., optional props, readonly props).

3. Refs: type is generally the better choice for defining ref types, as interfaces don't work well with the MutableRefObject type often used with refs.

4. Functions: type is the clear winner for defining function types, offering a straightforward way to specify parameter types and return types.

5. Consistency: While interfaces have their place (especially when inheritance is needed), favoring type promotes consistency across your codebase, making it easier to reason about and maintain.

Also, use **discriminated unions** for flexible component props.

Example:

```typescript
type ButtonProps = { variant: 'primary'; onClick: () => void } | { variant: 'link'; href: string }
```

However, interfaces are still useful when working with extensive use of interfaces or anticipate needing inheritance for your type definitions, so there might be scenarios where interfaces are more appropriate. But in general, we favor types for their flexibility and ability to handle a wider range of use cases.

### Zod for Runtime Validation

This project uses **Zod** for schema validation and type inference. Zod provides several key benefits:

1. **Runtime Safety**: While TypeScript provides compile-time type checking, Zod validates data at runtime, ensuring that external data (API responses, form inputs, environment variables) matches expected schemas.

2. **Type Inference**: Zod schemas automatically generate TypeScript types using `z.infer<typeof schema>`, eliminating the need to maintain separate type definitions and reducing the risk of type/validation mismatches.

3. **Form Validation**: Zod integrates seamlessly with form libraries like React Hook Form, providing comprehensive client-side validation with clear error messages.

4. **API Validation**: Zod validates incoming API responses and outgoing request payloads, catching data inconsistencies early and preventing runtime errors.

5. **Environment Variables**: Zod ensures environment variables are properly typed and validated at application startup, preventing configuration-related issues in production.

6. **Single Source of Truth**: By defining schemas once and deriving both validation logic and TypeScript types, Zod eliminates duplication and ensures consistency between runtime behavior and compile-time types.

## Environment Variables & Config Best Practices

For detailed environment variables configuration and best practices, please refer to:

- [Environment Variables Guidelines](./ENVIRONMENT-VARIABLES.md)
