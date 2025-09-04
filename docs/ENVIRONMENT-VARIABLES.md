# Environment Variables & Config Best Practices

We manage environment variables using a structured approach to ensure consistency and maintainability.

## Environment Files

Environment variables should be defined in `.env` files at the root of the project.

## Existing Environment Variables

| Key                     | Example Value                  | Description                                                                                                                          |
| ----------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| **NEXTAUTH_BASEPATH**   | /api/auth                      | Base path for NextAuth.js authentication routes                                                                                      |
| **NEXTAUTH_URL**        | http://localhost:3000/api/auth | Full URL for authentication, combining application URL with base path. Used for callbacks and redirects                              |
| **NEXTAUTH_SECRET**     | xxxxx                          | Secret key for encrypting authentication sessions and tokens. <br/> You can generate the secret key with **openssl rand -base64 32** |
| **API_URL**             | http://localhost:3000/api      | Base URL for internal API requests used by the server                                                                                |
| **NEXT_PUBLIC_API_URL** | http://localhost:3000/api      | Public API URL accessible from client-side code. Should match API_URL value                                                          |

### Adding Environment Variables

Create `.env.` file based on `.env.example`

## Environment Files

- Never commit `.env` files (except `.env.example`)
- Keep `.env.example` updated with all required variables
- Include descriptive comments in `.env.example`
