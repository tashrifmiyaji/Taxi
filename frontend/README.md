# Taxi Frontend

A modern, responsive React-based web application for a ride-sharing platform. This application supports both users and captains (drivers) with separate authentication, dashboards, and features.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Project Architecture](#project-architecture)
- [Pages & Components](#pages--components)
- [API Integration](#api-integration)
- [Authentication](#authentication)
- [Context & State Management](#context--state-management)
- [Styling](#styling)

## ✨ Features

### User Features
- **User Authentication**: Sign up and login functionality
- **Ride Booking**: Search pickup and destination locations
- **Vehicle Selection**: Choose from available vehicle types (TaxiGo, BikeRide)
- **Ride Confirmation**: Confirm ride details before booking
- **Ride Status**: Track driver location and ride status in real-time
- **Logout**: Secure logout functionality

### Captain (Driver) Features
- **Captain Authentication**: Dedicated sign up and login
- **Vehicle Registration**: Register with vehicle details (color, number, capacity, type)
- **Dashboard**: View available rides (in development)
- **Profile Management**: Manage captain profile

### General Features
- **Protected Routes**: Authentication-based route protection
- **Responsive Design**: Mobile-first responsive UI using TailwindCSS
- **Token-based Authentication**: Secure JWT-based authentication
- **Error Handling**: User-friendly error messages and validation

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | React 19.1.1 |
| **Router** | React Router DOM 7.9.4 |
| **Build Tool** | Vite 7.1.7 |
| **Styling** | TailwindCSS 4.1.14 |
| **HTTP Client** | Axios 1.12.2 |
| **Icons** | React Icons 5.5.0 |
| **Linter** | ESLint 9.36.0 |
| **Node Version** | ES Modules (type: "module") |

## 📁 Project Structure

```
frontend/
├── src/
│   ├── App.jsx                 # Main application component
│   ├── App.css                 # Global app styles
│   ├── main.jsx                # React entry point
│   ├── index.css               # Global styles
│   │
│   ├── apis/
│   │   ├── api.jsx             # User API endpoints
│   │   └── captainApi.jsx      # Captain API endpoints
│   │
│   ├── components/
│   │   ├── ConfirmRide.jsx     # Ride confirmation panel
│   │   ├── LocationSearchPanel.jsx  # Location search UI
│   │   ├── LockingForADriver.jsx    # Searching for driver panel
│   │   ├── VehiclePanel.jsx    # Vehicle selection UI
│   │   └── WaitingForDriver.jsx    # Driver arrival tracking
│   │
│   ├── context/
│   │   ├── UserContext.jsx     # User state management
│   │   └── CaptainContext.jsx  # Captain state management
│   │
│   ├── pages/
│   │   ├── Start.jsx           # Landing/home page
│   │   │
│   │   ├── forUser/
│   │   │   ├── Home.jsx        # Main user dashboard
│   │   │   ├── Riding.jsx      # Active ride tracking
│   │   │   ├── UserLogin.jsx   # User login page
│   │   │   ├── UserSignUp.jsx  # User registration
│   │   │   └── UserLogout.jsx  # User logout handler
│   │   │
│   │   └── forCaptain/
│   │       ├── CaptainHome.jsx     # Captain dashboard
│   │       ├── CaptainLogin.jsx    # Captain login page
│   │       └── CaptainSignUp.jsx   # Captain registration
│   │
│   └── routes/
│       ├── UserProtectedRoute.jsx     # User route protection
│       └── CaptainProtectedRoute.jsx  # Captain route protection
│
├── public/                     # Static assets
├── index.html                  # HTML template
├── package.json                # Dependencies
├── vite.config.js              # Vite configuration
├── eslint.config.js            # ESLint configuration
└── README.md                   # This file
```

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Taxi/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Verify installation**
   ```bash
   npm list
   ```

## ⚙️ Configuration

### Environment Variables

Create a `.env.local` file in the `frontend` directory:

```env
VITE_BASE_URL=http://localhost:5000
```

**Variables:**
- `VITE_BASE_URL`: Backend API base URL (default: http://localhost:5000)

### Vite Configuration

The `vite.config.js` includes:
- React plugin for JSX support
- TailwindCSS plugin for styling

## 🏃 Running the Application

### Development Server

Start the development server with hot module reloading:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Output files will be generated in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

### Lint Code

```bash
npm run lint
```

## 🏗️ Project Architecture

### Component Hierarchy

```
App
├── Routes
│   ├── Start (/)
│   ├── UserProtectedRoute
│   │   ├── Home (/home)
│   │   ├── Riding (/riding)
│   │   └── UserLogout (/user-logout)
│   ├── UserLogin (/user-login)
│   ├── UserSignUp (/user-signup)
│   ├── CaptainProtectedRoute
│   │   └── CaptainHome (/captain-home)
│   ├── CaptainLogin (/captain-login)
│   └── CaptainSignUp (/captain-signup)
```

### Data Flow

1. **Context API**: Global state management for user and captain data
2. **Local Storage**: Persistent token storage for authentication
3. **API Layer**: Centralized API calls through axios instances
4. **Protected Routes**: Verify token and user status before rendering

## 📄 Pages & Components

### Pages

#### **Start.jsx** (`/`)
Landing page where users can choose to continue as a user.
- Displays Taxi branding
- Call-to-action button for user login

#### **User Pages**

| Page | Route | Description |
|------|-------|-------------|
| `Home.jsx` | `/home` | Main dashboard for booking rides |
| `UserLogin.jsx` | `/user-login` | User authentication |
| `UserSignUp.jsx` | `/user-signup` | New user registration |
| `Riding.jsx` | `/riding` | Active ride tracking |
| `UserLogout.jsx` | `/user-logout` | Logout handler |

#### **Captain Pages**

| Page | Route | Description |
|------|-------|-------------|
| `CaptainHome.jsx` | `/captain-home` | Captain dashboard |
| `CaptainLogin.jsx` | `/captain-login` | Captain authentication |
| `CaptainSignUp.jsx` | `/captain-signup` | New captain registration |

### Components

#### **LocationSearchPanel.jsx**
Displays list of nearby locations with icons.
- Props:
  - `setVehiclePanelOpen`: Function to show vehicle panel
  - `setPanelOpen`: Function to close location panel

#### **VehiclePanel.jsx**
Shows available vehicle options with pricing.
- Displays: TaxiGo (4-seater) and BikeRide (1-seater)
- Props:
  - `setVehiclePanelOpen`: Close vehicle panel
  - `SetConfirmRidePanelOpen`: Show confirmation panel

#### **ConfirmRide.jsx**
Displays ride details for confirmation.
- Shows pickup/destination and price
- Props:
  - `SetConfirmRidePanelOpen`: Close confirmation panel
  - `setLockingForADriverPanel`: Show driver search panel

#### **LockingForADriver.jsx**
Shows "Searching for driver..." state.
- Displays ride details while searching
- Props:
  - `setLockingForADriverPanel`: Close search panel

#### **WaitingForDriver.jsx**
Shows driver details and arrival countdown.
- Displays driver info, vehicle, and ETA
- Props:
  - `setWaitingForDriverPanel`: Close panel

## 🔌 API Integration

### User API Endpoints

**File**: `src/apis/api.jsx`

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/user/register` | Register new user |
| POST | `/user/login` | User login |
| GET | `/user/logout` | User logout |
| GET | `/user/profile` | Fetch user profile |

### Captain API Endpoints

**File**: `src/apis/captainApi.jsx`

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/captain/register` | Register new captain |
| POST | `/captain/login` | Captain login |
| GET | `/captain/profile` | Fetch captain profile |

### Usage Example

```javascript
import { userLogin } from '../../apis/api';

// In a component
const res = await userLogin({ email, password });
if (res.status === 200) {
  localStorage.setItem('token', res.data.token);
  // Redirect to home
}
```

## 🔐 Authentication

### Token Storage
- Tokens are stored in `localStorage` under the key `token`
- Token is sent in the `Authorization` header as: `Bearer <token>`

### Login Flow
1. User submits credentials
2. Backend validates and returns token
3. Token stored in localStorage
4. User redirected to protected route
5. Protected route verifies token with backend

### Logout Flow
1. User initiates logout
2. Token sent to backend for blacklisting
3. Token removed from localStorage
4. User redirected to login page

## 🎨 Context & State Management

### UserContext.jsx

Manages global user state:

```javascript
const { user, setUser } = useContext(UserDataContext);
```

**State:**
- `user`: Current user object
- `setUser`: Function to update user

### CaptainContext.jsx

Manages global captain state:

```javascript
const { captain, setCaptain } = useCaptainContext();
```

**Usage:**
```javascript
import { useCaptainContext } from '../context/CaptainContext';

// In a component
const { captain, setCaptain } = useCaptainContext();
```

**State:**
- `captain`: Current captain object
- `setCaptain`: Function to update captain

## 🎨 Styling

### TailwindCSS
- Utility-first CSS framework
- Configured via `@tailwindcss/vite` plugin
- Responsive design with mobile-first approach

### Color Scheme
- Primary: Black (`#111`)
- Secondary: Green (`#10b461`)
- Accent: Red (`bg-red-400`)
- Neutral: Gray (various shades)

### Common Classes
- `bg-[#eeeeee]`: Light gray background (input fields)
- `rounded-2xl`: Rounded corners
- `text-2xl`: Large headings
- `font-semibold`: Semi-bold text

## ⚠️ Known Issues & Bug Fixes

### Summary
✅ **All critical issues have been identified and fixed!**

| Issue | Status | File(s) |
|-------|--------|---------|
| Import Path Inconsistency (UserContext) | ✅ FIXED | UserLogin.jsx, UserSignUp.jsx, main.jsx |
| React Router Inconsistent Imports | ✅ FIXED | UserLogin.jsx, main.jsx |
| Unused useEffect Import | ✅ FIXED | UserSignUp.jsx |
| Missing Captain Logout API | ✅ FIXED | captainApi.jsx |

---

### Issue 1: Import Path Inconsistency in UserLogin.jsx
**File**: `src/pages/forUser/UserLogin.jsx` (Line 4)

**Status**: ✅ **FIXED**

**Problem** (was):
```javascript
import { UserDataContext } from "../../context/userContext";  // ❌ Wrong - lowercase
```

**Solution** (applied):
```javascript
import { UserDataContext } from "../../context/UserContext";  // ✅ Correct - uppercase
```

**Impact**: This was causing a module not found error if file naming is case-sensitive (Linux/Mac).

---

### Issue 2: React Router Import Inconsistency
**Files**: Multiple files

**Status**: ✅ **FIXED** in:
- `src/pages/forUser/UserLogin.jsx`
- `src/main.jsx`

**Files Already Correct**:
- `src/pages/forCaptain/CaptainSignUp.jsx` ✅
- `src/pages/forCaptain/CaptainLogin.jsx` ✅
- `src/pages/forUser/UserSignUp.jsx` ✅

**Problem** (was):
```javascript
import { Link, useNavigate } from "react-router";      // ❌ Some files used this
import { Link, useNavigate } from "react-router-dom";  // Others used this
```

**Solution** (applied):
```javascript
import { Link, useNavigate } from "react-router-dom";  // ✅ Now consistent everywhere
```

---

### Issue 3: Unused Import in UserSignUp.jsx
**File**: `src/pages/forUser/UserSignUp.jsx` (Line 1)

**Status**: ✅ **FIXED**

**Problem** (was):
```javascript
import { useState, useContext, useEffect } from "react";  // ❌ useEffect imported but not used
import { UserDataContext } from "../../context/userContext";  // ❌ Also fixed case
```

**Solution** (applied):
```javascript
import { useState, useContext } from "react";  // ✅ Removed unused import
import { UserDataContext } from "../../context/UserContext";  // ✅ Fixed case
```

---

### Issue 4: Missing Captain Logout API
**File**: `src/apis/captainApi.jsx`

**Status**: ✅ **FIXED**

**Problem**: No logout endpoint defined for captains.

**Solution**: Added logout endpoint to `captainApi.jsx`:
```javascript
// captain logout
export const captainLogout = (token) => {
	return axios.get(`${baseUrl}/captain/logout`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};
```

---

## 🐛 Troubleshooting

### API Connection Issues
- Verify `VITE_BASE_URL` in `.env.local` matches backend URL
- Ensure backend server is running
- Check browser console for CORS errors

### Authentication Issues
- Clear browser cache and localStorage
- Verify token is being stored correctly
- Check token expiration on backend

### Module Not Found Errors
- Check import paths are case-sensitive (UserContext vs userContext)
- Ensure using consistent React Router imports (`react-router-dom`)

### Build Issues
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf dist && npm run build`
- Run lint to catch import issues: `npm run lint`

## 📞 Support

For issues or questions, please contact the development team or create an issue in the repository.

---

**Version**: 1.1.0  
**Last Updated**: November 2025  
**Status**: ✅ All issues fixed and documented
