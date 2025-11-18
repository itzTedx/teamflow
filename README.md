# Teamflow

A modern team collaboration platform built with Next.js, featuring workspaces, channels, and real-time communication capabilities.

## Features

- 🔐 **Authentication** - Secure authentication powered by Kinde Auth
- 🏢 **Workspaces** - Create and manage multiple workspaces
- 💬 **Channels** - Organize conversations with channel-based communication
- 👥 **Team Management** - Manage workspace members and permissions
- 🎨 **Modern UI** - Beautiful interface built with Shadcn UI and Tailwind CSS
- 🌓 **Dark Mode** - Built-in theme support with next-themes
- ⚡ **Performance** - Optimized with Next.js App Router and React Server Components
- 🔒 **Security** - Rate limiting and protection with Arcjet

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Shadcn UI, Radix UI
- **Authentication**: Kinde Auth
- **API**: ORPC (OpenRPC)
- **State Management**: TanStack Query
- **Form Handling**: React Hook Form with Zod validation
- **Animations**: Motion (Framer Motion)
- **Linting & Formatting**: Biome
- **Notifications**: Sonner

## Getting Started

### Prerequisites

- Node.js 20 or higher
- pnpm (recommended) or npm/yarn/bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd teamflow
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with the following variables:
```env
# Kinde Auth
KINDE_SITE_URL=http://localhost:3000
KINDE_POST_LOGOUT_REDIRECT_URL=http://localhost:3000
KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:3000
KINDE_CLIENT_ID=your_kinde_client_id
KINDE_CLIENT_SECRET=your_kinde_client_secret
KINDE_ISSUER_URL=your_kinde_issuer_url

# Arcjet (optional)
ARCJET_KEY=your_arcjet_key
```

4. Run the development server:
```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (dashboard)/        # Dashboard routes (protected)
│   │   └── workspace/      # Workspace management
│   ├── (marketing)/        # Marketing/public routes
│   ├── api/                # API routes
│   └── rpc/                # ORPC endpoints
├── components/             # React components
│   ├── ui/                 # Shadcn UI components
│   └── providers/          # Context providers
├── lib/                    # Utilities and configurations
│   ├── orpc/               # ORPC client/server setup
│   └── query/              # TanStack Query configuration
├── middleware/             # Next.js middleware
│   ├── auth.ts             # Authentication middleware
│   └── workspace.ts        # Workspace access control
└── schema/                 # Zod validation schemas
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run Biome linter
- `pnpm format` - Format code with Biome

## Development Guidelines

### Code Style

- Use Biome for linting and formatting
- Follow TypeScript strict mode
- Use functional components with hooks
- Prefer server components over client components
- Use `'use client'` only when necessary (interactivity, Web APIs)

### Naming Conventions

- **Files & Directories**: kebab-case (e.g., `user-profile.tsx`)
- **Components**: PascalCase (e.g., `UserProfile`)
- **Functions & Variables**: camelCase (e.g., `getUserData`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)

### Commit Messages

Follow conventional commits format:
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `refactor:` - Code refactoring
- `style:` - Code style changes
- `test:` - Adding or updating tests
- `chore:` - Build process or dependency updates

Example: `feat(workspace): add channel creation functionality`

## Authentication

This project uses [Kinde Auth](https://kinde.com) for authentication. Make sure to:

1. Create a Kinde account and application
2. Configure the redirect URLs in your Kinde dashboard
3. Add the required environment variables to `.env.local`

## API Architecture

The project uses ORPC (OpenRPC) for type-safe API communication:

- Server routes are defined in `src/server/routes/`
- Client is configured in `src/lib/orpc/client.ts`
- Server is configured in `src/lib/orpc/server.ts`
- TanStack Query integration in `src/lib/orpc/tanstack-query`

## Security

- Rate limiting and protection via Arcjet
- Authentication middleware for protected routes
- Workspace access control middleware
- Input validation with Zod schemas

## Contributing

1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Make your changes following the code style guidelines
3. Commit your changes: `git commit -m 'feat: add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is private and proprietary.
