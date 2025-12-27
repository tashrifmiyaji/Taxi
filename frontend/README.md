# Taxi Frontend

A modern, responsive React application for a ride‑sharing platform. This frontend supports two actor types: users and captains (drivers). It pairs with the backend in `../backend`.

## Table of contents
- Features
- Tech stack
- Project structure
- Installation
- Configuration
- Running
- Pages & components
- API integration
- Authentication

## Features

- User authentication (signup / login)
- Ride booking: search pickup and destination
- Vehicle selection (car / bike)
- Ride confirmation and real-time status
- Captain (driver) authentication and profile
- Protected routes for user and captain

## Tech stack

- React 19.x
- React Router DOM
- Vite
- TailwindCSS
- Axios
- ESLint

## Project structure (frontend)

- public/
- src/
  - apis/ (api wrappers: `api.jsx`, `captainApi.jsx`, `rideApi.jsx`)
  - components/ (UI panels and ride flows)
  - context/ (global `UserContext`, `CaptainContext`, `SocketContext`)
  - pages/ (Start, user and captain pages)
  - protector/ (protected route components)
- index.html
- package.json
- vite.config.js

See the code for the exact layout in `src/`.

## Installation

Prerequisites: Node.js (v14+), npm or yarn.

Commands:
```bash
git clone <repository-url>
cd Taxi/frontend
npm install
npm run dev
```

The dev server runs with HMR (default port 5173).

## Configuration

Create a `.env.local` in the `frontend` folder with:
```env
VITE_BASE_URL=http://localhost:5000
```

## Running

- Dev: `npm run dev`
- Build: `npm run build`
- Preview production build: `npm run preview`
- Lint: `npm run lint`

## Pages & components (high level)

- `Start.jsx` — landing page
- User pages: `Home.jsx`, `Riding.jsx`, `UserLogin.jsx`, `UserSignUp.jsx`, `UserLogout.jsx`
- Captain pages: `CaptainHome.jsx`, `CaptainLogin.jsx`, `CaptainSignUp.jsx`, `CaptainRiding.jsx`, `CaptainLogout.jsx`
- Components: `LocationSearchPanel`, `VehiclePanel`, `ConfirmRide`, `LockingForADriver`, `WaitingForDriver`, `LiveTracking`, etc.

## API integration

API wrappers are in `src/apis`:

- `src/apis/api.jsx` — user endpoints (register, login, profile, logout)
- `src/apis/captainApi.jsx` — captain endpoints (register, login, profile, logout)
- `src/apis/rideApi.jsx` — ride-related endpoints

Tokens: the frontend stores JWT tokens (commonly in `localStorage` under `token`) and sends `Authorization: Bearer <token>` for protected endpoints.

## Authentication flow

1) User/captain submits credentials
2) Backend returns JWT token on success
3) Frontend stores token and uses it for protected requests
4) Logout clears token and notifies backend (blacklist)

## Troubleshooting

- Ensure `VITE_BASE_URL` matches the running backend
- If you see module not found errors, check import case (e.g., `UserContext` vs `userContext`)
- If routing errors occur, ensure `react-router-dom` imports are used consistently

---

**Version**: 1.1.1
**Last Updated**: December 27, 2025

If you want, I can also:
- add `curl` examples for the API endpoints
- generate a minimal `postman_collection.json`
- open a PR or commit these changes for you
