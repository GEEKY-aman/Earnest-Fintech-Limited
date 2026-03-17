# Earnest - Full-Stack Task Management System

A premium, production-ready Task Management System built with a modern full-stack architecture and a stunning "Antigravity UI" theme.

## 🚀 Tech Stack

### Backend
- **Node.js + Express**: Core server framework
- **TypeScript**: Static typing
- **Prisma ORM**: Database interaction
- **MySQL**: Relational database (configured for easy deployment)
- **JWT Authentication**: Secure access and refresh (rotation) tokens
- **bcrypt**: Password hashing
- **Zod**: Robust request body validation
- **Vercel Serverless**: Configured for `@vercel/node` deployments

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
Make sure you have Node.js (v18 or higher) and npm installed on your machine. You will also need a local or remote MySQL database connection string.

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
Ensure the `PORT` is set to `5001` in your `.env` file to avoid conflicts with macOS ControlCenter (which uses 5000), and update your `DATABASE_URL` with your MySQL connection string.

```env
DATABASE_URL="mysql://username:password@host:port/database_name"
JWT_ACCESS_SECRET="earnest-access-secret-key-change-in-production"
JWT_REFRESH_SECRET="earnest-refresh-secret-key-change-in-production"
ACCESS_TOKEN_EXPIRY="15m"
REFRESH_TOKEN_EXPIRY="7d"
PORT=5001
CORS_ORIGIN="http://localhost:3000"
```

**Set up the Database:**
Generate the Prisma client and push the schema to automatically create the required tables in your MySQL database:
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

---

## ☁️ Production Deployment (Vercel)

The application is structured as a monorepo and is ready to be deployed to Vercel as two separate projects.

### Step 1: Database Setup
1. Create a MySQL database using a managed provider like [PlanetScale](https://planetscale.com/), [Aiven](https://aiven.io/), or [Supabase](https://supabase.com/) (using their Postgres/MySQL compatible endpoints).
2. Obtain your raw connection string (e.g., `mysql://user:pass@host/db`).

### Step 2: Deploy the Backend (API)
1. In your Vercel Dashboard, click **Add New... > Project**.
2. Import your GitHub repository.
3. In the "Configure Project" screen:
   - **Project Name:** `earnest-backend`
   - **Framework Preset:** `Other`
   - **Root Directory:** `backend`
4. **Environment Variables:** Add all variables from your `backend/.env.example`.
   - `DATABASE_URL` = Your MySQL connection string
   - `CORS_ORIGIN` = The future URL of your Vercel frontend (e.g., `https://earnest-frontend.vercel.app`)
   - `JWT_ACCESS_SECRET` = A strong random string
   - `JWT_REFRESH_SECRET` = A strong random string
5. Click **Deploy**. Vercel will automatically use `backend/api/index.ts` and `backend/vercel.json` to deploy the Express app as a serverless function.

### Step 3: Run Database Migrations in Production
*Note: Vercel does not automatically run DB migrations on deploy by default.*
From your local machine, run:
```bash
cd backend
npx prisma db push --schema=prisma/schema.prisma --accept-data-loss
```
Make sure your local `.env` currently points to the production DB, or append the URL manually.

### Step 4: Deploy the Frontend
1. Back in your Vercel Dashboard, click **Add New... > Project**.
2. Import the *same* GitHub repository.
3. In the "Configure Project" screen:
   - **Project Name:** `earnest-frontend`
   - **Framework Preset:** `Next.js`
   - **Root Directory:** `frontend`
4. **Environment Variables:**
   - `NEXT_PUBLIC_API_URL` = The deployment URL of your newly created backend (e.g., `https://earnest-backend.vercel.app`)
5. Click **Deploy**.

**Important:** Once the frontend is deployed, ensure that the `CORS_ORIGIN` environment variable in your *Backend* Vercel project exactly matches the frontend's deployment URL. Redeploy the backend if necessary so the environment variables take effect.

---

## 🔐 Features Included
- **Complete Auth Flow**: Register, login, and secure token storage
- **Auto-Refresh mechanism**: The frontend seamlessly intercepts 401s and gets a new access token
- **Full CRUD**: Create, read, update, and delete tasks instantly
- **Optimistic UI Updates**: Status toggles apply visually before server confirmation
- **Advanced Filtering & Pagination**: Easily search through tasks and paginate results
- **Responsive Design**: Works perfectly on mobile and desktop
