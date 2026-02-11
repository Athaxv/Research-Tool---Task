# create-turbo-starter

A CLI tool to scaffold a full-stack monorepo with Next.js, Express, WebSocket, and Prisma (NeonDB).

## Features

- **Interactive Setup**: Prompts for project name and database configuration.
- **PostgreSQL Support**: Built-in presets for Local, Neon, Supabase, or custom URLs.
- **Automated Setup**:
    - Scaffolds the monorepo structure.
    - Installs dependencies (`pnpm install`).
    - Generates Prisma Client (`prisma generate`).
- **Production Ready**: Includes `.env` configuration and error handling.
- **Monorepo**: Powered by Turborepo.

## Tech Stack & Versions

The scaffolded project is built with the following technologies:

| Package | Version | Description |
| :--- | :--- | :--- |
| **Next.js** | `16.1.6` | React Framework for Frontend |
| **React** | `19.2.3` | UI Library |
| **Express** | `5.2.1` | Backend Framework |
| **Prisma** | `7.3.0` | ORM for PostgreSQL |
| **ws** | `8.19.0` | WebSocket Implementation |
| **TailwindCSS** | `4.0.0` | Utility-first CSS Framework |
| **TypeScript** | `5.0+` | Static Type Checking |

## Installation

You can run the CLI directly using `npx`:

```bash
npx create-turbo-starter
```

Or install it globally:

```bash
npm install -g create-turbo-starter
```

## Usage

Run the command and follow the prompts:

```bash
npx create-turbo-starter
```

### 1. Project Name
Enter your desired project name (e.g., `my-app`). The CLI will check if the folder already exists to prevent accidental overwrites.

### 2. Database Setup
Choose your PostgreSQL provider:
- **Local PostgreSQL**: Enter your local connection string.
- **Neon (Serverless)**: Enter your cloud connection string.
- **Supabase**: Enter your Supabase connection string.
- **Custom**: Provide any valid PostgreSQL URL.

### 3. Sit Back
The CLI will automatically:
1.  Copy the template files.
2.  Set up `.env` and `.env.example` files.
3.  Install dependencies using `pnpm`.
4.  Generate the Prisma client.

## Getting Started

Once the setup is complete, simply run:

```bash
cd <your-project-name>
pnpm dev
```

This will start all services (Frontend, Backend, WebSocket) in development mode.

## Environment Variables

The CLI automatically creates `.env` and `.env.example` files in:
- `packages/db/`
- `apps/backend/`

It populates them with the `DATABASE_URL` you provided.
