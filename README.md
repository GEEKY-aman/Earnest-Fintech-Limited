# Earnest - Full-Stack Task Management System

A premium, production-ready Task Management System built with a modern full-stack architecture and a stunning "Antigravity UI" theme.

## 🚀 Tech Stack

### Backend
- **Node.js + Express**: Core server framework
- **TypeScript**: Static typing
- **Prisma ORM**: Database interaction
- **SQLite**: Zero-config local database (can easily be swapped to PostgreSQL)
- **JWT Authentication**: Secure access and refresh (rotation) tokens
- **bcrypt**: Password hashing
- **Zod**: Robust request body validation

### Frontend
- **Next.js 15 (App Router)**: React framework
- **TypeScript**: Static typing
- **Tailwind CSS v3**: Utility-first styling with custom glassmorphism
- **Framer Motion**: Premium layout animations and micro-interactions
- **Axios**: HTTP client with automatic token refresh interception

## 🌟 Antigravity UI Experience
Earnest features a highly polished design system inspired by top SaaS products:
- Floating cards with soft, glowing shadows
- Multi-layered glassmorphism (blurred backgrounds and transparency)
- Smooth, dark-mode-first gradients with neon violet and indigo accents
- Fluid layout transitions, hover liftoff effects, and dynamic particle glows

## 📦 Local Setup Instructions

Follow these steps to get the project running locally on your machine.

### Prerequisites
Make sure you have Node.js (v18 or higher) and npm installed on your machine.

### 1. Backend Setup

Open a terminal and navigate to the `backend` directory:

```bash
cd backend
```

**Install dependencies:**
```bash
npm install
```

**Configure environment variables:**
Create a `.env` file in the `backend` directory. You can copy the structure from the provided `.env.example`:
```bash
cp .env.example .env
```
Ensure the `PORT` is set to `5001` in your `.env` file to avoid conflicts with macOS ControlCenter (which uses 5000).

```env
DATABASE_URL="file:./dev.db"
JWT_ACCESS_SECRET="earnest-access-secret-key-change-in-production"
JWT_REFRESH_SECRET="earnest-refresh-secret-key-change-in-production"
ACCESS_TOKEN_EXPIRY="15m"
REFRESH_TOKEN_EXPIRY="7d"
PORT=5001
CORS_ORIGIN="http://localhost:3000"
```

**Set up the Database:**
This project uses SQLite for zero-configuration local development. Generate the Prisma client and push the schema to create the local `.db` file:
```bash
npx prisma generate
npx prisma db push
```

**Start the Development Server:**
```bash
npm run dev
```
The backend server should now be running at `http://localhost:5001`.

### 2. Frontend Setup

Open a new terminal window/tab and navigate to the `frontend` directory:

```bash
cd frontend
```

**Install dependencies:**
```bash
npm install
```

**Configure environment variables:**
Create a `.env.local` file in the `frontend` directory:
```bash
cp .env.example .env.local
```
Make sure it points to the correct backend API URL:
```env
NEXT_PUBLIC_API_URL=http://localhost:5001
```

**Start the Next.js Development Server:**
```bash
npm run dev
```

The frontend application will now be running at `http://localhost:3000`. 
Open this URL in your browser to experience the app!

## 🔐 Features Included
- **Complete Auth Flow**: Register, login, and secure token storage
- **Auto-Refresh mechanism**: The frontend seamlessly intercepts 401s and gets a new access token
- **Full CRUD**: Create, read, update, and delete tasks instantly
- **Optimistic UI Updates**: Status toggles apply visually before server confirmation
- **Advanced Filtering & Pagination**: Easily search through tasks and paginate results
- **Responsive Design**: Works perfectly on mobile and desktop
