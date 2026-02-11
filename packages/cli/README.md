# turbo-stack

A CLI tool to scaffold a full-stack monorepo with Next.js, Express, WebSocket, and Prisma (NeonDB).

## Features

- **Frontend**: Next.js (App Router, TailwindCSS)
- **Backend**: Express.js server (Port 5000)
- **WebSocket**: Native WebSocket server (Port 8080)
- **Database**: Prisma ORM with NeonDB (PostgreSQL)
- **Monorepo**: Powered by Turborepo

## Installation

You can run the CLI directly using `npx`:

```bash
npx turbo-stack init
```

Or install it globally:

```bash
npm install -g turbo-stack
```

## Usage

Run the initialization command:

```bash
npx turbo-stack init
```

Follow the prompts:
1.  **Project Name**: Enter the name of your new project folder (default: `my-masti-app`).
2.  **Database URL**: Enter your NeonDB PostgreSQL connection string (e.g., `postgres://user:pass@ep-xyz.region.neondb.net/neondb`).

### What's Included?

The CLI scaffolds a monorepo with the following structure:

```
turbo-stack/
├── apps/
│   ├── web/          # Next.js frontend
│   ├── backend/      # Express server (Port 5000)
│   └── websocket/    # WebSocket server (Port 8080)
├── packages/
│   ├── db/           # Shared Prisma client and schema
│   ├── ui/           # Shared UI components
│   └── ...
├── package.json
└── turbo.json
```

## Getting Started

After the scaffold is complete:

1.  Navigate to your project:
    ```bash
    cd turbo-stack
    ```

2.  Install dependencies:
    ```bash
    pnpm install
    ```

3.  Generate the Prisma client:
    ```bash
    pnpm run db:generate
    ```

4.  Start the development servers:
    ```bash
    pnpm dev
    ```

This will start all applications in parallel using Turborepo.

## Environment Variables

The CLI automatically creates a `.env` file in `packages/db` with your provided `DATABASE_URL`.

**Note**: Ensure your NeonDB is accessible and the connection string is correct.
