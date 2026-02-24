# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A ticket booking app for football (soccer) matches. Users log in via Google (Firebase Auth), browse Premier League matches fetched from the Sofascore public API, and book/cancel tickets stored in Upstash Redis.

## Repository Structure

```
book-tickets/
├── backend/   # Express.js API server (Node.js ESM)
└── frontend/  # React + Vite + TypeScript SPA
```

## Commands

### Frontend (`frontend/`)
Uses **pnpm** as the package manager.

```bash
pnpm dev        # Start dev server at http://localhost:5173
pnpm build      # TypeScript check + Vite production build
pnpm lint       # Run ESLint
pnpm preview    # Preview production build
```

### Backend (`backend/`)
Uses **npm** as the package manager.

```bash
npm run dev     # Start with nodemon (auto-restart)
npm start       # Start for production
```

## Environment Variables

### Frontend (`frontend/.env`)
```
VITE_BASE_URL=http://localhost:3000
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
```

### Backend (`backend/.env`)
```
FIREBASE_PROJECT_ID=
FIREBASE_PRIVATE_KEY=
FIREBASE_CLIENT_EMAIL=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
PORT=3000
```

## Architecture

### Frontend

**Tech stack:** React 19, TypeScript, Vite, TailwindCSS v4, TanStack Query, React Router v7, Firebase (client SDK), Axios, Radix UI, react-toastify.

**Path alias:** `@/` maps to `frontend/src/`.

**Data flow:**
- `src/configs/firebase.ts` — Firebase client app (Auth + Firestore)
- `src/configs/axios.ts` — Two Axios instances: `instance` (backend API at `VITE_BASE_URL/api/v1`) and `sofascoreApi` (Sofascore public API)
- `src/services/` — Raw API call functions using the two axios instances
- `src/hooks/` — TanStack Query hooks wrapping services (e.g. `useMatches`, `useTickets`, `useSession`)
- `src/routes/index.tsx` — Route definitions using lazy-loaded pages
- `src/App.tsx` — Root: `QueryClientProvider` + `BrowserRouter` + route mapping

**Auth pattern:** Firebase Google sign-in → Firebase ID token stored as `accessToken` in `localStorage` → sent as `Authorization: Bearer <token>` header to backend → backend verifies with Firebase Admin SDK.

**Session:** `useSession` hook queries `GET /api/v1/auth` (passes stored token), returns the decoded user `{ uid, name, email, picture }`.

**Pages:**
- `/` — Home: match list by season/round
- `/match/:matchId` — Match detail + book ticket button
- `/profile` — User's booked tickets (paginated via Redis SCAN cursor)

### Backend

**Tech stack:** Express.js (ESM modules), Firebase Admin SDK, Upstash Redis (`@upstash/redis`), jsonwebtoken, cors, dotenv.

**All API routes are prefixed `/api/v1`.**

**Route → Controller mapping:**
| Method | Path | Controller |
|--------|------|------------|
| GET | `/auth` | `verifyToken` middleware (returns user info) |
| POST | `/login` | `auth.login` (verifies Firebase token, returns user) |
| GET | `/ticket/:uid` | `getTicketsByUser` (paginated with cursor) |
| GET | `/ticket/:uid/match/:matchId` | `getTicketByMatchId` |
| POST | `/ticket` | `createTicket` |
| DELETE | `/ticket/:uid/match/:matchId` | `cancelTicket` |

**Redis data model:** Tickets are stored as JSON documents with key pattern `uid:{uid}:match:{matchId}`. Ticket shape: `{ uid, matchId, seasonId, round, created_at }`. Pagination uses `SCAN` with `match: uid:{uid}:*`.

**Auth middleware (`verifyToken.js`):** Extracts Bearer token from `Authorization` header, verifies with `admin.auth().verifyIdToken()`.

**External data:** Match data (fixtures, scores, teams) is fetched client-side directly from the Sofascore public API (`https://www.sofascore.com/api/v1`) — it does **not** go through the backend. The backend only handles auth and ticket CRUD.

**Deployed:** Backend on a Node host; frontend on Vercel at `sofascore-book-tickets.vercel.app`. The backend CORS allowlist includes the Vercel domain.
