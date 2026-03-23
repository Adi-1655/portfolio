# MERN Stack Personal Portfolio

A modern, high-performance personal portfolio website utilizing a strict MERN stack architecture (MongoDB, Express, React, Node.js) styled with Tailwind CSS.

## Architecture
- **Frontend**: React (Vite) + Tailwind CSS + TypeScript
- **Backend**: Node.js + Express.js + Mongoose + TypeScript
- **Database**: MongoDB

## Setup Instructions

### 1. Backend Setup
1. Navigate to the `backend` directory: `cd backend`
2. Install dependencies: `npm install`
3. Configure your local `.env` variables (e.g., `PORT=5000`, `MONGODB_URI=mongodb://...`).
4. Start the development server: `npm run dev`

### 2. Frontend Setup
1. Navigate to the `frontend` directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start the Vite React development server: `npm run dev`

## Editing Content
- **Text & Bio:** Locate the text layers directly in the `.tsx` components within `frontend/src/components/sections/`.
- **Projects & Skills:** Edit the `PROJECTS` array in `Projects.tsx` and the `SKILL_CATEGORIES` array in `Skills.tsx`. 
- **Resume PDF:** Place your PDF inside `frontend/public/assets/resume.pdf`. Note that the `public` folder will need to be created if it is not already initialized, or place the `assets` folder appropriately inside `frontend/public`.

## Deployment
- **Backend**: Deploy the Node.js API to Render, Railway, or Heroku, setting your `MONGODB_URI` accurately in the platform's Environment Variables.
- **Frontend**: Deploy the React App to Vercel, Netlify, or GitHub Pages. Do not forget to point your Frontend `/api/` fetch call domains to your deployed backend URL.
