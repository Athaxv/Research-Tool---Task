# Turbo Stack Monorepo

This is a full-stack monorepo scaffolded with `create-turbo-starter`. It includes a Next.js frontend, Express backend, WebSocket server, and a shared Prisma database package, all powered by Turborepo.

## Project Structure

```
.
├── apps/
│   ├── frontend/    # Next.js 15 App Router (Port 3000)
│   ├── backend/     # Express.js Server (Port 5000)
│   └── websocket/   # Native WebSocket Server (Port 8080)
├── packages/
│   ├── db/          # Prisma Schema & Client (NeonDB/Postgres)
│   ├── ui/          # Shared React UI Components
│   └── ...
├── package.json
└── turbo.json
```

## Getting Started

### 1. Install Dependencies

Run the following command from the root directory to install dependencies for all workspaces:

```bash
pnpm install
```

### 2. Database Setup

Ensure your `.env` files in `packages/db` and `apps/backend` contain the correct `DATABASE_URL`.

Then, verify the Prisma client is generated:

```bash
pnpm run db:generate
```

If you need to push the schema to your database (careful in production):

```bash
pnpm run db:push
```

### 3. Start Development

To start all applications (Frontend, Backend, WebSocket) simultaneously:

```bash
pnpm dev
```

Turborepo will manage the execution and output of all services.

## Services

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **WebSocket**: ws://localhost:8080

## Scripts

- `pnpm dev`: Start all apps in development mode.
- `pnpm build`: Build all apps and packages.
- `pnpm run db:generate`: Generate Prisma client.
- `pnpm run db:push`: Push Prisma schema to the database.

## Technologies

- [Turborepo](https://turbo.build/repo)
- [Next.js](https://nextjs.org/)
- [Express.js](https://expressjs.com/)
- [Prisma](https://www.prisma.io/)
- [TailwindCSS](https://tailwindcss.com/)
