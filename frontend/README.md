# Book Tickets - Frontend

React + Vite + TypeScript + TailwindCSS v4

## Features

- ⚡️ Vite - Lightning fast build tool
- ⚛️ React 18 - Modern React with hooks
- 🔷 TypeScript - Type safety
- 🎨 TailwindCSS v4 - Utility-first CSS framework
- 📁 Path Alias - Use `@/` for imports from `src/`
- 📦 pnpm - Fast, disk space efficient package manager

## Getting Started

### Install Dependencies

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

### Build

```bash
pnpm build
```

### Preview Production Build

```bash
pnpm preview
```

### Lint

```bash
pnpm lint
```

## Path Alias

You can use `@/` to import from the `src/` directory:

```typescript
import App from '@/App'
import { Button } from '@/components/Button'
```

## Project Structure

```
frontend/
├── public/          # Static assets
├── src/
│   ├── App.tsx      # Main App component
│   ├── main.tsx     # Entry point
│   └── index.css    # Global styles with Tailwind
├── index.html       # HTML template
├── vite.config.ts   # Vite configuration
├── tsconfig.json    # TypeScript configuration
└── package.json     # Dependencies
```

